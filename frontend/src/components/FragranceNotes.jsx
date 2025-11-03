import React from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Chip,
  Stack,
  Tooltip,
  Button,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { humanizeName } from "../utils/humanizeName";

// Note type to emoji mapping
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
  const noteLower = note.toLowerCase();
  for (const [key, emoji] of Object.entries(noteEmojis)) {
    if (noteLower === key || noteLower.includes(key)) return emoji;
  }
  return noteEmojis.default;
};

const FragranceNotes = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!fragrance) return null;

  const { topNotes, middleNotes, baseNotes } = fragrance;

  const NoteSection = ({ title, notes, color = "primary" }) => {
    if (!notes || notes.length === 0) return null;

    return (
      <Grid item xs={12} sm={4}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            color={color}
            fontWeight="600"
            gutterBottom
            sx={{
              fontSize: "0.9rem",
              mb: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {title}
            <Typography
              component="span"
              variant="caption"
              sx={{
                backgroundColor: theme.palette[color].light,
                color: theme.palette[color].dark,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: "0.7rem",
                fontWeight: "bold",
              }}
            >
              {notes.length}
            </Typography>
          </Typography>

          {/* Compact horizontal chip layout */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {notes.map((note, index) => (
              <Tooltip key={index} title={humanizeName(note)} arrow>
                <Chip
                  size="small"
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <span style={{ fontSize: "0.7rem" }}>
                        {getNoteEmoji(note)}
                      </span>
                      <span style={{ fontSize: "0.7rem" }}>
                        {humanizeName(note)}
                      </span>
                    </Box>
                  }
                  variant="outlined"
                  sx={{
                    height: 24,
                    mb: 0.5,
                    borderColor: theme.palette[color].light,
                    backgroundColor: theme.palette.background.paper,
                    "& .MuiChip-label": {
                      px: 0.75,
                      py: 0.25,
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Grid>
    );
  };

  // Performance metrics component
  const PerformanceSection = () => (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
          📊 Performance
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Projection
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {fragrance.intensity || "Information not available"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Longevity
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {fragrance.longevity || "Information not available"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1.5 }} />

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            gutterBottom
          >
            📅 Ideal For
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="500">
                Season
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {fragrance.season || "All seasons"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="500">
                Occasion
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {fragrance.occasion || "Versatile"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );

  // Action buttons component - USING THE WORKING VERSION
  const ActionButtons = () => (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 3,
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      {fragrance.sourceUrl && (
        <Button
          variant="outlined"
          size={isMobile ? "medium" : "large"}
          href={fragrance.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<span>📖</span>}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 auto" } }}
        >
          Fragrantica Reviews
        </Button>
      )}

      <Button
        variant="contained"
        size={isMobile ? "medium" : "large"}
        href={`https://www.google.com/search?q=where+to+buy+${encodeURIComponent(
          `${humanizeName(fragrance.brand)} ${humanizeName(fragrance.name)}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<span>🛒</span>}
        sx={{ flex: { xs: "1 1 100%", sm: "0 1 auto" } }}
      >
        Where to Buy
      </Button>
    </Box>
  );

  return (
    <Box>
      {/* Fragrance Notes Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: "1rem",
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
          }}
        >
          🎵 Fragrance Notes
        </Typography>

        <Grid container spacing={2}>
          <NoteSection title="Top Notes" notes={topNotes} color="primary" />

          <NoteSection
            title="Heart Notes"
            notes={middleNotes}
            color="secondary"
          />

          <NoteSection title="Base Notes" notes={baseNotes} color="success" />
        </Grid>
      </Box>

      {/* Performance & Actions Section */}
      <Box>
        <PerformanceSection />
        <ActionButtons />
      </Box>
    </Box>
  );
};

export default FragranceNotes;
