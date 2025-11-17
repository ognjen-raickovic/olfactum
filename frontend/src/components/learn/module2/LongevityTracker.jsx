import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Slider,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Stack,
  Fade,
  Slide,
  Zoom,
  styled,
} from "@mui/material";
import {
  AccessTime,
  Thermostat,
  Spa,
  Psychology,
  Whatshot,
  Adjust,
} from "@mui/icons-material";

// Custom scrollbar styles
const StyledBox = styled(Box)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark,
  },
}));

const longevityData = [
  {
    level: 1,
    label: "Very Short",
    hours: "1-3",
    color: "#ff6b6b",
    tip: "Best for quick outings",
  },
  {
    level: 2,
    label: "Short",
    hours: "3-5",
    color: "#ffa726",
    tip: "Ideal for work days",
  },
  {
    level: 3,
    label: "Moderate",
    hours: "5-7",
    color: "#ffd54f",
    tip: "Perfect for day to evening",
  },
  {
    level: 4,
    label: "Long",
    hours: "7-9",
    color: "#4db6ac",
    tip: "Great for special events",
  },
  {
    level: 5,
    label: "Very Long",
    hours: "9-12",
    color: "#81c784",
    tip: "Lasts all day and night",
  },
  {
    level: 6,
    label: "Extreme",
    hours: "12+",
    color: "#66bb6a",
    tip: "Exceptional staying power",
  },
];

const factors = [
  {
    icon: <Spa />,
    name: "Skin Type",
    impact: "High",
    desc: "Oily skin holds fragrance longer",
    effect: +1,
    details:
      "Oily skin provides more lipids for fragrance molecules to bind to, extending longevity.",
  },
  {
    icon: <Thermostat />,
    name: "Weather",
    impact: "Medium",
    desc: "Heat intensifies but shortens lifespan",
    effect: -1,
    details:
      "Higher temperatures increase evaporation rate, reducing how long fragrance lasts.",
  },
  {
    icon: <Psychology />,
    name: "Application",
    impact: "High",
    desc: "Pulse points increase longevity",
    effect: +1,
    details:
      "Warm pulse points (wrists, neck) help diffuse fragrance slowly throughout the day.",
  },
  {
    icon: <Whatshot />,
    name: "Notes",
    impact: "High",
    desc: "Base notes last much longer",
    effect: +2,
    details:
      "Base notes like woods, musk, and amber evaporate slowly, providing lasting power.",
  },
];

