import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  alpha,
  Container,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const faqSections = [
  {
    title: "About Olfactum",
    items: [
      {
        question: "What is Olfactum?",
        answer:
          "Olfactum is a fragrance discovery platform designed to make exploring scents simple and enjoyable. It helps both beginners and enthusiasts understand fragrance terminology, learn the basics, and discover scents that match their preferences.",
      },
      {
        question: "Who created Olfactum?",
        answer:
          "Olfactum was created as a personal project by a fragrance enthusiast who wanted a clean, focused website for learning about fragrances and discovering new scents without the clutter of traditional fragrance sites.",
      },
      {
        question: "Is Olfactum free to use?",
        answer:
          "Yes. All current and planned features are completely free. Olfactum is a passion project focused on making fragrance education accessible to everyone.",
      },
    ],
  },
  {
    title: "Using the Platform",
    items: [
      {
        question: "How do the learning modules work?",
        answer:
          "Olfactum includes structured learning modules that teach fragrance fundamentals step-by-step. Topics include perfume terminology, fragrance families, performance, storage, and skin chemistry.",
      },
      {
        question: "When can I access the quiz?",
        answer:
          "The quiz becomes available after completing all learning modules. This ensures you understand the basics before receiving personalized fragrance recommendations.",
      },
      {
        question: "How do fragrance recommendations work?",
        answer:
          "After completing the quiz, you'll receive a list of fragrance recommendations based on your preferences and responses. We intentionally show multiple options to help you recognize familiar scents and discover new ones.",
      },
    ],
  },
  {
    title: "Fragrance Database",
    items: [
      {
        question: "What information will I find in the fragrances database?",
        answer:
          "Each fragrance includes note breakdowns, performance insights, seasonal suggestions, and other helpful details to help you understand how the scent behaves and when to wear it.",
      },
      {
        question: "Are the recommendations personalized?",
        answer:
          "Yes. Your quiz responses and preferences influence the fragrances shown to you, helping surface scents that align with your taste.",
      },
    ],
  },
  {
    title: "Future of Olfactum",
    items: [
      {
        question: "Will more features be added in the future?",
        answer:
          "Yes. Planned features include user reviews, community elements, advanced filtering tools, and smarter recommendation systems as the platform continues evolving.",
      },
    ],
  },
];

const FAQ = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let panelIndex = 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          background: `
            linear-gradient(135deg,
              ${alpha(theme.palette.primary.main, 0.1)} 0%,
              ${alpha(theme.palette.secondary.main, 0.05)} 50%,
              ${alpha(theme.palette.background.paper, 0.9)} 100%
            )
          `,
          py: { xs: 10, md: 14 },
          width: "100%",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.75rem", md: "4rem" },
              mb: 3,
              color: "text.primary",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              lineHeight: 1.3,
              color: "text.secondary",
              fontSize: { xs: "1.25rem", md: "1.75rem" },
              maxWidth: 760,
              mx: "auto",
            }}
          >
            Everything you need to know about Olfactum and how to get the most
            out of your fragrance journey.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ mt: 4 }}>
          {faqSections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ mb: 6 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.25rem", sm: "1.4rem" },
                  mb: 2.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {section.title}
              </Typography>

              {section.items.map((faq) => {
                const panelId = `panel-${panelIndex++}`;

                return (
                  <Accordion
                    key={panelId}
                    expanded={expanded === panelId}
                    onChange={handleChange(panelId)}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      transition: "all 0.3s ease-in-out",
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1,
                      )}`,
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.8,
                      ),
                      "&:before": { display: "none" },
                      "&:hover": {
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.2,
                        )}`,
                        boxShadow: `0 4px 20px ${alpha(
                          theme.palette.primary.main,
                          0.08,
                        )}`,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ py: 2, px: 3 }}
                    >
                      <Typography
                        sx={{
                          fontWeight: expanded === panelId ? 600 : 500,
                          fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        px: 3,
                        py: 2,
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.02,
                        ),
                        borderTop: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.1,
                        )}`,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 8,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            textAlign: "center",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05,
            )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Still Have Questions?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3,
              maxWidth: 620,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Visit the{" "}
            <Link
              component={RouterLink}
              to="/about"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              About Us
            </Link>{" "}
            page to learn more about Olfactum’s mission and future plans.
            <br />
            If you have a bug to report, a suggestion, feedback, or a general
            question, head over to the{" "}
            <Link
              component={RouterLink}
              to="/contact"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Contact
            </Link>{" "}
            page — we’d love to hear from you.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            "Simplifying fragrance discovery, one module at a time."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
