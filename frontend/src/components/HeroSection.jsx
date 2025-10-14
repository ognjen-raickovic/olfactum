import { Container, Typography, Box, Button, alpha } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.9
          )} 0%, ${alpha(theme.palette.primary.dark, 0.95)} 100%)`,
        color: "white",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: "center",
          px: { xs: 2, sm: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
            background: "linear-gradient(45deg, #FFFFFF 30%, #F0F0F0 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
            opacity: 0.95,
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Explore thousands of fragrances, read authentic reviews, and find your
          perfect match in our curated collection.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/fragrances"
          sx={{
            bgcolor: "white",
            color: "primary.main",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            mb: 4, // Increased margin bottom
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              bgcolor: "grey.50",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Explore All Fragrances
        </Button>

        {/* Larger Quiz Box */}
        <Box
          sx={{
            maxWidth: 550, // Increased width
            mx: "auto",
            bgcolor: "rgba(255,255,255,0.15)",
            p: 4, // Increased padding
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="h6" // Larger text
            sx={{
              mb: 2,
              opacity: 0.95,
              fontWeight: 600,
              fontSize: "1.2rem", // Explicit font size
            }}
          >
            🎯 Not sure where to start?
          </Typography>
          <Typography
            variant="body1" // Larger body text
            sx={{
              opacity: 0.9,
              lineHeight: 1.6,
              mb: 3, // Increased margin
              fontSize: "1.05rem", // Slightly larger
            }}
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
              borderWidth: 2,
              fontSize: "1rem",
              px: 3,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
                borderColor: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(255,255,255,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Take Scent Quiz
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
