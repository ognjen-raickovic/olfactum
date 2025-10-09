import { fragranceData } from "../services/fragranceData";

// Utility function to safely compare text values (case-insensitive)
const includesIgnoreCase = (str, value) =>
  str.toLowerCase().includes(value.toLowerCase());

// Get fragrances by scent family
export const getFragrancesByFamily = (family) => {
  return fragranceData.filter((f) => includesIgnoreCase(f.scentFamily, family));
};

// Get fragrances by season
export const getFragrancesBySeason = (season) => {
  return fragranceData.filter((f) => f.season.includes(season));
};

// Get fragrances by occasion
export const getFragrancesByOccasion = (occasion) => {
  return fragranceData.filter((f) => f.occasion.includes(occasion));
};

// Main recommendation engine for the quiz

export const getRecommendedFragrances = (quizAnswers) => {
  let recommendations = [...fragranceData];

  // --- MAPPINGS ---
  const scentTypeMapping = {
    fresh: ["Fresh", "Aquatic", "Citrus", "Aromatic"],
    sweet: ["Gourmand", "Vanilla", "Sweet", "Oriental"],
    dark: ["Woody", "Leather", "Oriental", "Spicy"],
    elegant: ["Floral", "Chypre", "Classic", "Amber"],
    bold: ["Spicy", "Aromatic", "Powerful", "Leather"],
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

  // --- FILTERS ---
  // Scent family
  if (quizAnswers.scentType && scentTypeMapping[quizAnswers.scentType]) {
    const families = scentTypeMapping[quizAnswers.scentType];
    recommendations = recommendations.filter((f) =>
      families.some((family) => includesIgnoreCase(f.scentFamily, family))
    );
  }

  // Season
  if (quizAnswers.season && seasonMapping[quizAnswers.season]) {
    const preferred = seasonMapping[quizAnswers.season];
    recommendations = recommendations.filter((f) =>
      f.season.some((s) => includesIgnoreCase(s, preferred))
    );
  }

  // Occasion
  if (quizAnswers.occasion && occasionMapping[quizAnswers.occasion]) {
    const preferred = occasionMapping[quizAnswers.occasion];
    recommendations = recommendations.filter((f) =>
      f.occasion.some((o) => includesIgnoreCase(o, preferred))
    );
  }

  // Intensity
  if (quizAnswers.intensity && intensityMapping[quizAnswers.intensity]) {
    const preferred = intensityMapping[quizAnswers.intensity];
    recommendations = recommendations.filter(
      (f) => f.intensity && includesIgnoreCase(f.intensity, preferred)
    );
  }

  // Notes
  if (quizAnswers.notes) {
    recommendations = recommendations.filter((f) =>
      f.notes?.some((note) => includesIgnoreCase(note, quizAnswers.notes))
    );
  }

  // --- FALLBACK ---
  if (recommendations.length === 0) {
    // fallback: pick top-rated or first few
    return fragranceData.slice(0, 5);
  }

  // --- LIMIT TO TOP 5 ---
  return recommendations.slice(0, 5);
};
