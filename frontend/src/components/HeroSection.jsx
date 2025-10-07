import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 12,
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
          px: { xs: 2, sm: 3 },
          overflowX: "hidden",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
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
          Explore thousands of fragrances, read authentic reviews, and find your
          perfect match in our curated collection.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/find-your-fragrance"
          sx={{
            bgcolor: "white",
            color: "primary.main",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            mb: 3,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          Find Your Fragrance
        </Button>

        <Box sx={{ maxWidth: 500, mx: "auto" }}>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
            Not sure where to start?
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.8, fontStyle: "italic", mb: 2 }}
          >
            Take our 2-minute quiz to find your perfect fragrance match based on
            your preferences, personality, and occasion.
          </Typography>

          <Button
            variant="outlined"
            size="medium"
            component={Link}
            to="/find-your-fragrance"
            sx={{
              borderColor: "white",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
                borderColor: "white",
              },
            }}
          >
            Take Our Scent Quiz
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
