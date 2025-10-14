/**
 * Balanced fragrance inference with improved accuracy
 */

/* Helper: normalize text (lowercase, trim) */
function normalizeText(s) {
  if (!s) return "";
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/* Build combined context string from accords + notes */
function buildContext(accords = [], notes = []) {
  return [...(accords || []), ...(notes || [])]
    .map((x) => normalizeText(x))
    .filter(Boolean)
    .join(" ");
}

// More balanced note classifications
const PERFORMANCE_CATEGORIES = {
  // Powerhouse notes - very high performance
  powerhouse: [
    "oud",
    "ambergris",
    "labdanum",
    "castoreum",
    "civet",
    "ambroxan",
    "iso e super",
    "cashmeran",
    "ethyl maltol",
  ],

  // Strong base notes - good longevity
  strongBase: [
    "leather",
    "tobacco",
    "patchouli",
    "oakmoss",
    "vetiver",
    "sandalwood",
    "cedar",
    "myrrh",
    "frankincense",
    "musk",
  ],

  // Moderate performers
  moderate: [
    "amber",
    "vanilla",
    "tonka",
    "benzoin",
    "orris",
    "iris",
    "heliotrope",
    "coumarin",
    "incense",
    "smoky",
  ],

  // Sweet/fruity notes that can project well
  sweetProjectors: [
    "vanilla",
    "tonka",
    "almond",
    "caramel",
    "chocolate",
    "berry",
    "fruity",
    "sweet",
    "gourmand",
  ],

  // Fast-fading notes
  volatile: [
    "citrus",
    "bergamot",
    "lemon",
    "orange",
    "grapefruit",
    "mandarin",
    "lime",
    "neroli",
    "petitgrain",
  ],

  // Light/transparent notes
  light: [
    "aquatic",
    "ozonic",
    "marine",
    "watery",
    "fresh",
    "green",
    "tea",
    "light floral",
    "herbal",
  ],
};

// Balanced concentration multipliers
const CONCENTRATION_MULTIPLIERS = {
  "eau de cologne": 0.7,
  "eau de toilette": 0.85,
  "eau de parfum": 1.0,
  parfum: 1.4,
  extrait: 1.6,
  elixir: 1.7,
  "pure parfum": 1.7,
};

// Helper functions
function hasPowerhouseNotes(ctx) {
  return PERFORMANCE_CATEGORIES.powerhouse.some((note) => ctx.includes(note));
}

function hasStrongBase(ctx) {
  const strongCount = PERFORMANCE_CATEGORIES.strongBase.filter((n) =>
    ctx.includes(n)
  ).length;
  return strongCount >= 2;
}

function hasSweetGourmandProfile(ctx) {
  const sweetCount = PERFORMANCE_CATEGORIES.sweetProjectors.filter((n) =>
    ctx.includes(n)
  ).length;
  return sweetCount >= 2;
}

function getVolatileImpact(notes, ctx) {
  const volatileCount = PERFORMANCE_CATEGORIES.volatile.filter((n) =>
    ctx.includes(n)
  ).length;
  const lightCount = PERFORMANCE_CATEGORIES.light.filter((n) =>
    ctx.includes(n)
  ).length;

  // Only penalize if volatile notes dominate the composition
  const totalNotes = notes.length || 1;
  const volatileRatio = (volatileCount + lightCount) / totalNotes;

  if (volatileRatio > 0.5) return -3; // Heavy penalty if mostly volatile
  if (volatileRatio > 0.3) return -1; // Moderate penalty
  return 0; // Minimal penalty if balanced
}

function getBaseStrength(notes, ctx) {
  const powerhouseCount = PERFORMANCE_CATEGORIES.powerhouse.filter((n) =>
    ctx.includes(n)
  ).length;
  const strongCount = PERFORMANCE_CATEGORIES.strongBase.filter((n) =>
    ctx.includes(n)
  ).length;
  const moderateCount = PERFORMANCE_CATEGORIES.moderate.filter((n) =>
    ctx.includes(n)
  ).length;

  return powerhouseCount * 3 + strongCount * 2 + moderateCount * 1;
}

function getProjectionStrength(notes, ctx) {
  const powerhouseCount = PERFORMANCE_CATEGORIES.powerhouse.filter((n) =>
    ctx.includes(n)
  ).length;
  const strongCount = PERFORMANCE_CATEGORIES.strongBase.filter((n) =>
    ctx.includes(n)
  ).length;
  const sweetCount = PERFORMANCE_CATEGORIES.sweetProjectors.filter((n) =>
    ctx.includes(n)
  ).length;

  let score = powerhouseCount * 3 + strongCount * 2 + sweetCount * 1;

  // Sweet gourmand profiles often project well despite not having "heavy" notes
  if (hasSweetGourmandProfile(ctx)) score += 2;

  return score;
}

/**
 * Infer INTENSITY (Projection) - Balanced approach
 */
export function inferIntensity(
  accords = [],
  existingIntensity,
  type = "",
  notes = []
) {
  if (existingIntensity) return existingIntensity;

  const ctx = buildContext(accords, notes);
  const t = normalizeText(type || "");

  let score = 0;

  // Base projection score
  score += getProjectionStrength(notes, ctx);

  // Modern powerhouse notes significantly boost projection
  if (hasPowerhouseNotes(ctx)) score += 3;

  // Volatile/light notes penalty (more nuanced)
  score += getVolatileImpact(notes, ctx);

  // Concentration impact
  const concentration =
    Object.keys(CONCENTRATION_MULTIPLIERS).find((c) => t.includes(c)) ||
    "eau de parfum";
  score *= CONCENTRATION_MULTIPLIERS[concentration];

  // Balanced thresholds
  if (score >= 9) return "Very Strong Projection"; // Rare beasts
  if (score >= 6) return "Strong Projection"; // Good projectors
  if (score >= 3) return "Moderate Projection"; // Average
  if (score >= 0) return "Light Projection"; // Subtle
  return "Very Light Projection"; // Skin scents
}

/**
 * Infer LONGEVITY - Balanced approach
 */
export function inferLongevity(
  accords = [],
  existingLongevity,
  type = "",
  notes = []
) {
  if (existingLongevity) return existingLongevity;

  const ctx = buildContext(accords, notes);
  const t = normalizeText(type || "");

  let score = 0;

  // Base longevity from lasting notes
  score += getBaseStrength(notes, ctx);

  // Powerhouse notes boost longevity
  if (hasPowerhouseNotes(ctx)) score += 3;

  // Sweet/gourmand fragrances often have good longevity
  if (hasSweetGourmandProfile(ctx)) score += 2;

  // Strong base foundation is crucial
  if (hasStrongBase(ctx)) score += 2;

  // Volatile notes penalty (stronger for longevity)
  const volatileImpact = getVolatileImpact(notes, ctx);
  score += volatileImpact * 1.5; // Heavier penalty for longevity

  // Concentration impact
  const concentration =
    Object.keys(CONCENTRATION_MULTIPLIERS).find((c) => t.includes(c)) ||
    "eau de parfum";
  score *= CONCENTRATION_MULTIPLIERS[concentration];

  // Balanced thresholds
  if (score >= 12) return "Very Long Lasting"; // All-day performers
  if (score >= 8) return "Long Lasting"; // Good longevity
  if (score >= 4) return "Moderate Lasting"; // Average
  if (score >= 1) return "Short Lasting"; // Fades quickly
  return "Very Short Lasting"; // Ephemeral
}

/**
 * Infer OCCASION
 */
export function inferOccasion(accords = [], existingOccasion, notes = []) {
  if (existingOccasion) return existingOccasion;
  if (!((accords && accords.length) || (notes && notes.length)))
    return "Everyday / Casual";

  const ctx = buildContext(accords, notes);

  const romantic = [
    "sweet",
    "vanilla",
    "tonka",
    "amber",
    "chocolate",
    "caramel",
    "honey",
    "boozy",
    "ambergris",
    "gourmand",
  ];
  const fresh = [
    "fresh",
    "citrus",
    "aquatic",
    "green",
    "ozonic",
    "mint",
    "soapy",
    "lemon",
    "bergamot",
    "clean",
  ];
  const formal = [
    "iris",
    "leather",
    "tobacco",
    "spicy",
    "woody",
    "oud",
    "resin",
    "smoky",
    "patchouli",
    "vetiver",
  ];
  const casual = [
    "floral",
    "powdery",
    "fruity",
    "herbal",
    "aromatic",
    "rose",
    "jasmine",
    "peony",
    "lily",
  ];

  const scores = {
    romantic: romantic.filter((t) => ctx.includes(t)).length,
    fresh: fresh.filter((t) => ctx.includes(t)).length,
    formal: formal.filter((t) => ctx.includes(t)).length,
    casual: casual.filter((t) => ctx.includes(t)).length,
  };

  if (scores.romantic >= 2) return "Date Night";
  if (scores.formal >= 2) return "Evening / Special";
  if (scores.fresh >= 2) return "Office / Daytime";
  if (scores.casual >= 2) return "Everyday / Casual";

  // Mixed cases
  if ((scores.fresh && scores.formal) || (scores.romantic && scores.formal))
    return "Evening / Special";
  if (scores.fresh && scores.romantic) return "Everyday / Casual";

  return "Everyday / Casual";
}

/**
 * Infer SEASON
 */
export function inferSeason(accords = [], existingSeason, notes = []) {
  if (existingSeason) return existingSeason;
  if (!((accords && accords.length) || (notes && notes.length)))
    return "All Year";

  const ctx = buildContext(accords, notes);

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
    "clove",
    "cinnamon",
    "coffee",
    "chocolate",
  ];
  const fresh = [
    "citrus",
    "green",
    "aquatic",
    "ozonic",
    "mint",
    "fresh",
    "bergamot",
    "lemon",
    "grapefruit",
    "marine",
  ];
  const floral = [
    "floral",
    "powdery",
    "fruity",
    "herbal",
    "rose",
    "jasmine",
    "iris",
    "peony",
    "lily",
    "orange blossom",
  ];

  const warmScore = warm.filter((t) => ctx.includes(t)).length;
  const freshScore = fresh.filter((t) => ctx.includes(t)).length;
  const floralScore = floral.filter((t) => ctx.includes(t)).length;

  if (warmScore && freshScore) return "All Year";
  if (warmScore >= 2) return "Fall / Winter";
  if (freshScore >= 2) return "Spring / Summer";
  if (floralScore >= 2) return "Spring";

  return "All Year";
}
