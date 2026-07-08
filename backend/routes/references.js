const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [brands] = await pool.query(
      "SELECT brand_id AS id, name FROM Brands",
    );
    const [notes] = await pool.query("SELECT note_id AS id, name FROM Notes");
    const [accords] = await pool.query(
      "SELECT accord_id AS id, name FROM Accords",
    );
    const [perfumers] = await pool.query(
      "SELECT perfumer_id AS id, name FROM Perfumers",
    );
    const [types] = await pool.query(
      "SELECT type_id AS id, name FROM PerfumeTypes",
    );
    const [families] = await pool.query(
      "SELECT family_id AS id, name FROM ScentFamilies",
    );
    const [seasons] = await pool.query(
      "SELECT season_id AS id, name FROM Seasons",
    );
    const [occasions] = await pool.query(
      "SELECT occasion_id AS id, name FROM Occasions",
    );
    const [tags] = await pool.query(
      "SELECT tag_id AS id, name, type FROM Tags",
    );
    const [retailers] = await pool.query(
      "SELECT retailer_id AS id, name, website_url FROM Retailers",
    );
    const [scentProfiles] = await pool.query(
      "SELECT profile_id AS id, name FROM ScentProfiles",
    );

    res.json({
      brands,
      notes,
      accords,
      perfumers,
      types,
      families,
      seasons,
      occasions,
      tags,
      retailers,
      scentProfiles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
