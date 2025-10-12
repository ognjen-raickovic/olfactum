import fragranceData from "../services/fragranceData.json";

// Safe comparison helper
const includesIgnoreCase = (str, value) => {
  if (!str || !value) return false;
  return str.toLowerCase().includes(value.toLowerCase());
};

// --- CATEGORY FILTERS ---
export const getFragrancesByFamily = (family) => {
  return fragranceData.filter((f) =>
    includesIgnoreCase(f?.scentFamily, family)
  );
};

export const getFragrancesBySeason = (season) => {
  return fragranceData.filter((f) => f?.season?.includes(season));
};

export const getFragrancesByOccasion = (occasion) => {
  return fragranceData.filter((f) => f?.occasion?.includes(occasion));
};

// --- MAIN RECOMMENDER ---
export const getRecommendedFragrances = (quizAnswers) => {
  let recommendations = [...fragranceData];

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

  // Gender
  if (quizAnswers.gender) {
    const genderMap = {
      masculine: "Masculine",
      feminine: "Feminine",
      unisex: "Unisex",
    };
    const preferredGender = genderMap[quizAnswers.gender];
    recommendations = recommendations.filter(
      (f) =>
        includesIgnoreCase(f?.genderProfile, preferredGender) ||
        includesIgnoreCase(f?.genderProfile, "Unisex")
    );
  }

  // Scent Family
  if (quizAnswers.scentType && scentTypeMapping[quizAnswers.scentType]) {
    const families = scentTypeMapping[quizAnswers.scentType];
    recommendations = recommendations.filter((f) =>
      families.some((family) => includesIgnoreCase(f?.scentFamily, family))
    );
  }

  // Season
  if (quizAnswers.season && seasonMapping[quizAnswers.season]) {
    const preferred = seasonMapping[quizAnswers.season];
    recommendations = recommendations.filter((f) =>
      f?.season?.some((s) => includesIgnoreCase(s, preferred))
    );
  }

  // Occasion
  if (quizAnswers.occasion && occasionMapping[quizAnswers.occasion]) {
    const preferred = occasionMapping[quizAnswers.occasion];
    recommendations = recommendations.filter((f) =>
      f?.occasion?.some((o) => includesIgnoreCase(o, preferred))
    );
  }

  // Intensity
  if (quizAnswers.intensity && intensityMapping[quizAnswers.intensity]) {
    const preferred = intensityMapping[quizAnswers.intensity];
    recommendations = recommendations.filter((f) =>
      includesIgnoreCase(f?.intensity, preferred)
    );
  }

  // Notes
  if (quizAnswers.notes) {
    recommendations = recommendations.filter((f) =>
      f?.notes?.some((note) => includesIgnoreCase(note, quizAnswers.notes))
    );
  }

  // --- FALLBACK ---
  if (recommendations.length === 0) return fragranceData.slice(0, 5);

  return recommendations.slice(0, 5);
};
