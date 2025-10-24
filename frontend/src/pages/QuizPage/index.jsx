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
import { useEffect, useState, useRef } from "react"; // ← ADD useRef here
import QuizQuestions from "../../components/QuizQuestions";
import QuizResults from "../../components/QuizResults";

const QuizPage = () => {
  const quizSteps = [
    "Scent Preferences",
    "Season & Occasion",
    "Intensity",
    "Favorite Notes",
    "Personality",
    "Mood & Personality",
    "Your Results",
  ];

  // Load saved quiz from LocalStorage
  const savedQuiz = JSON.parse(localStorage.getItem("fragranceQuiz") || "null");
  // State initialization
  const [currentStep, setCurrentStep] = useState(
    savedQuiz ? quizSteps.length - 1 : 0
  );
  const [answers, setAnswers] = useState(savedQuiz || {});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ADD THIS: Create a ref for the results section
  const resultsRef = useRef(null);

  // Scroll to top on question change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // REPLACE the current scroll effect with this:
  useEffect(() => {
    if (savedQuiz && resultsRef.current) {
      // Small delay to ensure the component is rendered
      setTimeout(() => {
        resultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, []); // run only once on mount

  const handleNext = () => {
    setCurrentStep((prev) => {
      const next = prev + 1;

      // Save answers when reaching the results page
      if (next === quizSteps.length - 1) {
        localStorage.setItem("fragranceQuiz", JSON.stringify(answers));
      }

      return next;
    });
  };
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

  // Updated handleRestart to clear LocalStorage
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    localStorage.removeItem("fragranceQuiz");
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
          width: "100%",
        }}
      >
        {/* Header - Reduced bottom margin even more */}
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 4, // Kept this at 4 to maintain space between title and stepper
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
              mb: 1, // Reduced from mb: 2 to mb: 1
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

        {/* ADD THE REF TO THIS BOX */}
        <Box ref={resultsRef} sx={{ width: "100%", flexGrow: 1 }}>
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