export default function LongevityTracker() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [longevityLevel, setLongevityLevel] = useState(3);
  const [activeFactors, setActiveFactors] = useState([0, 2]);
  const [activeTab, setActiveTab] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  const currentLongevity = longevityData[longevityLevel - 1];

  const toggleFactor = (index) => {
    setActiveFactors((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const calculateAdjustedLongevity = () => {
    let adjustment = 0;
    activeFactors.forEach((factorIndex) => {
      adjustment += factors[factorIndex].effect;
    });
    return Math.max(1, Math.min(6, longevityLevel + adjustment));
  };

  const handleTabChange = (newValue) => {
    const direction = newValue > activeTab ? "left" : "right";
    setSlideDirection(direction);
    setActiveTab(newValue);
  };

  const adjustedLevel = calculateAdjustedLongevity();
  const adjustedLongevity = longevityData[adjustedLevel - 1];

  // Mobile-optimized layout with swipe-like transitions
  if (isMobile) {
    return (
      <Paper
        sx={{
          p: 3,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
          minHeight: 650,
          width: "100%",
          boxSizing: "border-box",
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
            justifyContent: "center",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          <AccessTime sx={{ fontSize: { xs: 20, sm: 24 } }} /> Longevity
          Calculator
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: theme.palette.text.secondary,
            textAlign: "center",
            fontSize: { xs: "0.875rem", sm: "0.9rem" },
          }}
        >
          See how factors affect your fragrance's staying power
        </Typography>

        {/* Tabs for Mobile */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => handleTabChange(newValue)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab
            label="Longevity"
            icon={<AccessTime />}
            iconPosition="start"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          />
          <Tab
            label="Factors"
            icon={<Adjust />}
            iconPosition="start"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          />
        </Tabs>

        {/* Tab Content with Slide Transitions */}
        <StyledBox
          sx={{
            position: "relative",
            minHeight: 500,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Slide
            direction={slideDirection}
            in={activeTab === 0}
            mountOnEnter
            unmountOnExit
            timeout={400}
          >
            <Box sx={{ position: "absolute", width: "100%", px: 1 }}>
              {/* Base Longevity */}
              <Box sx={{ textAlign: "center", mb: 4, pt: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 2,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  Base Longevity
                </Typography>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: currentLongevity.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    transition: "all 0.3s ease",
                    boxShadow: `0 4px 20px ${currentLongevity.color}40`,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {currentLongevity.hours}
                  </Typography>
                </Box>
                <Box sx={{ minHeight: 50 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: currentLongevity.color,
                      mb: 0.5,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    {currentLongevity.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontStyle: "italic",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {currentLongevity.tip}
                  </Typography>
                </Box>
              </Box>

              {/* Slider */}
              <Box
                sx={{
                  width: "100%",
                  mb: 4,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "95%",
                    maxWidth: 400,
                  }}
                >
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                      textAlign: "center",
                      fontSize: { xs: "0.875rem", sm: "0.9rem" },
                    }}
                  >
                    Adjust base longevity:
                  </Typography>
                  <Slider
                    value={longevityLevel}
                    onChange={(e, newValue) => setLongevityLevel(newValue)}
                    min={1}
                    max={6}
                    step={1}
                    marks={[
                      { value: 1, label: "1-3h" },
                      { value: 2, label: "3-5h" },
                      { value: 3, label: "5-7h" },
                      { value: 4, label: "7-9h" },
                      { value: 5, label: "9-12h" },
                      { value: 6, label: "12+h" },
                    ]}
                    valueLabelDisplay="auto"
                    sx={{
                      "& .MuiSlider-markLabel": {
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Adjusted Longevity */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 2,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  Adjusted Longevity
                </Typography>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: adjustedLongevity.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    transition: "all 0.3s ease",
                    boxShadow: `0 4px 20px ${adjustedLongevity.color}40`,
                    animation:
                      activeFactors.length > 0
                        ? "pulse 2s ease-in-out infinite"
                        : "none",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {adjustedLongevity.hours}
                  </Typography>
                </Box>
                <Box sx={{ minHeight: 50 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: adjustedLongevity.color,
                      mb: 0.5,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    {adjustedLongevity.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontStyle: "italic",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {activeFactors.length > 0
                      ? `${activeFactors.length} factor${
                          activeFactors.length > 1 ? "s" : ""
                        } applied`
                      : "No factors applied"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Slide>

          <Slide
            direction={slideDirection}
            in={activeTab === 1}
            mountOnEnter
            unmountOnExit
            timeout={400}
          >
            <Box sx={{ position: "absolute", width: "100%", px: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  mb: 3,
                  color: theme.palette.text.primary,
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                Adjust Factors
              </Typography>

              <Stack spacing={2}>
                {factors.map((factor, index) => (
                  <Card
                    key={index}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: activeFactors.includes(index)
                        ? "scale(0.98)"
                        : "none",
                      boxShadow: activeFactors.includes(index) ? 2 : 1,
                      border: activeFactors.includes(index)
                        ? `2px solid ${currentLongevity.color}`
                        : `1px solid ${theme.palette.divider}`,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[800]
                          : theme.palette.background.paper,
                      minHeight: 120,
                    }}
                    onClick={() => toggleFactor(index)}
                  >
                    <CardContent sx={{ p: 2, textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            color: activeFactors.includes(index)
                              ? currentLongevity.color
                              : theme.palette.text.secondary,
                          }}
                        >
                          {factor.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: { xs: "0.9rem", sm: "1rem" },
                              color: theme.palette.text.primary,
                            }}
                          >
                            {factor.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={`${factor.effect > 0 ? "+" : ""}${
                            factor.effect
                          }`}
                          size="small"
                          color={factor.effect > 0 ? "success" : "error"}
                          variant={
                            activeFactors.includes(index)
                              ? "filled"
                              : "outlined"
                          }
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                          mb: 1,
                        }}
                      >
                        {factor.desc}
                      </Typography>

                      {activeFactors.includes(index) && (
                        <Fade in={true} timeout={600}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: { xs: "0.75rem", sm: "0.8rem" },
                              fontStyle: "italic",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey[900]
                                  : theme.palette.grey[50],
                              p: 1,
                              borderRadius: 1,
                              mt: 1,
                            }}
                          >
                            {factor.details}
                          </Typography>
                        </Fade>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Slide>
        </StyledBox>
      </Paper>
    );
  }

  // Desktop layout
  return (
    <Paper
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 650,
        width: "100%",
        boxSizing: "border-box",
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
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
          mb: 3,
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        <AccessTime sx={{ fontSize: { xs: 20, sm: 24 } }} /> Longevity Tracker
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary,
          textAlign: "center",
          maxWidth: 600,
          fontSize: { xs: "0.875rem", sm: "0.9rem" },
        }}
      >
        See how different factors affect how long your fragrance lasts. Toggle
        factors to see their impact.
      </Typography>

      {/* Longevity Circles */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {/* Base Longevity */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3,
                  width: "100%",
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                Base Longevity
              </Typography>

              <Box
                sx={{
                  width: { xs: 120, sm: 140, md: 160 },
                  height: { xs: 120, sm: 140, md: 160 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Zoom in={true} key={currentLongevity.level} timeout={500}>
                  <Box
                    sx={{
                      width: { xs: 100, sm: 120, md: 140 },
                      height: { xs: 100, sm: 120, md: 140 },
                      borderRadius: "50%",
                      backgroundColor: currentLongevity.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 20px ${currentLongevity.color}40`,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                      }}
                    >
                      {currentLongevity.hours}
                    </Typography>
                  </Box>
                </Zoom>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: 220,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: currentLongevity.color,
                    mb: 1,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  }}
                >
                  {currentLongevity.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontStyle: "italic",
                    fontSize: { xs: "0.875rem", sm: "0.9rem" },
                  }}
                >
                  {currentLongevity.tip}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Adjusted Longevity */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 3,
                  width: "100%",
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                Adjusted Longevity
              </Typography>

              <Box
                sx={{
                  width: { xs: 120, sm: 140, md: 160 },
                  height: { xs: 120, sm: 140, md: 160 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Zoom in={true} key={adjustedLongevity.level} timeout={500}>
                  <Box
                    sx={{
                      width: { xs: 100, sm: 120, md: 140 },
                      height: { xs: 100, sm: 120, md: 140 },
                      borderRadius: "50%",
                      backgroundColor: adjustedLongevity.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 20px ${adjustedLongevity.color}40`,
                      animation:
                        activeFactors.length > 0
                          ? "pulse 2s ease-in-out infinite"
                          : "none",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.05)" },
                        "100%": { transform: "scale(1)" },
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                      }}
                    >
                      {adjustedLongevity.hours}
                    </Typography>
                  </Box>
                </Zoom>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: 220,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: adjustedLongevity.color,
                    mb: 1,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  }}
                >
                  {adjustedLongevity.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontStyle: "italic",
                    fontSize: { xs: "0.875rem", sm: "0.9rem" },
                  }}
                >
                  {activeFactors.length > 0
                    ? "With active factors"
                    : "No factors applied"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Slider */}
      <Box sx={{ width: "100%", mb: 4, maxWidth: 600, px: 2 }}>
        <Slider
          value={longevityLevel}
          onChange={(e, newValue) => setLongevityLevel(newValue)}
          min={1}
          max={6}
          step={1}
          marks={[
            { value: 1, label: "1-3h" },
            { value: 2, label: "3-5h" },
            { value: 3, label: "5-7h" },
            { value: 4, label: "7-9h" },
            { value: 5, label: "9-12h" },
            { value: 6, label: "12+h" },
          ]}
          valueLabelDisplay="auto"
          sx={{
            "& .MuiSlider-markLabel": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          }}
        />
      </Box>

      {/* Factors Grid - REMOVED SCROLLING */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 1,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 3,
            color: theme.palette.text.primary,
            textAlign: "center",
            width: "100%",
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Factors That Affect Longevity
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: 800,
            justifyContent: "center",
            // Remove any fixed heights that cause scrolling
          }}
        >
          {factors.map((factor, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: activeFactors.includes(index)
                    ? "translateY(-2px)"
                    : "none",
                  boxShadow: activeFactors.includes(index) ? 2 : 1,
                  border: activeFactors.includes(index)
                    ? `2px solid ${currentLongevity.color}`
                    : `1px solid ${theme.palette.divider}`,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.background.paper,
                  width: 260, // ✅ fixed width
                  height: 220, // ✅ fixed height for consistency
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => toggleFactor(index)}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      color: activeFactors.includes(index)
                        ? currentLongevity.color
                        : theme.palette.text.secondary,
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 48,
                      height: 48,
                      mx: "auto",
                    }}
                  >
                    {React.cloneElement(factor.icon, { fontSize: "large" })}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontSize: "1.1rem",
                        color: theme.palette.text.primary,
                        mb: 1,
                      }}
                    >
                      {factor.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                    >
                      <Chip
                        label={`${factor.effect > 0 ? "+" : ""}${
                          factor.effect
                        }`}
                        size="medium"
                        color={factor.effect > 0 ? "success" : "error"}
                        variant={
                          activeFactors.includes(index) ? "filled" : "outlined"
                        }
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.9rem",
                      }}
                    >
                      {factor.desc}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
