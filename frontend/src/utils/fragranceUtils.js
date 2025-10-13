import fragranceData from "../services/fragranceData.json";

// --- Helper: Safe string matching ---
const includesIgnoreCase = (str, value) => {
  if (!str || !value) return false;
  return str.toLowerCase().includes(value.toLowerCase());
};

// --- MAIN RECOMMENDER ---
export const getRecommendedFragrances = (answers, sortMode = "balanced") => {
  const { gender, scentType, season, occasion, intensity, notes, mood } =
    answers;

  const scentTypeMapping = {
    fresh: ["Fresh", "Aquatic", "Citrus", "Aromatic"],
    sweet: ["Gourmand", "Vanilla", "Sweet", "Oriental"],
    dark: ["Woody", "Leather", "Amber", "Spicy"],
    elegant: ["Floral", "Chypre", "Classic", "Powdery"],
    bold: ["Spicy", "Oriental", "Leather", "Strong"],
  };

  const seasonMapping = {
    spring: "Spring",
    summer: "Summer",
    autumn: "Fall",
    winter: "Winter",
    all: "All Year",
  };

  const occasionMapping = {
    everyday: "Everyday",
    office: "Office",
    date: "Date",
    party: "Party",
    special: "Special",
  };

  const intensityMapping = {
    subtle: "Light",
    noticeable: "Moderate",
    strong: "Strong",
  };

  // Start with all fragrances
  let results = fragranceData.map((f) => ({ ...f, matchScore: 0 }));

  // --- Gender filtering ---
  if (gender) {
    if (gender === "male") {
      results = results.filter(
        (f) =>
          includesIgnoreCase(f.genderProfile, "Male") ||
          includesIgnoreCase(f.genderProfile, "Unisex")
      );
    } else if (gender === "female") {
      results = results.filter(
        (f) =>
          includesIgnoreCase(f.genderProfile, "Female") ||
          includesIgnoreCase(f.genderProfile, "Unisex")
      );
    } else if (gender === "unisex") {
      results = results.filter((f) =>
        includesIgnoreCase(f.genderProfile, "Unisex")
      );
    }
  }

  // --- Scoring system ---
  results.forEach((f) => {
    if (scentTypeMapping[scentType]) {
      if (
        scentTypeMapping[scentType].some((s) =>
          includesIgnoreCase(f.scentFamily, s)
        )
      )
        f.matchScore += 2;
    }

    if (seasonMapping[season]) {
      if (f.season?.some((s) => includesIgnoreCase(s, seasonMapping[season])))
        f.matchScore += 1;
    }

    if (occasionMapping[occasion]) {
      if (
        f.occasion?.some((o) =>
          includesIgnoreCase(o, occasionMapping[occasion])
        )
      )
        f.matchScore += 1;
    }

    if (intensityMapping[intensity]) {
      if (includesIgnoreCase(f.intensity, intensityMapping[intensity]))
        f.matchScore += 1;
    }

    if (notes) {
      if (f.notes?.some((n) => includesIgnoreCase(n, notes))) f.matchScore += 2;
    }

    if (mood) {
      if (includesIgnoreCase(f.mood, mood)) f.matchScore += 1;
    }
  });

  // --- Filter out totally irrelevant fragrances ---
  results = results.filter((f) => f.matchScore > 0);

  // --- SORT BY RELEVANCE ---
  results.sort((a, b) => {
    const popA = (a.rating || 0) * Math.log10(1 + (a.reviewCount || 1));
    const popB = (b.rating || 0) * Math.log10(1 + (b.reviewCount || 1));

    let relevanceA, relevanceB;

    switch (sortMode) {
      case "accuracy": // user wants best match
        relevanceA = a.matchScore * 4 + popA * 0.5;
        relevanceB = b.matchScore * 4 + popB * 0.5;
        break;
      case "proven": // sort by relevance of a fragrance
        relevanceA = a.matchScore * 2 + popA * 1.5;
        relevanceB = b.matchScore * 2 + popB * 1.5;
        break;
      default: // balanced
        relevanceA = a.matchScore * 3 + popA * 0.7;
        relevanceB = b.matchScore * 3 + popB * 0.7;
    }

    return relevanceB - relevanceA;
  });

  // --- Limit results (default 12) ---
  return results.slice(0, 12);
};
