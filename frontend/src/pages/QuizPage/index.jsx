import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import QuizQuestions from "../../components/QuizQuestions";
import QuizResults from "../../components/QuizResults";

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const quizSteps = [
    "Scent Preferences",
    "Season & Occasion",
    "Intensity",
    "Favorite Notes",
    "Personality",
    "Your Results",
  ];

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handleAnswer = (questionId, answer) =>
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  const isResultStep = currentStep === quizSteps.length - 1;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 6,
        px: 2,
        overflowX: "hidden",
        maxWidth: "100vw",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "background.paper",
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: 4,
          mx: "auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "text.primary",
            }}
          >
            {isResultStep
              ? "Your Personalized Fragrance Results"
              : "Find Your Perfect Scent"}
          </Typography>

          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              },
            }}
          >
            {quizSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {!isResultStep && (
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                py: 1.5,
                px: 3,
                borderRadius: 2,
                width: "fit-content",
                mx: "auto",
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "uppercase",
              }}
            >
              Question {currentStep + 1} of {quizSteps.length - 1}
            </Box>
          )}
        </Box>

        <Box sx={{ width: "100%", flexGrow: 1 }}>
          {isResultStep ? (
            <QuizResults answers={answers} onRestart={handleRestart} />
          ) : (
            <QuizQuestions
              step={currentStep}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default QuizPage;
