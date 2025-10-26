import { useState, useEffect } from "react";
import { Box, Typography, Paper, Slider, Fade, useTheme } from "@mui/material";
import { Waves, Person } from "@mui/icons-material";

const sillageData = [
  {
    level: 1,
    label: "Intimate",
    radius: 80,
    color: "#e3f2fd",
    trail: 1,
    desc: "Only detectable very close to skin",
  },
  {
    level: 2,
    label: "Personal",
    radius: 120,
    color: "#bbdefb",
    trail: 2,
    desc: "Creates a personal scent bubble",
  },
  {
    level: 3,
    label: "Social",
    radius: 180,
    color: "#90caf9",
    trail: 3,
    desc: "Noticeable in social settings",
  },
  {
    level: 4,
    label: "Room",
    radius: 240,
    color: "#64b5f6",
    trail: 4,
    desc: "Fills the room when you enter",
  },
  {
    level: 5,
    label: "Enormous",
    radius: 300,
    color: "#42a5f5",
    trail: 5,
    desc: "Leaves a strong trail that lingers",
  },
];

export default function SillageVisualizer() {
  const theme = useTheme();
  const [sillageLevel, setSillageLevel] = useState(3);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    const timer = setTimeout(() => setAnimated(false), 1000);
    return () => clearTimeout(timer);
  }, [sillageLevel]);

  const currentSillage = sillageData[sillageLevel - 1];

  return (
    <Paper
      sx={{
        p: 4,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: theme.palette.text.primary,
        }}
      >
        <Waves /> Sillage Visualizer
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 3,
          color: theme.palette.text.secondary,
        }}
      >
        See how your fragrance travels through space. Adjust the slider to
        visualize different sillage intensities.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "center",
        }}
      >
        {/* Visualization - Fixed Container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 320, // Fixed height to prevent layout shifts
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 320, // Fixed container size
              height: 320,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Person - Always centered */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
              }}
            >
              <Person
                sx={{
                  fontSize: 40,
                  color: theme.palette.primary.main,
                }}
              />
            </Box>

            {/* Sillage circles - centered around person */}
            {[...Array(currentSillage.trail)].map((_, index) => (
              <Fade in={true} timeout={800} key={index}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: currentSillage.radius - index * 30,
                    height: currentSillage.radius - index * 30,
                    borderRadius: "50%",
                    border: `2px dashed ${currentSillage.color}`,
                    opacity: 0.7 - index * 0.15,
                    animation: `ripple 3s infinite ${index * 0.5}s`,
                    "@keyframes ripple": {
                      "0%": {
                        transform: "translate(-50%, -50%) scale(0.8)",
                        opacity: 0.7,
                      },
                      "50%": {
                        transform: "translate(-50%, -50%) scale(1.1)",
                        opacity: 0.4,
                      },
                      "100%": {
                        transform: "translate(-50%, -50%) scale(0.8)",
                        opacity: 0.7,
                      },
                    },
                  }}
                />
              </Fade>
            ))}

            {/* Main sillage area */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: currentSillage.radius,
                height: currentSillage.radius,
                borderRadius: "50%",
                backgroundColor: currentSillage.color,
                opacity: 0.2,
                transition: "all 0.5s ease",
                animation: animated ? "pulseGlow 2s ease-in-out" : "none",
                "@keyframes pulseGlow": {
                  "0%": { opacity: 0.2 },
                  "50%": { opacity: 0.3 },
                  "100%": { opacity: 0.2 },
                },
              }}
            />
          </Box>
        </Box>

        {/* Controls */}
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{ color: theme.palette.text.primary }}
          >
            {currentSillage.label} Sillage
          </Typography>

          <Slider
            value={sillageLevel}
            onChange={(e, newValue) => setSillageLevel(newValue)}
            min={1}
            max={5}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{
              mb: 3,
              color: theme.palette.primary.main,
            }}
          />

          <Paper
            sx={{
              p: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : theme.palette.grey[50],
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: theme.palette.text.secondary,
              }}
            >
              {currentSillage.desc}
            </Typography>
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              <strong>Best for:</strong>{" "}
              {sillageLevel <= 2
                ? "office, intimate settings"
                : sillageLevel === 3
                ? "social gatherings, dates"
                : sillageLevel === 4
                ? "evening events, parties"
                : "large events, outdoor activities"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
