const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const upload = require("../middleware/upload");
const { body, param, validationResult } = require("express-validator");

// All admin routes require authentication and admin/superadmin role (role_id 2 or 3)
router.use(auth);
router.use(roleCheck(2, 3));

// POST /api/admin/perfumes
router.post(
  "/perfumes",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("brand_id").isInt().withMessage("Valid brand ID is required"),
    body("family_id").isInt().withMessage("Valid scent family ID is required"),
    body("type_id").optional({ nullable: true }).isInt(),
    body("price")
      .isDecimal({ decimal_digits: "0,2" })
      .withMessage("Price must be a decimal"),
    body("release_year")
      .optional({ nullable: true })
      .isInt({ min: 1800, max: 2030 }),
    body("concentration").optional().trim(),
    body("description").optional().trim(),
    body("image").optional().trim(),
    body("notes.top").optional().isArray(),
    body("notes.middle").optional().isArray(),
    body("notes.base").optional().isArray(),
    body("accords").optional().isArray(),
    body("seasons").optional().isArray(),
    body("occasions").optional().isArray(),
    body("perfumers").optional().isArray(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      name,
      brand_id,
      family_id,
      type_id,
      price,
      release_year,
      concentration,
      description,
      image,
      notes = {},
      accords = [],
      seasons = [],
      occasions = [],
      perfumers = [],
      tags = [],
      retailers = [],
    } = req.body;

    try {
      const [result] = await pool.query(
        `INSERT INTO Perfumes (name, price, brand_id, family_id, type_id, release_year, concentration, description, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          price,
          brand_id,
          family_id,
          type_id,
          release_year,
          concentration,
          description,
          image,
        ],
      );
      const perfumeId = result.insertId;

      // Notes
      for (const layer of ["top", "middle", "base"]) {
        if (notes[layer] && notes[layer].length) {
          const values = notes[layer].map((noteId) => [
            perfumeId,
            noteId,
            layer,
          ]);
          await pool.query(
            "INSERT INTO PerfumeNotes (perfume_id, note_id, note_layer) VALUES ?",
            [values],
          );
        }
      }

      // Accords
      if (accords.length) {
        const vals = accords.map((id) => [perfumeId, id]);
        await pool.query(
          "INSERT INTO PerfumeAccords (perfume_id, accord_id) VALUES ?",
          [vals],
        );
      }

      // Seasons
      if (seasons.length) {
        const vals = seasons.map((id) => [perfumeId, id]);
        await pool.query(
          "INSERT INTO PerfumeSeasons (perfume_id, season_id) VALUES ?",
          [vals],
        );
      }

      // Occasions
      if (occasions.length) {
        const vals = occasions.map((id) => [perfumeId, id]);
        await pool.query(
          "INSERT INTO PerfumeOccasions (perfume_id, occasion_id) VALUES ?",
          [vals],
        );
      }

      // Perfumers
      if (perfumers.length) {
        const vals = perfumers.map((id) => [perfumeId, id]);
        await pool.query(
          "INSERT INTO PerfumePerfumers (perfume_id, perfumer_id) VALUES ?",
          [vals],
        );
      }

      // Tags
      if (tags.length) {
        const vals = tags.map((tagId) => [perfumeId, tagId]);
        await pool.query(
          "INSERT INTO PerfumeTags (perfume_id, tag_id) VALUES ?",
          [vals],
        );
      }

      // Retailers
      for (const r of retailers) {
        let retailerId = r.retailer_id;
        if (!retailerId && r.name) {
          const [ins] = await pool.query(
            "INSERT INTO Retailers (name, website_url) VALUES (?, ?)",
            [r.name, r.url || null],
          );
          retailerId = ins.insertId;
        }
        if (retailerId) {
          await pool.query(
            "INSERT INTO PerfumeRetailers (perfume_id, retailer_id, url) VALUES (?, ?, ?)",
            [perfumeId, retailerId, r.url || null],
          );
        }
      }

      res
        .status(201)
        .json({ message: "Perfume created", perfume_id: perfumeId });
    } catch (err) {
      console.error("Create perfume error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// GET /api/admin/perfumes (with filtering, sorting, pagination)
router.get("/perfumes", async (req, res) => {
  const {
    search = "",
    brand_id,
    family_id,
    type_id,
    sort = "name",
    page = 1,
    limit = 12,
  } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const where = [];
    const params = [];

    if (search) {
      where.push("p.name LIKE ?");
      params.push(`%${search}%`);
    }
    if (brand_id) {
      where.push("p.brand_id = ?");
      params.push(brand_id);
    }
    if (family_id) {
      where.push("p.family_id = ?");
      params.push(family_id);
    }
    if (type_id) {
      where.push("p.type_id = ?");
      params.push(type_id);
    }

    const whereClause = where.length ? "WHERE " + where.join(" AND ") : "";

    let orderClause;
    switch (sort) {
      case "newest":
        orderClause = "ORDER BY p.release_year DESC";
        break;
      case "oldest":
        orderClause = "ORDER BY p.release_year ASC";
        break;
      default:
        orderClause = "ORDER BY p.name ASC";
    }

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM Perfumes p ${whereClause}`,
      params,
    );
    const total = countResult[0].total;

    const [perfumes] = await pool.query(
      `SELECT p.*, b.name AS brand_name, pt.name AS type_name
       FROM Perfumes p
       LEFT JOIN Brands b ON p.brand_id = b.brand_id
       LEFT JOIN PerfumeTypes pt ON p.type_id = pt.type_id
       ${whereClause}
       ${orderClause}
       LIMIT ? OFFSET ?`,
      [...params, limitNumber, offset],
    );

    res.json({ perfumes, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/perfumes/all – returns all perfumes with tags, seasons, occasions
router.get("/perfumes/all", async (req, res) => {
  try {
    // Get all perfumes with brand and type names
    const [perfumes] = await pool.query(
      `SELECT p.*, b.name AS brand_name, pt.name AS type_name
       FROM Perfumes p
       LEFT JOIN Brands b ON p.brand_id = b.brand_id
       LEFT JOIN PerfumeTypes pt ON p.type_id = pt.type_id
       ORDER BY p.name`,
    );

    // Attach related data
    for (const perfume of perfumes) {
      // Tags
      const [tags] = await pool.query(
        `SELECT t.tag_id AS id, t.name, t.type
         FROM PerfumeTags pt
         JOIN Tags t ON pt.tag_id = t.tag_id
         WHERE pt.perfume_id = ?`,
        [perfume.perfume_id],
      );
      perfume.tags = tags;

      // Seasons
      const [seasons] = await pool.query(
        `SELECT s.season_id AS id, s.name
         FROM PerfumeSeasons ps
         JOIN Seasons s ON ps.season_id = s.season_id
         WHERE ps.perfume_id = ?`,
        [perfume.perfume_id],
      );
      perfume.seasons = seasons;

      // Occasions
      const [occasions] = await pool.query(
        `SELECT o.occasion_id AS id, o.name
         FROM PerfumeOccasions po
         JOIN Occasions o ON po.occasion_id = o.occasion_id
         WHERE po.perfume_id = ?`,
        [perfume.perfume_id],
      );
      perfume.occasions = occasions;

      // Use average_rating as the card rating
      perfume.rating = perfume.average_rating;
    }

    res.json({ perfumes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/perfumes/:id
router.get("/perfumes/:id", async (req, res) => {
  try {
    const [[perfume]] = await pool.query(
      "SELECT * FROM Perfumes WHERE perfume_id = ?",
      [req.params.id],
    );
    if (!perfume) return res.status(404).json({ message: "Perfume not found" });

    // Notes grouped by layer
    const [notes] = await pool.query(
      `SELECT n.note_id, n.name, pn.note_layer
       FROM PerfumeNotes pn
       JOIN Notes n ON pn.note_id = n.note_id
       WHERE pn.perfume_id = ?`,
      [req.params.id],
    );
    const notesGrouped = { top: [], middle: [], base: [] };
    notes.forEach((n) => {
      if (notesGrouped[n.note_layer]) {
        notesGrouped[n.note_layer].push({ id: n.note_id, name: n.name });
      }
    });

    // Helper to fetch related records
    const fetchList = async (sql, id) => {
      const [rows] = await pool.query(sql, [id]);
      return rows;
    };

    const [accords, seasons, occasions, perfumers, tags, retailers] =
      await Promise.all([
        fetchList(
          `SELECT a.accord_id AS id, a.name FROM PerfumeAccords pa JOIN Accords a ON pa.accord_id = a.accord_id WHERE pa.perfume_id = ?`,
          req.params.id,
        ),
        fetchList(
          `SELECT s.season_id AS id, s.name FROM PerfumeSeasons ps JOIN Seasons s ON ps.season_id = s.season_id WHERE ps.perfume_id = ?`,
          req.params.id,
        ),
        fetchList(
          `SELECT o.occasion_id AS id, o.name FROM PerfumeOccasions po JOIN Occasions o ON po.occasion_id = o.occasion_id WHERE po.perfume_id = ?`,
          req.params.id,
        ),
        fetchList(
          `SELECT p.perfumer_id AS id, p.name FROM PerfumePerfumers pp JOIN Perfumers p ON pp.perfumer_id = p.perfumer_id WHERE pp.perfume_id = ?`,
          req.params.id,
        ),
        fetchList(
          `SELECT t.tag_id AS id, t.name, t.type FROM PerfumeTags pt JOIN Tags t ON pt.tag_id = t.tag_id WHERE pt.perfume_id = ?`,
          req.params.id,
        ),
        fetchList(
          `SELECT r.retailer_id AS id, r.name, r.website_url, pr.url FROM PerfumeRetailers pr JOIN Retailers r ON pr.retailer_id = r.retailer_id WHERE pr.perfume_id = ?`,
          req.params.id,
        ),
      ]);

    res.json({
      ...perfume,
      notes: notesGrouped,
      accords,
      seasons,
      occasions,
      perfumers,
      tags,
      retailers,
    });
  } catch (err) {
    console.error("Get perfume error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/admin/perfumes/:id
router.put("/perfumes/:id", [param("id").isInt()], async (req, res) => {
  const perfumeId = req.params.id;
  const {
    name,
    brand_id,
    family_id,
    type_id,
    price,
    release_year,
    concentration,
    description,
    image,
    notes,
    accords,
    seasons,
    occasions,
    perfumers,
    tags,
    retailers,
  } = req.body;

  try {
    await pool.query(
      `UPDATE Perfumes SET name=?, price=?, brand_id=?, family_id=?, type_id=?, release_year=?, concentration=?, description=?, image=?
       WHERE perfume_id=?`,
      [
        name,
        price,
        brand_id,
        family_id,
        type_id,
        release_year,
        concentration,
        description,
        image,
        perfumeId,
      ],
    );

    // Notes
    await pool.query("DELETE FROM PerfumeNotes WHERE perfume_id = ?", [
      perfumeId,
    ]);
    if (notes) {
      for (const layer of ["top", "middle", "base"]) {
        if (notes[layer] && notes[layer].length) {
          const vals = notes[layer].map((noteId) => [perfumeId, noteId, layer]);
          await pool.query(
            "INSERT INTO PerfumeNotes (perfume_id, note_id, note_layer) VALUES ?",
            [vals],
          );
        }
      }
    }

    // Accords, Seasons, Occasions, Perfumers
    for (const table of [
      "PerfumeAccords",
      "PerfumeSeasons",
      "PerfumeOccasions",
      "PerfumePerfumers",
    ]) {
      await pool.query(`DELETE FROM ${table} WHERE perfume_id = ?`, [
        perfumeId,
      ]);
    }

    if (accords && accords.length) {
      const vals = accords.map((id) => [perfumeId, id]);
      await pool.query(
        "INSERT INTO PerfumeAccords (perfume_id, accord_id) VALUES ?",
        [vals],
      );
    }
    if (seasons && seasons.length) {
      const vals = seasons.map((id) => [perfumeId, id]);
      await pool.query(
        "INSERT INTO PerfumeSeasons (perfume_id, season_id) VALUES ?",
        [vals],
      );
    }
    if (occasions && occasions.length) {
      const vals = occasions.map((id) => [perfumeId, id]);
      await pool.query(
        "INSERT INTO PerfumeOccasions (perfume_id, occasion_id) VALUES ?",
        [vals],
      );
    }
    if (perfumers && perfumers.length) {
      const vals = perfumers.map((id) => [perfumeId, id]);
      await pool.query(
        "INSERT INTO PerfumePerfumers (perfume_id, perfumer_id) VALUES ?",
        [vals],
      );
    }

    // Tags
    await pool.query("DELETE FROM PerfumeTags WHERE perfume_id = ?", [
      perfumeId,
    ]);
    if (tags && tags.length) {
      const vals = tags.map((tagId) => [perfumeId, tagId]);
      await pool.query(
        "INSERT INTO PerfumeTags (perfume_id, tag_id) VALUES ?",
        [vals],
      );
    }

    // Retailers
    await pool.query("DELETE FROM PerfumeRetailers WHERE perfume_id = ?", [
      perfumeId,
    ]);
    if (retailers && retailers.length) {
      for (const r of retailers) {
        let retailerId = r.retailer_id;
        if (!retailerId && r.name) {
          const [ins] = await pool.query(
            "INSERT INTO Retailers (name, website_url) VALUES (?, ?)",
            [r.name, r.url || null],
          );
          retailerId = ins.insertId;
        }
        if (retailerId) {
          await pool.query(
            "INSERT INTO PerfumeRetailers (perfume_id, retailer_id, url) VALUES (?, ?, ?)",
            [perfumeId, retailerId, r.url || null],
          );
        }
      }
    }

    res.json({ message: "Perfume updated" });
  } catch (err) {
    console.error("Update perfume error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/perfumes/:id
router.delete("/perfumes/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM Perfumes WHERE perfume_id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Perfume deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/admin/perfumes/upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const imageUrl = `/uploads/perfumes/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
