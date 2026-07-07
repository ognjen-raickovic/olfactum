const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Helper to build IN clause for arrays
const addInClause = (where, params, column, values) => {
  if (!values || values.length === 0) return;
  const ids = Array.isArray(values) ? values : [values];
  where.push(`${column} IN (${ids.map(() => "?").join(",")})`);
  params.push(...ids);
};

// GET /api/perfumes – public list with search, multi‑select filters, sort, pagination
router.get("/", async (req, res) => {
  const { search = "", sort = "relevance", page = 1, limit = 20 } = req.query;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 20);
  const offset = (pageNum - 1) * limitNum;

  try {
    const where = [];
    const params = [];

    // Search by name or brand
    if (search) {
      where.push("(p.name LIKE ? OR b.name LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    // Multi‑select filters – these will be arrays if multiple values are provided
    addInClause(where, params, "p.brand_id", req.query.brand_id);
    addInClause(where, params, "p.family_id", req.query.family_id);
    addInClause(where, params, "p.type_id", req.query.type_id);
    addInClause(where, params, "p.gender_profile", req.query.gender); // gender is string

    // Season, occasion, tag require subqueries (also support multiple)
    if (req.query.season_id) {
      const ids = Array.isArray(req.query.season_id)
        ? req.query.season_id
        : [req.query.season_id];
      where.push(
        `EXISTS (SELECT 1 FROM PerfumeSeasons ps WHERE ps.perfume_id = p.perfume_id AND ps.season_id IN (${ids.map(() => "?").join(",")}))`,
      );
      params.push(...ids);
    }
    if (req.query.occasion_id) {
      const ids = Array.isArray(req.query.occasion_id)
        ? req.query.occasion_id
        : [req.query.occasion_id];
      where.push(
        `EXISTS (SELECT 1 FROM PerfumeOccasions po WHERE po.perfume_id = p.perfume_id AND po.occasion_id IN (${ids.map(() => "?").join(",")}))`,
      );
      params.push(...ids);
    }
    if (req.query.tag_id) {
      const ids = Array.isArray(req.query.tag_id)
        ? req.query.tag_id
        : [req.query.tag_id];
      where.push(
        `EXISTS (SELECT 1 FROM PerfumeTags pt WHERE pt.perfume_id = p.perfume_id AND pt.tag_id IN (${ids.map(() => "?").join(",")}))`,
      );
      params.push(...ids);
    }

    const whereClause = where.length ? "WHERE " + where.join(" AND ") : "";

    // Sort
    let orderClause;
    switch (sort) {
      case "newest":
        orderClause = "ORDER BY p.release_year DESC";
        break;
      case "oldest":
        orderClause = "ORDER BY p.release_year ASC";
        break;
      case "name-asc":
        orderClause = "ORDER BY p.name ASC";
        break;
      case "name-desc":
        orderClause = "ORDER BY p.name DESC";
        break;
      case "rating-desc":
        orderClause = "ORDER BY p.average_rating DESC";
        break;
      case "rating-asc":
        orderClause = "ORDER BY p.average_rating ASC";
        break;
      case "popularity-desc":
        orderClause = "ORDER BY p.rating_count DESC";
        break;
      case "popularity-asc":
        orderClause = "ORDER BY p.rating_count ASC";
        break;
      default:
        orderClause = "ORDER BY p.average_rating DESC, p.rating_count DESC"; // relevance
    }

    // Total count
    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM Perfumes p LEFT JOIN Brands b ON p.brand_id = b.brand_id ${whereClause}`,
      params,
    );
    const total = countRows[0].total;

    // Fetch perfumes
    const [perfumes] = await pool.query(
      `SELECT p.*, b.name AS brand_name, pt.name AS type_name
       FROM Perfumes p
       LEFT JOIN Brands b ON p.brand_id = b.brand_id
       LEFT JOIN PerfumeTypes pt ON p.type_id = pt.type_id
       ${whereClause}
       ${orderClause}
       LIMIT ? OFFSET ?`,
      [...params, limitNum, offset],
    );

    // Attach tags, seasons, occasions (small N+1, acceptable for now)
    for (let perfume of perfumes) {
      const [tags] = await pool.query(
        `SELECT t.tag_id AS id, t.name, t.type FROM PerfumeTags pt JOIN Tags t ON pt.tag_id = t.tag_id WHERE pt.perfume_id = ?`,
        [perfume.perfume_id],
      );
      const [seasons] = await pool.query(
        `SELECT s.season_id AS id, s.name FROM PerfumeSeasons ps JOIN Seasons s ON ps.season_id = s.season_id WHERE ps.perfume_id = ?`,
        [perfume.perfume_id],
      );
      const [occasions] = await pool.query(
        `SELECT o.occasion_id AS id, o.name FROM PerfumeOccasions po JOIN Occasions o ON po.occasion_id = o.occasion_id WHERE po.perfume_id = ?`,
        [perfume.perfume_id],
      );
      perfume.tags = tags;
      perfume.seasons = seasons;
      perfume.occasions = occasions;
      perfume.rating = perfume.average_rating; // map to rating used by card
    }

    res.json({ perfumes, total });
  } catch (err) {
    console.error("Get perfumes error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/perfumes/:id – full perfume detail
router.get("/:id", async (req, res) => {
  try {
    const [[perfume]] = await pool.query(
      "SELECT * FROM Perfumes WHERE perfume_id = ?",
      [req.params.id],
    );
    if (!perfume) return res.status(404).json({ message: "Perfume not found" });

    // Notes
    const [notes] = await pool.query(
      `SELECT n.note_id, n.name, pn.note_layer FROM PerfumeNotes pn JOIN Notes n ON pn.note_id = n.note_id WHERE pn.perfume_id = ?`,
      [req.params.id],
    );
    const notesGrouped = { top: [], middle: [], base: [] };
    notes.forEach((n) => {
      if (notesGrouped[n.note_layer])
        notesGrouped[n.note_layer].push({ id: n.note_id, name: n.name });
    });

    const [accords] = await pool.query(
      "SELECT a.accord_id AS id, a.name FROM PerfumeAccords pa JOIN Accords a ON pa.accord_id = a.accord_id WHERE pa.perfume_id = ?",
      [req.params.id],
    );
    const [seasons] = await pool.query(
      "SELECT s.season_id AS id, s.name FROM PerfumeSeasons ps JOIN Seasons s ON ps.season_id = s.season_id WHERE ps.perfume_id = ?",
      [req.params.id],
    );
    const [occasions] = await pool.query(
      "SELECT o.occasion_id AS id, o.name FROM PerfumeOccasions po JOIN Occasions o ON po.occasion_id = o.occasion_id WHERE po.perfume_id = ?",
      [req.params.id],
    );
    const [perfumers] = await pool.query(
      "SELECT p.perfumer_id AS id, p.name FROM PerfumePerfumers pp JOIN Perfumers p ON pp.perfumer_id = p.perfumer_id WHERE pp.perfume_id = ?",
      [req.params.id],
    );
    const [tags] = await pool.query(
      "SELECT t.tag_id AS id, t.name, t.type FROM PerfumeTags pt JOIN Tags t ON pt.tag_id = t.tag_id WHERE pt.perfume_id = ?",
      [req.params.id],
    );
    const [retailers] = await pool.query(
      "SELECT r.retailer_id AS id, r.name, r.website_url, pr.url FROM PerfumeRetailers pr JOIN Retailers r ON pr.retailer_id = r.retailer_id WHERE pr.perfume_id = ?",
      [req.params.id],
    );
    const [[brand]] = await pool.query(
      "SELECT brand_id AS id, name FROM Brands WHERE brand_id = ?",
      [perfume.brand_id],
    );
    const [[type]] = await pool.query(
      "SELECT type_id AS id, name FROM PerfumeTypes WHERE type_id = ?",
      [perfume.type_id],
    );

    res.json({
      ...perfume,
      brand_name: brand?.name,
      type_name: type?.name,
      notes: notesGrouped,
      accords,
      seasons,
      occasions,
      perfumers,
      tags,
      retailers,
      rating: perfume.average_rating,
    });
  } catch (err) {
    console.error("Get perfume error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
