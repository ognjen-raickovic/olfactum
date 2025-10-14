import fragranceData from "../services/fragranceData.json";

/* ------------------------- Helper: normalize strings ------------------------- */
export const normalizeString = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/[-_]+/g, " ") // treat hyphens and underscores as spaces
    .replace(/\s+/g, " ") // collapse multiple spaces
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove accents

/* ------------------------- Helper: improved query match ------------------------- */
export const matchesQuery = (fragrance, query) => {
  if (!query) return true;

  // combine name + brand into one searchable text
  const haystack = `${fragrance.name} ${fragrance.brand}`;
  const normalizedHaystack = normalizeString(haystack);
  const terms = normalizeString(query).split(" ");

  // require all search terms to appear somewhere (any order)
  return terms.every((term) => normalizedHaystack.includes(term));
};

/* ------------------------- Filter fragrances by query ------------------------- */
export const filterFragrances = (allFragrances, query) =>
  allFragrances.filter((f) => matchesQuery(f, query));

/* ------------------------- Recommendation Engine ------------------------- */
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

  let results = fragranceData.map((f) => ({ ...f, matchScore: 0 }));

  if (gender) {
    if (gender === "male") {
      results = results.filter(
        (f) =>
          f.genderProfile?.toLowerCase().includes("male") ||
          f.genderProfile?.toLowerCase().includes("unisex")
      );
    } else if (gender === "female") {
      results = results.filter(
        (f) =>
          f.genderProfile?.toLowerCase().includes("female") ||
          f.genderProfile?.toLowerCase().includes("unisex")
      );
    } else if (gender === "unisex") {
      results = results.filter((f) =>
        f.genderProfile?.toLowerCase().includes("unisex")
      );
    }
  }

  results.forEach((f) => {
    if (scentTypeMapping[scentType]) {
      if (
        scentTypeMapping[scentType].some((s) =>
          f.scentFamily?.toLowerCase().includes(s.toLowerCase())
        )
      )
        f.matchScore += 2;
    }
    if (seasonMapping[season]) {
      if (
        f.season?.some(
          (s) => s.toLowerCase() === seasonMapping[season].toLowerCase()
        )
      )
        f.matchScore += 1;
    }
    if (occasionMapping[occasion]) {
      if (
        f.occasion?.some(
          (o) => o.toLowerCase() === occasionMapping[occasion].toLowerCase()
        )
      )
        f.matchScore += 1;
    }
    if (intensityMapping[intensity]) {
      if (
        f.intensity?.toLowerCase() === intensityMapping[intensity].toLowerCase()
      )
        f.matchScore += 1;
    }
    if (notes) {
      if (f.notes?.some((n) => n.toLowerCase().includes(notes.toLowerCase())))
        f.matchScore += 2;
    }
    if (mood) {
      if (f.mood?.toLowerCase().includes(mood.toLowerCase())) f.matchScore += 1;
    }
  });

  results = results.filter((f) => f.matchScore > 0);

  results.sort((a, b) => {
    const popA = (a.rating || 0) * Math.log10(1 + (a.reviewCount || 1));
    const popB = (b.rating || 0) * Math.log10(1 + (b.reviewCount || 1));

    let relevanceA, relevanceB;
    switch (sortMode) {
      case "accuracy":
        relevanceA = a.matchScore * 4 + popA * 0.5;
        relevanceB = b.matchScore * 4 + popB * 0.5;
        break;
      case "proven":
        relevanceA = a.matchScore * 2 + popA * 1.5;
        relevanceB = b.matchScore * 2 + popB * 1.5;
        break;
      default:
        relevanceA = a.matchScore * 3 + popA * 0.7;
        relevanceB = b.matchScore * 3 + popB * 0.7;
    }

    return relevanceB - relevanceA;
  });

  return results.slice(0, 12);
};
