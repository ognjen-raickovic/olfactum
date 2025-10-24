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
        "Every review, rating, and comment comes from our passionate community of fragrance lovers worldwide.",
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
    <Container
      maxWidth="xl"
      sx={{
        py: 8,
        px: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 600, mb: 6 }}
      >
        Who We Are
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: 1100,
          justifyContent: "center",
        }}
      >
        {teamMembers.map((member, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              minHeight: 400,
            }}
          >
            <Card
              elevation={2}
              sx={{
                width: "100%",
                maxWidth: 380,
                height: 400,
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  gap: 2.5,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "primary.light",
                    fontSize: "2rem",
                  }}
                >
                  {member.emoji}
                </Avatar>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap", // keeps title on one line
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary.main"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {member.role}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
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
