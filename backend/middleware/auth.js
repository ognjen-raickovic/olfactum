// This middleware checks if the request has a valid JWT token.
// If valid, it decodes the token and saves the user info to req.user.
// If invalid or missing, it responds with 401 (Unauthorized).

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get the header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // extract the token part

  try {
    // Verify the token using our secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded contains { user_id, username, role_id } (we set this when creating the token)
    req.user = decoded;
    next(); // pass control to the next handler
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
