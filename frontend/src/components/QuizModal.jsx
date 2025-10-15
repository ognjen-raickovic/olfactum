import {
  Modal,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import QuizQuestion from "./QuizQuestions";

const QuizModal = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const quizSteps = [
    "Scent Preferences",
    "Season & Occasion",
    "Intensity",
    "Favorite Notes",
    "Personality",
    "Results",
  ];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // FIXED: Multiple selection functionality
  const handleAnswer = (questionId, answer, isMultiple = false) => {
    setAnswers((prev) => {
      // Check if this question allows multiple selections
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];

        // Toggle selection
        if (currentAnswers.includes(answer)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((a) => a !== answer),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, answer],
          };
        }
      } else {
        // Single selection (original behavior)
        return {
          ...prev,
          [questionId]: answer,
        };
      }
    });
  };

  const handleClose = () => {
    setCurrentStep(0);
    setAnswers({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "95%",
            sm: "90%",
            md: "700px",
            lg: "800px",
          },
          maxWidth: "95vw",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          align="center"
          sx={{
            fontSize: {
              xs: "1.75rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          Find Your Perfect Scent
        </Typography>

        {/* Clean Stepper - No connectors on mobile */}
        <Stepper
          activeStep={currentStep}
          sx={{
            mb: 4,
            "& .MuiStepConnector-root": {
              display: isMobile ? "none" : "block", // Hide connectors on mobile
            },
          }}
        >
          {quizSteps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                  },
                }}
              >
                {isMobile
                  ? // Short labels for mobile
                    label
                      .split(" ")
                      .map((word) => word[0])
                      .join("") + (label.includes("Preferences") ? "Pref" : "")
                  : label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Quiz Content */}
        <QuizQuestion
          step={currentStep}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          onClose={handleClose}
        />
      </Box>
    </Modal>
  );
};

export default QuizModal;
