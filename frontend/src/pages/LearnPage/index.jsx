import { Container, Box, Typography, useTheme, alpha } from "@mui/material";
import LearningNav from "../../components/learn/LearningNav.jsx";

export default function LearnPage() {
  const theme = useTheme();

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
            Welcome to Fragrance Academy
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
            Your journey to becoming a perfume expert starts here. Learn the
            language of scent and discover the art of perfumery.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <LearningNav />
      </Container>
    </Box>
  );
}
