// fragranceInference.js

/**
 * Infer occasion based on main accords.
 * Respects existing occasion if present.
 * Uses weighted keyword scoring.
 */
export function inferOccasion(accords = [], existingOccasion) {
  if (existingOccasion) return existingOccasion;

  if (!accords?.length) return "Everyday";
  const joined = accords.join(" ").toLowerCase();

  const categories = {
    "Date Night": [
      "sweet",
      "vanilla",
      "amber",
      "tonka",
      "chocolate",
      "caramel",
      "honey",
    ],
    "Office / Daytime": [
      "fresh",
      "citrus",
      "aquatic",
      "green",
      "ozonic",
      "mint",
    ],
    "Evening / Special": ["woody", "spicy", "oriental", "leather", "tobacco"],
    "Everyday / Casual": ["floral", "powdery", "fruity", "herbal"],
  };

  let bestMatch = "Everyday / Casual";
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(categories)) {
    const score = keywords.reduce(
      (acc, word) => acc + (joined.includes(word) ? 1 : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      bestMatch = category;
    }
  }

  return bestMatch;
}

/**
 * Infer season based on main accords.
 * Respects existing season if present.
 * Uses “All Year” as a more natural fallback.
 */
export function inferSeason(accords = [], existingSeason) {
  if (existingSeason) return existingSeason;
  if (!accords?.length) return "All Year";

  const joined = accords.join(" ").toLowerCase();

  if (/citrus|green|aquatic|ozonic|fresh|mint/.test(joined)) return "Summer";
  if (/spicy|amber|woody|tobacco|leather|resin/.test(joined)) return "Fall";
  if (/vanilla|amber|resin|balsamic|oud|musk/.test(joined)) return "Winter";
  if (/floral|powdery|fruity|herbal/.test(joined)) return "Spring";

  return "All Year";
}

/**
 * Infer intensity (projection) based on accords.
 * Respects existing intensity if present.
 */
export function inferIntensity(accords = [], existingIntensity) {
  if (existingIntensity) return existingIntensity;
  if (!accords?.length) return "Moderate";

  const joined = accords.join(" ").toLowerCase();

  if (/oud|amber|leather|spicy|resin|tobacco/.test(joined)) return "Strong";
  if (/fresh|green|citrus|aquatic|ozonic|mint/.test(joined)) return "Light";
  if (/floral|powdery|fruity|vanilla/.test(joined)) return "Moderate";

  return "Moderate";
}

/**
 * Infer longevity based on accords.
 * Respects existing longevity if present.
 */
export function inferLongevity(accords = [], existingLongevity) {
  if (existingLongevity) return existingLongevity;
  if (!accords?.length) return "Moderate";

  const joined = accords.join(" ").toLowerCase();

  if (/amber|oud|leather|tobacco|resin|balsamic|musk/.test(joined))
    return "Long Lasting";
  if (/fresh|citrus|green|aquatic|ozonic|mint/.test(joined)) return "Short";
  if (/vanilla|floral|fruity|powdery/.test(joined)) return "Moderate";

  return "Moderate";
}
