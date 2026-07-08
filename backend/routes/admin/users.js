const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const auth = require("../../middleware/auth");
const roleCheck = require("../../middleware/roleCheck");

// All routes require at least admin (role 2)
router.use(auth);
router.use(roleCheck(2, 3));

// GET /api/admin/users
router.get("/", async (req, res) => {
  const {
    search = "",
    role_id,
    sort = "created_at",
    order = "desc",
    page = 1,
    limit = 20,
  } = req.query;
  const offset = (page - 1) * limit;

  try {
    let where = [];
    let params = [];

    if (search) {
      where.push(
        "(u.username LIKE ? OR u.email LIKE ? OR CAST(u.user_id AS CHAR) LIKE ?)",
      );
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (role_id) {
      where.push("u.role_id = ?");
      params.push(role_id);
    }

    const whereClause = where.length ? "WHERE " + where.join(" AND ") : "";

    const allowedSort = ["created_at", "username", "user_id"];
    const sortCol = allowedSort.includes(sort) ? sort : "created_at";
    const sortOrder = order === "asc" ? "ASC" : "DESC";

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM Users u ${whereClause}`,
      params,
    );

    const [users] = await pool.query(
      `SELECT u.user_id, u.username, u.email, u.role_id, r.role_name, u.created_at
       FROM Users u
       JOIN Roles r ON u.role_id = r.role_id
       ${whereClause}
       ORDER BY u.${sortCol} ${sortOrder}, u.user_id ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)],
    );

    res.json({ users, total });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/admin/users/:id/role – superadmin only (role 3)
router.put("/:id/role", roleCheck(3), async (req, res) => {
  const { role_id } = req.body;
  const targetId = parseInt(req.params.id, 10);
  const requesterId = req.user.user_id;

  if (!role_id || !["1", "2"].includes(String(role_id))) {
    return res.status(400).json({
      message: "Valid role_id required (1=user, 2=admin)",
    });
  }

  try {
    const [rows] = await pool.query(
      "SELECT user_id, role_id FROM Users WHERE user_id = ?",
      [targetId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const targetRole = rows[0].role_id;

    if (targetId === requesterId) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }

    if (targetRole === 3) {
      return res.status(403).json({ message: "Cannot change a superadmin" });
    }

    await pool.query("UPDATE Users SET role_id = ? WHERE user_id = ?", [
      role_id,
      targetId,
    ]);

    res.json({ message: "Role updated" });
  } catch (err) {
    console.error("Update role error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/users/:id
router.delete("/:id", async (req, res) => {
  const targetId = parseInt(req.params.id);
  const requesterRole = req.user.role_id;
  const requesterId = req.user.user_id;

  try {
    const [rows] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [
      targetId,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const targetRole = rows[0].role_id;

    if (targetRole === 3) {
      return res.status(403).json({ message: "Cannot delete a superadmin" });
    }

    if (requesterRole === 2 && targetRole !== 1) {
      return res
        .status(403)
        .json({ message: "Admins can only delete regular users" });
    }
    if (targetId === requesterId) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await pool.query("DELETE FROM Users WHERE user_id = ?", [targetId]);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
