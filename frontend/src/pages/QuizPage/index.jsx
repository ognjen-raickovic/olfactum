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
import { useEffect, useState, useRef } from "react";
import QuizQuestions from "../../components/Quiz/QuizQuestions";
import QuizResults from "../../components/Quiz/QuizResults";
import {
  loadQuizResults,
  clearQuizResults,
  saveQuizResults,
} from "../../utils/quizStorage";
import { useLocation } from "react-router-dom";

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

  // Load saved quiz from new storage system
  const [savedQuiz, setSavedQuiz] = useState(loadQuizResults());

  // State initialization
  const [currentStep, setCurrentStep] = useState(
    savedQuiz ? quizSteps.length - 1 : 0
  );
  const [answers, setAnswers] = useState(savedQuiz?.answers || {});
  const [quizData, setQuizData] = useState(savedQuiz || null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const resultsRef = useRef(null);
  const location = useLocation();

  // Reload result data if navigating back to quiz page
  useEffect(() => {
    setSavedQuiz(loadQuizResults());
  }, [location.pathname]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Scroll to results if saved quiz exists
  useEffect(() => {
    if (savedQuiz && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => {
      const next = prev + 1;

      if (next === quizSteps.length - 1) {
        const savedData = saveQuizResults(answers);
        setQuizData(savedData);
        setSavedQuiz(savedData);
      }

      return next;
    });
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleAnswer = (questionId, answer, isMultiple = false) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        return {
          ...prev,
          [questionId]: currentAnswers.includes(answer)
            ? currentAnswers.filter((a) => a !== answer)
            : [...currentAnswers, answer],
        };
      } else {
        return { ...prev, [questionId]: answer };
      }
    });
  };

  // Restart quiz
  const handleRestart = () => {
    clearQuizResults();
    setSavedQuiz(null);
    setAnswers({});
    setCurrentStep(0);
    setQuizData(null);
  };

  const isResultStep = currentStep === quizSteps.length - 1;

  // Update saved quiz when switching to results
  useEffect(() => {
    if (isResultStep) {
      setSavedQuiz(loadQuizResults());
    }
  }, [isResultStep]);

  // // 🔥 REAL-TIME EXPIRATION CHECKER (fixes your issue)
  // useEffect(() => {
  //   if (!isResultStep) return;

  //   const interval = setInterval(() => {
  //     const latest = loadQuizResults();
  //     setSavedQuiz(latest);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isResultStep]);

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
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 1 }}>
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

          {/* Stepper */}
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{
              mb: 1,
              "& .MuiStepConnector-root": {
                display: isMobile ? "none" : "block",
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

        {/* Content */}
        <Box ref={resultsRef} sx={{ width: "100%", flexGrow: 1 }}>
          {isResultStep ? (
            <QuizResults
              answers={answers}
              onRestart={handleRestart}
              quizTimestamp={quizData?.timestamp}
              expiryTimestamp={quizData?.expiry}
            />
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
