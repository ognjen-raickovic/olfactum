import {
  Fade,
  Paper,
  Typography,
  Button,
  useTheme,
  alpha,
  Box,
  Chip,
} from "@mui/material";
import { CheckCircle, PlayCircle } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function ModuleCompletion({ loaded, moduleId, moduleTitle }) {
  const theme = useTheme();
  const [isCompleted, setIsCompleted] = useState(false);

  // ✅ Load initial state + watch for changes
  useEffect(() => {
    const checkCompletion = () => {
      const completedModules = JSON.parse(
        localStorage.getItem("completedModules") || "{}"
      );
      setIsCompleted(!!completedModules[moduleId]);
    };

    checkCompletion(); // initial check

    window.addEventListener("storage", checkCompletion);
    return () => window.removeEventListener("storage", checkCompletion);
  }, [moduleId]);

  // ✅ Mark module as complete/incomplete
  const handleComplete = () => {
    const completedModules = JSON.parse(
      localStorage.getItem("completedModules") || "{}"
    );
    completedModules[moduleId] = true;
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
    setIsCompleted(true);
    window.dispatchEvent(new Event("storage")); // notify others
  };

  const handleReset = () => {
    const completedModules = JSON.parse(
      localStorage.getItem("completedModules") || "{}"
    );
    delete completedModules[moduleId];
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
    setIsCompleted(false);
    window.dispatchEvent(new Event("storage"));
  };

  if (isCompleted) {
    return (
      <Fade in={loaded} timeout={1000}>
        <Paper
          sx={{
            p: 4,
            mt: 4,
            textAlign: "center",
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            border: `2px solid ${alpha(theme.palette.success.main, 0.3)}`,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mb={2}
          >
            <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "success.main" }}
            >
              Module Completed!
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
          >
            You've successfully completed {moduleTitle}. Great job!
          </Typography>
          <Box display="flex" gap={2} justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{
                px: 3,
                py: 1,
              }}
            >
              Mark as Incomplete
            </Button>
            <Chip
              label="Completed"
              color="success"
              variant="filled"
              icon={<CheckCircle />}
            />
          </Box>
        </Paper>
      </Fade>
    );
  }

  return (
    <Fade in={loaded} timeout={1000}>
      <Paper
        sx={{
          p: 4,
          mt: 4,
          textAlign: "center",
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Complete This Module
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
        >
          Have you explored all the content in this module and feel confident
          with the material?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleComplete}
          startIcon={<PlayCircle />}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          Mark Module as Completed
        </Button>
      </Paper>
    </Fade>
  );
}
