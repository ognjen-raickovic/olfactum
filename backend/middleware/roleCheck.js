// This function takes a list of allowed role IDs and returns a middleware.
// If the user's role is not in the list, respond with 403 (Forbidden).

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by the auth middleware, so this must run AFTER auth.
    if (!req.user || !allowedRoles.includes(req.user.role_id)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
