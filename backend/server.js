// server.js
// ---------
// Sets up the Express server, applies middleware, and mounts route handlers.
require("dotenv").config(); // must be at the very top

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import our route files
const authRoutes = require("./routes/auth");
// (We'll add more routes later: users, perfumes, reviews, etc.)

const app = express();

// --- Middleware ---
// CORS allows requests from your React frontend (localhost:5173 by default)
app.use(cors());
// Helmet sets various HTTP headers for security
app.use(helmet());
// Morgan logs HTTP requests to the console (useful for debugging)
app.use(morgan("dev"));
// Parse JSON request bodies
app.use(express.json());

// --- Routes ---
app.use("/api/auth", authRoutes);

// Simple health‑check endpoint
app.get("/", (req, res) => {
  res.send("Olfactum API is running 🚀");
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
