import fragranceData from "../services/fragranceData.json";

// Cache for search results
let searchCache = new Map();
let fragranceMap = new Map();

// Pre-process data on first load
const initializeFragranceData = () => {
  if (fragranceMap.size === 0) {
    fragranceData.forEach((fragrance, index) => {
      fragranceMap.set(fragrance.id, { ...fragrance, index });
    });
  }
};

/* ------------------------- Helper: normalize strings ------------------------- */
export const normalizeString = (str) => {
  if (str == null) return "";
  if (typeof str !== "string") str = String(str);

  return str
    .toLowerCase()
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

/* ------------------------- Helper: improved query match ------------------------- */
export const matchesQuery = (fragrance, query) => {
  if (!query) return true;

  const queryStr = typeof query === "string" ? query : String(query);

  const haystack = `${fragrance.name} ${fragrance.brand}`;
  const normalizedHaystack = normalizeString(haystack);
  const terms = normalizeString(queryStr).split(" ");

  return terms.every((term) => normalizedHaystack.includes(term));
};

/* ------------------------- Filter fragrances by query - FIXED SIGNATURE ------------------------- */
// Your FragrancesPage expects: filterFragrances(allFragrances, query)
export const filterFragrances = (allFragrances, query) => {
  // Handle cases where query might be null, undefined, or not a string
  if (!query) return allFragrances;

  // Ensure query is a string
  const queryStr = typeof query === "string" ? query : String(query);
  if (!queryStr.trim()) return allFragrances;

  const terms = normalizeString(queryStr).split(" ");

  return allFragrances.filter((fragrance) => {
    const haystack = `${fragrance.name} ${fragrance.brand}`;
    const normalizedHaystack = normalizeString(haystack);
    return terms.every((term) => normalizedHaystack.includes(term));
  });
};

/* ------------------------- Improved Recommendation Engine ------------------------- */
export const getRecommendedFragrances = (
  answers,
  sortMode = "balanced",
  limit = 24
) => {
  initializeFragranceData();

  const { gender, scentType, season, occasion, intensity, notes, mood } =
    answers;

  // More precise scent type mapping with weights
  const scentTypeMapping = {
    fresh: [
      { type: "Fresh", weight: 3 },
      { type: "Aquatic", weight: 3 },
      { type: "Citrus", weight: 2 },
      { type: "Aromatic", weight: 2 },
      { type: "Green", weight: 2 },
    ],
    sweet: [
      { type: "Gourmand", weight: 3 },
      { type: "Vanilla", weight: 3 },
      { type: "Sweet", weight: 3 },
      { type: "Oriental", weight: 2 },
      { type: "Amber", weight: 2 },
    ],
    dark: [
      { type: "Woody", weight: 3 },
      { type: "Leather", weight: 3 },
      { type: "Amber", weight: 2 },
      { type: "Spicy", weight: 2 },
      { type: "Chypre", weight: 2 },
    ],
    elegant: [
      { type: "Floral", weight: 3 },
      { type: "Chypre", weight: 2 },
      { type: "Classic", weight: 2 },
      { type: "Powdery", weight: 2 },
      { type: "Aldehydic", weight: 1 },
    ],
    bold: [
      { type: "Spicy", weight: 3 },
      { type: "Oriental", weight: 3 },
      { type: "Leather", weight: 2 },
      { type: "Strong", weight: 2 },
      { type: "Animalic", weight: 1 },
    ],
  };

  const seasonMapping = {
    spring: ["Spring", "All Year"],
    summer: ["Summer", "All Year"],
    autumn: ["Fall", "Autumn", "All Year"],
    winter: ["Winter", "All Year"],
    all: ["All Year", "Spring", "Summer", "Fall", "Winter", "Autumn"],
  };

  const occasionMapping = {
    everyday: ["Everyday", "Casual", "Office"],
    office: ["Office", "Professional", "Everyday", "Business"],
    date: ["Date", "Romantic", "Evening", "Night"],
    party: ["Party", "Night", "Evening", "Club"],
    special: ["Special", "Formal", "Evening", "Luxury"],
  };

  const intensityMapping = {
    subtle: ["Light", "Soft", "Subtle"],
    noticeable: ["Moderate", "Medium", "Average"],
    strong: ["Strong", "Heavy", "Powerful", "Long-Lasting"],
  };

  // Score fragrances
  const scoredFragrances = fragranceData.map((fragrance) => {
    let matchScore = 0;
    let popularityScore =
      (fragrance.rating || 0) * Math.log10(1 + (fragrance.ratingCount || 1));

    // Gender matching (strict)
    if (gender) {
      const fragranceGender =
        fragrance.genderProfile?.toLowerCase() || "unisex";
      if (
        gender === "male" &&
        !fragranceGender.includes("male") &&
        !fragranceGender.includes("unisex")
      ) {
        return { ...fragrance, matchScore: 0, popularityScore };
      }
      if (
        gender === "female" &&
        !fragranceGender.includes("female") &&
        !fragranceGender.includes("unisex")
      ) {
        return { ...fragrance, matchScore: 0, popularityScore };
      }
      if (gender === "unisex" && !fragranceGender.includes("unisex")) {
        return { ...fragrance, matchScore: 0, popularityScore };
      }
      matchScore += 2; // Base score for gender match
    }

    // Scent type matching with weights
    if (scentType && scentTypeMapping[scentType]) {
      const scentFamily = fragrance.scentFamily?.toLowerCase() || "";
      const accords = (fragrance.accords || []).map((accord) =>
        accord.toLowerCase()
      );

      scentTypeMapping[scentType].forEach(({ type, weight }) => {
        if (
          scentFamily.includes(type.toLowerCase()) ||
          accords.some((accord) => accord.includes(type.toLowerCase()))
        ) {
          matchScore += weight;
        }
      });
    }

    // Season matching
    if (season && seasonMapping[season]) {
      const fragranceSeasons = (fragrance.season || []).map((s) =>
        s.toLowerCase()
      );
      if (
        seasonMapping[season].some((s) =>
          fragranceSeasons.includes(s.toLowerCase())
        )
      ) {
        matchScore += 2;
      }
    }

    // Occasion matching
    if (occasion && occasionMapping[occasion]) {
      const fragranceOccasions = (fragrance.occasion || []).map((o) =>
        o.toLowerCase()
      );
      if (
        occasionMapping[occasion].some((o) =>
          fragranceOccasions.includes(o.toLowerCase())
        )
      ) {
        matchScore += 2;
      }
    }

    // Intensity matching
    if (intensity && intensityMapping[intensity]) {
      const fragranceIntensity = fragrance.intensity?.toLowerCase() || "";
      if (
        intensityMapping[intensity].some((i) =>
          fragranceIntensity.includes(i.toLowerCase())
        )
      ) {
        matchScore += 1.5;
      }
    }

    // Notes matching (exact match preferred)
    if (notes) {
      const allNotes = [
        ...(fragrance.notes || []),
        ...(fragrance.topNotes || []),
        ...(fragrance.middleNotes || []),
        ...(fragrance.baseNotes || []),
      ].map((note) => note.toLowerCase());

      if (allNotes.some((note) => note.includes(notes.toLowerCase()))) {
        matchScore += 2.5; // Higher weight for specific note preference
      }
    }

    // Mood matching
    if (mood) {
      const fragranceMood = fragrance.mood?.toLowerCase() || "";
      if (fragranceMood.includes(mood.toLowerCase())) {
        matchScore += 1;
      }
    }

    return { ...fragrance, matchScore, popularityScore };
  });

  // Filter out zero matches and sort
  const results = scoredFragrances
    .filter((f) => f.matchScore > 0)
    .sort((a, b) => {
      let scoreA, scoreB;

      switch (sortMode) {
        case "accuracy": // Best personal match
          scoreA = a.matchScore * 6 + a.popularityScore * 0.3;
          scoreB = b.matchScore * 6 + b.popularityScore * 0.3;
          break;
        case "proven": // Proven popular picks
          scoreA = a.matchScore * 2 + a.popularityScore * 2;
          scoreB = b.matchScore * 2 + b.popularityScore * 2;
          break;
        default: // Balanced mix
          scoreA = a.matchScore * 4 + a.popularityScore * 1;
          scoreB = b.matchScore * 4 + b.popularityScore * 1;
      }

      return scoreB - scoreA;
    });

  return results.slice(0, limit);
};

// Clear cache periodically to prevent memory issues
setInterval(() => {
  searchCache.clear();
}, 5 * 60 * 1000); // Clear every 5 minutes
