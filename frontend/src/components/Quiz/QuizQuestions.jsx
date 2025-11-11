import { Box, Typography, Button, Card, CardContent } from "@mui/material";

const QuizQuestions = ({
  step,
  answers,
  onAnswer,
  onBack,
  onNext,
  onClose,
}) => {
  const questions = [
    {
      id: "experience",
      question: "How familiar are you with fragrances?",
      description:
        "This helps us tailor recommendations to your knowledge level",
      answers: [
        {
          id: "beginner",
          text: "Just starting out",
          emoji: "🌱",
          description: "New to perfumes, need guidance",
        },
        {
          id: "casual",
          text: "Casually familiar",
          emoji: "😊",
          description: "Know what I like but not the details",
        },
        {
          id: "knowledgeable",
          text: "Pretty knowledgeable",
          emoji: "🎓",
          description: "Understand notes and fragrance families",
        },
      ],
    },
    {
      id: "gender",
      question: "Who will be wearing this fragrance?",
      description: "Choose the gender profile you're most comfortable with",
      answers: [
        {
          id: "male",
          text: "For Men",
          emoji: "👨",
          description: "Masculine-leaning scents",
        },
        {
          id: "female",
          text: "For Women",
          emoji: "👩",
          description: "Feminine-leaning scents",
        },
        {
          id: "unisex",
          text: "Unisex",
          emoji: "🫶",
          description: "Works for anyone, balanced scents",
        },
      ],
    },
    {
      id: "scentPreferences",
      question: "What types of scents do you generally like?",
      description:
        "Choose the options that best describe your preferences (select as many as you like)",
      multiple: true,
      answers: [
        {
          id: "freshClean",
          text: "Fresh & Clean",
          emoji: "🚿",
          description: "Like clean laundry, shower gel, ocean",
        },
        {
          id: "sweetGourmand",
          text: "Sweet & Edible",
          emoji: "🍰",
          description: "Like vanilla, candy, desserts, baking",
        },
        {
          id: "woodyEarthy",
          text: "Woody & Earthy",
          emoji: "🌲",
          description: "Like forests, soil, wood, nature",
        },
        {
          id: "floralRomantic",
          text: "Floral & Romantic",
          emoji: "💐",
          description: "Like flowers, gardens, romantic scents",
        },
        {
          id: "spicyWarm",
          text: "Spicy & Warm",
          emoji: "🌶️",
          description: "Like cinnamon, spices, warm cozy scents",
        },
        {
          id: "citrusBright",
          text: "Citrus & Bright",
          emoji: "🍋",
          description: "Like lemon, orange, fresh energizing",
        },
      ],
    },
    {
      id: "scentStyle",
      question: "What style of fragrance personality appeals to you?",
      description: "Think about the impression you want to make",
      answers: [
        {
          id: "fresh",
          text: "Fresh & Approachable",
          emoji: "🌿",
          description: "Clean, friendly, easy-going vibes",
        },
        {
          id: "sweet",
          text: "Sweet & Comforting",
          emoji: "🍯",
          description: "Warm, cozy, inviting vibes",
        },
        {
          id: "dark",
          text: "Dark & Mysterious",
          emoji: "🌌",
          description: "Mysterious, sophisticated, intriguing",
        },
        {
          id: "elegant",
          text: "Elegant & Classic",
          emoji: "🎩",
          description: "Timeless, refined, luxurious",
        },
        {
          id: "bold",
          text: "Bold & Confident",
          emoji: "⚡",
          description: "Attention-grabbing, powerful, memorable",
        },
      ],
    },
    {
      id: "weatherClimate",
      question: "What weather will you mostly wear this in?",
      description:
        "Choose the climate that matches your location or preference",
      answers: [
        {
          id: "warmClimate",
          text: "Warm & Hot Weather",
          emoji: "☀️",
          description: "Tropical, summer, or consistently warm",
        },
        {
          id: "coolClimate",
          text: "Cool & Cold Weather",
          emoji: "❄️",
          description: "Winter, fall, or consistently cool",
        },
        {
          id: "variableClimate",
          text: "Variable Weather",
          emoji: "🌦️",
          description: "Mixed seasons, spring-like, changing",
        },
        {
          id: "allWeather",
          text: "All Weather & Seasons",
          emoji: "🌍",
          description: "Want something versatile year-round",
        },
      ],
    },
    {
      id: "occasionTime",
      question: "What's the main occasion and time for this fragrance?",
      description: "When and where will you wear it most?",
      answers: [
        {
          id: "dayCasual",
          text: "Daytime & Casual",
          emoji: "🌅",
          description: "Work, errands, everyday activities",
        },
        {
          id: "nightOut",
          text: "Night & Social",
          emoji: "🌃",
          description: "Dates, parties, evenings out",
        },
        {
          id: "professional",
          text: "Office & Professional",
          emoji: "💼",
          description: "Work meetings, professional settings",
        },
        {
          id: "specialEvents",
          text: "Special Occasions",
          emoji: "🎩",
          description: "Formal events, memorable moments",
        },
        {
          id: "versatile",
          text: "Everything & Anytime",
          emoji: "🔄",
          description: "Want one fragrance that does it all",
        },
      ],
    },
    {
      id: "strengthLongevity",
      question: "How strong and long-lasting do you want it?",
      description: "Balance between noticeability and subtlety",
      answers: [
        {
          id: "subtle",
          text: "Subtle & Intimate",
          emoji: "🌫️",
          description: "Light, close to skin, few hours",
        },
        {
          id: "balanced",
          text: "Balanced & Reliable",
          emoji: "💫",
          description: "Noticeable but not overwhelming, most of day",
        },
        {
          id: "strong",
          text: "Strong & Long-lasting",
          emoji: "🔥",
          description: "Makes a statement, lasts all day & night",
        },
      ],
    },
    {
      id: "notes",
      question: "Which specific scent notes sound appealing?",
      description:
        "Choose the options that best describe your preferences (select as many as you like)",
      multiple: true,
      answers: [
        {
          id: "citrus",
          text: "Citrus",
          emoji: "🍋",
          description: "Lemon, orange, bergamot, grapefruit",
        },
        {
          id: "woody",
          text: "Woody",
          emoji: "🌲",
          description: "Sandalwood, cedar, vetiver, patchouli",
        },
        {
          id: "vanilla",
          text: "Vanilla",
          emoji: "🍦",
          description: "Vanilla, tonka bean, sweet notes",
        },
        {
          id: "leather",
          text: "Leather",
          emoji: "🧥",
          description: "Leather, tobacco, smoke, amber",
        },
        {
          id: "spicy",
          text: "Spicy",
          emoji: "🌶️",
          description: "Cinnamon, pepper, cardamom, cloves",
        },
        {
          id: "floral",
          text: "Floral",
          emoji: "🌹",
          description: "Rose, jasmine, lavender, lily",
        },
        {
          id: "aquatic",
          text: "Aquatic",
          emoji: "🌊",
          description: "Ocean, rain, marine, clean",
        },
        {
          id: "fruity",
          text: "Fruity",
          emoji: "🍓",
          description: "Berry, apple, peach, mango",
        },
        {
          id: "green",
          text: "Green",
          emoji: "🌿",
          description: "Grass, leaves, tea, herbal",
        },
        {
          id: "musky",
          text: "Musky",
          emoji: "💪",
          description: "Musk, skin-like, animalic",
        },
      ],
    },
    {
      id: "mood",
      question: "What vibe do you want your fragrance to give?",
      description: "The impression you want to make",
      answers: [
        {
          id: "romantic",
          text: "Romantic & Alluring",
          emoji: "💞",
          description: "Soft, attractive, charming",
        },
        {
          id: "confident",
          text: "Confident & Powerful",
          emoji: "💪",
          description: "Bold, assertive, commanding",
        },
        {
          id: "relaxed",
          text: "Relaxed & Approachable",
          emoji: "😌",
          description: "Casual, friendly, easy-going",
        },
        {
          id: "luxurious",
          text: "Luxurious & Sophisticated",
          emoji: "👑",
          description: "Elegant, expensive, refined",
        },
        {
          id: "energetic",
          text: "Energetic & Youthful",
          emoji: "⚡",
          description: "Fresh, vibrant, energetic",
        },
      ],
    },
  ];

  // Show results at the last step
  if (step >= questions.length) {
    return null; // Results are handled in QuizResults component
  }

  const currentQuestion = questions[step];

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", py: 4 }}>
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontSize: {
            xs: "1.5rem",
            sm: "1.75rem",
            md: "2rem",
          },
          px: 1,
        }}
      >
        {currentQuestion.question}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{
          mb: 4,
          fontSize: {
            xs: "0.9rem",
            sm: "1rem",
          },
          px: 1,
        }}
      >
        {currentQuestion.description}
      </Typography>

      {/* Options grid - Special handling for notes question with many options */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs:
              currentQuestion.id === "notes"
                ? "repeat(2, 1fr)"
                : "repeat(1, 1fr)",
            sm:
              currentQuestion.id === "notes"
                ? "repeat(3, 1fr)"
                : "repeat(2, 1fr)",
            md:
              currentQuestion.id === "notes"
                ? "repeat(4, 1fr)"
                : "repeat(3, 1fr)",
          },
          gap: 2,
          justifyItems: "center",
          mb: 6,
        }}
      >
        {currentQuestion.answers.map((answer) => (
          <Card
            key={answer.id}
            onClick={() =>
              onAnswer(currentQuestion.id, answer.id, currentQuestion.multiple)
            }
            sx={{
              cursor: "pointer",
              width: "100%",
              maxWidth: currentQuestion.id === "notes" ? 180 : 280,
              minHeight: currentQuestion.id === "notes" ? 100 : 120,
              border: currentQuestion.multiple
                ? answers[currentQuestion.id]?.includes(answer.id)
                  ? 2
                  : 1
                : answers[currentQuestion.id] === answer.id
                ? 2
                : 1,
              borderColor: currentQuestion.multiple
                ? answers[currentQuestion.id]?.includes(answer.id)
                  ? "primary.main"
                  : "divider"
                : answers[currentQuestion.id] === answer.id
                ? "primary.main"
                : "divider",
              bgcolor: currentQuestion.multiple
                ? answers[currentQuestion.id]?.includes(answer.id)
                  ? "primary.light"
                  : "background.paper"
                : answers[currentQuestion.id] === answer.id
                ? "primary.light"
                : "background.paper",
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
                borderColor: "primary.main",
              },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: currentQuestion.id === "notes" ? 1.5 : 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontSize: currentQuestion.id === "notes" ? "2rem" : "2.5rem",
                }}
              >
                {answer.emoji}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: currentQuestion.id === "notes" ? "0.9rem" : "1rem",
                    sm: currentQuestion.id === "notes" ? "1rem" : "1.1rem",
                  },
                }}
              >
                {answer.text}
                {currentQuestion.multiple &&
                  answers[currentQuestion.id]?.includes(answer.id) && (
                    <Box component="span" sx={{ ml: 1, color: "primary.main" }}>
                      ✓
                    </Box>
                  )}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontSize:
                    currentQuestion.id === "notes" ? "0.7rem" : "0.8rem",
                  lineHeight: 1.2,
                }}
              >
                {answer.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Navigation buttons - Fixed on mobile */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          position: {
            xs: "fixed",
            sm: "static",
          },
          bottom: {
            xs: 0,
            sm: "auto",
          },
          left: {
            xs: 0,
            sm: "auto",
          },
          right: {
            xs: 0,
            sm: "auto",
          },
          bgcolor: {
            xs: "background.paper",
            sm: "transparent",
          },
          p: {
            xs: 2,
            sm: 0,
          },
          borderTop: {
            xs: 1,
            sm: 0,
          },
          borderColor: {
            xs: "divider",
            sm: "transparent",
          },
          zIndex: 1000,
          width: "100%",
        }}
      >
        <Button
          onClick={onBack}
          variant="outlined"
          disabled={step === 0}
          size="large"
          sx={{
            flex: {
              xs: 1,
              sm: "none",
            },
            minWidth: { xs: "auto", sm: "120px" },
          }}
        >
          Back
        </Button>

        {/* Show different button text for last question */}
        <Button
          variant="contained"
          size="large"
          onClick={onNext}
          disabled={
            currentQuestion.multiple
              ? !answers[currentQuestion.id] ||
                answers[currentQuestion.id].length === 0
              : !answers[currentQuestion.id]
          }
          sx={{
            flex: {
              xs: 1,
              sm: "none",
            },
            minWidth: { xs: "auto", sm: "140px" },
          }}
        >
          {step === questions.length - 1 ? "See My Matches" : "Next Question"}
        </Button>
      </Box>

      {/* Spacer for mobile fixed buttons */}
      <Box
        sx={{
          height: {
            xs: 80,
            sm: 0,
          },
        }}
      />
    </Box>
  );
};

export default QuizQuestions;
