require("dotenv").config(); // must be at the very top

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import our route files
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); // Handles user-related endpoints
const adminRoutes = require("./routes/admin"); // Handles admin-related endpoints
const adminUserRoutes = require("./routes/admin/users"); // Admin user management endpoints
const referenceRoutes = require("./routes/references"); // Lookup/reference data
const perfumeRoutes = require("./routes/perfumes"); // Public perfume endpoints
const reviewRoutes = require("./routes/reviews"); // Handles review-related endpoints
const moduleRoutes = require("./routes/modules"); // Learning modules endpoints
const libraryRoutes = require("./routes/library"); // User library endpoints
const quizRoutes = require("./routes/quiz"); // Quiz endpoints

const app = express();

// --- Middleware ---

// CORS allows requests from your React frontend (localhost:5173 by default)
// app.use(cors());

const allowedOrigins = [
  "https://olfactum.vercel.app", // production
  "http://localhost:5173", // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Helmet sets various HTTP headers for security
app.use(helmet());

// Morgan logs HTTP requests to the console (useful for debugging)
app.use(morgan("dev"));

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the public folder
// This lets the frontend access uploaded images like /uploads/perfumes/filename.jpg
app.use(express.static("public"));

// --- Routes ---

// Authentication endpoints (login, register, etc.)
app.use("/api/auth", authRoutes);

// User endpoints (profile, username, settings, etc.)
// Example: PUT /api/users/username
app.use("/api/users", userRoutes);

// Admin endpoints
app.use("/api/admin", adminRoutes);

// Admin user management endpoints
app.use("/api/admin/users", adminUserRoutes);

// Reference/lookup endpoints (brands, notes, accords, etc.)
app.use("/api/references", referenceRoutes);

// Public perfume endpoints
app.use("/api/perfumes", perfumeRoutes);

// Review endpoints
app.use("/api/reviews", reviewRoutes);

// Learning modules endpoints
app.use("/api/modules", moduleRoutes);

// User library endpoints
app.use("/api/library", libraryRoutes);

// Quiz endpoints
app.use("/api/quiz", quizRoutes);

// Simple health-check endpoint
app.get("/", (req, res) => {
  res.send("Olfactum API is running!");
});

// --- Start server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
