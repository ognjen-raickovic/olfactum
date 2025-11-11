// File: src/components/fragrance/fragranceUtils.js
import { humanizeName as _humanize } from "./humanizeName";

// Brand abbreviations (used on mobile)
const BRAND_ABBREVIATIONS = {
  "jean paul gaultier": "JPG",
  "christian dior": "Dior",
  "yves saint laurent": "YSL",
  "maison francis kurkdjian": "MFK",
  "dolce gabbana": "D&G",
  "paco rabanne": "Paco",
  "hugo boss": "Boss",
  bvlgari: "Bvlgari",
  prada: "Prada",
  chanel: "Chanel",
  gucci: "Gucci",
  versace: "Versace",
  armani: "Armani",
  hermes: "Hermès",
  givenchy: "Givenchy",
  burberry: "Burberry",
  lacoste: "Lacoste",
  montblanc: "Montblanc",
  "calvin klein": "CK",
};

export const getBrandDisplayName = (brand = "", isMobile = false) => {
  if (!brand) return "";
  const normalized = String(brand)
    .trim()
    .toLowerCase()
    .replace(/[-’‘]/g, " ")
    .replace(/\s+/g, " ");
  if (!isMobile) return _humanize(brand);
  return BRAND_ABBREVIATIONS[normalized] || _humanize(brand);
};

// --- FIXED: Properly distinguishes Parfum vs EDP ---
export const getFragranceTypeAbbreviation = (type = "") => {
  if (!type) return "";
  const normalized = String(type).trim().toLowerCase();

  if (normalized.includes("extrait")) return "Extrait";
  if (normalized.includes("eau de parfum")) return "EDP";
  if (normalized.includes("eau de toilette")) return "EDT";
  if (normalized.includes("eau de cologne") || normalized.includes("cologne"))
    return "EDC";

  // If it's exactly "parfum" (not eau de parfum), label as "Parfum"
  if (/^parfum$/.test(normalized)) return "Parfum";

  // fallback: if contains parfum anywhere else (like weird naming), assume EDP
  if (normalized.includes("parfum")) return "EDP";

  return _humanize(type);
};

// Terms that mark concentration keywords
const CONCENTRATION_TERMS = [
  "eau de parfum",
  "eau de toilette",
  "eau de cologne",
  "extrait de parfum",
  "parfum",
  "perfume",
  "edp",
  "edt",
  "edc",
  "extrait",
];

// detect if name or slug contains concentration terms
export const nameIncludesConcentration = (input = "") => {
  if (!input) return false;
  const s = String(input).toLowerCase();
  return CONCENTRATION_TERMS.some((term) => s.includes(term));
};

// clean concentration terms from fragrance names
export const cleanFragranceName = (name = "", type = "") => {
  if (!name) return "";
  let str = String(name).replace(/[-_]+/g, " ").trim();

  const pattern = new RegExp(`\\b(${CONCENTRATION_TERMS.join("|")})\\b`, "gi");
  str = str.replace(pattern, "").replace(/\s+/g, " ").trim();

  return str;
};

// Performance indicators
export const getPerformanceInfo = (fragrance) => {
  const intensity = fragrance.intensity;
  const longevity = fragrance.longevity;

  const intensityMap = {
    "Light Projection": {
      label: "Intimate Projection",
      description: "Stays close to the skin",
      level: 1,
    },
    "Moderate Projection": {
      label: "Moderate Projection",
      description: "Noticeable within personal space",
      level: 2,
    },
    "Strong Projection": {
      label: "Strong Projection",
      description: "Creates a scent trail",
      level: 3,
    },
    "Heavy Projection": {
      label: "Powerful Projection",
      description: "Fills the room",
      level: 4,
    },
  };

  const longevityMap = {
    "Very Short Lasting": {
      label: "Short-Lasting",
      description: "2-4 hours",
      level: 1,
    },
    "Short Lasting": {
      label: "Moderate-Lasting",
      description: "4-6 hours",
      level: 2,
    },
    "Moderate Lasting": {
      label: "Long-Lasting",
      description: "6-8 hours",
      level: 3,
    },
    "Long Lasting": {
      label: "Very Long-Lasting",
      description: "8+ hours",
      level: 4,
    },
    "Very Long Lasting": {
      label: "Exceptional Lasting",
      description: "12+ hours",
      level: 5,
    },
  };

  return {
    intensity: intensityMap[intensity] || {
      label: intensity || "Unknown",
      description: "Projection information not available",
      level: 2,
    },
    longevity: longevityMap[longevity] || {
      label: longevity || "Unknown",
      description: "Longevity information not available",
      level: 2,
    },
  };
};

// Helper functions for FragrancePerformance
export const getIntensityLevel = (intensity) => {
  const levels = {
    "Light Projection": 25,
    "Moderate Projection": 50,
    "Strong Projection": 75,
    "Very Strong Projection": 90,
    "Heavy Projection": 100,
  };
  return levels[intensity] || 50;
};

export const getLongevityLevel = (longevity) => {
  const levels = {
    "Very Short Lasting": 20,
    "Short Lasting": 40,
    "Moderate Lasting": 60,
    "Long Lasting": 80,
    "Very Long Lasting": 100,
  };
  return levels[longevity] || 60;
};

export const getIntensityDescription = (intensity) => {
  const descriptions = {
    "Light Projection": "Stays close to the skin, intimate scent bubble",
    "Moderate Projection": "Noticeable within personal space",
    "Strong Projection": "Creates a noticeable scent trail",
    "Very Strong Projection": "Strong presence, fills personal space",
    "Heavy Projection": "Fills the room with fragrance",
  };
  return descriptions[intensity] || "Projection information not available";
};

export const getLongevityDescription = (longevity) => {
  const descriptions = {
    "Very Short Lasting": "2-4 hours of wear",
    "Short Lasting": "4-6 hours of wear",
    "Moderate Lasting": "6-8 hours of wear",
    "Long Lasting": "8+ hours of wear",
    "Very Long Lasting": "12+ hours of exceptional longevity",
  };
  return descriptions[longevity] || "Longevity information not available";
};
