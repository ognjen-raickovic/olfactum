import { Container, Typography, Box, Button, alpha } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: (theme) => {
          if (theme.palette.mode === "light") {
            return `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.08)} 0%, 
              ${alpha(theme.palette.background.paper, 0.9)} 50%,
              ${alpha(theme.palette.secondary.main, 0.05)} 100%
            )`;
          } else {
            return `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.dark, 0.15)} 0%, 
              ${alpha(theme.palette.background.default, 0.9)} 50%,
              ${alpha(theme.palette.secondary.dark, 0.1)} 100%
            )`;
          }
        },
        color: "text.primary",
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        borderBottom: (theme) =>
          `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            `radial-gradient(circle at 70% 30%, ${alpha(
              theme.palette.primary.main,
              0.03
            )} 0%, transparent 50%)`,
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
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "0 4px 8px rgba(0,0,0,0.05)",
            mt: { xs: 0, md: 0 },
            lineHeight: 1.2, // Increased from 1.1 to fix cut-off letters
            minHeight: { xs: "140px", md: "180px", lg: "200px" }, // Ensure enough space for text
          }}
        >
          Discover Your
          <Box
            component="span"
            sx={{
              display: "block",
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              lineHeight: 1.2, // Slightly more line height for the second line
            }}
          >
            Signature Scent
          </Box>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            maxWidth: 600,
            mx: "auto",
            mb: 3,
            opacity: 0.9,
            fontWeight: 300,
            lineHeight: 1.6,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            color: "text.secondary",
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
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            mb: 3,
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: (theme) =>
              `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            "&:hover": {
              bgcolor: "primary.dark",
              transform: "translateY(-2px)",
              boxShadow: (theme) =>
                `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
            transition: "all 0.3s ease",
          }}
        >
          Explore All Fragrances
        </Button>

        <Box
          sx={{
            maxWidth: 550,
            mx: "auto",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            border: (theme) =>
              `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            mt: 1,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Box component="span">🎯</Box>
            Not sure where to start?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              lineHeight: 1.6,
              mb: 3,
              fontSize: { xs: "1rem", md: "1.05rem" },
              color: "text.secondary",
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
              borderColor: "primary.main",
              color: "primary.main",
              fontWeight: "bold",
              borderWidth: 2,
              fontSize: "1rem",
              px: 3,
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                borderColor: "primary.dark",
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
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
