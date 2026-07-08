import React from "react";
import { Typography, Box, Paper, useTheme } from "@mui/material";
import { humanizeName } from "../../utils/humanizeName";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CelebrationIcon from "@mui/icons-material/Celebration";

const FragranceDescription = ({ fragrance }) => {
  const theme = useTheme();
  const description = fragrance?.description || "No description available.";
  // Build a rich natural‑language description from fragrance data
  /*
  const description = useMemo(() => {
    if (!fragrance) return "No description available.";

    const {
      brand_name,
      name,
      perfumers,
      release_year,
      country,
      type_name = "Eau de Parfum",
      notes = {},
      accords = [],
      gender_profile = "Unisex",
      seasons = [],
      occasions = [],
    } = fragrance;

    const topNotes = fragrance.notes?.top?.map((n) => n.name) || [];
    const middleNotes = fragrance.notes?.middle?.map((n) => n.name) || [];
    const baseNotes = fragrance.notes?.base?.map((n) => n.name) || [];
    const accordNames = accords.map((a) => a.name);

    const formatNotes = (notesArr) => {
      if (!notesArr.length) return null;
      const humanized = notesArr.map((n) => humanizeName(n));
      if (humanized.length === 1) return humanized[0];
      if (humanized.length === 2) return humanized.join(" and ");
      return (
        humanized.slice(0, -1).join(", ") +
        ", and " +
        humanized[humanized.length - 1]
      );
    };

    const parts = [];
    let opening = `${humanizeName(name)} by ${humanizeName(brand_name)}`;
    if (release_year) opening += `, launched in ${release_year}`;
    if (perfumers?.length > 0) {
      const perfNames = perfumers.map((p) => humanizeName(p.name)).join(", ");
      opening += `, crafted by ${perfNames}`;
    }
    if (country) opening += ` in ${country}`;
    parts.push(opening + ".");

    const genderText = humanizeName(gender_profile.toLowerCase());
    const typeText = humanizeName(type_name);
    parts.push(
      `This ${genderText} ${typeText} presents a sophisticated blend that evolves beautifully over time.`,
    );

    const topStr = formatNotes(topNotes);
    const midStr = formatNotes(middleNotes);
    const baseStr = formatNotes(baseNotes);
    if (topStr)
      parts.push(
        `It opens with ${topStr}, creating an inviting first impression.`,
      );
    if (midStr)
      parts.push(
        `The heart reveals ${midStr}, developing into a complex and engaging character.`,
      );
    if (baseStr)
      parts.push(
        `Finally, it settles into a warm base of ${baseStr}, leaving a memorable trail that lingers.`,
      );

    if (accordNames.length > 0) {
      const mainAccords = accordNames.slice(0, 3).map((a) => humanizeName(a));
      const accordText =
        mainAccords.length === 1
          ? mainAccords[0]
          : mainAccords.length === 2
            ? mainAccords.join(" and ")
            : mainAccords.slice(0, -1).join(", ") +
              ", and " +
              mainAccords[mainAccords.length - 1];
      parts.push(
        `Characterized by ${accordText.toLowerCase()} accords, this composition offers a refined and distinctive scent profile.`,
      );
    }

    const seasonNames = seasons.map((s) => s.name.toLowerCase()).join(", ");
    const occasionNames = occasions.map((o) => o.name.toLowerCase()).join(", ");
    if (seasonNames && occasionNames)
      parts.push(
        `Ideal for ${seasonNames} wear and ${occasionNames} occasions.`,
      );
    else if (seasonNames) parts.push(`Perfect for ${seasonNames} seasons.`);
    else if (occasionNames)
      parts.push(`Well-suited for ${occasionNames} occasions.`);

    const finals = [
      "A sophisticated choice for the discerning fragrance enthusiast.",
      "An elegant scent that makes a lasting impression.",
      "A refined fragrance that balances complexity with wearability.",
      "A distinctive composition that stands out with subtle confidence.",
    ];
    parts.push(finals[Math.floor(Math.random() * finals.length)]);
    return parts.join(" ");
  }, [fragrance]);
  */
  return (
    <Box>
      {fragrance && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 2,
            justifyContent: "center",
          }}
        >
          {fragrance.release_year && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.action.hover}, transparent)`,
              }}
            >
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2">{fragrance.release_year}</Typography>
            </Paper>
          )}
          {fragrance.perfumers?.length > 0 && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.action.hover}, transparent)`,
              }}
            >
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {fragrance.perfumers
                  .map((p) => humanizeName(p.name))
                  .join(", ")}
              </Typography>
            </Paper>
          )}
          {fragrance.country && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.action.hover}, transparent)`,
              }}
            >
              <PublicIcon fontSize="small" color="action" />
              <Typography variant="body2">{fragrance.country}</Typography>
            </Paper>
          )}
          {fragrance.type_name && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.action.hover}, transparent)`,
              }}
            >
              <LocalOfferIcon fontSize="small" color="action" />
              <Typography variant="body2">{fragrance.type_name}</Typography>
            </Paper>
          )}
          {fragrance.seasons?.length > 0 && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.action.hover}, transparent)`,
              }}
            >
              <WbSunnyIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {fragrance.seasons.map((s) => s.name.toLowerCase()).join(", ")}
              </Typography>
            </Paper>
          )}
          {fragrance.occasions?.length > 0 && (
            <Paper
              variant="outlined"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                background: `linear-gradient(135deg, ${theme.palette.action.hover}, transparent)`,
              }}
            >
              <CelebrationIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {fragrance.occasions
                  .map((o) => o.name.toLowerCase())
                  .join(", ")}
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        ✨ Overview
      </Typography>
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1.9,
          color: "text.secondary",
          fontSize: "0.95rem",
          fontStyle: "italic",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FragranceDescription;
