import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { humanizeName } from "../../utils/humanizeName";

// Emoji mapping for common notes
const noteEmojis = {
  lemon: "🍋",
  orange: "🍊",
  bergamot: "🍋",
  grapefruit: "🍊",
  apple: "🍎",
  peach: "🍑",
  berry: "🫐",
  strawberry: "🍓",
  rose: "🌹",
  jasmine: "🌸",
  lily: "💮",
  lavender: "🪻",
  wood: "🪵",
  cedar: "🌲",
  sandalwood: "🪵",
  vetiver: "🌾",
  patchouli: "🍃",
  oud: "🪵",
  amber: "🟠",
  cinnamon: "🌰",
  pepper: "🌶️",
  cardamom: "🫚",
  vanilla: "🍦",
  caramel: "🍯",
  chocolate: "🍫",
  honey: "🍯",
  grass: "🌿",
  tea: "🍵",
  mint: "🌱",
  musk: "🪶",
  leather: "🧥",
  tobacco: "🚬",
  default: "✨",
};

const getNoteEmoji = (note) => {
  const n = note.toLowerCase();
  for (const [key, emoji] of Object.entries(noteEmojis)) {
    if (n === key || n.includes(key)) return emoji;
  }
  return noteEmojis.default;
};

// Reusable section for top/heart/base notes
const NoteSection = ({ title, notes, color, isMobile, theme }) => {
  if (!notes?.length) return null;

  return (
    <Box sx={{ mb: 1, width: "100%", textAlign: "center" }}>
      {/* Section title with note count */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography
          variant="subtitle2"
          fontWeight="600"
          color={color}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: isMobile ? "0.85rem" : "0.9rem",
          }}
        >
          {title}
          <Typography
            component="span"
            variant="caption"
            sx={{
              backgroundColor: theme.palette[color].light,
              color: theme.palette[color].dark,
              px: 0.6,
              py: 0.15,
              borderRadius: 1,
              fontSize: "0.65rem",
              fontWeight: "bold",
            }}
          >
            {notes.length}
          </Typography>
        </Typography>
      </Box>

      {/* Notes grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill, minmax(85px, 1fr))"
            : "repeat(6, 1fr)",
          gap: isMobile ? 0.75 : 1.25,
          justifyItems: "center",
          width: "100%",
          maxWidth: 700,
          mx: "auto",
        }}
      >
        {notes.map((note, index) => (
          <Tooltip key={index} title={humanizeName(note)} arrow>
            <Box
              sx={{
                width: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette[color].light}40`,
                borderRadius: 2,
                p: isMobile ? 1 : 1.5,
                minHeight: isMobile ? 70 : 90,
                cursor: "pointer",
                transition: "0.2s ease",
                "&:hover": {
                  backgroundColor: theme.palette[color].light + "20",
                  borderColor: theme.palette[color].light,
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {getNoteEmoji(note)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? "0.7rem" : "0.75rem",
                  textAlign: "center",
                  lineHeight: 1.2,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {humanizeName(note)}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

const FragranceNotes = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!fragrance) return null;

  const topNotes = fragrance.notes?.top?.map((n) => n.name) || [];
  const middleNotes = fragrance.notes?.middle?.map((n) => n.name) || [];
  const baseNotes = fragrance.notes?.base?.map((n) => n.name) || [];

  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{
          mb: 3,
          fontSize: isMobile ? "0.9rem" : "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        🎵 Fragrance Notes
      </Typography>
      <NoteSection
        title="Top Notes"
        notes={topNotes}
        color="primary"
        isMobile={isMobile}
        theme={theme}
      />
      <NoteSection
        title="Heart Notes"
        notes={middleNotes}
        color="secondary"
        isMobile={isMobile}
        theme={theme}
      />
      <NoteSection
        title="Base Notes"
        notes={baseNotes}
        color="success"
        isMobile={isMobile}
        theme={theme}
      />
    </Box>
  );
};

export default FragranceNotes;
