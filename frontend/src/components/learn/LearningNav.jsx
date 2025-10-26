import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  PlayCircle,
  Lock,
  School,
  Science,
  Air,
  Palette,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: "module-1",
    title: "Module 1: The Language of Perfume",
    description:
      "Understand fragrance notes, the pyramid, and how scents evolve over time",
    status: "active",
    icon: <School />,
    progress: 100,
    path: "/learn/module1",
  },
  {
    id: "module-2",
    title: "Module 2: Sillage & Longevity",
    description:
      "Discover scent trails and techniques to make fragrances last longer",
    status: "active",
    icon: <Air />,
    progress: 0,
    path: "/learn/module2",
  },
  {
    id: "module-3",
    title: "Module 3: Fragrance Concentrations",
    description:
      "Learn about Eau de Toilette, Eau de Parfum, Parfum and their differences",
    status: "upcoming",
    icon: <Science />,
    progress: 0,
    path: "/learn/module3",
  },
  {
    id: "module-4",
    title: "Module 4: Fragrance Families",
    description:
      "Explore the main scent categories and their unique characteristics",
    status: "upcoming",
    icon: <Palette />,
    progress: 0,
    path: "/learn/module4",
  },
];

export default function LearningNav() {
  const theme = useTheme();
  const navigate = useNavigate();

  const navigateToModule = (path) => {
    navigate(path);
  };

  const getStatusIcon = (status, progress) => {
    switch (status) {
      case "active":
        return progress === 100 ? (
          <CheckCircle color="success" />
        ) : (
          <PlayCircle color="primary" />
        );
      case "upcoming":
        return <Lock color="disabled" />;
      default:
        return null;
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        mb: 6,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Start Your Learning Journey
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
      >
        Follow our structured learning path to become a fragrance expert.
        Complete each module to unlock the next!
      </Typography>

      <Grid container spacing={3}>
        {modules.map((module) => (
          <Grid item key={module.id} xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                border: module.status === "active" ? 2 : 1,
                borderColor:
                  module.status === "active" ? "primary.main" : "divider",
                cursor: module.status === "active" ? "pointer" : "default",
                transition: "all 0.3s ease",
                opacity: module.status === "active" ? 1 : 0.6,
                backgroundColor: "background.paper",
                position: "relative",
                overflow: "hidden",
                "&:hover":
                  module.status === "active"
                    ? {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[4],
                      }
                    : {},
              }}
              onClick={() =>
                module.status === "active" && navigateToModule(module.path)
              }
            >
              {/* Progress Bar */}
              {module.progress > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: "grey.200",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "success.main",
                      width: `${module.progress}%`,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
              )}

              <Box display="flex" alignItems="flex-start" gap={2}>
                <Box
                  sx={{
                    color:
                      module.status === "active"
                        ? "primary.main"
                        : "text.disabled",
                    mt: 0.5,
                  }}
                >
                  {module.icon}
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color:
                          module.status === "active"
                            ? "text.primary"
                            : "text.disabled",
                      }}
                    >
                      {module.title}
                    </Typography>
                    {getStatusIcon(module.status, module.progress)}
                  </Box>

                  <Typography
                    variant="body2"
                    color={
                      module.status === "active"
                        ? "text.secondary"
                        : "text.disabled"
                    }
                    paragraph
                  >
                    {module.description}
                  </Typography>

                  {module.status === "active" && (
                    <Button
                      variant={
                        module.progress === 100 ? "outlined" : "contained"
                      }
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToModule(module.path);
                      }}
                    >
                      {module.progress === 100 ? "Review" : "Start Learning"}
                    </Button>
                  )}
                </Box>
              </Box>

              {module.progress > 0 && module.progress < 100 && (
                <Chip
                  label={`${module.progress}% Complete`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ position: "absolute", top: 12, right: 12 }}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
