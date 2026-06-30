// Endpoints for user registration, login, and profile (me).
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const pool = require("../config/db");
const auth = require("../middleware/auth"); // the JWT middleware

// POST /api/auth/register
// Creates a new user with role_id = 2 (regular user).
// Expects JSON: { username, email, password }
router.post(
  "/register",
  [
    // Validate and sanitize inputs
    body("username")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Username must be at least 6 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if username or email already exists
      const [existing] = await pool.query(
        "SELECT user_id FROM Users WHERE username = ? OR email = ?",
        [username, email],
      );
      if (existing.length > 0) {
        return res
          .status(409)
          .json({ message: "Username or email already exists" });
      }

      // Hash the password with bcrypt (salt rounds = 10)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user. By default, role_id = 2 (user)
      const [result] = await pool.query(
        "INSERT INTO Users (username, email, password_hash, role_id) VALUES (?, ?, ?, 2)",
        [username, email, hashedPassword],
      );

      // Create a JWT token so the user is automatically logged in
      const token = jwt.sign(
        { user_id: result.insertId, username, role_id: 2 },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }, // token valid for 7 days
      );

      // Send back token and basic user info
      res.status(201).json({
        token,
        user: {
          user_id: result.insertId,
          username,
          email,
          role_id: 2,
        },
      });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// POST /api/auth/login
// Expects: { login: "username or email", password: "..." }
router.post(
  "/login",
  [
    body("login").notEmpty().withMessage("Username or email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password } = req.body;

    try {
      // Find user by username OR email
      const [users] = await pool.query(
        "SELECT user_id, username, email, password_hash, role_id FROM Users WHERE username = ? OR email = ?",
        [login, login],
      );
      if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = users[0];

      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create a new token
      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
          role_id: user.role_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.json({
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role_id: user.role_id,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// GET /api/auth/me
// Returns the currently logged-in user's data (used to persist login on page refresh).
router.get("/me", auth, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT user_id, username, email, role_id, country, created_at FROM Users WHERE user_id = ?",
      [req.user.user_id],
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: users[0] });
  } catch (err) {
    console.error("Get me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
