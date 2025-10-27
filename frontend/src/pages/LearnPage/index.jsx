import { Container, Box, Typography } from "@mui/material";
import LearningNav from "../../components/learn/LearningNav.jsx";

export default function LearnPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to Fragrance Academy
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Your journey to becoming a perfume expert starts here. Learn the
          language of scent and discover the art of perfumery.
        </Typography>
      </Box>
      {/* Module Navigation */}
      <LearningNav />
    </Container>
  );
}
