import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";

const FeaturesSection = () => {
  const features = [
    {
      icon: "👃",
      title: "Expert Curation",
      description:
        "Hand-picked selections from fragrance experts and enthusiasts worldwide. Discover hidden gems and timeless classics.",
    },
    {
      icon: "🔍",
      title: "Smart Discovery",
      description:
        "Advanced filtering by notes, longevity, season, and occasion. Find exactly what you're looking for in seconds.",
    },
    {
      icon: "⭐",
      title: "Authentic Community",
      description:
        "Join thousands of fragrance lovers sharing honest reviews, experiences, and recommendations.",
    },
    {
      icon: "🎯",
      title: "Personalized Matching",
      description:
        "Our intelligent quiz matches you with perfect scents based on your unique preferences and personality.",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6, width: "100%" }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Why Choose Olfactum?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto", fontWeight: 300 }}
        >
          Experience fragrance discovery like never before with our
          comprehensive platform
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: 900,
          justifyContent: "center",
        }}
      >
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              minHeight: 380,
            }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 400,
                height: 380,
                display: "flex",
                flexDirection: "column",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  p: 4,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    fontSize: "3rem",
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    textAlign: "center",
                    lineHeight: 1.2,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    textAlign: "center",
                    fontSize: "1.1rem",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
