const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

router.use(auth);

// POST /api/library/favorites – toggle favorite
router.post("/favorites", async (req, res) => {
  const userId = req.user.user_id;
  const { perfume_id } = req.body;

  if (!perfume_id)
    return res.status(400).json({ message: "perfume_id required" });

  try {
    const [existing] = await pool.query(
      "SELECT * FROM Favorites WHERE user_id = ? AND perfume_id = ?",
      [userId, perfume_id],
    );

    if (existing.length > 0) {
      await pool.query(
        "DELETE FROM Favorites WHERE user_id = ? AND perfume_id = ?",
        [userId, perfume_id],
      );
      return res.json({ action: "removed", message: "Removed from favorites" });
    } else {
      await pool.query(
        "INSERT INTO Favorites (user_id, perfume_id) VALUES (?, ?)",
        [userId, perfume_id],
      );
      return res.json({ action: "added", message: "Added to favorites" });
    }
  } catch (err) {
    console.error("Toggle favorite error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Helper to attach tags, seasons, occasions, rating to a list of perfumes
async function enrichPerfumes(perfumes) {
  for (let perfume of perfumes) {
    // Tags
    const [tags] = await pool.query(
      `SELECT t.tag_id AS id, t.name, t.type FROM PerfumeTags pt JOIN Tags t ON pt.tag_id = t.tag_id WHERE pt.perfume_id = ?`,
      [perfume.perfume_id],
    );
    perfume.tags = tags;

    // Seasons
    const [seasons] = await pool.query(
      `SELECT s.season_id AS id, s.name FROM PerfumeSeasons ps JOIN Seasons s ON ps.season_id = s.season_id WHERE ps.perfume_id = ?`,
      [perfume.perfume_id],
    );
    perfume.seasons = seasons;

    // Occasions
    const [occasions] = await pool.query(
      `SELECT o.occasion_id AS id, o.name FROM PerfumeOccasions po JOIN Occasions o ON po.occasion_id = o.occasion_id WHERE po.perfume_id = ?`,
      [perfume.perfume_id],
    );
    perfume.occasions = occasions;

    // Rating (the card expects `rating`)
    perfume.rating = perfume.average_rating;
  }
}

// GET /api/library/favorites – list favorites with full details
router.get("/favorites", async (req, res) => {
  const userId = req.user.user_id;
  try {
    const [favorites] = await pool.query(
      `SELECT p.*, b.name AS brand_name, pt.name AS type_name, f.added_at
       FROM Favorites f
       JOIN Perfumes p ON f.perfume_id = p.perfume_id
       LEFT JOIN Brands b ON p.brand_id = b.brand_id
       LEFT JOIN PerfumeTypes pt ON p.type_id = pt.type_id
       WHERE f.user_id = ?
       ORDER BY f.added_at DESC`,
      [userId],
    );
    await enrichPerfumes(favorites);
    res.json({ favorites });
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/library/wishlist – toggle wishlist
router.post("/wishlist", async (req, res) => {
  const userId = req.user.user_id;
  const { perfume_id } = req.body;

  if (!perfume_id)
    return res.status(400).json({ message: "perfume_id required" });

  try {
    const [existing] = await pool.query(
      "SELECT * FROM Wishlists WHERE user_id = ? AND perfume_id = ?",
      [userId, perfume_id],
    );

    if (existing.length > 0) {
      await pool.query(
        "DELETE FROM Wishlists WHERE user_id = ? AND perfume_id = ?",
        [userId, perfume_id],
      );
      return res.json({ action: "removed", message: "Removed from wishlist" });
    } else {
      await pool.query(
        "INSERT INTO Wishlists (user_id, perfume_id) VALUES (?, ?)",
        [userId, perfume_id],
      );
      return res.json({ action: "added", message: "Added to wishlist" });
    }
  } catch (err) {
    console.error("Toggle wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/library/wishlist – list wishlist with full details
router.get("/wishlist", async (req, res) => {
  const userId = req.user.user_id;
  try {
    const [wishlist] = await pool.query(
      `SELECT p.*, b.name AS brand_name, pt.name AS type_name, w.added_at
       FROM Wishlists w
       JOIN Perfumes p ON w.perfume_id = p.perfume_id
       LEFT JOIN Brands b ON p.brand_id = b.brand_id
       LEFT JOIN PerfumeTypes pt ON p.type_id = pt.type_id
       WHERE w.user_id = ?
       ORDER BY w.added_at DESC`,
      [userId],
    );
    await enrichPerfumes(wishlist);
    res.json({ wishlist });
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
