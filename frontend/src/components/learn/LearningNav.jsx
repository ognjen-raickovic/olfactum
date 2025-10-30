import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle,
  PlayCircle,
  Lock,
  School,
  Science,
  Air,
  Palette,
  LocalBar,
  Inventory2,
  Close,
  Check,
  Warning,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const initialModules = [
  {
    id: "module-1",
    title: "Module 1: The Language of Perfume",
    description:
      "Understand fragrance notes, the pyramid, and how scents evolve over time",
    icon: <School />,
    path: "/learn/module1",
  },
  {
    id: "module-2",
    title: "Module 2: Fragrance Concentrations",
    description:
      "Learn about Eau de Toilette, Eau de Parfum, Parfum and their differences",
    icon: <LocalBar />,
    path: "/learn/module2",
  },
  {
    id: "module-3",
    title: "Module 3: Sillage & Longevity",
    description:
      "Discover scent trails and techniques to make fragrances last longer",
    icon: <Air />,
    path: "/learn/module3",
  },
  {
    id: "module-4",
    title: "Module 4: Fragrance Families",
    description:
      "Explore the main scent categories and their unique characteristics",
    icon: <Palette />,
    path: "/learn/module4",
  },
  {
    id: "module-5",
    title: "Module 5: Fragrance Storage & Care",
    description:
      "Learn proper storage techniques and how to preserve your fragrance collection",
    icon: <Inventory2 />,
    path: "/learn/module5",
  },
  {
    id: "module-6",
    title: "Module 6: Fragrance Testing & Skin Chemistry",
    description:
      "Learn proper testing techniques and how skin chemistry transforms fragrances",
    icon: <Science />,
    path: "/learn/module6",
  },
];

export default function LearningNav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Load module progress from localStorage
  useEffect(() => {
    const updateModuleProgress = () => {
      const completedModules = JSON.parse(
        localStorage.getItem("completedModules") || "{}"
      );

      const updatedModules = initialModules.map((module, index) => {
        const isCompleted = completedModules[module.id];
        let status = "upcoming";
        let progress = 0;

        if (isCompleted) {
          status = "completed";
          progress = 100;
        } else {
          // If this is the first module or previous module is completed, mark as active
          if (index === 0 || completedModules[initialModules[index - 1].id]) {
            status = "active";
          }
        }

        return {
          ...module,
          status,
          progress,
        };
      });

      setModules(updatedModules);
    };

    // Initial load
    updateModuleProgress();

    // Listen for storage changes (when modules are marked complete/incomplete)
    const handleStorageChange = () => {
      updateModuleProgress();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navigateToModule = (path) => {
    navigate(path);
  };

  const getStatusIcon = (status, progress) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="success" />;
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

  // Function to mark a module as complete from the learn page
  const markModuleAsComplete = (moduleId) => {
    const completedModules = JSON.parse(
      localStorage.getItem("completedModules") || "{}"
    );
    completedModules[moduleId] = true;
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
    window.dispatchEvent(new Event("storage"));
  };

  // Function to reset all progress with confirmation
  const handleResetProgress = () => {
    localStorage.removeItem("completedModules");
    window.dispatchEvent(new Event("storage"));
    setResetDialogOpen(false);
  };

  const openResetDialog = () => {
    setResetDialogOpen(true);
  };

  const closeResetDialog = () => {
    setResetDialogOpen(false);
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 4 },
        mb: 6,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          fontSize: { xs: "1.75rem", sm: "2.125rem" },
        }}
      >
        Start Your Learning Journey
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{
          mb: 4,
          maxWidth: 600,
          mx: "auto",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        Follow our structured learning path to become a fragrance expert.
        Complete each module to unlock the next!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {modules.map((module) => (
          <Grid
            item
            key={module.id}
            xs={12}
            sm={6}
            lg={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                border: module.status !== "upcoming" ? 2 : 1,
                borderColor:
                  module.status !== "upcoming" ? "primary.main" : "divider",
                cursor: module.status !== "upcoming" ? "pointer" : "default",
                transition: "all 0.3s ease",
                opacity: module.status !== "upcoming" ? 1 : 0.6,
                backgroundColor: "background.paper",
                position: "relative",
                overflow: "hidden",
                width: "100%",
                maxWidth: 400,
                minHeight: { xs: 200, sm: 220 },
                display: "flex",
                flexDirection: "column",
                "&:hover":
                  module.status !== "upcoming"
                    ? {
                        transform: { xs: "none", sm: "translateY(-4px)" },
                        boxShadow: {
                          xs: theme.shadows[1],
                          sm: theme.shadows[4],
                        },
                      }
                    : {},
              }}
              onClick={() =>
                module.status !== "upcoming" && navigateToModule(module.path)
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

              <Box
                display="flex"
                alignItems="flex-start"
                gap={2}
                sx={{ flex: 1 }}
              >
                <Box
                  sx={{
                    color:
                      module.status !== "upcoming"
                        ? "primary.main"
                        : "text.disabled",
                    mt: 0.5,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                >
                  {module.icon}
                </Box>

                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color:
                          module.status !== "upcoming"
                            ? "text.primary"
                            : "text.disabled",
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.3,
                        flex: 1,
                      }}
                    >
                      {module.title}
                    </Typography>
                    <Box sx={{ mt: 0.5, flexShrink: 0 }}>
                      {getStatusIcon(module.status, module.progress)}
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color={
                      module.status !== "upcoming"
                        ? "text.secondary"
                        : "text.disabled"
                    }
                    paragraph
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {module.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      mt: "auto",
                      "& .MuiButton-root": {
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        px: { xs: 1.5, sm: 2 },
                      },
                    }}
                  >
                    {module.status !== "upcoming" && (
                      <Button
                        variant={
                          module.status === "completed"
                            ? "outlined"
                            : "contained"
                        }
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToModule(module.path);
                        }}
                      >
                        {module.status === "completed"
                          ? "Review"
                          : "Start Learning"}
                      </Button>
                    )}

                    {/* Quick Complete Button - Only show for active, incomplete modules */}
                    {module.status === "active" && module.progress < 100 && (
                      <Tooltip title="Mark this module as completed without going through it">
                        <Button
                          variant="outlined"
                          color="success"
                          size="small"
                          startIcon={<Check />}
                          onClick={(e) => {
                            e.stopPropagation();
                            markModuleAsComplete(module.id);
                          }}
                        >
                          Complete
                        </Button>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Box>

              {module.progress > 0 && module.progress < 100 && (
                <Chip
                  label={`${module.progress}% Complete`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                  }}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Reset Progress Button - Centered below modules */}
      <Button
        variant="outlined"
        color="warning"
        size="large"
        onClick={openResetDialog}
        sx={{
          mt: 4,
          px: 4,
          py: 1,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          fontWeight: "bold",
          minWidth: { xs: 200, sm: 240 },
        }}
      >
        Reset Progress
      </Button>

      {/* Reset Progress Confirmation Dialog */}
      <Dialog
        open={resetDialogOpen}
        onClose={closeResetDialog}
        aria-labelledby="reset-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="reset-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Warning color="warning" />
          Reset All Progress?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset all your learning progress? This
            action cannot be undone and will:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            <Typography component="li">
              Clear all completed module marks
            </Typography>
            <Typography component="li">
              Reset your progress back to the beginning
            </Typography>
            <Typography component="li">
              Require you to start over from Module 1
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={closeResetDialog}
            variant="outlined"
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetProgress}
            variant="contained"
            color="error"
            startIcon={<Warning />}
          >
            Yes, Reset Everything
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
