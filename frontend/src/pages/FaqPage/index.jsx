import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  alpha,
  Fade,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  {
    question: "What is Olfactum?",
    answer:
      "Olfactum is a simple yet powerful fragrance discovery platform created to make exploring scents approachable and enjoyable. It helps both beginners and enthusiasts learn fragrance basics, understand terminology, and find their ideal scents without the clutter or complexity of traditional fragrance sites.",
  },
  {
    question: "Who created Olfactum?",
    answer:
      "Olfactum was created as a personal project by a fragrance enthusiast who wanted to build a clean, effective website for scent discovery and learning. The goal was to share knowledge in a simplified way and make fragrance exploration fun and educational for everyone - from newcomers to fragrance snobs alike.",
  },
  {
    question: "How does the 'Find Your Fragrance' feature work?",
    answer:
      "After completing the initial assessment, you'll see up to 40 fragrance recommendations. We show this many options intentionally - it helps you recognize scents you might already know and discover new ones to explore in stores. Think of it as a comprehensive starting point for your fragrance journey.",
  },
  {
    question:
      "Why show 40 fragrance recommendations after completing the 'Find Your Fragrance' quiz? Isn't that overwhelming?",
    answer:
      "We believe in giving you options. Seeing multiple fragrances helps you recognize patterns in what you like, discover new houses and notes, and have plenty of options to explore in stores. You can always use our filters to narrow down the selection based on specific criteria.",
  },
  {
    question: "Are the fragrance recommendations personalized?",
    answer:
      "Yes! Our system considers your quiz responses, learning progress, and preferences to provide personalized recommendations. The home page will feature curated recommendations for different categories (men's, women's, unisex) based on various factors including popularity and relevance.",
  },
  {
    question: "How do the learning modules work?",
    answer:
      "We offer 6 structured modules that build fragrance knowledge from the ground up. Start with 'The Language of Perfume' and progress through concentrations, performance, fragrance families, storage, and skin chemistry. Each module must be completed before moving to the next to ensure solid foundational knowledge.",
  },
  {
    question: "When can I access the quiz section?",
    answer:
      "The AI-powered quiz becomes available after completing all 6 learning modules. This ensures you have the necessary knowledge to get the most from the quiz experience. The quiz is designed to be endless and adaptive, providing a fun, ongoing learning tool rather than a one-time test.",
  },
  {
    question: "What information will I find in the Fragrances database?",
    answer:
      "Each fragrance includes detailed notes, performance ratings, seasonal recommendations, and eventually user reviews and AI-generated descriptions. Our filtering system lets you search by notes, families, performance, and occasions to find exactly what you're looking for.",
  },
  {
    question: "How accurate is the fragrance information?",
    answer:
      "We combine expert knowledge with AI assistance to ensure information is accurate and up-to-date. However, fragrance is subjective - we encourage you to use our information as a guide and always test fragrances on your skin when possible.",
  },
  {
    // change this question after you make backend/db
    question: "Do I need an account to use Olfactum?",
    answer:
      "Currently, no account is needed for the learning modules and basic features. Your progress is saved locally in your browser. Future features like saving favorite fragrances or writing reviews may require an account.",
  },
  {
    question: "Is Olfactum completely free to use?",
    answer:
      "Yes! All current and planned features are completely free. We believe fragrance education should be accessible to everyone. This is a passion project, not a commercial platform.",
  },
  {
    // change later, after you implement these
    question: "Will there be more features added in the future?",
    answer:
      "Absolutely! Planned features include user reviews, community features, advanced filtering, and more intelligent recommendation algorithms. The site will continue evolving based on user feedback and the creator's vision for simplified fragrance discovery.",
  },
  {
    question: "How can I get the most out of Olfactum?",
    answer:
      "Start with the learning modules in order - they're designed to build your knowledge progressively. Take notes on fragrances you try, use the filters to explore new scent combinations, and don't rush the process. Fragrance discovery is a journey, not a destination.",
  },
];

const FAQ = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, sm: 3 },
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.background.default,
          0.6
        )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Everything you need to know about Olfactum and how to make the
              most of your fragrance journey
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <Fade in timeout={800 + index * 100} key={index}>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  transition: "all 0.3s ease-in-out",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  "&:before": { display: "none" },
                  "&:hover": {
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                    boxShadow: `0 4px 20px ${alpha(
                      theme.palette.primary.main,
                      0.08
                    )}`,
                  },
                  ...(expanded === `panel${index}` && {
                    backgroundColor: alpha(theme.palette.primary.main, 0.03),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                  }),
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color:
                          expanded === `panel${index}`
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                      }}
                    />
                  }
                  sx={{
                    py: 2,
                    px: 3,
                    "& .MuiAccordionSummary-content": {
                      my: 1,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: expanded === `panel${index}` ? 600 : 500,
                      color:
                        expanded === `panel${index}`
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    px: 3,
                    py: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    borderTop: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Fade>
          ))}
        </Box>

        {/* Help Section */}
        <Fade in timeout={1200}>
          <Box
            sx={{
              mt: 8,
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Still Have Questions?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 500, mx: "auto" }}
            >
              Visit the <strong>About Us</strong> page for contact details or to
              learn more about Olfactum’s mission and future plans.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              "Simplifying fragrance discovery, one module at a time."
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default FAQ;
