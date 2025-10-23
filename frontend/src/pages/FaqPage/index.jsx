import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question:
      "What’s the difference between Eau de Toilette and Eau de Parfum?",
    answer:
      "Eau de Parfum (EDP) has a higher concentration of fragrance oils, usually lasting longer and projecting more strongly than Eau de Toilette (EDT).",
  },
  {
    question: "How can I make my fragrance last longer?",
    answer:
      "Apply on pulse points (wrists, neck, behind ears), moisturize your skin before spraying, and avoid rubbing your wrists together.",
  },
  {
    question: "How should I store my perfumes?",
    answer:
      "Keep them away from direct sunlight, heat, and humidity. Ideally, store bottles in their boxes at room temperature.",
  },
  {
    question: "Can I wear the same fragrance year-round?",
    answer:
      "You can, but many people prefer lighter, fresher scents in warm weather and deeper, spicier ones in colder months.",
  },
  {
    question: "Do you sell fragrances directly?",
    answer:
      "Not yet! For now, Olfactum focuses on helping you discover scents that match your personality and preferences.",
  },
  {
    question: "How do I choose a fragrance that suits me?",
    answer:
      "Use the quiz to identify your preferences and try sampling different fragrance families. Personal comfort and enjoyment are key!",
  },
  {
    question: "What are fragrance families?",
    answer:
      "Fragrances are grouped into families like citrus, floral, woody, or oriental. These categories give a general idea of the scent style.",
  },
  {
    question: "How many fragrances should I start with?",
    answer:
      "As a beginner, 1–3 versatile fragrances are ideal. This keeps your collection simple and allows you to find your signature scent.",
  },
  {
    question: "How should I test a perfume before buying?",
    answer:
      "Spray on a blotter first, then on your skin if possible. Smell after a few minutes to see how it develops, as perfumes change with body chemistry.",
  },
  {
    question: "How often should I reapply my perfume?",
    answer:
      "Most fragrances last several hours. For longer days or special occasions, a light reapplication on pulse points may be needed.",
  },
  {
    question: "Can perfumes cause allergies or irritate skin?",
    answer:
      "Some people may be sensitive. Test a small amount on your skin first and avoid direct application if irritation occurs.",
  },
];

const FAQ = () => {
  return (
    <Box
      sx={{ py: 8, px: { xs: 2, sm: 6, md: 10 }, maxWidth: 900, mx: "auto" }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 6 }}
      >
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
