const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// POST /api/reviews – submit a review (authenticated)
router.post("/", auth, async (req, res) => {
  const userId = req.user.user_id;
  const {
    perfume_id,
    scent_rating,
    longevity_rating,
    sillage_rating,
    gender_vote,
    review_text,
    scent_profile_ids = [], // array of profile IDs
    seasons = [], // array of season IDs
    occasions = [], // array of occasion IDs
  } = req.body;

  if (!perfume_id || !scent_rating || !longevity_rating || !sillage_rating) {
    return res.status(400).json({ message: "Missing required rating fields" });
  }

  // Weighted overall rating
  const overall =
    Number(scent_rating) * 0.7 +
    Number(longevity_rating) * 0.2 +
    Number(sillage_rating) * 0.1;
  const rounded = Math.round(overall * 10) / 10; // one decimal

  try {
    // Check if user already reviewed this perfume
    const [existing] = await pool.query(
      "SELECT review_id FROM Reviews WHERE user_id = ? AND perfume_id = ?",
      [userId, perfume_id],
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "You have already reviewed this perfume" });
    }

    // Insert review
    const [result] = await pool.query(
      `INSERT INTO Reviews (user_id, perfume_id, rating_overall, longevity_rating, sillage_rating, scent_rating, gender_vote, review_text)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        perfume_id,
        rounded,
        longevity_rating,
        sillage_rating,
        scent_rating,
        gender_vote,
        review_text,
      ],
    );
    const reviewId = result.insertId;

    // Insert scent profile votes
    if (scent_profile_ids.length > 0) {
      const values = scent_profile_ids.map((id) => [reviewId, id]);
      await pool.query(
        "INSERT INTO ReviewScentProfiles (review_id, profile_id) VALUES ?",
        [values],
      );
    }

    // Insert season votes
    if (seasons.length > 0) {
      const seasonValues = seasons.map((sId) => [reviewId, sId]);
      await pool.query(
        "INSERT INTO ReviewSeasons (review_id, season_id) VALUES ?",
        [seasonValues],
      );
    }

    // Insert occasion votes
    if (occasions.length > 0) {
      const occasionValues = occasions.map((oId) => [reviewId, oId]);
      await pool.query(
        "INSERT INTO ReviewOccasions (review_id, occasion_id) VALUES ?",
        [occasionValues],
      );
    }

    // Update perfume average rating and count
    const [stats] = await pool.query(
      "SELECT COUNT(*) AS cnt, AVG(rating_overall) AS avg FROM Reviews WHERE perfume_id = ?",
      [perfume_id],
    );
    await pool.query(
      "UPDATE Perfumes SET average_rating = ?, rating_count = ? WHERE perfume_id = ?",
      [stats[0].avg, stats[0].cnt, perfume_id],
    );

    res.status(201).json({ message: "Review submitted", review_id: reviewId });
  } catch (err) {
    console.error("Create review error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/reviews/:perfumeId – get reviews for a perfume
router.get("/:perfumeId", async (req, res) => {
  const { perfumeId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) AS total FROM Reviews WHERE perfume_id = ?",
      [perfumeId],
    );

    const [reviews] = await pool.query(
      `SELECT r.review_id, r.rating_overall, r.longevity_rating, r.sillage_rating, r.scent_rating,
              r.gender_vote, r.review_text, r.created_at,
              u.username, u.user_id
       FROM Reviews r
       JOIN Users u ON r.user_id = u.user_id
       WHERE r.perfume_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [perfumeId, limit, offset],
    );

    for (let review of reviews) {
      // Fetch scent profiles
      const [profiles] = await pool.query(
        `SELECT sp.name FROM ReviewScentProfiles rsp JOIN ScentProfiles sp ON rsp.profile_id = sp.profile_id WHERE rsp.review_id = ?`,
        [review.review_id],
      );
      review.scent_profiles = profiles.map((p) => p.name);

      // Fetch seasons
      const [seasons] = await pool.query(
        `SELECT s.name FROM ReviewSeasons rs JOIN Seasons s ON rs.season_id = s.season_id WHERE rs.review_id = ?`,
        [review.review_id],
      );
      review.seasons = seasons.map((s) => s.name);

      // Fetch occasions
      const [occasions] = await pool.query(
        `SELECT o.name FROM ReviewOccasions ro JOIN Occasions o ON ro.occasion_id = o.occasion_id WHERE ro.review_id = ?`,
        [review.review_id],
      );
      review.occasions = occasions.map((o) => o.name);
    }

    res.json({ reviews, total, page, limit });
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/reviews/:perfumeId/stats – aggregated season/occasion vote counts
router.get("/:perfumeId/stats", async (req, res) => {
  const { perfumeId } = req.params;
  try {
    const [seasonStats] = await pool.query(
      `SELECT s.name, COUNT(rs.season_id) AS count
       FROM Seasons s
       LEFT JOIN ReviewSeasons rs ON rs.season_id = s.season_id
         AND rs.review_id IN (SELECT review_id FROM Reviews WHERE perfume_id = ?)
       GROUP BY s.name
       ORDER BY s.name`,
      [perfumeId],
    );
    const [occasionStats] = await pool.query(
      `SELECT o.name, COUNT(ro.occasion_id) AS count
       FROM Occasions o
       LEFT JOIN ReviewOccasions ro ON ro.occasion_id = o.occasion_id
         AND ro.review_id IN (SELECT review_id FROM Reviews WHERE perfume_id = ?)
       GROUP BY o.name
       ORDER BY o.name`,
      [perfumeId],
    );
    res.json({ seasons: seasonStats, occasions: occasionStats });
  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/reviews/:perfumeId/scent-stats – scent profile vote counts
router.get("/:perfumeId/scent-stats", async (req, res) => {
  const { perfumeId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT sp.name, COUNT(rsp.profile_id) AS count
       FROM ReviewScentProfiles rsp
       JOIN ScentProfiles sp ON rsp.profile_id = sp.profile_id
       WHERE rsp.review_id IN (SELECT review_id FROM Reviews WHERE perfume_id = ?)
       GROUP BY sp.name
       ORDER BY count DESC`,
      [perfumeId],
    );
    res.json(rows);
  } catch (err) {
    console.error("Get scent stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/reviews/:perfumeId/averages – average scent, longevity, sillage
router.get("/:perfumeId/averages", async (req, res) => {
  const { perfumeId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT AVG(scent_rating) AS avg_scent,
              AVG(longevity_rating) AS avg_longevity,
              AVG(sillage_rating) AS avg_sillage
       FROM Reviews WHERE perfume_id = ?`,
      [perfumeId],
    );
    const data = rows[0];
    res.json({
      avg_scent: data.avg_scent ? Math.round(data.avg_scent * 10) / 10 : 0,
      avg_longevity: data.avg_longevity
        ? Math.round(data.avg_longevity * 10) / 10
        : 0,
      avg_sillage: data.avg_sillage
        ? Math.round(data.avg_sillage * 10) / 10
        : 0,
    });
  } catch (err) {
    console.error("Get averages error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/reviews/:reviewId – delete a review
router.delete("/:reviewId", auth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.user_id;
  const roleId = req.user.role_id;

  try {
    // Check ownership or admin
    const [review] = await pool.query(
      "SELECT * FROM Reviews WHERE review_id = ?",
      [reviewId],
    );
    if (review.length === 0)
      return res.status(404).json({ message: "Review not found" });

    const isOwner = review[0].user_id === userId;
    const isAdmin = roleId === 2 || roleId === 3;
    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Not authorized" });

    await pool.query("DELETE FROM Reviews WHERE review_id = ?", [reviewId]);

    // Recalculate perfume stats
    const perfumeId = review[0].perfume_id;
    const [stats] = await pool.query(
      "SELECT COUNT(*) AS cnt, AVG(rating_overall) AS avg FROM Reviews WHERE perfume_id = ?",
      [perfumeId],
    );
    await pool.query(
      "UPDATE Perfumes SET average_rating = ?, rating_count = ? WHERE perfume_id = ?",
      [stats[0].avg || 0, stats[0].cnt, perfumeId],
    );

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/reviews/:perfumeId/gender-stats
router.get("/:perfumeId/gender-stats", async (req, res) => {
  const { perfumeId } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT gender_vote, COUNT(*) AS count FROM Reviews WHERE perfume_id = ? AND gender_vote IS NOT NULL GROUP BY gender_vote",
      [perfumeId],
    );
    const data = { male: 0, female: 0, unisex: 0 };
    rows.forEach((r) => {
      if (r.gender_vote === "Male") data.male = r.count;
      else if (r.gender_vote === "Female") data.female = r.count;
      else if (r.gender_vote === "Unisex") data.unisex = r.count;
    });
    const total = data.male + data.female + data.unisex;
    res.json({
      male: total ? Math.round((data.male / total) * 100) : 0,
      female: total ? Math.round((data.female / total) * 100) : 0,
      unisex: total ? Math.round((data.unisex / total) * 100) : 0,
    });
  } catch (err) {
    console.error("Get gender stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
