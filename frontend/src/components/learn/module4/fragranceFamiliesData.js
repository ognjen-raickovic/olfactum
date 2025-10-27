import fragranceData from "../../../data/fragranceData.json";

// Function to get popular fragrances based on rating and rating count
const getPopularFragrances = (filterFn, limit = 2) => {
  return fragranceData
    .filter(filterFn)
    .sort((a, b) => {
      // Sort by rating (weighted by number of ratings)
      const scoreA = (a.rating || 0) * Math.log10((a.ratingCount || 1) + 1);
      const scoreB = (b.rating || 0) * Math.log10((b.ratingCount || 1) + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

export const fragranceFamilies = [
  {
    id: "fresh",
    name: "Fresh",
    description: "Light, clean scents perfect for daytime and warm weather",
    characteristics: ["Clean", "Light", "Airy", "Crisp"],
    subFamilies: [
      {
        name: "Citrus",
        notes: ["Lemon", "Bergamot", "Orange", "Grapefruit"],
        examples: getPopularFragrances(
          (f) => f.accords?.includes("citrus") || f.scentFamily === "citrus"
        ),
      },
      {
        name: "Aquatic",
        notes: ["Sea Notes", "Ocean Breeze", "Water Accord"],
        examples: getPopularFragrances((f) =>
          f.accords?.some((accord) =>
            ["aquatic", "marine", "water"].includes(accord.toLowerCase())
          )
        ),
      },
    ],
  },
  {
    id: "woody",
    name: "Woody",
    description: "Warm, earthy scents from trees, roots, and moss",
    characteristics: ["Earthy", "Warm", "Rich", "Masculine"],
    subFamilies: [
      {
        name: "Sandalwood",
        notes: ["Sandalwood", "Mysore", "Australian Sandalwood"],
        examples: getPopularFragrances((f) =>
          f.notes?.some((note) => note.toLowerCase().includes("sandalwood"))
        ),
      },
      {
        name: "Cedar",
        notes: ["Cedarwood", "Atlas Cedar", "Virginia Cedar"],
        examples: getPopularFragrances((f) =>
          f.notes?.some((note) => note.toLowerCase().includes("cedar"))
        ),
      },
    ],
  },
  {
    id: "oriental",
    name: "Oriental",
    description: "Spicy, exotic scents with warm, sensual notes",
    characteristics: ["Spicy", "Warm", "Sensual", "Exotic"],
    subFamilies: [
      {
        name: "Amber",
        notes: ["Amber", "Vanilla", "Labdanum", "Benzoin"],
        examples: getPopularFragrances(
          (f) =>
            f.accords?.includes("amber") ||
            f.notes?.some((note) => note.toLowerCase().includes("amber"))
        ),
      },
      {
        name: "Spicy",
        notes: ["Cinnamon", "Clove", "Cardamom", "Pepper"],
        examples: getPopularFragrances(
          (f) =>
            f.accords?.includes("spicy") ||
            f.notes?.some((note) =>
              ["cinnamon", "clove", "cardamom", "pepper"].some((spice) =>
                note.toLowerCase().includes(spice)
              )
            )
        ),
      },
    ],
  },
  {
    id: "floral",
    name: "Floral",
    description: "Romantic, feminine scents centered around flowers",
    characteristics: ["Romantic", "Feminine", "Elegant", "Soft"],
    subFamilies: [
      {
        name: "Soliflore",
        notes: ["Rose", "Jasmine", "Lily", "Violet"],
        examples: getPopularFragrances(
          (f) =>
            f.scentFamily === "rose" ||
            f.notes?.some((note) =>
              ["rose", "jasmine", "lily", "violet"].some((flower) =>
                note.toLowerCase().includes(flower)
              )
            )
        ),
      },
      {
        name: "Floral Bouquet",
        notes: ["Multiple Flowers", "White Flowers", "Spring Blossoms"],
        examples: getPopularFragrances(
          (f) =>
            f.accords?.includes("floral") &&
            !f.notes?.some((note) =>
              ["rose", "jasmine"].some((single) =>
                note.toLowerCase().includes(single)
              )
            )
        ),
      },
    ],
  },
  {
    id: "fougere",
    name: "Fougère",
    description: "Classic aromatic scents with lavender and oakmoss",
    characteristics: ["Aromatic", "Classic", "Barbershop", "Sophisticated"],
    subFamilies: [
      {
        name: "Classic Fougère",
        notes: ["Lavender", "Coumarin", "Oakmoss", "Geranium"],
        examples: getPopularFragrances(
          (f) =>
            f.accords?.includes("aromatic") &&
            f.notes?.some((note) => note.toLowerCase().includes("lavender"))
        ),
      },
    ],
  },
  {
    id: "chypre",
    name: "Chypre",
    description: "Sophisticated blends of citrus and woody-mossy notes",
    characteristics: ["Complex", "Sophisticated", "Mossy", "Elegant"],
    subFamilies: [
      {
        name: "Classic Chypre",
        notes: ["Bergamot", "Oakmoss", "Labdanum", "Patchouli"],
        examples: getPopularFragrances((f) =>
          f.accords?.some((accord) =>
            ["chypre", "mossy"].includes(accord.toLowerCase())
          )
        ),
      },
    ],
  },
];
