/**
 * Realistic fragrance inference utilities.
 * Designed using perfumery logic and examples from real fragrances.
 */

function has(accords, list) {
  const joined = accords.join(" ").toLowerCase();
  return list.some((word) => joined.includes(word));
}

/**
 * Infer OCCASION
 */
export function inferOccasion(accords = [], existingOccasion) {
  if (existingOccasion) return existingOccasion;
  if (!accords?.length) return "Everyday / Casual";

  const joined = accords.join(" ").toLowerCase();

  const romantic = [
    "sweet",
    "vanilla",
    "tonka",
    "amber",
    "chocolate",
    "caramel",
    "honey",
    "boozy",
  ];
  const fresh = [
    "fresh",
    "citrus",
    "aquatic",
    "green",
    "ozonic",
    "mint",
    "soapy",
  ];
  const formal = [
    "iris",
    "leather",
    "tobacco",
    "spicy",
    "woody",
    "oud",
    "resin",
  ];
  const casual = ["floral", "powdery", "fruity", "herbal", "aromatic"];

  const score = {
    romantic: romantic.filter((n) => joined.includes(n)).length,
    fresh: fresh.filter((n) => joined.includes(n)).length,
    formal: formal.filter((n) => joined.includes(n)).length,
    casual: casual.filter((n) => joined.includes(n)).length,
  };

  // Warm + sweet → Date Night
  if (score.romantic >= 2) return "Date Night";
  // Rich / spicy / leather → Evening
  if (score.formal >= 2) return "Evening / Special";
  // Clean / fresh → Office
  if (score.fresh >= 2) return "Office / Daytime";
  // Light / floral → Everyday
  if (score.casual >= 2) return "Everyday / Casual";

  // Mixed but balanced → versatile scent
  if ((score.fresh && score.formal) || (score.romantic && score.formal)) {
    return "Evening / Special";
  }
  if (score.fresh && score.romantic) return "Everyday / Casual";

  return "Everyday / Casual";
}

/**
 * Infer SEASON
 */
export function inferSeason(accords = [], existingSeason) {
  if (existingSeason) return existingSeason;
  if (!accords?.length) return "All Year";

  const joined = accords.join(" ").toLowerCase();

  const warm = [
    "amber",
    "oud",
    "leather",
    "tobacco",
    "vanilla",
    "tonka",
    "resin",
    "balsamic",
    "musk",
    "spicy",
    "cardamom",
  ];
  const fresh = ["citrus", "green", "aquatic", "ozonic", "mint", "fresh"];
  const floral = ["floral", "powdery", "fruity", "herbal"];

  const warmScore = warm.filter((n) => joined.includes(n)).length;
  const freshScore = fresh.filter((n) => joined.includes(n)).length;
  const floralScore = floral.filter((n) => joined.includes(n)).length;

  // Balanced warm + fresh → All Year (e.g. Bleu, Aventus, Terre d’Hermès)
  if (warmScore && freshScore) return "All Year";
  if (warmScore >= 2) return "Fall / Winter";
  if (freshScore >= 2) return "Spring / Summer";
  if (floralScore >= 2) return "Spring";

  return "All Year";
}

/**
 * Infer INTENSITY (projection)
 */
export function inferIntensity(accords = [], existingIntensity) {
  if (existingIntensity) return existingIntensity;
  if (!accords?.length) return "Moderate";

  const joined = accords.join(" ").toLowerCase();

  const strong = [
    "oud",
    "amber",
    "leather",
    "spicy",
    "resin",
    "tobacco",
    "patchouli",
    "vanilla",
  ];
  const light = [
    "fresh",
    "green",
    "citrus",
    "aquatic",
    "ozonic",
    "mint",
    "herbal",
  ];
  const moderate = ["floral", "powdery", "fruity", "musk", "iris"];

  const strongScore = strong.filter((n) => joined.includes(n)).length;
  const lightScore = light.filter((n) => joined.includes(n)).length;

  if (strongScore >= 2 && strongScore > lightScore) return "Strong";
  if (lightScore >= 2 && lightScore > strongScore) return "Light";
  if (strongScore && lightScore) return "Moderate";
  return "Moderate";
}

/**
 * Infer LONGEVITY
 */
export function inferLongevity(accords = [], existingLongevity) {
  if (existingLongevity) return existingLongevity;
  if (!accords?.length) return "Moderate Lasting";

  const joined = accords.join(" ").toLowerCase();

  const long = [
    "amber",
    "oud",
    "leather",
    "tobacco",
    "resin",
    "balsamic",
    "musk",
    "patchouli",
    "tonka",
  ];
  const short = ["fresh", "citrus", "green", "aquatic", "ozonic", "mint"];
  const moderate = ["vanilla", "floral", "fruity", "powdery", "iris"];

  const longScore = long.filter((n) => joined.includes(n)).length;
  const shortScore = short.filter((n) => joined.includes(n)).length;

  if (longScore >= 2 && longScore > shortScore) return "Long Lasting";
  if (shortScore >= 2 && shortScore > longScore) return "Short Lasting";
  if (longScore && shortScore) return "Moderate Lasting";
  return "Moderate Lasting";
}
