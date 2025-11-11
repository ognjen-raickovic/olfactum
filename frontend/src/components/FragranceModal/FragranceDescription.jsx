import React, { useMemo } from "react";
import { Typography, Box } from "@mui/material";
import { humanizeName } from "../../utils/humanizeName";

const FragranceDescription = ({ fragrance }) => {
  const description = useMemo(() => {
    if (!fragrance) return "No description available.";

    const {
      brand,
      name,
      perfumer,
      year,
      country,
      type = "Eau de Parfum",
      topNotes = [],
      middleNotes = [],
      baseNotes = [],
      accords = [],
      genderProfile = "Unisex",
      season = [],
      occasion = [],
    } = fragrance;

    // Format notes properly
    const formatNotes = (notes) => {
      if (!notes.length) return null;
      const humanizedNotes = notes.map((note) => humanizeName(note));

      if (humanizedNotes.length === 1) return humanizedNotes[0];
      if (humanizedNotes.length === 2) return humanizedNotes.join(" and ");

      return (
        humanizedNotes.slice(0, -1).join(", ") +
        ", and " +
        humanizedNotes[humanizedNotes.length - 1]
      );
    };

    // Build description parts naturally
    const parts = [];

    // Opening line
    let opening = `${humanizeName(name)} by ${humanizeName(brand)}`;
    if (year) opening += `, launched in ${year}`;

    // Add perfumer if available and not "Unknown"
    if (perfumer && perfumer !== "Unknown") {
      opening += `, was crafted by ${humanizeName(perfumer)}`;
    }

    // Add location if available
    if (country) {
      opening += ` in ${country}`;
    }

    parts.push(opening + ".");

    // Type and gender - handle gracefully
    const genderText = humanizeName(genderProfile.toLowerCase());
    const typeText =
      type.toLowerCase() === "eau de parfum"
        ? "Eau de Parfum"
        : humanizeName(type);

    parts.push(
      `This ${genderText} ${typeText} presents a sophisticated blend that evolves beautifully over time.`
    );

    // Notes description
    const topNotesStr = formatNotes(topNotes);
    const middleNotesStr = formatNotes(middleNotes);
    const baseNotesStr = formatNotes(baseNotes);

    if (topNotesStr) {
      parts.push(
        `It opens with ${topNotesStr}, creating an inviting first impression.`
      );
    }

    if (middleNotesStr) {
      parts.push(
        `The heart reveals ${middleNotesStr}, developing into a complex and engaging character.`
      );
    }

    if (baseNotesStr) {
      parts.push(
        `Finally, it settles into a warm base of ${baseNotesStr}, leaving a memorable trail that lingers.`
      );
    }

    // Accords
    if (accords.length > 0) {
      const mainAccords = accords
        .slice(0, 3)
        .map((accord) => humanizeName(accord));
      const accordText =
        mainAccords.length === 1
          ? mainAccords[0]
          : mainAccords.length === 2
          ? mainAccords.join(" and ")
          : mainAccords.slice(0, -1).join(", ") +
            ", and " +
            mainAccords[mainAccords.length - 1];

      parts.push(
        `Characterized by ${accordText.toLowerCase()} accords, this composition offers a refined and distinctive scent profile.`
      );
    }

    // Season and occasion
    if (season.length > 0 || occasion.length > 0) {
      const seasonStr =
        season.length > 0
          ? season.length === 1
            ? season[0].toLowerCase()
            : season.map((s) => s.toLowerCase()).join(", ")
          : "";

      const occasionStr =
        occasion.length > 0
          ? occasion.length === 1
            ? occasion[0].toLowerCase()
            : occasion.map((o) => o.toLowerCase()).join(", ")
          : "";

      if (seasonStr && occasionStr) {
        parts.push(`Ideal for ${seasonStr} wear and ${occasionStr} occasions.`);
      } else if (seasonStr) {
        parts.push(`Perfect for ${seasonStr} seasons.`);
      } else if (occasionStr) {
        parts.push(`Well-suited for ${occasionStr} occasions.`);
      }
    }

    // Final impression
    const finalAdjectives = [
      "A sophisticated choice for the discerning fragrance enthusiast",
      "An elegant scent that makes a lasting impression",
      "A refined fragrance that balances complexity with wearability",
      "A distinctive composition that stands out with subtle confidence",
    ];
    const finalAdjective =
      finalAdjectives[Math.floor(Math.random() * finalAdjectives.length)];
    parts.push(`${finalAdjective}.`);

    return parts.join(" ");
  }, [fragrance]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        Overview
      </Typography>
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1.8,
          color: "text.secondary",
          fontSize: "0.9rem",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FragranceDescription;
