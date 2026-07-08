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
import api from "../../services/api";

const iconMap = {
  1: <School />,
  2: <LocalBar />,
  3: <Air />,
  4: <Palette />,
  5: <Inventory2 />,
  6: <Science />,
};

export default function LearningNav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const fetchProgress = async () => {
    try {
      const res = await api.get("/modules/progress");
      const raw = res.data.modules;

      const updated = raw.map((mod, index) => {
        const isCompleted = mod.progress === "Completed";

        let status = "upcoming";

        if (isCompleted) {
          status = "completed";
        } else if (index === 0 || raw[index - 1]?.progress === "Completed") {
          status = "active";
        }

        return {
          id: `module-${mod.module_id}`,
          title: mod.name,
          description: mod.description,
          icon: iconMap[mod.module_id] || <School />,
          path: `/learn/module${mod.module_id}`,
          status,
          progress: isCompleted ? 100 : 0,
          module_id: mod.module_id,
        };
      });

      setModules(updated);
    } catch (err) {
      console.error("Failed to load module progress", err);
    }
  };

  useEffect(() => {
    fetchProgress();
    const onUpdate = () => fetchProgress();
    window.addEventListener("moduleProgressUpdated", onUpdate);
    return () => window.removeEventListener("moduleProgressUpdated", onUpdate);
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
  const markModuleAsComplete = async (moduleId) => {
    await api.post("/modules/progress", {
      module_id: moduleId,
      progress: "Completed",
    });
    fetchProgress();
  };

  // Function to reset all progress with confirmation
  const handleResetProgress = async () => {
    for (let i = 1; i <= 6; i++) {
      await api.post("/modules/progress", {
        module_id: i,
        progress: "Not Started",
      });
    }
    fetchProgress();
    setResetDialogOpen(false);
  };

  const openResetDialog = () => {
    setResetDialogOpen(true);
  };

  const closeResetDialog = () => {
    setResetDialogOpen(false);
  };

  return (
    <>
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
                            markModuleAsComplete(module.module_id);
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="outlined"
          color="warning"
          size="large"
          onClick={openResetDialog}
          sx={{
            px: 4,
            py: 1,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: "bold",
            minWidth: { xs: 200, sm: 240 },
          }}
        >
          Reset Progress
        </Button>
      </Box>

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
    </>
  );
}
