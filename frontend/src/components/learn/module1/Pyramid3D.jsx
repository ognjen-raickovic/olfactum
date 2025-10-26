import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Fade,
  Card,
  CardContent,
} from "@mui/material";

const pyramidLevels = [
  {
    level: "top",
    title: "Top Notes",
    duration: "5-15 minutes",
    role: "First impression - evaporates quickly",
    description:
      "The light, fresh notes that greet you immediately after application",
    color: "#ff6b6b",
    examples: [
      { name: "Citrus", notes: "Bergamot, Lemon, Orange, Grapefruit" },
      { name: "Light Fruits", notes: "Apple, Peach, Raspberry, Melon" },
      { name: "Herbs", notes: "Basil, Mint, Rosemary, Lavender" },
      { name: "Aromatic", notes: "Eucalyptus, Anise, Tarragon" },
    ],
  },
  {
    level: "middle",
    title: "Middle Notes",
    duration: "20-60 minutes",
    role: "Heart of the fragrance - lasts several hours",
    description: "The main character that appears as top notes fade",
    color: "#4ecdc4",
    examples: [
      { name: "Florals", notes: "Rose, Jasmine, Lily, Gardenia" },
      { name: "Spices", notes: "Cinnamon, Clove, Cardamom, Pepper" },
      { name: "Green Notes", notes: "Grass, Leaves, Green Tea" },
      { name: "Fruity", notes: "Peach, Apple, Berry, Tropical Fruits" },
    ],
  },
  {
    level: "base",
    title: "Base Notes",
    duration: "2+ hours",
    role: "Foundation - provides depth and longevity",
    description: "The rich, deep notes that emerge last and linger the longest",
    color: "#45b7d1",
    examples: [
      { name: "Woods", notes: "Sandalwood, Cedar, Patchouli, Vetiver" },
      { name: "Musk", notes: "Animalic, Clean, Skin-like scents" },
      { name: "Oriental", notes: "Vanilla, Amber, Resins, Benzoin" },
      { name: "Leather", notes: "Tobacco, Smoke, Birch Tar" },
    ],
  },
];

export default function Pyramid3D() {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

  const handleLevelHover = (level) => {
    setHoveredLevel(level);
    setActiveLevel(level);
  };

  const handleLevelLeave = () => {
    setHoveredLevel(null);
  };

  return (
    <Box mb={6}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Interactive Fragrance Pyramid
      </Typography>

      <Grid container spacing={4} alignItems="flex-end">
        {/* 3D Pyramid Visualization */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
          >
            {/* Base Notes - Largest */}
            <Paper
              sx={{
                width: 280,
                height: 100,
                backgroundColor:
                  activeLevel === "base" ? "#45b7d1" : "#45b7d133",
                border: `2px solid #45b7d1`,
                transition: "all 0.3s ease",
                transform: activeLevel === "base" ? "scale(1.05)" : "scale(1)",
                boxShadow: activeLevel === "base" ? 4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: activeLevel === "base" ? "white" : "#45b7d1",
                fontWeight: "bold",
                zIndex: 1,
              }}
              onMouseEnter={() => handleLevelHover("base")}
              onMouseLeave={handleLevelLeave}
              onClick={() => setActiveLevel("base")}
            >
              Base Notes
            </Paper>

            {/* Middle Notes - Medium */}
            <Paper
              sx={{
                width: 200,
                height: 80,
                backgroundColor:
                  activeLevel === "middle" ? "#4ecdc4" : "#4ecdc433",
                border: `2px solid #4ecdc4`,
                transition: "all 0.3s ease",
                transform:
                  activeLevel === "middle" ? "scale(1.05)" : "scale(1)",
                boxShadow: activeLevel === "middle" ? 4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: activeLevel === "middle" ? "white" : "#4ecdc4",
                fontWeight: "bold",
                marginBottom: -2,
                zIndex: 2,
              }}
              onMouseEnter={() => handleLevelHover("middle")}
              onMouseLeave={handleLevelLeave}
              onClick={() => setActiveLevel("middle")}
            >
              Middle Notes
            </Paper>

            {/* Top Notes - Smallest */}
            <Paper
              sx={{
                width: 120,
                height: 60,
                backgroundColor:
                  activeLevel === "top" ? "#ff6b6b" : "#ff6b6b33",
                border: `2px solid #ff6b6b`,
                transition: "all 0.3s ease",
                transform: activeLevel === "top" ? "scale(1.05)" : "scale(1)",
                boxShadow: activeLevel === "top" ? 4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: activeLevel === "top" ? "white" : "#ff6b6b",
                fontWeight: "bold",
                marginBottom: -2,
                zIndex: 3,
              }}
              onMouseEnter={() => handleLevelHover("top")}
              onMouseLeave={handleLevelLeave}
              onClick={() => setActiveLevel("top")}
            >
              Top Notes
            </Paper>
          </Box>
        </Grid>

        {/* Information Panel */}
        <Grid item xs={12} md={6}>
          <Fade in={!!activeLevel} timeout={500}>
            <Box>
              {activeLevel ? (
                <Card
                  sx={{
                    borderLeft: 4,
                    borderColor: pyramidLevels.find(
                      (l) => l.level === activeLevel
                    )?.color,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      color={
                        pyramidLevels.find((l) => l.level === activeLevel)
                          ?.color
                      }
                    >
                      {
                        pyramidLevels.find((l) => l.level === activeLevel)
                          ?.title
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <strong>Duration:</strong>{" "}
                      {
                        pyramidLevels.find((l) => l.level === activeLevel)
                          ?.duration
                      }
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <strong>Role:</strong>{" "}
                      {pyramidLevels.find((l) => l.level === activeLevel)?.role}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {
                        pyramidLevels.find((l) => l.level === activeLevel)
                          ?.description
                      }
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Common Examples:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {pyramidLevels
                        .find((l) => l.level === activeLevel)
                        ?.examples.map((example, index) => (
                          <Chip
                            key={index}
                            label={example.name}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: pyramidLevels.find(
                                (l) => l.level === activeLevel
                              )?.color,
                              color: pyramidLevels.find(
                                (l) => l.level === activeLevel
                              )?.color,
                            }}
                          />
                        ))}
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Paper sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
                  <Typography variant="body1" color="text.secondary">
                    Hover over or click on a pyramid level to learn more about
                    each note type
                  </Typography>
                </Paper>
              )}
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
