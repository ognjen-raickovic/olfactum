import {
  Paper,
  Grid,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  Chip,
} from "@mui/material";
import {
  AccessTime,
  Air,
  AttachMoney,
  Science as ConcentrationIcon,
  Whatshot,
} from "@mui/icons-material";

export default function ConcentrationDetails({ concentration }) {
  const theme = useTheme();

  if (!concentration) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography>Select a concentration to view details</Typography>
      </Paper>
    );
  }

  const getIntensityLevel = (id) => {
    const levels = {
      cologne: 20,
      "eau-de-toilette": 40,
      "eau-de-parfum": 60,
      parfum: 80,
      elixir: 95,
    };
    return levels[id] || 50;
  };

  const getLongevityLevel = (id) => {
    const levels = {
      cologne: 15,
      "eau-de-toilette": 35,
      "eau-de-parfum": 55,
      parfum: 75,
      elixir: 90,
    };
    return levels[id] || 50;
  };

  const getPriceLevel = (id) => {
    const levels = {
      cologne: 20,
      "eau-de-toilette": 40,
      "eau-de-parfum": 60,
      parfum: 80,
      elixir: 95,
    };
    return levels[id] || 50;
  };

  const intensityLevel = getIntensityLevel(concentration.id);
  const longevityLevel = getLongevityLevel(concentration.id);
  const priceLevel = getPriceLevel(concentration.id);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {concentration.name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.6 }}
        >
          {concentration.description}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Key Specifications */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <ConcentrationIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Key Specifications
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <ConcentrationIcon color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Perfume Oil Concentration
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    {concentration.oil}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <AccessTime color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Longevity
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    {concentration.longevity}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Air color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Sillage (Projection)
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    {concentration.sillage}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <AttachMoney color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Price Range
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    {concentration.price}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              backgroundColor:
                theme.palette.mode === "dark" ? "primary.900" : "primary.50",
              borderColor: theme.palette.primary.main,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.primary" }}
            >
              <strong>Best for:</strong> {concentration.bestFor}
            </Typography>
          </Paper>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Whatshot color="primary" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Performance Metrics
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Intensity & Projection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {intensityLevel}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={intensityLevel}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                  "& .MuiLinearProgress-bar": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #C8A97E 0%, #DBC4A4 100%)"
                        : "linear-gradient(90deg, #9C7C5C 0%, #B59676 100%)",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Longevity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {longevityLevel}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={longevityLevel}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                  "& .MuiLinearProgress-bar": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #8B7355 0%, #A89277 100%)"
                        : "linear-gradient(90deg, #5D4037 0%, #8B6B61 100%)",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Price Range
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {priceLevel}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={priceLevel}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                  "& .MuiLinearProgress-bar": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, #DBC4A4 0%, #C8A97E 100%)"
                        : "linear-gradient(90deg, #B59676 0%, #9C7C5C 100%)",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
            <Chip
              label={`Oil: ${concentration.oil}`}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              label={`Lasts: ${concentration.longevity}`}
              color="secondary"
              variant="outlined"
              size="small"
            />
            <Chip
              label={`Sillage: ${concentration.sillage}`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
