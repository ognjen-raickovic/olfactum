import fs from "fs";
import csv from "csv-parser";
import pLimit from "p-limit";
import {
  inferOccasion,
  inferSeason,
  inferIntensity,
  inferLongevity,
} from "../frontend/src/services/fragranceInference.js";

const results = [];
const limit = pLimit(10);

function detectTypeFromName(name) {
  if (!name) return "";
  const n = name.toLowerCase();

  // Enhanced detection based on common patterns in your data
  if (
    n.includes("extrait") ||
    n.includes("elixir") ||
    n.includes("pure parfum")
  ) {
    return "Extrait / Elixir / Pure Parfum";
  }
  if (n.includes("parfum") && !n.includes("eau de parfum")) return "Parfum";
  if (n.includes("edp") || n.includes("eau de parfum")) return "Eau de Parfum";
  if (n.includes("edt") || n.includes("eau de toilette"))
    return "Eau de Toilette";
  if (n.includes("cologne")) return "Eau de Cologne";

  // Default based on common concentration patterns
  return "Eau de Parfum";
}

function safeParseFloat(value, defaultValue = 0) {
  if (!value) return defaultValue;
  const str = String(value).replace(",", ".");
  const parsed = parseFloat(str);
  return isNaN(parsed) ? defaultValue : parsed;
}

