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
      <Grid container spacing={6} alignItems="stretch">
        {/* Left Side: Our Mission (now matches card style of the right side) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                Olfactum was born from a simple idea: fragrance discovery should
                be authentic, community-driven, and accessible to everyone. We
                believe every scent tells a story, and every nose has a unique
                perspective to share.
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                We make it easy for beginners to learn the essentials, find
                their signature scent, and feel confident exploring the world of
                fragrances.
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                Our platform brings together fragrance enthusiasts, experts, and
                newcomers to create a welcoming community where everyone can
                share, learn, and discover.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: What We Stand For (now with an extra point) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
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
                <Typography component="li" variant="body1" sx={{ mb: 2 }}>
                  <strong>Transparency:</strong> No sponsored content, no hidden
                  agendas
                </Typography>
                <Typography component="li" variant="body1">
                  <strong>Innovation:</strong> Constantly evolving to bring
                  modern tools for fragrance discovery
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
