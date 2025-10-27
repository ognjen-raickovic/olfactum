import { Box, Button, useTheme } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const moduleStructure = [
  {
    path: "/learn/module1",
    label: "The Language of Perfume",
    shortLabel: "Perfume Language",
  },
  {
    path: "/learn/module2",
    label: "Sillage & Longevity",
    shortLabel: "Sillage & Longevity",
  },
  {
    path: "/learn/module3",
    label: "Fragrance Concentrations",
    shortLabel: "Concentrations",
  },
  {
    path: "/learn/module4",
    label: "Fragrance Families",
    shortLabel: "Families",
  },
  {
    path: "/learn/module5",
    label: "Fragrance Care & Testing",
    shortLabel: "Fragrance Care",
  },
];

export default function ModuleNavigation({ sx = {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Find current module index
  const currentIndex = moduleStructure.findIndex(
    (module) => location.pathname === module.path
  );

  const previousModule =
    currentIndex > 0 ? moduleStructure[currentIndex - 1] : null;
  const nextModule =
    currentIndex < moduleStructure.length - 1
      ? moduleStructure[currentIndex + 1]
      : null;

  // If we're not on a recognized module path, don't show navigation
  if (currentIndex === -1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 4,
        mt: 2, // Add top margin to prevent navbar overlap
        flexWrap: "wrap",
        gap: 2,
        ...sx,
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => previousModule && navigate(previousModule.path)}
        variant="outlined"
        disabled={!previousModule}
        sx={{
          minWidth: { xs: "100%", sm: 200 },
          opacity: previousModule ? 1 : 0.6,
          py: 1.5, // Add padding for better touch targets
        }}
      >
        Previous: {previousModule?.shortLabel}
      </Button>

      <Button
        endIcon={<ArrowForward />}
        onClick={() => nextModule && navigate(nextModule.path)}
        variant="outlined"
        disabled={!nextModule}
        sx={{
          minWidth: { xs: "100%", sm: 200 },
          opacity: nextModule ? 1 : 0.6,
          py: 1.5, // Add padding for better touch targets
        }}
      >
        Next: {nextModule?.shortLabel}
      </Button>
    </Box>
  );
}
