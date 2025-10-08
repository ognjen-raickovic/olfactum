import { fragranceData } from "../services/fragranceData";

// Helper function to get fragrances by scent family
export const getFragrancesByFamily = (family) => {
  return fragranceData.filter((fragrance) =>
    fragrance.scentFamily.toLowerCase().includes(family.toLowerCase())
  );
};

// Helper function to get fragrances by season
export const getFragrancesBySeason = (season) => {
  return fragranceData.filter((fragrance) => fragrance.season.includes(season));
};

// Helper function to get fragrances by occasion
export const getFragrancesByOccasion = (occasion) => {
  return fragranceData.filter((fragrance) =>
    fragrance.occasion.includes(occasion)
  );
};

// Advanced recommendation engine
export const getRecommendedFragrances = (quizAnswers) => {
  let recommendations = [...fragranceData];

  // Filter by scent type preference
  const scentTypeMapping = {
    fresh: ["Fresh", "Aquatic", "Citrus", "Aromatic"],
    sweet: ["Gourmand", "Vanilla", "Sweet", "Oriental"],
    dark: ["Woody", "Leather", "Oriental", "Spicy"],
    elegant: ["Floral", "Chypre", "Classic", "Amber"],
    bold: ["Spicy", "Aromatic", "Powerful", "Leather"],
  };

  if (quizAnswers.scentType && scentTypeMapping[quizAnswers.scentType]) {
    const preferredFamilies = scentTypeMapping[quizAnswers.scentType];
    recommendations = recommendations.filter((fragrance) =>
      preferredFamilies.some((family) =>
        fragrance.scentFamily.toLowerCase().includes(family.toLowerCase())
      )
    );
  }

  // Filter by season
  const seasonMapping = {
    spring: "Spring",
    summer: "Summer",
    autumn: "Fall",
    winter: "Winter",
    all: "All Year",
  };

  if (quizAnswers.season && seasonMapping[quizAnswers.season]) {
    const preferredSeason = seasonMapping[quizAnswers.season];
    recommendations = recommendations.filter((fragrance) =>
      fragrance.season.includes(preferredSeason)
    );
  }

  // Filter by occasion
  const occasionMapping = {
    everyday: "Everyday",
    office: "Office",
    date: "Date",
    party: "Party",
    special: "Special",
  };

  if (quizAnswers.occasion && occasionMapping[quizAnswers.occasion]) {
    const preferredOccasion = occasionMapping[quizAnswers.occasion];
    recommendations = recommendations.filter((fragrance) =>
      fragrance.occasion.includes(preferredOccasion)
    );
  }

  // Filter by intensity
  const intensityMapping = {
    subtle: "Light",
    noticeable: "Moderate",
    strong: "Strong",
  };

  if (quizAnswers.intensity && intensityMapping[quizAnswers.intensity]) {
    const preferredIntensity = intensityMapping[quizAnswers.intensity];
    recommendations = recommendations.filter(
      (fragrance) => fragrance.intensity === preferredIntensity
    );
  }

  // Filter by notes
  if (quizAnswers.notes) {
    recommendations = recommendations.filter((fragrance) =>
      fragrance.notes.some((note) =>
        note.toLowerCase().includes(quizAnswers.notes.toLowerCase())
      )
    );
  }

  // If no matches found, return some popular fragrances
  if (recommendations.length === 0) {
    return fragranceData.slice(0, 5);
  }

  // Return top 5 recommendations
  return recommendations.slice(0, 5);
};
