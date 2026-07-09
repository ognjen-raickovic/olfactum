const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ---------- keyword mapping (same as frontend) ----------
const noteMapping = {
  freshClean: [
    "fresh",
    "clean",
    "aquatic",
    "ozonic",
    "water",
    "rain",
    "laundry",
    "shower",
  ],
  sweetGourmand: [
    "vanilla",
    "sweet",
    "gourmand",
    "caramel",
    "chocolate",
    "honey",
    "sugar",
    "cotton candy",
  ],
  woodyEarthy: [
    "woody",
    "wood",
    "cedar",
    "sandalwood",
    "vetiver",
    "patchouli",
    "earthy",
    "soil",
    "moss",
  ],
  floralRomantic: [
    "floral",
    "flower",
    "rose",
    "jasmine",
    "lily",
    "lilac",
    "peony",
    "violet",
    "romantic",
  ],
  spicyWarm: [
    "spicy",
    "spice",
    "cinnamon",
    "pepper",
    "cardamom",
    "clove",
    "nutmeg",
    "warm",
    "amber",
  ],
  citrusBright: [
    "citrus",
    "lemon",
    "orange",
    "bergamot",
    "grapefruit",
    "mandarin",
    "lime",
    "bright",
  ],
  citrus: [
    "citrus",
    "lemon",
    "orange",
    "bergamot",
    "grapefruit",
    "mandarin",
    "lime",
    "yuzu",
  ],
  woody: [
    "wood",
    "woody",
    "cedar",
    "sandalwood",
    "oak",
    "vetiver",
    "patchouli",
    "guaiac",
  ],
  vanilla: ["vanilla", "vanille", "tonka", "benzoin"],
  leather: ["leather", "suede", "tobacco", "smoke", "birch tar"],
  spicy: [
    "spicy",
    "spice",
    "cinnamon",
    "pepper",
    "cardamom",
    "clove",
    "nutmeg",
    "saffron",
  ],
  floral: [
    "floral",
    "flower",
    "rose",
    "jasmine",
    "lily",
    "lilac",
    "peony",
    "violet",
    "orchid",
  ],
  aquatic: ["aquatic", "water", "marine", "ocean", "sea", "ozonic", "calone"],
  fruity: [
    "fruity",
    "fruit",
    "berry",
    "apple",
    "peach",
    "mango",
    "pear",
    "pineapple",
    "strawberry",
  ],
  green: [
    "green",
    "grass",
    "leaf",
    "herbal",
    "tea",
    "mint",
    "basil",
    "galbanum",
  ],
  musky: ["musky", "musk", "animalic", "ambroxan", "ambergris"],
};

const scentStyleMapping = {
  fresh: [
    { type: "Fresh", weight: 3 },
    { type: "Aquatic", weight: 3 },
    { type: "Citrus", weight: 2 },
    { type: "Aromatic", weight: 2 },
    { type: "Green", weight: 2 },
  ],
  sweet: [
    { type: "Gourmand", weight: 3 },
    { type: "Vanilla", weight: 3 },
    { type: "Sweet", weight: 3 },
    { type: "Oriental", weight: 2 },
    { type: "Amber", weight: 2 },
  ],
  dark: [
    { type: "Woody", weight: 3 },
    { type: "Leather", weight: 3 },
    { type: "Amber", weight: 2 },
    { type: "Spicy", weight: 2 },
    { type: "Chypre", weight: 2 },
  ],
  elegant: [
    { type: "Floral", weight: 3 },
    { type: "Chypre", weight: 2 },
    { type: "Classic", weight: 2 },
    { type: "Powdery", weight: 2 },
    { type: "Aldehydic", weight: 1 },
  ],
  bold: [
    { type: "Spicy", weight: 3 },
    { type: "Oriental", weight: 3 },
    { type: "Leather", weight: 2 },
    { type: "Strong", weight: 2 },
    { type: "Animalic", weight: 1 },
  ],
};

const weatherClimateMapping = {
  warmClimate: ["Summer", "Spring", "All Year", "Warm"],
  coolClimate: ["Winter", "Fall", "Autumn", "All Year", "Cool"],
  variableClimate: ["Spring", "All Year", "Versatile"],
  allWeather: [
    "All Year",
    "Spring",
    "Summer",
    "Fall",
    "Winter",
    "Autumn",
    "Versatile",
  ],
};

