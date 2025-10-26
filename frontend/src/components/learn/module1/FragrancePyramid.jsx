import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Fade,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const pyramidData = [
  {
    level: "top",
    title: "Top Notes",
    duration: "5-15 minutes",
    role: "First impression - evaporates quickly",
    description:
      "The light, fresh notes that greet you immediately after application. These are the most volatile and create the initial scent impression.",
    color: "#FFD93D", // Yellow - matches Citrus
    examples: [
      "Citrus",
      "Light Fruits",
      "Herbs",
      "Bergamot",
      "Lemon",
      "Grapefruit",
    ],
    characteristics: [
      "Volatile",
      "Quick-evaporating",
      "Fresh",
      "Attention-grabbing",
    ],
  },
  {
    level: "middle",
    title: "Middle Notes",
    duration: "20-60 minutes",
    role: "Heart of the fragrance - lasts several hours",
    description:
      "The main character that appears as top notes fade. These form the core identity of the fragrance and provide balance.",
    color: "#FF6B9D", // Pink - matches Floral
    examples: [
      "Florals",
      "Spices",
      "Green Notes",
      "Lavender",
      "Rose",
      "Jasmine",
    ],
    characteristics: ["Balanced", "Lasting", "Harmonious", "Defining"],
  },
  {
    level: "base",
    title: "Base Notes",
    duration: "2+ hours",
    role: "Foundation - provides depth and longevity",
    description:
      "The rich, deep notes that emerge last and linger the longest. These fix the fragrance to your skin and create lasting memories.",
    color: "#A55C1B", // Brown - matches Woody
    examples: ["Woods", "Musk", "Vanilla", "Amber", "Sandalwood", "Patchouli"],
    characteristics: ["Long-lasting", "Deep", "Warm", "Anchoring"],
  },
];

