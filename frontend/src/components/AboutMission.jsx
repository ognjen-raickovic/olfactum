import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const AboutMission = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
            Olfactum was born from a simple idea: fragrance discovery should be
            authentic, community-driven, and accessible to everyone. We believe
            every scent tells a story, and every nose has a unique perspective
            to share.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
            We make it easy for beginners to learn the essentials, find their
            signature scent, and feel confident exploring the world of
            fragrances.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            Our platform brings together fragrance enthusiasts, experts, and
            newcomers to create a welcoming community where everyone can share,
            learn, and discover.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary.main">
                What We Stand For
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Authenticity:</strong> Real reviews from real people
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Community:</strong> Built by fragrance lovers, for
                  fragrance lovers
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Discovery:</strong> Helping you find your next
                  signature scent
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>Transparency:</strong> No sponsored content, no hidden
                  agendas
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutMission;
