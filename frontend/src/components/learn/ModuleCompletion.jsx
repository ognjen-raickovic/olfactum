import {
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
import { motion, AnimatePresence } from "framer-motion";

export default function ModuleCompletion({ loaded, moduleId, moduleTitle }) {
  const theme = useTheme();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const checkCompletion = () => {
      const completedModules = JSON.parse(
        localStorage.getItem("completedModules") || "{}"
      );
      setIsCompleted(!!completedModules[moduleId]);
    };

    checkCompletion();
    window.addEventListener("storage", checkCompletion);
    return () => window.removeEventListener("storage", checkCompletion);
  }, [moduleId]);

  const handleComplete = () => {
    const completedModules = JSON.parse(
      localStorage.getItem("completedModules") || "{}"
    );
    completedModules[moduleId] = true;
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
    setIsCompleted(true);
    window.dispatchEvent(new Event("storage"));
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

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Paper
      sx={{
        p: 4,
        mt: 4,
        textAlign: "center",
        backgroundColor: isCompleted
          ? alpha(theme.palette.success.main, 0.08)
          : alpha(theme.palette.primary.main, 0.04),
        border: isCompleted
          ? `1.5px solid ${alpha(theme.palette.success.main, 0.4)}`
          : `1.5px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
        boxShadow: isCompleted
          ? `0 3px 10px ${alpha(theme.palette.success.main, 0.2)}`
          : `0 3px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
        minHeight: 220,
        transition: "all 0.25s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        {isCompleted ? (
          <motion.div
            key="completed"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1.5}
              mb={2}
            >
              <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "success.main" }}
              >
                Module Completed
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
            >
              You’ve marked <strong>{moduleTitle}</strong> as completed.
            </Typography>

            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ px: 3, py: 1 }}
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
          </motion.div>
        ) : (
          <motion.div
            key="incomplete"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
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
              Have you finished this module and feel confident with the
              material?
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleComplete}
              startIcon={<PlayCircle />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.05rem",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              Mark Module as Completed
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
}
