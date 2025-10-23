import {
  Modal,
  Box,
  Typography,
  Button,
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

  // In QuizModal.js, update the quizSteps array:
  const quizSteps = [
    "Experience Level",
    "Who's Wearing",
    "Scent Preferences",
    "Scent Style",
    "Weather & Climate",
    "Occasion & Time",
    "Strength & Longevity",
    "Favorite Notes",
    "Desired Vibe",
    "Results",
  ];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Multiple selection functionality
  const handleAnswer = (questionId, answer, isMultiple = false) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
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

        {/* Simplified Progress Bar - Better for many questions */}
        <Box sx={{ mb: 4 }}>
          {/* Progress text */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 1 }}
          >
            Question {currentStep + 1} of {quizSteps.length - 1}{" "}
            {/* -1 because Results isn't a question */}
          </Typography>

          {/* Progress bar */}
          <Box
            sx={{
              width: "100%",
              height: 6,
              backgroundColor: "grey.200",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundColor: "primary.main",
                width: `${((currentStep + 1) / (quizSteps.length - 1)) * 100}%`,
                transition: "width 0.3s ease",
                borderRadius: 3,
              }}
            />
          </Box>

          {/* Current step label */}
          <Typography
            variant="caption"
            align="center"
            sx={{ display: "block", mt: 1, fontWeight: "medium" }}
          >
            {quizSteps[currentStep]}
          </Typography>
        </Box>

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