function safeParseInt(value, defaultValue = 0) {
  if (!value) return defaultValue;
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

function generateSlug(name, id) {
  if (!name) return `perfume-${id}`;
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractImageUrl(url) {
  if (!url) return "/images/default.jpg";
  const match = url.match(/-(\d+)\.html$/);
  return match
    ? `https://fimgs.net/images/perfume/375x500.${match[1]}.jpg`
    : "/images/default.jpg";
}

function getPerfumer(data) {
  const perfumer1 = data.Perfumer1 && String(data.Perfumer1).trim();
  const perfumer2 = data.Perfumer2 && String(data.Perfumer2).trim();

  // Filter out "unknown" and empty values
  if (perfumer1 && perfumer1.toLowerCase() !== "unknown" && perfumer1 !== "") {
    return perfumer1;
  }
  if (perfumer2 && perfumer2 !== "" && perfumer2.toLowerCase() !== "unknown") {
    return perfumer2;
  }
  return "Unknown";
}

function processNotes(noteString) {
  if (!noteString) return [];
  return noteString
    .split(",")
    .map((n) => n.trim())
    .filter((n) => {
      const normalized = n.toLowerCase();
      return (
        n !== "" &&
        normalized !== "unknown" &&
        normalized !== "fruity notes" && // Clean up generic terms
        normalized !== "green notes" &&
        normalized !== "citruses" && // Use specific citrus instead
        normalized !== "woods"
      ); // Use specific wood types instead
    })
    .map((n) => {
      // Normalize common note variations
      const note = n.toLowerCase();
      if (note === "citruses") return "citrus";
      if (note === "fruity notes") return "fruity";
      if (note === "green notes") return "green";
      if (note === "blonde woods" || note === "white woods") return "woods";
      return n;
    })
    .slice(0, 15);
}

function processAccords(data) {
  const accords = [
    data.mainaccord1,
    data.mainaccord2,
    data.mainaccord3,
    data.mainaccord4,
    data.mainaccord5,
  ]
    .filter((accord) => accord && String(accord).trim() !== "")
    .map((accord) => String(accord).trim())
    .filter((accord) => accord.toLowerCase() !== "unknown");

  return [...new Set(accords)]; // Remove duplicates
}

function generateDescription(perfume, brand, year, accords) {
  let desc = `${perfume || "Unknown"} by ${brand || "Unknown"}`;
  if (year && year !== "Unknown") {
    desc += `, launched in ${year}`;
  }
  if (accords && accords.length > 0) {
    desc += `. Features ${accords.slice(0, 2).join(" and ")} accords`;
  }
  desc += ".";
  return desc;
}

async function processCsv() {
  const rows = [];

  const inputFile = "fra_cleaned.csv";
  if (!fs.existsSync(inputFile)) {
    console.error(
      `❌ Input file "${inputFile}" not found. Please ensure the CSV file is in the data-tools folder.`
    );
    process.exit(1);
  }

  console.log(`📦 Reading CSV file: ${inputFile}`);

  fs.createReadStream(inputFile)
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => rows.push(data))
    .on("end", async () => {
      console.log(`✅ Loaded ${rows.length} fragrance records`);
      console.log(`⚡ Processing with enhanced inference engine...`);

      const promises = rows.map((data, index) =>
        limit(async () => {
          try {
            // Process notes from all layers
            const topNotes = processNotes(data.Top || data.top || "");
            const middleNotes = processNotes(data.Middle || data.middle || "");
            const baseNotes = processNotes(data.Base || data.base || "");

            // Combine all notes (prioritize base notes for better longevity inference)
            const notes = [...baseNotes, ...middleNotes, ...topNotes].slice(
              0,
              12
            );

            // Process accords
            const accords = processAccords(data);

            // Determine fragrance type - your CSV doesn't have Type column
            let typeField = detectTypeFromName(data.Perfume);

            const perfume = {
              id: index + 1,
              name: (data.Perfume || "Unknown").trim(),
              brand: (data.Brand || "Unknown").trim(),
              type: typeField,
              country: (data.Country || "Unknown").trim(),
              scentFamily: (data.mainaccord1 || "Unknown").trim(),
              notes,
              topNotes,
              middleNotes,
              baseNotes,
              accords,
              // Enhanced inference with proper parameters
              season: [inferSeason(accords, undefined, notes)],
              occasion: [inferOccasion(accords, undefined, notes)],
              intensity: inferIntensity(accords, undefined, typeField, notes),
              longevity: inferLongevity(accords, undefined, typeField, notes),
              priceRange: "Unknown", // Your CSV doesn't have price info
              description: generateDescription(
                data.Perfume,
                data.Brand,
                data.Year,
                accords
              ),
              slug: generateSlug(data.Perfume, index + 1),
              image: extractImageUrl(data.url),
              genderProfile: data.Gender || "Unisex",
              rating: safeParseFloat(data["Rating Value"], 0),
              ratingCount: safeParseInt(data["Rating Count"], 0),
              year: data.Year || "Unknown",
              perfumer: getPerfumer(data),
              sourceUrl: data.url || "",
            };

            results.push(perfume);

            if ((index + 1) % 100 === 0) {
              console.log(`🔄 Processed ${index + 1}/${rows.length} perfumes`);
            }
          } catch (error) {
            console.error(`❌ Error processing row ${index + 1}:`, error);
          }
        })
      );

      await Promise.all(promises);

      const outFile = "fragranceData.json";
      fs.writeFileSync(outFile, JSON.stringify(results, null, 2));

      // Summary statistics
      const stats = {
        total: results.length,
        withType: results.filter((p) => p.type && p.type !== "").length,
        withAccords: results.filter((p) => p.accords.length > 0).length,
        avgNotes: (
          results.reduce((sum, p) => sum + p.notes.length, 0) / results.length
        ).toFixed(1),
        byGender: {
          unisex: results.filter((p) => p.genderProfile === "unisex").length,
          men: results.filter((p) => p.genderProfile === "men").length,
          women: results.filter((p) => p.genderProfile === "women").length,
        },
      };

      console.log(`🎉 Conversion completed!`);
      console.log(`📊 Statistics:`);
      console.log(`   Total fragrances: ${stats.total}`);
      console.log(`   With type info: ${stats.withType}`);
      console.log(`   With accords: ${stats.withAccords}`);
      console.log(`   Average notes per fragrance: ${stats.avgNotes}`);
      console.log(
        `   Gender distribution: Unisex (${stats.byGender.unisex}), Men (${stats.byGender.men}), Women (${stats.byGender.women})`
      );
      console.log(`💾 Output: ${outFile}`);
    })
    .on("error", (error) => {
      console.error(`❌ CSV parsing error:`, error);
      process.exit(1);
    });
}

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

processCsv();
