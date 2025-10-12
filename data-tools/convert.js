import fs from "fs";
import csv from "csv-parser";
import pLimit from "p-limit"; // npm i p-limit
import {
  inferOccasion,
  inferSeason,
  inferIntensity,
  inferLongevity,
} from "../frontend/src/services/fragranceInference.js";

const results = [];

// Limit concurrent processing (useful for large CSVs)
const limit = pLimit(10);

async function processCsv() {
  const rows = [];

  const inputFile = "fra_cleaned.csv";
  if (!fs.existsSync(inputFile)) {
    console.error(
      `Input file "${inputFile}" not found. Put your CSV in the data-tools folder.`
    );
    process.exit(1);
  }

  fs.createReadStream(inputFile)
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => rows.push(data))
    .on("end", async () => {
      console.log(`📦 Loaded ${rows.length} rows. Processing...`);

      const promises = rows.map((data, index) =>
        limit(async () => {
          const top = data.Top || data.top || "";
          const middle = data.Middle || data.middle || "";
          const base = data.Base || data.base || "";

          const notes = [
            ...(top ? top.split(",").map((n) => n.trim()) : []),
            ...(middle ? middle.split(",").map((n) => n.trim()) : []),
            ...(base ? base.split(",").map((n) => n.trim()) : []),
          ].slice(0, 5);

          const accords = [
            data.mainaccord1,
            data.mainaccord2,
            data.mainaccord3,
            data.mainaccord4,
            data.mainaccord5,
          ]
            .filter(Boolean)
            .map((a) => (typeof a === "string" ? a.trim() : a));

          const perfumer =
            data.Perfumer1 &&
            String(data.Perfumer1).trim().toLowerCase() !== "unknown" &&
            String(data.Perfumer1).trim() !== ""
              ? String(data.Perfumer1).trim()
              : data.Perfumer2 && String(data.Perfumer2).trim() !== ""
              ? String(data.Perfumer2).trim()
              : "Unknown";

          const url = data.url || data.URL || data.Url || "";

          // 🖼 Build Fragrantica image link automatically
          const match = url?.match(/-(\d+)\.html$/);
          const image = match
            ? `https://fimgs.net/images/perfume/375x500.${match[1]}.jpg`
            : "/images/default.jpg";

          const perfume = {
            id: index + 1,
            name: data.Perfume?.trim() || "Unknown",
            brand: data.Brand?.trim() || "Unknown",
            type: data.Type?.trim() || "Eau de Parfum",
            country: data.Country?.trim() || "Unknown",
            scentFamily: data.mainaccord1?.trim() || "Unknown",
            notes,
            accords,
            season: accords.length ? [inferSeason(accords)] : [],
            occasion: accords.length ? [inferOccasion(accords)] : [],
            intensity: accords.length ? inferIntensity(accords) : "Moderate",
            longevity: accords.length ? inferLongevity(accords) : "Moderate",
            priceRange: data.priceRange || "Unknown",
            description: `${data.Perfume || "Unknown"} by ${
              data.Brand || "Unknown"
            }, launched in ${data.Year || "unknown"}.`,
            slug: data.Perfume
              ? String(data.Perfume)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
              : `perfume-${index + 1}`,
            image,
            genderProfile: data.Gender || "Unisex",
            rating: parseFloat(
              String(data["Rating Value"] || "0").replace(",", ".")
            ),
            ratingCount: parseInt(data["Rating Count"] || "0", 10),
            year: data.Year || "Unknown",
            perfumer,
            sourceUrl: url,
          };

          results.push(perfume);

          if ((index + 1) % 100 === 0) {
            console.log(`✅ Processed ${index + 1} perfumes`);
          }
        })
      );

      await Promise.all(promises);

      const outFile = "fragranceData.json";
      fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
      console.log(
        `🎉 Done! Created ${outFile} with ${results.length} perfumes.`
      );
    });
}

processCsv();
