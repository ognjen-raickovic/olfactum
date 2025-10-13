import { Box, Typography, Button, Card, CardContent } from "@mui/material";

const QuizQuestions = ({ step, answers, onAnswer, onBack, onNext }) => {
  const questions = [
    {
      id: "gender",
      question: "Who will be wearing this fragrance?",
      answers: [
        {
          id: "male",
          text: "For Men",
          emoji: "👨",
          description: "Designed with masculine notes and style",
        },
        {
          id: "female",
          text: "For Women",
          emoji: "👩",
          description: "Elegant, feminine fragrances",
        },
        {
          id: "unisex",
          text: "Unisex",
          emoji: "🫶",
          description: "Balanced for all genders",
        },
      ],
    },
    {
      id: "scentType",
      question: "What type of scents are you usually drawn to?",
      answers: [
        {
          id: "fresh",
          text: "Fresh and clean",
          emoji: "🌿",
          description: "Light, airy scents",
        },
        {
          id: "sweet",
          text: "Sweet and cozy",
          emoji: "🍯",
          description: "Warm, comforting fragrances",
        },
        {
          id: "dark",
          text: "Dark and mysterious",
          emoji: "🌌",
          description: "Deep, sophisticated notes",
        },
        {
          id: "elegant",
          text: "Elegant and classic",
          emoji: "🎩",
          description: "Timeless, refined scents",
        },
        {
          id: "bold",
          text: "Bold and energetic",
          emoji: "⚡",
          description: "Confident, attention-grabbing",
        },
      ],
    },
    {
      id: "season",
      question: "What's your ideal season for this fragrance?",
      answers: [
        {
          id: "spring",
          text: "Spring",
          emoji: "🌸",
          description: "Fresh florals & greens",
        },
        {
          id: "summer",
          text: "Summer",
          emoji: "☀️",
          description: "Light citrus & aquatics",
        },
        {
          id: "autumn",
          text: "Autumn",
          emoji: "🍂",
          description: "Warm spices & woods",
        },
        {
          id: "winter",
          text: "Winter",
          emoji: "❄️",
          description: "Rich orientals & gourmands",
        },
        {
          id: "all",
          text: "All-year-round",
          emoji: "🌍",
          description: "Versatile everyday scents",
        },
      ],
    },
    {
      id: "occasion",
      question: "What occasion do you want it for?",
      answers: [
        {
          id: "everyday",
          text: "Everyday wear",
          emoji: "👕",
          description: "Casual, office-friendly",
        },
        {
          id: "office",
          text: "Office or college",
          emoji: "💼",
          description: "Professional, subtle",
        },
        {
          id: "date",
          text: "Date night",
          emoji: "💝",
          description: "Romantic, sensual",
        },
        {
          id: "party",
          text: "Party or evening",
          emoji: "🎉",
          description: "Bold, attention-grabbing",
        },
        {
          id: "special",
          text: "Special events",
          emoji: "🎩",
          description: "Sophisticated, memorable",
        },
      ],
    },
    {
      id: "intensity",
      question: "How strong do you like your fragrance to be?",
      answers: [
        {
          id: "subtle",
          text: "Subtle and close to skin",
          emoji: "🌫️",
          description: "Only noticeable up close",
        },
        {
          id: "noticeable",
          text: "Noticeable but not overpowering",
          emoji: "💫",
          description: "Perfect balance",
        },
        {
          id: "strong",
          text: "Strong and long-lasting",
          emoji: "🔥",
          description: "Makes a statement",
        },
      ],
    },
    {
      id: "notes",
      question: "Which note sounds the most appealing to you?",
      answers: [
        {
          id: "citrus",
          text: "Citrus",
          emoji: "🍋",
          description: "Fresh, energizing",
        },
        {
          id: "woody",
          text: "Woody",
          emoji: "🌲",
          description: "Earthy, masculine",
        },
        {
          id: "vanilla",
          text: "Vanilla",
          emoji: "🍦",
          description: "Sweet, comforting",
        },
        {
          id: "leather",
          text: "Leather",
          emoji: "🧥",
          description: "Bold, sophisticated",
        },
        {
          id: "spicy",
          text: "Spicy",
          emoji: "🌶️",
          description: "Warm, exotic",
        },
        {
          id: "floral",
          text: "Floral",
          emoji: "🌹",
          description: "Romantic, feminine",
        },
        {
          id: "aquatic",
          text: "Aquatic",
          emoji: "🌊",
          description: "Clean, refreshing",
        },
      ],
    },
    {
      id: "mood",
      question: "What kind of vibe do you want your fragrance to give off?",
      answers: [
        {
          id: "romantic",
          text: "Romantic",
          emoji: "💞",
          description: "Soft and alluring",
        },
        {
          id: "confident",
          text: "Confident",
          emoji: "💪",
          description: "Bold and assertive",
        },
        {
          id: "relaxed",
          text: "Relaxed",
          emoji: "😌",
          description: "Casual and easy-going",
        },
        {
          id: "luxurious",
          text: "Luxurious",
          emoji: "👑",
          description: "Elegant and high-end",
        },
        {
          id: "sporty",
          text: "Sporty",
          emoji: "🏃‍♂️",
          description: "Energetic and refreshing",
        },
      ],
    },
  ];

  const currentQuestion = questions[step];

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", py: 6 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom align="center">
        {currentQuestion.question}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Choose the option that best describes your preference
      </Typography>

      {/* Options grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          justifyItems: "center",
          mb: 6,
        }}
      >
        {currentQuestion.answers.map((answer) => (
          <Card
            key={answer.id}
            onClick={() => onAnswer(currentQuestion.id, answer.id)}
            sx={{
              cursor: "pointer",
              width: "100%",
              maxWidth: 320,
              border: answers[currentQuestion.id] === answer.id ? 2 : 1,
              borderColor:
                answers[currentQuestion.id] === answer.id
                  ? "primary.main"
                  : "divider",
              bgcolor:
                answers[currentQuestion.id] === answer.id
                  ? "primary.light"
                  : "background.paper",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-3px)", boxShadow: 2 },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {answer.emoji}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {answer.text}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {answer.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Navigation buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          onClick={onBack}
          variant="outlined"
          disabled={step === 0}
          size="large"
        >
          Back
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={onNext}
          disabled={!answers[currentQuestion.id]}
        >
          Next Question
        </Button>
      </Box>
    </Box>
  );
};

export default QuizQuestions;
