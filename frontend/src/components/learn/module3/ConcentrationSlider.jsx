import {
  Box,
  Slider,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function ConcentrationSlider({
  concentrations,
  selectedIndex,
  onChange,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getAbbreviation = (id) => {
    const abbreviations = {
      cologne: "Cologne",
      "eau-de-toilette": "EDT",
      "eau-de-parfum": "EDP",
      parfum: "Parfum",
      elixir: "Elixir",
    };
    return (
      abbreviations[id] || concentrations[selectedIndex]?.name.split(" ")[0]
    );
  };

  const marks = concentrations.map((conc, index) => ({
    value: index,
    label: (
      <Typography
        variant="caption"
        sx={{
          fontWeight: selectedIndex === index ? "bold" : "normal",
          color: selectedIndex === index ? "primary.main" : "text.secondary",
          mt: 1,
          fontSize: isMobile ? "0.7rem" : "0.8rem",
          textAlign: "center",
        }}
      >
        {getAbbreviation(conc.id)}
      </Typography>
    ),
  }));

  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        Concentration Spectrum
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Slide to explore different fragrance concentrations and their properties
      </Typography>

      <Box
        sx={{
          px: isMobile ? 1 : 2,
          pb: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Slider
          value={selectedIndex}
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
            "& .MuiSlider-rail": {
              opacity: 0.3,
              backgroundColor:
                theme.palette.mode === "dark" ? "#8B7355" : "#B59676",
            },
            "& .MuiSlider-mark": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#8B7355" : "#B59676",
              height: 12,
              width: 12,
              borderRadius: "50%",
              "&.MuiSlider-markActive": {
                backgroundColor: theme.palette.primary.main,
              },
            },
            "& .MuiSlider-thumb": {
              height: 24,
              width: 24,
              backgroundColor: theme.palette.background.paper,
              border: `3px solid ${theme.palette.primary.main}`,
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`,
              },
            },
          }}
        />
      </Box>

      {/* Current selection indicator */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Paper
          sx={{
            px: 3,
            py: 2,
            backgroundColor:
              theme.palette.mode === "dark" ? "primary.dark" : "primary.light",
            color: theme.palette.mode === "dark" ? "text.primary" : "white",
            borderRadius: 2,
            textAlign: "center",
            width: "100%",
            maxWidth: 300,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold", opacity: 0.9 }}>
            Currently Selected:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {concentrations[selectedIndex]?.name}
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
}
