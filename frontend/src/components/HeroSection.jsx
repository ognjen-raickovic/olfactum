import { Container, Typography, Box, Button } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 12,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Discover Your Signature Scent
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 600,
              mx: "auto",
              mb: 4,
              opacity: 0.9,
            }}
          >
            Explore thousands of fragrances, read authentic reviews, and find
            your perfect match in our curated collection.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Browse Fragrances
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