export default function FragrancePyramid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeLevel, setActiveLevel] = useState("top");
  const [expandedLevel, setExpandedLevel] = useState("top");

  const handleLevelClick = (level) => {
    setActiveLevel(level);
    setExpandedLevel(level);
  };

  return (
    <Box mb={6}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Interactive Fragrance Pyramid
      </Typography>

      <Paper
        sx={{
          p: isMobile ? 2 : 3,
          mb: 4,
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        {/* Single Triangle Pyramid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: isMobile ? 250 : 300,
              height: isMobile ? 200 : 250,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {/* Main Triangle Container */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            />

            {/* Dividing Lines */}
            <Box
              sx={{
                position: "absolute",
                top: "33%",
                left: "16.5%",
                width: "67%",
                height: "2px",
                backgroundColor: theme.palette.divider,
                transform: "rotate(-30deg)",
                transformOrigin: "left center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "66%",
                left: "33%",
                width: "67%",
                height: "2px",
                backgroundColor: theme.palette.divider,
                transform: "rotate(-30deg)",
                transformOrigin: "left center",
              }}
            />

            {/* Interactive Sections */}
            {/* Top Notes Section */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "67%",
                height: "33%",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                backgroundColor:
                  activeLevel === "top"
                    ? alpha(pyramidData[0].color, 0.7)
                    : alpha(pyramidData[0].color, 0.25),
                transition: "all 0.3s ease",
                border:
                  activeLevel === "top"
                    ? `2px solid ${pyramidData[0].color}`
                    : `1px solid ${alpha(pyramidData[0].color, 0.3)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: activeLevel === "top" ? "white" : pyramidData[0].color,
                fontWeight: "bold",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                "&:hover": {
                  backgroundColor: alpha(pyramidData[0].color, 0.5),
                },
              }}
              onClick={() => handleLevelClick("top")}
            >
              Top Notes
            </Box>

            {/* Middle Notes Section */}
            <Box
              sx={{
                position: "absolute",
                top: "33%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "134%",
                height: "33%",
                clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                backgroundColor:
                  activeLevel === "middle"
                    ? alpha(pyramidData[1].color, 0.7)
                    : alpha(pyramidData[1].color, 0.25),
                transition: "all 0.3s ease",
                border:
                  activeLevel === "middle"
                    ? `2px solid ${pyramidData[1].color}`
                    : `1px solid ${alpha(pyramidData[1].color, 0.3)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color:
                  activeLevel === "middle" ? "white" : pyramidData[1].color,
                fontWeight: "bold",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                "&:hover": {
                  backgroundColor: alpha(pyramidData[1].color, 0.5),
                },
              }}
              onClick={() => handleLevelClick("middle")}
            >
              Middle Notes
            </Box>

            {/* Base Notes Section */}
            <Box
              sx={{
                position: "absolute",
                top: "66%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "200%",
                height: "34%",
                clipPath: "polygon(16.5% 0%, 83.5% 0%, 100% 100%, 0% 100%)",
                backgroundColor:
                  activeLevel === "base"
                    ? alpha(pyramidData[2].color, 0.7)
                    : alpha(pyramidData[2].color, 0.25),
                transition: "all 0.3s ease",
                border:
                  activeLevel === "base"
                    ? `2px solid ${pyramidData[2].color}`
                    : `1px solid ${alpha(pyramidData[2].color, 0.3)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: activeLevel === "base" ? "white" : pyramidData[2].color,
                fontWeight: "bold",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                "&:hover": {
                  backgroundColor: alpha(pyramidData[2].color, 0.5),
                },
              }}
              onClick={() => handleLevelClick("base")}
            >
              Base Notes
            </Box>
          </Box>

          {/* Legend */}
          <Box
            display="flex"
            gap={isMobile ? 2 : 3}
            flexWrap="wrap"
            justifyContent="center"
            mt={3}
          >
            {pyramidData.map((level) => (
              <Box key={level.level} display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: isMobile ? 12 : 16,
                    height: isMobile ? 12 : 16,
                    backgroundColor: level.color,
                    borderRadius: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="500"
                  fontSize={isMobile ? "0.8rem" : "0.875rem"}
                >
                  {level.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Detailed Level Information */}
        <Fade in={!!expandedLevel} timeout={500}>
          <Box>
            {pyramidData.map(
              (level) =>
                expandedLevel === level.level && (
                  <Card
                    key={level.level}
                    sx={{
                      borderLeft: 4,
                      borderColor: level.color,
                      backgroundColor: alpha(level.color, 0.05),
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Box sx={{ color: level.color, mr: 2 }}>
                          <AccessTime />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: level.color,
                              fontWeight: "bold",
                              fontSize: isMobile ? "1.1rem" : "1.25rem",
                            }}
                          >
                            {level.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontSize={isMobile ? "0.8rem" : "0.875rem"}
                          >
                            {level.duration} •{" "}
                            {level.characteristics.join(" • ")}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body1"
                        paragraph
                        color="text.primary"
                        fontSize={isMobile ? "0.9rem" : "1rem"}
                        sx={{ lineHeight: 1.6 }}
                      >
                        {level.description}
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid xs={12} md={6}>
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                              fontWeight: "bold",
                              color: "text.primary",
                              fontSize: isMobile ? "0.8rem" : "0.875rem",
                            }}
                          >
                            Common Examples:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {level.examples.map((example) => (
                              <Chip
                                key={example}
                                label={example}
                                size="small"
                                sx={{
                                  backgroundColor: alpha(level.color, 0.2),
                                  color: level.color,
                                  border: `1px solid ${alpha(
                                    level.color,
                                    0.3
                                  )}`,
                                  fontWeight: "500",
                                  fontSize: isMobile ? "0.7rem" : "0.75rem",
                                  height: isMobile ? 24 : 28,
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                              fontWeight: "bold",
                              color: "text.primary",
                              fontSize: isMobile ? "0.8rem" : "0.875rem",
                            }}
                          >
                            Characteristics:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {level.characteristics.map((char) => (
                              <Chip
                                key={char}
                                label={char}
                                variant="outlined"
                                size="small"
                                sx={{
                                  borderColor: level.color,
                                  color: level.color,
                                  fontSize: isMobile ? "0.7rem" : "0.75rem",
                                  height: isMobile ? 24 : 28,
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )
            )}
          </Box>
        </Fade>

        {!expandedLevel && (
          <Paper
            sx={{
              p: isMobile ? 2 : 3,
              textAlign: "center",
              backgroundColor: "action.hover",
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize={isMobile ? "0.9rem" : "1rem"}
            >
              Click on a pyramid section to learn more about each note type
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
