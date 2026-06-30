// Profile management endpoints for the currently logged‑in user.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const pool = require("../config/db");
const auth = require("../middleware/auth");

// All routes below require a valid JWT
router.use(auth);

// PUT /api/users/username
// Change the username. Must be unique (case‑insensitive? We can enforce via MySQL collation or app logic).
router.put(
  "/username",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username } = req.body;
    const userId = req.user.user_id;

    try {
      // Check if username is already taken by another user
      const [existing] = await pool.query(
        "SELECT user_id FROM Users WHERE username = ? AND user_id != ?",
        [username, userId],
      );
      if (existing.length > 0) {
        return res.status(409).json({ message: "Username already taken" });
      }

      await pool.query("UPDATE Users SET username = ? WHERE user_id = ?", [
        username,
        userId,
      ]);
      res.json({ message: "Username updated", username });
    } catch (err) {
      console.error("Update username error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// PUT /api/users/password
// Change password. Requires current password for verification.
router.put(
  "/password",
  [
    body("currentPassword").notEmpty().withMessage("Current password required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { currentPassword, newPassword } = req.body;
    const userId = req.user.user_id;

    try {
      // Retrieve the stored hash
      const [users] = await pool.query(
        "SELECT password_hash FROM Users WHERE user_id = ?",
        [userId],
      );
      if (users.length === 0)
        return res.status(404).json({ message: "User not found" });

      const match = await bcrypt.compare(
        currentPassword,
        users[0].password_hash,
      );
      if (!match)
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });

      const newHash = await bcrypt.hash(newPassword, 10);
      await pool.query("UPDATE Users SET password_hash = ? WHERE user_id = ?", [
        newHash,
        userId,
      ]);
      res.json({ message: "Password updated" });
    } catch (err) {
      console.error("Update password error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// DELETE /api/users/account
// Permanently delete the account. This will cascade (wishlist, reviews, etc.).
router.delete("/account", async (req, res) => {
  const userId = req.user.user_id;
  try {
    await pool.query("DELETE FROM Users WHERE user_id = ?", [userId]);
    res.json({ message: "Account deleted" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
