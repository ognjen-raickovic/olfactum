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
    <Container
      maxWidth="lg"
      sx={{ py: 8, px: { xs: 2, sm: 3 }, overflowX: "hidden" }}
    >
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontFamily: '"Playfair Display", serif' }}
      >
        Why Choose Olfactum?
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ mt: 2, overflowX: "hidden", m: 0, width: "100%" }}
      >
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
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