const occasionTimeMapping = {
  dayCasual: ["Everyday", "Casual", "Day", "Daytime", "Office"],
  nightOut: ["Night", "Evening", "Date", "Party", "Romantic", "Club"],
  professional: ["Office", "Professional", "Business", "Formal", "Daytime"],
  specialEvents: ["Special", "Formal", "Evening", "Luxury", "Night"],
  versatile: [
    "Everyday",
    "Casual",
    "Office",
    "Date",
    "Party",
    "Versatile",
    "All",
  ],
};

const moodMapping = {
  romantic: [
    "romantic",
    "soft",
    "attractive",
    "charming",
    "rose",
    "jasmine",
    "vanilla",
  ],
  confident: [
    "bold",
    "assertive",
    "commanding",
    "powerful",
    "leather",
    "spicy",
    "wood",
  ],
  relaxed: ["casual", "friendly", "easy-going", "fresh", "green", "tea"],
  luxurious: [
    "elegant",
    "expensive",
    "refined",
    "sophisticated",
    "oud",
    "saffron",
    "iris",
  ],
  energetic: ["fresh", "vibrant", "energetic", "citrus", "mint", "aquatic"],
};

// ---------- helper: normalize string ----------
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");
}

// ---------- POST /api/quiz/recommend ----------
router.post("/recommend", async (req, res) => {
  const { answers, sortMode = "balanced", limit = 40 } = req.body;
  const {
    experience,
    gender,
    scentPreferences = [], // array of IDs
    scentStyle, // single ID
    weatherClimate, // single ID
    occasionTime, // single ID
    strengthLongevity, // single ID
    notes = [], // array of IDs
    mood, // single ID
  } = answers || {};

  try {
    // ---------- fetch all perfumes with needed relations ----------
    const [perfumes] = await pool.query("SELECT * FROM Perfumes");

    // fetch notes per perfume (all notes as flat list)
    const [allNotes] = await pool.query(
      `SELECT pn.perfume_id, n.name FROM PerfumeNotes pn JOIN Notes n ON pn.note_id = n.note_id`,
    );
    // fetch accords
    const [allAccords] = await pool.query(
      `SELECT pa.perfume_id, a.name FROM PerfumeAccords pa JOIN Accords a ON pa.accord_id = a.accord_id`,
    );
    // fetch seasons
    const [allSeasons] = await pool.query(
      `SELECT ps.perfume_id, s.name FROM PerfumeSeasons ps JOIN Seasons s ON ps.season_id = s.season_id`,
    );
    // fetch occasions
    const [allOccasions] = await pool.query(
      `SELECT po.perfume_id, o.name FROM PerfumeOccasions po JOIN Occasions o ON po.occasion_id = o.occasion_id`,
    );
    // fetch scent family
    const [families] = await pool.query(
      "SELECT family_id, name FROM ScentFamilies",
    );

    // group by perfume_id
    const notesMap = {}; // perfume_id → [note names]
    allNotes.forEach((n) => {
      if (!notesMap[n.perfume_id]) notesMap[n.perfume_id] = [];
      notesMap[n.perfume_id].push(n.name);
    });
    const accordsMap = {};
    allAccords.forEach((a) => {
      if (!accordsMap[a.perfume_id]) accordsMap[a.perfume_id] = [];
      accordsMap[a.perfume_id].push(a.name);
    });
    const seasonsMap = {};
    allSeasons.forEach((s) => {
      if (!seasonsMap[s.perfume_id]) seasonsMap[s.perfume_id] = [];
      seasonsMap[s.perfume_id].push(s.name);
    });
    const occasionsMap = {};
    allOccasions.forEach((o) => {
      if (!occasionsMap[o.perfume_id]) occasionsMap[o.perfume_id] = [];
      occasionsMap[o.perfume_id].push(o.name);
    });

    // fetch average ratings from Reviews (scent, longevity, sillage, overall)
    const [avgStats] = await pool.query(
      `SELECT perfume_id,
              AVG(scent_rating) AS avg_scent,
              AVG(longevity_rating) AS avg_longevity,
              AVG(sillage_rating) AS avg_sillage,
              COUNT(*) AS review_count
       FROM Reviews GROUP BY perfume_id`,
    );
    const statsMap = {};
    avgStats.forEach((r) => {
      statsMap[r.perfume_id] = r;
    });

    // ---------- scoring ----------
    const scored = perfumes
      .map((p) => {
        let matchScore = 0;
        const pNotes = (notesMap[p.perfume_id] || []).map(norm);
        const pAccords = (accordsMap[p.perfume_id] || []).map(norm);
        const pSeasons = (seasonsMap[p.perfume_id] || []).map(norm);
        const pOccasions = (occasionsMap[p.perfume_id] || []).map(norm);
        const family = families.find((f) => f.family_id === p.family_id);
        const familyName = family ? norm(family.name) : "";
        const stats = statsMap[p.perfume_id] || {
          avg_scent: 0,
          avg_longevity: 0,
          avg_sillage: 0,
          review_count: 0,
        };
        const rating = Number(p.average_rating) || 0;
        const popularity =
          rating * Math.log10(1 + (Number(p.rating_count) || 1));

        // ----- experience adjustment -----
        if (experience === "beginner") {
          if (rating > 3.5 && p.rating_count > 100) matchScore += 2;
          if (rating < 2.5 || p.rating_count < 50) matchScore -= 1;
        } else if (experience === "knowledgeable") {
          if (p.rating_count < 200 && rating > 3.0) matchScore += 1;
        }

        // ----- gender -----
        const fragGender = (p.gender_profile || "unisex").toLowerCase();
        if (gender) {
          if (
            gender === "male" &&
            !fragGender.includes("male") &&
            !fragGender.includes("unisex")
          )
            return null;
          if (
            gender === "female" &&
            !fragGender.includes("female") &&
            !fragGender.includes("unisex")
          )
            return null;
          if (gender === "unisex" && !fragGender.includes("unisex"))
            return null;
          matchScore += 2;
        }

        // ----- scent preferences (multiple) -----
        if (scentPreferences.length) {
          scentPreferences.forEach((prefId) => {
            const keywords = noteMapping[prefId] || [];
            keywords.forEach((kw) => {
              if (
                pAccords.some((a) => a.includes(kw)) ||
                pNotes.some((n) => n.includes(kw))
              ) {
                matchScore += 2;
              }
            });
          });
        }

        // ----- scent style -----
        if (scentStyle && scentStyleMapping[scentStyle]) {
          scentStyleMapping[scentStyle].forEach(({ type, weight }) => {
            if (
              familyName.includes(type.toLowerCase()) ||
              pAccords.some((a) => a.includes(type.toLowerCase()))
            ) {
              matchScore += weight;
            }
          });
        }

        // ----- climate / season -----
        if (weatherClimate && weatherClimateMapping[weatherClimate]) {
          const targetSeasons = weatherClimateMapping[weatherClimate].map(norm);
          if (targetSeasons.some((s) => pSeasons.includes(s))) matchScore += 3;
        }

        // ----- occasion -----
        if (occasionTime && occasionTimeMapping[occasionTime]) {
          const targetOccasions = occasionTimeMapping[occasionTime].map(norm);
          if (targetOccasions.some((o) => pOccasions.includes(o)))
            matchScore += 3;
        }

        // ----- intensity -----
        const avgSillage = Number(stats.avg_sillage) || 0;
        const avgLongevity = Number(stats.avg_longevity) || 0;
        if (strengthLongevity) {
          const desiredSillage =
            strengthLongevity === "subtle"
              ? [0, 2.5]
              : strengthLongevity === "strong"
                ? [4, 5]
                : [2.5, 4];
          const desiredLongevity =
            strengthLongevity === "subtle"
              ? [0, 2.5]
              : strengthLongevity === "strong"
                ? [4, 5]
                : [2.5, 4];
          if (
            avgSillage >= desiredSillage[0] &&
            avgSillage <= desiredSillage[1]
          )
            matchScore += 1;
          if (
            avgLongevity >= desiredLongevity[0] &&
            avgLongevity <= desiredLongevity[1]
          )
            matchScore += 1;
        }

        // ----- preferred notes -----
        if (notes.length) {
          let noteScore = 0,
            matched = 0;
          notes.forEach((noteId) => {
            const keywords = noteMapping[noteId] || [];
            const found = keywords.some((kw) =>
              pNotes.some((n) => n.includes(kw)),
            );
            if (found) {
              matched++;
              noteScore += matched <= 3 ? 3 : 1;
            }
          });
          matchScore += noteScore;
        }

        // ----- mood -----
        if (mood && moodMapping[mood]) {
          const keywords = moodMapping[mood];
          const desc = norm(p.description || "");
          const allText = [...pAccords, ...pNotes, desc].join(" ");
          if (keywords.some((kw) => allText.includes(kw))) matchScore += 1.5;
        }

        return { ...p, matchScore, popularityScore: popularity };
      })
      .filter(Boolean);

    // ----- filter out zero matches -----
    const filtered = scored.filter((p) => p.matchScore > 0);

    // ----- sort -----
    const sorted = filtered.sort((a, b) => {
      let scoreA, scoreB;
      switch (sortMode) {
        case "accuracy":
          scoreA = a.matchScore * 8 + a.popularityScore * 0.2;
          scoreB = b.matchScore * 8 + b.popularityScore * 0.2;
          break;
        case "proven":
          scoreA = a.matchScore * 2 + a.popularityScore * 2;
          scoreB = b.matchScore * 2 + b.popularityScore * 2;
          break;
        default:
          scoreA = a.matchScore * 5 + a.popularityScore;
          scoreB = b.matchScore * 5 + b.popularityScore;
      }
      return scoreB - scoreA;
    });

    // attach brand names for display
    const [brands] = await pool.query("SELECT brand_id, name FROM Brands");

    const top = sorted.slice(0, limit).map((p) => ({
      ...p,
      brand_name: (brands.find((b) => b.brand_id === p.brand_id) || {}).name,
    }));

    // Enrich top results with type_name, tags, seasons, occasions, rating
    for (let p of top) {
      // Type name
      const [typeRows] = await pool.query(
        "SELECT name FROM PerfumeTypes WHERE type_id = ?",
        [p.type_id],
      );
      p.type_name = typeRows[0]?.name || "";

      // Tags (category only)
      const [tagRows] = await pool.query(
        `SELECT t.tag_id AS id, t.name, t.type
     FROM PerfumeTags pt
     JOIN Tags t ON pt.tag_id = t.tag_id
     WHERE pt.perfume_id = ?
       AND t.type = 'category'`,
        [p.perfume_id],
      );
      p.tags = tagRows;

      // Seasons (top 2 by review votes, fallback to static)
      const [seasonRows] = await pool.query(
        `SELECT s.name, s.season_id AS id, COUNT(rs.season_id) AS votes
     FROM ReviewSeasons rs
     JOIN Seasons s ON rs.season_id = s.season_id
     WHERE rs.review_id IN (
       SELECT review_id
       FROM Reviews
       WHERE perfume_id = ?
     )
     GROUP BY s.name, s.season_id
     ORDER BY votes DESC, s.name
     LIMIT 2`,
        [p.perfume_id],
      );

      if (seasonRows.length > 0) {
        p.seasons = seasonRows;
      } else {
        const [staticSeasons] = await pool.query(
          `SELECT s.name, s.season_id AS id
       FROM PerfumeSeasons ps
       JOIN Seasons s ON ps.season_id = s.season_id
       WHERE ps.perfume_id = ?
       LIMIT 2`,
          [p.perfume_id],
        );
        p.seasons = staticSeasons;
      }

      // Occasions (top 3 by review votes, fallback to static)
      const [occasionRows] = await pool.query(
        `SELECT o.name, o.occasion_id AS id, COUNT(ro.occasion_id) AS votes
     FROM ReviewOccasions ro
     JOIN Occasions o ON ro.occasion_id = o.occasion_id
     WHERE ro.review_id IN (
       SELECT review_id
       FROM Reviews
       WHERE perfume_id = ?
     )
     GROUP BY o.name, o.occasion_id
     ORDER BY votes DESC, o.name
     LIMIT 3`,
        [p.perfume_id],
      );

      if (occasionRows.length > 0) {
        p.occasions = occasionRows;
      } else {
        const [staticOccasions] = await pool.query(
          `SELECT o.name, o.occasion_id AS id
       FROM PerfumeOccasions po
       JOIN Occasions o ON po.occasion_id = o.occasion_id
       WHERE po.perfume_id = ?
       LIMIT 3`,
          [p.perfume_id],
        );
        p.occasions = staticOccasions;
      }

      // Rating
      p.rating = p.average_rating;
    }

    res.json({
      recommendations: top,
      total: filtered.length,
    });
  } catch (err) {
    console.error("Quiz recommend error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
