import { Container, Typography, Box } from "@mui/material";

const AboutHero = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 8,
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
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          About Olfactum
        </Typography>
        <Typography
          variant="h5"
          sx={{ maxWidth: 600, mx: "auto", opacity: 0.9 }}
        >
          Where passion for fragrances meets modern technology
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutHero;
