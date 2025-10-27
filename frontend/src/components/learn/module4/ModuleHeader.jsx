import { Typography, Box, Chip, useTheme } from "@mui/material";
import { Palette } from "@mui/icons-material";

export default function ModuleHeader() {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Palette sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Fragrance Families
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
      >
        Master the art of scent categorization. Learn to identify and appreciate
        the six main fragrance families.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip label="6 Core Families" color="primary" variant="outlined" />
        <Chip label="Real Examples" color="secondary" variant="outlined" />
        <Chip label="Interactive Learning" color="success" variant="outlined" />
      </Box>
    </Box>
  );
}
