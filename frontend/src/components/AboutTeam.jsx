import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "The Olfactum Community",
      role: "Our Foundation",
      description:
        "Every review, every rating, every comment comes from our passionate community of fragrance enthusiasts around the world.",
      emoji: "👥",
    },
    {
      name: "Fragrance Experts",
      role: "Knowledge Base",
      description:
        "Industry professionals and seasoned collectors who provide deep insights and guidance.",
      emoji: "👃",
    },
    {
      name: "You",
      role: "The Most Important Member",
      description:
        "Your experiences, your reviews, and your journey are what make Olfactum special.",
      emoji: "⭐",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 600, mb: 6 }}
      >
        Who We Are
      </Typography>

      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card elevation={2} sx={{ height: "100%", textAlign: "center" }}>
              <CardContent sx={{ p: 4 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  {member.emoji}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutTeam;
