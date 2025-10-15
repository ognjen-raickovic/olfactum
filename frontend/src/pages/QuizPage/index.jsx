import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import QuizQuestions from "../../components/QuizQuestions";
import QuizResults from "../../components/QuizResults";

const QuizPage = () => {
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
    "Mood & Personality",
    "Your Results",
  ];

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  // FIXED: Update handleAnswer to support multiple selection
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
        py: 4,
        px: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          mx: "auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%", // Ensure full width
        }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "text.primary",
              fontSize: {
                xs: "1.75rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
          >
            {isResultStep
              ? "Your Personalized Fragrance Results"
              : "Find Your Perfect Scent"}
          </Typography>

          {/* Simple Mobile Stepper - No connectors, clean circles */}
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{
              mb: 4,
              "& .MuiStepConnector-root": {
                display: isMobile ? "none" : "block",
              },
              "& .MuiStep-root": {
                padding: isMobile ? "0 8px" : "0 12px",
              },
            }}
          >
            {quizSteps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      fontWeight: 600,
                      mt: 0.5,
                    },
                  }}
                >
                  {isMobile
                    ? label
                        .split(" ")
                        .map((word) => word[0])
                        .join("") +
                      (label.includes("Preferences") ? "Pref" : "")
                    : label}
                </StepLabel>
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
