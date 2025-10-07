import {
  Modal,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useState } from "react";
import QuizQuestion from "./QuizQuestions";

const QuizModal = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

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

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
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
          width: { xs: "90%", sm: "80%", md: "600px" },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Find Your Perfect Scent
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
          {quizSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
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
