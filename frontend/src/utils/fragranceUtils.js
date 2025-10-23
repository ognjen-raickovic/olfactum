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
export const filterFragrances = (allFragrances, query) => {
  if (!query) return allFragrances;

  const queryStr = typeof query === "string" ? query : String(query);
  if (!queryStr.trim()) return allFragrances;

  const terms = normalizeString(queryStr).split(" ");

  return allFragrances.filter((fragrance) => {
    const haystack = `${fragrance.name} ${fragrance.brand}`;
    const normalizedHaystack = normalizeString(haystack);
    return terms.every((term) => normalizedHaystack.includes(term));
  });
};

/* ------------------------- FIXED Note Matching Logic ------------------------- */
// Map user-friendly note IDs to actual note keywords in the database
const noteMapping = {
  // From scentPreferences (general categories)
  freshClean: [
    "fresh",
    "clean",
    "aquatic",
    "ozonic",
    "water",
    "rain",
    "laundry",
    "shower",
  ],
  sweetGourmand: [
    "vanilla",
    "sweet",
    "gourmand",
    "caramel",
    "chocolate",
    "honey",
    "sugar",
    "cotton candy",
  ],
  woodyEarthy: [
    "woody",
    "wood",
    "cedar",
    "sandalwood",
    "vetiver",
    "patchouli",
    "earthy",
    "soil",
    "moss",
  ],
  floralRomantic: [
    "floral",
    "flower",
    "rose",
    "jasmine",
    "lily",
    "lilac",
    "peony",
    "violet",
    "romantic",
  ],
  spicyWarm: [
    "spicy",
    "spice",
    "cinnamon",
    "pepper",
    "cardamom",
    "clove",
    "nutmeg",
    "warm",
    "amber",
  ],
  citrusBright: [
    "citrus",
    "lemon",
    "orange",
    "bergamot",
    "grapefruit",
    "mandarin",
    "lime",
    "bright",
  ],

  // From notes (specific notes)
  citrus: [
    "citrus",
    "lemon",
    "orange",
    "bergamot",
    "grapefruit",
    "mandarin",
    "lime",
    "yuzu",
  ],
  woody: [
    "wood",
    "woody",
    "cedar",
    "sandalwood",
    "oak",
    "vetiver",
    "patchouli",
    "guaiac",
  ],
  vanilla: ["vanilla", "vanille", "tonka", "benzoin"],
  leather: ["leather", "suede", "tobacco", "smoke", "birch tar"],
  spicy: [
    "spicy",
    "spice",
    "cinnamon",
    "pepper",
    "cardamom",
    "clove",
    "nutmeg",
    "saffron",
  ],
  floral: [
    "floral",
    "flower",
    "rose",
    "jasmine",
    "lily",
    "lilac",
    "peony",
    "violet",
    "orchid",
  ],
  aquatic: ["aquatic", "water", "marine", "ocean", "sea", "ozonic", "calone"],
  fruity: [
    "fruity",
    "fruit",
    "berry",
    "apple",
    "peach",
    "mango",
    "pear",
    "pineapple",
    "strawberry",
  ],
  green: [
    "green",
    "grass",
    "leaf",
    "herbal",
    "tea",
    "mint",
    "basil",
    "galbanum",
  ],
  musky: ["musky", "musk", "animalic", "ambroxan", "ambergris"],
};

