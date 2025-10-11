import fs from "fs";
import csv from "csv-parser";
import {
  inferOccasion,
  inferSeason,
  inferIntensity,
  inferLongevity,
} from "../frontend/src/services/fragranceInference.js";

const results = [];

fs.createReadStream("fra_cleaned.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", (data) => {
    const notes = [
      ...(data.Top ? data.Top.split(",").map((n) => n.trim()) : []),
      ...(data.Middle ? data.Middle.split(",").map((n) => n.trim()) : []),
      ...(data.Base ? data.Base.split(",").map((n) => n.trim()) : []),
    ].slice(0, 5);

    const accords = [
      data.mainaccord1,
      data.mainaccord2,
      data.mainaccord3,
      data.mainaccord4,
      data.mainaccord5,
    ].filter(Boolean);

    // Clean perfumer info
    const perfumer =
      data.Perfumer1 &&
      data.Perfumer1.trim().toLowerCase() !== "unknown" &&
      data.Perfumer1.trim() !== ""
        ? data.Perfumer1.trim()
        : data.Perfumer2 && data.Perfumer2.trim() !== ""
        ? data.Perfumer2.trim()
        : "Unknown";

    const perfume = {
      id: results.length + 1,
      name: data.Perfume?.trim() || "Unknown",
      brand: data.Brand?.trim() || "Unknown",
      type: "Eau de Parfum",
      country: data.Country?.trim() || "Unknown",
      scentFamily: data.mainaccord1?.trim() || "Unknown",
      notes,
      accords,
      season: accords.length ? [inferSeason(accords)] : [],
      occasion: accords.length ? [inferOccasion(accords)] : [],
      intensity: accords.length ? inferIntensity(accords) : "Moderate",
      longevity: accords.length ? inferLongevity(accords) : "Moderate",
      priceRange: "Unknown",
      description: `${data.Perfume} by ${data.Brand}, launched in ${
        data.Year || "unknown"
      }.`,
      slug: data.Perfume
        ? data.Perfume.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : `perfume-${results.length + 1}`,
      image: "/images/default.jpg",
      genderProfile: data.Gender || "Unisex",
      rating: data["Rating Value"] || "Unknown",
      year: data.Year || "Unknown",
      perfumer,
    };

    results.push(perfume);
  })
  .on("end", () => {
    fs.writeFileSync("fragranceData.json", JSON.stringify(results, null, 2));
    console.log(
      `✅ Done! Created fragranceData.json with ${results.length} perfumes.`
    );
  });
