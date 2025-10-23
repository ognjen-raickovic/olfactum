import React from "react";
import { Typography, Box } from "@mui/material";
import { humanizeName } from "../utils/humanizeName";

const FragranceDescription = ({ fragrance }) => {
  if (!fragrance) return "No description available.";

  const brand = humanizeName(fragrance.brand);
  const name = humanizeName(fragrance.name);
  const perfumer =
    fragrance.perfumer && fragrance.perfumer !== "Unknown"
      ? fragrance.perfumer
      : null;
  const year = fragrance.year;
  const country = fragrance.country;
  const type = fragrance.type || "Eau de Parfum";

  // Get notes in a readable format
  const topNotes =
    fragrance.topNotes && fragrance.topNotes.length > 0
      ? fragrance.topNotes.map((note) => humanizeName(note)).join(", ")
      : null;

  const middleNotes =
    fragrance.middleNotes && fragrance.middleNotes.length > 0
      ? fragrance.middleNotes.map((note) => humanizeName(note)).join(", ")
      : null;

  const baseNotes =
    fragrance.baseNotes && fragrance.baseNotes.length > 0
      ? fragrance.baseNotes.map((note) => humanizeName(note)).join(", ")
      : null;

  const accords =
    fragrance.accords && fragrance.accords.length > 0
      ? fragrance.accords
          .slice(0, 3)
          .map((accord) => humanizeName(accord))
          .join(", ")
      : null;

  // Build a balanced, elegant description
  let description = `${name} by ${brand}`;

  if (perfumer) {
    description += `, crafted by master perfumer ${perfumer}`;
  }

  if (year) {
    description += ` in ${year}`;
  }

  description += `. This exquisite ${type.toLowerCase()}`;

  if (country) {
    description += ` from ${country}`;
  }

  description += ` presents a sophisticated olfactory journey.`;

  if (topNotes) {
    description += ` It opens with vibrant notes of ${topNotes}, creating an immediate and captivating introduction.`;
  }

  if (middleNotes) {
    description += ` The heart reveals ${middleNotes}, forming an elegant and well-balanced core.`;
  }

  if (baseNotes) {
    description += ` Finally, it settles into a warm base of ${baseNotes}, leaving a memorable trail.`;
  }

  if (accords) {
    description += ` Characterized by ${accords} accords, this composition offers a refined scent experience for discerning enthusiasts.`;
  } else {
    description += ` This masterful composition offers a refined scent experience for discerning enthusiasts.`;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Overview
      </Typography>
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.7,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FragranceDescription;