/* ------------------------- ENHANCED Recommendation Engine with FIXED Note Matching ------------------------- */
export const getRecommendedFragrances = (
  answers,
  sortMode = "balanced",
  limit = 48
) => {
  initializeFragranceData();

  const {
    experience,
    gender,
    scentPreferences, // MULTIPLE - general scent categories
    scentStyle, // SINGLE - fragrance personality
    weatherClimate,
    occasionTime,
    strengthLongevity,
    notes, // MULTIPLE - specific notes
    mood,
  } = answers;

  // Enhanced scent style mapping (from scentStyle question)
  const scentStyleMapping = {
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

  // Weather/Climate mapping
  const weatherClimateMapping = {
    warmClimate: ["Summer", "Spring", "All Year", "Warm"],
    coolClimate: ["Winter", "Fall", "Autumn", "All Year", "Cool"],
    variableClimate: ["Spring", "All Year", "Versatile"],
    allWeather: [
      "All Year",
      "Spring",
      "Summer",
      "Fall",
      "Winter",
      "Autumn",
      "Versatile",
    ],
  };

  // Occasion/Time mapping
  const occasionTimeMapping = {
    dayCasual: ["Everyday", "Casual", "Day", "Daytime", "Office"],
    nightOut: ["Night", "Evening", "Date", "Party", "Romantic", "Club"],
    professional: ["Office", "Professional", "Business", "Formal", "Daytime"],
    specialEvents: ["Special", "Formal", "Evening", "Luxury", "Night"],
    versatile: [
      "Everyday",
      "Casual",
      "Office",
      "Date",
      "Party",
      "Versatile",
      "All",
    ],
  };

  // Strength/Longevity mapping
  const strengthLongevityMapping = {
    subtle: ["Light", "Soft", "Subtle", "Intimate", "Close to skin"],
    balanced: ["Moderate", "Medium", "Average", "Balanced", "Normal"],
    strong: [
      "Strong",
      "Heavy",
      "Powerful",
      "Long-Lasting",
      "Intense",
      "Projection",
    ],
  };

  // Score fragrances
  const scoredFragrances = fragranceData.map((fragrance) => {
    let matchScore = 0;
    let popularityScore =
      (fragrance.rating || 0) * Math.log10(1 + (fragrance.ratingCount || 1));

    // NEW: Experience level adjustment
    if (experience === "beginner") {
      // Boost popular, safe fragrances for beginners
      if (fragrance.rating > 3.5 && fragrance.ratingCount > 100) {
        popularityScore += 15;
      }
      // Penalize very niche or polarizing fragrances
      if (fragrance.rating < 2.5 || fragrance.ratingCount < 50) {
        popularityScore -= 10;
      }
    } else if (experience === "knowledgeable") {
      // Knowledgeable users might appreciate more niche options
      if (fragrance.ratingCount < 200 && fragrance.rating > 3.0) {
        popularityScore += 5;
      }
    }

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
      matchScore += 2;
    }

    // NEW: Scent Preferences matching (MULTIPLE SELECTION)
    if (scentPreferences && Array.isArray(scentPreferences)) {
      const allNotes = [
        ...(fragrance.notes || []),
        ...(fragrance.topNotes || []),
        ...(fragrance.middleNotes || []),
        ...(fragrance.baseNotes || []),
        ...(fragrance.accords || []),
      ].map((note) => note.toLowerCase());

      let scentPreferenceScore = 0;

      scentPreferences.forEach((prefId) => {
        const keywords = noteMapping[prefId] || [];
        keywords.forEach((keyword) => {
          if (allNotes.some((note) => note.includes(keyword))) {
            scentPreferenceScore += 2; // 2 points per matched preference category
          }
        });
      });

      matchScore += scentPreferenceScore;
    }

    // Scent Style matching (SINGLE SELECTION)
    if (scentStyle && scentStyleMapping[scentStyle]) {
      const scentFamily = fragrance.scentFamily?.toLowerCase() || "";
      const accords = (fragrance.accords || []).map((accord) =>
        accord.toLowerCase()
      );

      scentStyleMapping[scentStyle].forEach(({ type, weight }) => {
        if (
          scentFamily.includes(type.toLowerCase()) ||
          accords.some((accord) => accord.includes(type.toLowerCase()))
        ) {
          matchScore += weight;
        }
      });
    }

    // Weather/Climate matching
    if (weatherClimate && weatherClimateMapping[weatherClimate]) {
      const fragranceSeasons = (fragrance.season || []).map((s) =>
        s.toLowerCase()
      );
      if (
        weatherClimateMapping[weatherClimate].some((s) =>
          fragranceSeasons.includes(s.toLowerCase())
        )
      ) {
        matchScore += 3;
      }
    }

    // Occasion/Time matching
    if (occasionTime && occasionTimeMapping[occasionTime]) {
      const fragranceOccasions = (fragrance.occasion || []).map((o) =>
        o.toLowerCase()
      );
      if (
        occasionTimeMapping[occasionTime].some((o) =>
          fragranceOccasions.includes(o.toLowerCase())
        )
      ) {
        matchScore += 3;
      }
    }

    // Strength/Longevity matching
    if (strengthLongevity && strengthLongevityMapping[strengthLongevity]) {
      const fragranceIntensity = fragrance.intensity?.toLowerCase() || "";
      const fragranceLongevity = fragrance.longevity?.toLowerCase() || "";

      const combinedText =
        `${fragranceIntensity} ${fragranceLongevity}`.toLowerCase();

      if (
        strengthLongevityMapping[strengthLongevity].some((i) =>
          combinedText.includes(i.toLowerCase())
        )
      ) {
        matchScore += 2;
      }
    }

    // FIXED: Notes matching (MULTIPLE SELECTION) - CRITICAL FIX
    if (notes && Array.isArray(notes)) {
      const allNotes = [
        ...(fragrance.notes || []),
        ...(fragrance.topNotes || []),
        ...(fragrance.middleNotes || []),
        ...(fragrance.baseNotes || []),
      ].map((note) => note.toLowerCase());

      let notesScore = 0;
      let matchedNotesCount = 0;

      notes.forEach((noteId) => {
        const keywords = noteMapping[noteId] || [];
        // Check if any of the keywords for this note appear in the fragrance
        const hasMatch = keywords.some((keyword) =>
          allNotes.some((fragranceNote) => fragranceNote.includes(keyword))
        );

        if (hasMatch) {
          matchedNotesCount++;
          // More points for the first few matches, diminishing returns
          if (matchedNotesCount <= 3) {
            notesScore += 3; // 3 points for first 3 matches
          } else {
            notesScore += 1; // 1 point for additional matches
          }
        }
      });

      matchScore += notesScore;
    }

    // Mood matching
    if (mood) {
      const fragranceMood = fragrance.mood?.toLowerCase() || "";
      const fragranceDescription = fragrance.description?.toLowerCase() || "";

      const combinedText = `${fragranceMood} ${fragranceDescription}`;

      if (combinedText.includes(mood.toLowerCase())) {
        matchScore += 1.5;
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
          scoreA = a.matchScore * 8 + a.popularityScore * 0.2;
          scoreB = b.matchScore * 8 + b.popularityScore * 0.2;
          break;
        case "proven": // Proven popular picks
          scoreA = a.matchScore * 2 + a.popularityScore * 2;
          scoreB = b.matchScore * 2 + b.popularityScore * 2;
          break;
        default: // Balanced mix
          scoreA = a.matchScore * 5 + a.popularityScore * 1;
          scoreB = b.matchScore * 5 + b.popularityScore * 1;
      }

      return scoreB - scoreA;
    });

  return results.slice(0, limit);
};

// Clear cache periodically to prevent memory issues
setInterval(() => {
  searchCache.clear();
}, 5 * 60 * 1000);
