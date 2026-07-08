import { Box, Button, useTheme } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const moduleStructure = [
  {
    id: 1,
    path: "/learn/module1",
    label: "The Language of Perfume",
    shortLabel: "Perfume Language",
  },
  {
    id: 2,
    path: "/learn/module2",
    label: "Fragrance Concentrations",
    shortLabel: "Concentrations",
  },
  {
    id: 3,
    path: "/learn/module3",
    label: "Sillage & Longevity",
    shortLabel: "Sillage & Longevity",
  },
  {
    id: 4,
    path: "/learn/module4",
    label: "Fragrance Families",
    shortLabel: "Families",
  },
  {
    id: 5,
    path: "/learn/module5",
    label: "Fragrance Storage & Care",
    shortLabel: "Storage & Care",
  },
  {
    id: 6,
    path: "/learn/module6",
    label: "Fragrance Testing & Skin Chemistry",
    shortLabel: "Testing & Skin",
  },
];

export default function ModuleNavigation({ sx = {} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // ✅ Reactively track completed modules
  const [completedModules, setCompletedModules] = useState({});

  const fetchProgress = async () => {
    try {
      const res = await api.get("/modules/progress");

      const map = {};
      res.data.modules.forEach((m) => {
        map[m.module_id] = m.progress === "Completed";
      });

      setCompletedModules(map);
    } catch (err) {
      console.error("Failed to load module progress", err);
    }
  };

  useEffect(() => {
    fetchProgress();
    const onUpdate = () => fetchProgress();
    window.addEventListener("moduleProgressUpdated", onUpdate);
    return () => window.removeEventListener("moduleProgressUpdated", onUpdate);
  }, [location.pathname]);

  // Find current module
  const currentIndex = moduleStructure.findIndex(
    (module) => location.pathname === module.path,
  );

  const previousModule =
    currentIndex > 0 ? moduleStructure[currentIndex - 1] : null;
  const nextModule =
    currentIndex < moduleStructure.length - 1
      ? moduleStructure[currentIndex + 1]
      : null;

  const isCurrentCompleted =
    !!completedModules[moduleStructure[currentIndex].id];
  const isNextAccessible = nextModule && isCurrentCompleted;

  // If not on a recognized path, don't render
  if (currentIndex === -1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 4,
        mt: 2,
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
          py: 1.5,
        }}
      >
        Previous: {previousModule?.shortLabel}
      </Button>

      <Button
        endIcon={<ArrowForward />}
        onClick={() => isNextAccessible && navigate(nextModule.path)}
        variant={isNextAccessible ? "contained" : "outlined"}
        disabled={!isNextAccessible}
        sx={{
          minWidth: { xs: "100%", sm: 200 },
          opacity: isNextAccessible ? 1 : 0.6,
          py: 1.5,
          backgroundColor: isNextAccessible ? "primary.main" : "transparent",
          "&:hover": {
            backgroundColor: isNextAccessible ? "primary.dark" : "transparent",
          },
        }}
      >
        {isNextAccessible ? "Next: " : "Complete Module First: "}
        {nextModule?.shortLabel}
      </Button>
    </Box>
  );
}
