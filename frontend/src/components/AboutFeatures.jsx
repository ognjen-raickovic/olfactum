import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from "@mui/material";
import { School, Quiz, Search, Storage } from "@mui/icons-material";

const AboutFeatures = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <School sx={{ fontSize: 48 }} />,
      title: "Structured Learning",
      description:
        "6 comprehensive modules that build your fragrance knowledge from the ground up",
      stats: "6 Modules",
      lines: 2, // Estimated text lines
    },
    {
      icon: <Quiz sx={{ fontSize: 48 }} />,
      title: "AI-Powered Quiz",
      description:
        "Endless adaptive quizzes that test and expand your fragrance knowledge",
      stats: "Adaptive Learning",
      lines: 2,
    },
    {
      icon: <Search sx={{ fontSize: 48 }} />,
      title: "Fragrance Finder",
      description:
        "Personalized recommendations based on your preferences and quiz results",
      stats: "40+ Options",
      lines: 2,
    },
    {
      icon: <Storage sx={{ fontSize: 48 }} />,
      title: "Comprehensive Database",
      description:
        "Detailed fragrance information with notes, performance, and seasonal guides",
      stats: "50+ Families",
      lines: 3, // This one has more text; put put either lines:3 or taller: true, and then either if values.lines == 3 ili if values.taller samo.
    },
  ];

  return (
    <Box
      sx={{ py: 8, background: alpha(theme.palette.background.default, 0.4) }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "text.primary",
            }}
          >
            How Olfactum Works
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            A guided journey from fragrance novice to confident enthusiast
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  // Responsive height: taller on mobile for the longer text
                  height: {
                    xs: feature.lines === 3 ? 360 : 320, // 40px more for 3-line cards on mobile
                    sm: 320,
                  },
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.05
                  )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 3,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      color: "text.secondary",
                      mb: 3,
                      flex: 1,
                      // Optional: Slightly smaller font on mobile for longer text
                      fontSize: {
                        xs: feature.lines === 3 ? "0.95rem" : "1rem",
                        sm: "1rem",
                      },
                    }}
                  >
                    {feature.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                    }}
                  >
                    {feature.stats}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutFeatures;
