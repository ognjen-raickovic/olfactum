import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const FeaturesSection = () => {
  const features = [
    {
      icon: "👃",
      title: "Expert Reviews",
      description:
        "Read detailed reviews from fragrance enthusiasts and experts.",
    },
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Find fragrances by notes, longevity, season, and occasion.",
    },
    {
      icon: "⭐",
      title: "Community Driven",
      description:
        "Join a community of fragrance lovers and share experiences.",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {" "}
      {/* Changed to xl for wider layout */}
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontFamily: '"Playfair Display", serif' }}
      >
        Why Choose Olfactum?
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            {" "}
            {/* New Grid v2 syntax */}
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary.main">
                  {feature.icon} {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
