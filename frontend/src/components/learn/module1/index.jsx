import {
  Container,
  Box,
  Paper,
  Typography,
  useTheme,
  alpha,
  Breadcrumbs,
  Link,
  Fade,
  Slide,
  Zoom,
  Alert,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Home, School, Spa, LocalFlorist, Park } from "@mui/icons-material";
import { useState, useEffect } from "react";
import FragrancePyramid from "./FragrancePyramid";
import NoteClassification from "./NoteClassification";
import ModuleNavigation from "../ModuleNavigation";
import ModuleCompletion from "../ModuleCompletion";

export default function Module1() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const featureCards = [
    {
      icon: <Spa sx={{ fontSize: 40 }} />,
      title: "Structured Learning",
      description:
        "Follow a carefully designed curriculum that builds your fragrance knowledge step by step",
    },
    {
      icon: <LocalFlorist sx={{ fontSize: 40 }} />,
      title: "Interactive Elements",
      description:
        "Engage with interactive pyramids and classification systems to deepen your understanding",
    },
    {
      icon: <Park sx={{ fontSize: 40 }} />,
      title: "Practical Knowledge",
      description:
        "Learn concepts you can immediately apply when testing and selecting fragrances",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 0 }}>
      {/* Breadcrumbs */}
      <Fade in={loaded} timeout={500}>
        <Box mb={3} sx={{ pt: 4, px: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="small" />
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/learn"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <School sx={{ mr: 0.5 }} fontSize="small" />
              Learn
            </Link>
            <Typography
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Module 1: The Language of Perfume
            </Typography>
          </Breadcrumbs>
        </Box>
      </Fade>
      <ModuleNavigation />

      {/* Full-Width Hero Section */}
      <Slide in={loaded} direction="down" timeout={800}>
        <Box
          sx={{
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.15)} 0%, 
              ${alpha(theme.palette.secondary.main, 0.1)} 50%, 
              ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 4 },
            mb: 6,
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container maxWidth="lg">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              mb={4}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <School sx={{ fontSize: { xs: 48, md: 64 } }} color="primary" />
              <Box textAlign={{ xs: "center", sm: "left" }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                  }}
                >
                  The Language of Perfume
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                    maxWidth: 600,
                  }}
                >
                  Master the vocabulary of fragrance and understand how perfumes
                  are structured and evolve over time
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Slide>

      {/* --- Introduction Section --- */}
      <Fade in={loaded} timeout={800}>
        <Box
          sx={{
            background: `linear-gradient(180deg, 
        ${alpha(theme.palette.background.paper, 0.9)} 0%, 
        ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 0 },
            mb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    mb: 3,
                  }}
                >
                  What are Fragrance Notes?
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    lineHeight: 1.7,
                    mb: 4,
                  }}
                >
                  Fragrance notes are the individual scents that make up a
                  perfume's composition. They're carefully layered by perfumers
                  to create a complex, evolving scent experience that unfolds
                  over time on your skin. Understanding these notes helps you
                  predict how a fragrance will develop and choose scents that
                  truly resonate with your personality.
                </Typography>

                <Alert
                  severity="info"
                  sx={{
                    fontSize: "1.1rem",
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                    backgroundColor: alpha(theme.palette.info.main, 0.08),
                    "& .MuiAlert-message": { width: "100%" },
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "info.main" }}
                  >
                    🎭 The Art of Fragrance Storytelling
                  </Typography>
                  <Typography variant="body1">
                    A well-crafted fragrance tells a story — it has a beginning
                    (top notes), a middle (heart notes), and an ending (base
                    notes). Learning to recognize these stages will transform
                    how you experience perfume.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* --- Feature Cards Section --- */}
      <Fade in={loaded} timeout={1000}>
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
            sx={{ flexWrap: "wrap" }}
          >
            {featureCards.map((card, index) => (
              <Grid
                item
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Zoom in={loaded} timeout={800 + index * 200}>
                  <Card
                    sx={{
                      width: 360,
                      height: 380,
                      textAlign: "center",
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: "all 0.3s ease",
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.05
                      )} 0%, ${alpha(
                        theme.palette.background.paper,
                        0.9
                      )} 100%)`,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 16px 32px ${alpha(
                          theme.palette.primary.main,
                          0.15
                        )}`,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ color: "primary.main", mb: 2 }}>
                        {card.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Fade>

      {/* Interactive Fragrance Pyramid */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            mb: 6,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.info.main,
              0.05
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            borderRadius: 0,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "info.main",
                textAlign: "center",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              🎭 The Fragrance Pyramid
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 5,
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
              }}
            >
              Explore how fragrance notes evolve from the initial spray to the
              final dry-down. Click on each section to learn about top, heart,
              and base notes.
            </Typography>

            <FragrancePyramid />
          </Container>
        </Paper>
      </Fade>

      {/* Note Classification */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            mb: 6,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.warning.main,
              0.05
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
            borderRadius: 0,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "warning.main",
                textAlign: "center",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              🌸 Fragrance Note Classification
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 5,
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
              }}
            >
              Discover the different families of fragrance notes and their
              characteristics
            </Typography>

            <NoteClassification />
          </Container>
        </Paper>
      </Fade>

      {/* Key Takeaways */}
      <Fade in={loaded} timeout={800}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.success.main,
              0.1
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            py: { xs: 4, md: 6 },
            borderTop: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "success.main",
                textAlign: "center",
                mb: 4,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              ✅ Key Takeaways
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={10}>
                <Zoom in={loaded} timeout={600}>
                  <Paper
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.success.main, 0.05),
                      border: `2px solid ${alpha(
                        theme.palette.success.main,
                        0.3
                      )}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.success.main,
                          0.08
                        ),
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box component="ul" sx={{ pl: 0, textAlign: "left" }}>
                      {[
                        "Fragrances are composed of top, heart, and base notes that evolve over time",
                        "Top notes create the first impression (5-15 minutes)",
                        "Heart notes form the main character (20-60 minutes)",
                        "Base notes provide depth and longevity (2+ hours)",
                        "Understanding the pyramid helps predict how scents will develop",
                        "Note classification helps identify your preferred fragrance families",
                        "Your skin chemistry affects how notes evolve on your skin",
                      ].map((item, index) => (
                        <Typography
                          key={index}
                          component="li"
                          variant="body1"
                          sx={{
                            mb: 2,
                            padding: "12px 16px",
                            borderRadius: 2,
                            backgroundColor: alpha(
                              theme.palette.success.main,
                              0.08
                            ),
                            borderLeft: `4px solid ${theme.palette.success.main}`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.success.main,
                                0.12
                              ),
                              transform: "translateX(8px)",
                            },
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </Zoom>
              </Grid>
            </Grid>

            <Fade in={loaded} timeout={1000}>
              <Alert
                severity="info"
                sx={{
                  mt: 4,
                  fontSize: "1.1rem",
                  maxWidth: 800,
                  mx: "auto",
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <strong>Ready for the next step?</strong> Continue to Module 2
                to learn about fragrance concentrations and how they affect
                longevity and projection!
              </Alert>
            </Fade>
          </Container>
        </Box>
      </Fade>

      {/* Module Completion */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <ModuleCompletion
          loaded={loaded}
          moduleId="module-1"
          moduleTitle="Module 1: The Language of Perfume"
        />
      </Container>
      <ModuleNavigation sx={{ mt: 4 }} />
    </Container>
  );
}
