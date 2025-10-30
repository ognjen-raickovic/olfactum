import {
  Box,
  Slider,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  LinearProgress,
  Chip,
  alpha,
} from "@mui/material";
import {
  AccessTime,
  Air,
  AttachMoney,
  Science as ConcentrationIcon,
  Whatshot,
  LocalBar,
} from "@mui/icons-material";
import { useState } from "react";

export default function ConcentrationExplorer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedConcentration, setSelectedConcentration] = useState(2); // Start with Eau de Parfum

  const concentrations = [
    {
      id: "cologne",
      name: "Cologne",
      oil: "2-4%",
      longevity: "1-2 hours",
      sillage: "Light",
      description:
        "Lightest and most refreshing type. Perfect for quick touch-ups or hot days, with a soft, short-lived scent.",
      bestFor: "Casual wear, hot weather, quick refresh",
      price: "$ - Low",
    },
    {
      id: "eau-de-toilette",
      name: "Eau de Toilette (EDT)",
      oil: "5-15%",
      longevity: "2-4 hours",
      sillage: "Moderate",
      description:
        "Balanced strength for everyday use. Offers noticeable freshness with moderate staying power.",
      bestFor: "Daily wear, casual outings, warmer seasons",
      price: "$$ - Medium",
    },
    {
      id: "eau-de-parfum",
      name: "Eau de Parfum (EDP)",
      oil: "15-20%",
      longevity: "4-6 hours",
      sillage: "Strong",
      description:
        "Rich and long-lasting. One of the most popular types with deeper character and strong projection.",
      bestFor: "Evenings, special events, all-season use",
      price: "$$$ - High",
    },
    {
      id: "parfum",
      name: "Parfum",
      oil: "20-30%",
      longevity: "6-8+ hours",
      sillage: "Intense",
      description:
        "Highly concentrated and luxurious. Delivers maximum depth, complexity, and lasting performance.",
      bestFor: "Formal wear, cooler weather, intimate settings",
      price: "$$$$ - Premium",
    },
    {
      id: "elixir",
      name: "Elixir",
      oil: "25-40%",
      longevity: "8-12+ hours",
      sillage: "Powerful",
      description:
        "The most intense form of fragrance. A single drop lasts all day, creating an unforgettable aura.",
      bestFor: "Luxury occasions, impressing, long nights",
      price: "$$$$$ - Luxury",
    },
  ];

  const getAbbreviation = (id) => {
    const abbreviations = {
      cologne: "Cologne",
      "eau-de-toilette": "EDT",
      "eau-de-parfum": "EDP",
      parfum: "Parfum",
      elixir: "Elixir",
    };
    return abbreviations[id];
  };

  const getIntensityLevel = (id) =>
    ({
      cologne: 20,
      "eau-de-toilette": 40,
      "eau-de-parfum": 60,
      parfum: 80,
      elixir: 95,
    }[id]);

  const getLongevityLevel = (id) =>
    ({
      cologne: 15,
      "eau-de-toilette": 35,
      "eau-de-parfum": 55,
      parfum: 75,
      elixir: 90,
    }[id]);

  const getPriceLevel = (id) =>
    ({
      cologne: 20,
      "eau-de-toilette": 40,
      "eau-de-parfum": 60,
      parfum: 80,
      elixir: 95,
    }[id]);

  const handleSliderChange = (event, newValue) => {
    setSelectedConcentration(newValue);
  };

  const marks = concentrations.map((conc, index) => ({
    value: index,
    label: (
      <Typography
        variant="caption"
        sx={{
          fontWeight: selectedConcentration === index ? "bold" : "normal",
          color:
            selectedConcentration === index ? "primary.main" : "text.secondary",
          mt: 1,
          fontSize: isMobile ? "0.7rem" : "0.8rem",
          textAlign: "center",
        }}
      >
        {getAbbreviation(conc.id)}
      </Typography>
    ),
  }));

  const currentConcentration = concentrations[selectedConcentration];
  const intensityLevel = getIntensityLevel(currentConcentration.id);
  const longevityLevel = getLongevityLevel(currentConcentration.id);
  const priceLevel = getPriceLevel(currentConcentration.id);

  return (
    <Paper
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.03
        )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          mb={2}
        >
          <LocalBar color="primary" sx={{ fontSize: 32 }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Concentration Explorer
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Discover how fragrance strength affects performance and feel.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        {/* Slider Section */}
        <Grid item xs={12} lg={4}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Concentration Spectrum
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Slide to explore types
              </Typography>
            </Box>

            <Box
              sx={{
                px: { xs: 1, md: 2 },
                pb: 2,
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Slider
                value={selectedConcentration}
                onChange={handleSliderChange}
                min={0}
                max={concentrations.length - 1}
                step={1}
                marks={marks}
                sx={{
                  height: 8,
                  "& .MuiSlider-track": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #C8A97E 0%, #DBC4A4 100%)"
                        : "linear-gradient(90deg, #9C7C5C 0%, #B59676 100%)",
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    height: 22,
                    width: 22,
                    backgroundColor: theme.palette.background.paper,
                    border: `3px solid ${theme.palette.primary.main}`,
                  },
                }}
              />
            </Box>

            <Paper
              sx={{
                p: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", opacity: 0.9, mb: 1 }}
              >
                Selected:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {currentConcentration.name}
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} lg={8}>
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  lineHeight: 1.3,
                }}
              >
                {currentConcentration.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {currentConcentration.description}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <ConcentrationIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Key Specs
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {[
                      {
                        icon: (
                          <ConcentrationIcon color="primary" fontSize="small" />
                        ),
                        label: "Perfume Oil Concentration",
                        value: currentConcentration.oil,
                      },
                      {
                        icon: <AccessTime color="primary" fontSize="small" />,
                        label: "Longevity",
                        value: currentConcentration.longevity,
                      },
                      {
                        icon: <Air color="primary" fontSize="small" />,
                        label: "Sillage (Projection)",
                        value: currentConcentration.sillage,
                      },
                      {
                        icon: <AttachMoney color="primary" fontSize="small" />,
                        label: "Price Range",
                        value: currentConcentration.price,
                      },
                    ].map(({ icon, label, value }) => (
                      <Box
                        key={label}
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        {icon}
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {label}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="primary.main"
                            sx={{ fontWeight: "bold", textAlign: "left" }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      width: "100%",
                      maxWidth: 400,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      borderColor: theme.palette.primary.main,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        color: "text.primary",
                        lineHeight: 1.5,
                      }}
                    >
                      <strong>Best for:</strong> {currentConcentration.bestFor}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>

              {/* Performance Metrics */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Whatshot color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Performance
                    </Typography>
                  </Box>

                  {[
                    {
                      label: "Intensity & Projection",
                      value: intensityLevel,
                    },
                    { label: "Longevity", value: longevityLevel },
                    { label: "Price Range", value: priceLevel },
                  ].map(({ label, value }) => (
                    <Box key={label} sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={value}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "grey.800"
                              : "grey.200",
                          "& .MuiLinearProgress-bar": {
                            background:
                              theme.palette.mode === "dark"
                                ? "linear-gradient(90deg, #C8A97E 0%, #DBC4A4 100%)"
                                : "linear-gradient(90deg, #9C7C5C 0%, #B59676 100%)",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <Chip
                    label={`Oil: ${currentConcentration.oil}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`Lasts: ${currentConcentration.longevity}`}
                    color="secondary"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`Sillage: ${currentConcentration.sillage}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
