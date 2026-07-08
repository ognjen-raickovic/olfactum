const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// All routes require login
router.use(auth);

// GET /api/modules/progress – returns all modules with user’s progress
router.get("/progress", async (req, res) => {
  const userId = req.user.user_id;
  try {
    const [modules] = await pool.query(
      `SELECT m.module_id, m.name, m.description,
              COALESCE(um.progress, 'Not Started') AS progress
       FROM Modules m
       LEFT JOIN UserModules um ON m.module_id = um.module_id AND um.user_id = ?
       ORDER BY m.module_id`,
      [userId],
    );
    res.json({ modules });
  } catch (err) {
    console.error("Get module progress error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/modules/progress – mark a module as complete or reset
router.post("/progress", async (req, res) => {
  const userId = req.user.user_id;
  const { module_id, progress } = req.body; // progress: "Completed" | "Not Started"

  if (!module_id || !progress) {
    return res.status(400).json({ message: "module_id and progress required" });
  }

  try {
    // Upsert – if already exists, update; otherwise insert
    await pool.query(
      `INSERT INTO UserModules (user_id, module_id, progress)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE progress = VALUES(progress)`,
      [userId, module_id, progress],
    );
    res.json({ message: "Progress updated" });
  } catch (err) {
    console.error("Update progress error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
