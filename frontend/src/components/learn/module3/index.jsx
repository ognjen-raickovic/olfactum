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
import {
  Home,
  School,
  LocalBar,
  Whatshot,
  Spa,
  TrendingUp,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import ConcentrationSlider from "./ConcentrationSlider";
import ConcentrationDetails from "./ConcentrationDetails";
import ModuleNavigation from "../ModuleNavigation";
import ModuleCompletion from "../ModuleCompletion";
import ConcentrationExplorer from "./ConcentrationExplorer";
export default function Module3() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [selectedConcentration, setSelectedConcentration] = useState(2); // Start with Eau de Parfum

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const concentrations = [
    {
      id: "cologne",
      name: "Cologne / Eau de Cologne",
      oil: "2-4%",
      longevity: "1-2 hours",
      sillage: "Light",
      description:
        "Lightest concentration, perfect for hot weather or quick refresh. Very subtle scent that stays close to the skin.",
      bestFor: "Fresh daytime wear, office settings, or hot weather",
      price: "$ - Low",
    },
    {
      id: "eau-de-toilette",
      name: "Eau de Toilette (EDT)",
      oil: "5-15%",
      longevity: "2-4 hours",
      sillage: "Moderate",
      description:
        "Balanced concentration for everyday use. Offers a good balance of freshness and longevity.",
      bestFor: "Daily wear, casual occasions, and warmer climates",
      price: "$$ - Medium",
    },
    {
      id: "eau-de-parfum",
      name: "Eau de Parfum (EDP)",
      oil: "15-20%",
      longevity: "4-6 hours",
      sillage: "Strong",
      description:
        "Popular choice with excellent longevity and projection. Rich scent that develops beautifully over time.",
      bestFor: "Evening wear, special occasions, and year-round use",
      price: "$$$ - High",
    },
    {
      id: "parfum",
      name: "Parfum",
      oil: "20-30%",
      longevity: "6-8+ hours",
      sillage: "Intense",
      description:
        "Luxury concentration with maximum staying power. The most refined and complex fragrance experience.",
      bestFor: "Formal events, intimate settings, and cooler weather",
      price: "$$$$ - Premium",
    },
    {
      id: "elixir",
      name: "Elixir",
      oil: "25-40%",
      longevity: "8-12+ hours",
      sillage: "Powerful",
      description:
        "Highest concentration for ultimate intensity and longevity. Creates a lasting impression with minimal application.",
      bestFor: "Special occasions, luxury experiences, and maximum impact",
      price: "$$$$$ - Luxury",
    },
  ];

  const concentrationCards = [
    {
      icon: <Spa sx={{ fontSize: 40 }} />,
      title: "Oil Concentration",
      description:
        "Higher perfume oil percentage means richer scent and longer lasting power on your skin",
    },
    {
      icon: <Whatshot sx={{ fontSize: 40 }} />,
      title: "Performance Impact",
      description:
        "Concentration directly affects longevity, sillage, and how the fragrance develops over time",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "Strategic Selection",
      description:
        "Choose the right concentration for different occasions, seasons, and personal preferences",
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
              Module 3: Fragrance Concentrations
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
              <LocalBar sx={{ fontSize: { xs: 48, md: 64 } }} color="primary" />
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
                  Fragrance Concentrations
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                    maxWidth: 600,
                  }}
                >
                  Master the differences between Cologne, EDT, EDP, Parfum, and
                  Elixir - and learn how concentration affects longevity and
                  sillage
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
                  What is Fragrance Concentration?
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
                  Fragrance concentration refers to the percentage of aromatic
                  compounds (perfume oil) in the fragrance mixture. Higher
                  concentrations mean more perfume oil and less alcohol,
                  resulting in longer-lasting scents with stronger projection
                  and richer development on your skin.
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
                    🎯 Concentration = Performance
                  </Typography>
                  <Typography variant="body1">
                    Understanding concentration helps you choose the right
                    fragrance for different occasions, seasons, and desired
                    performance levels. It's the key to building a versatile
                    fragrance wardrobe.
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
            {concentrationCards.map((card, index) => (
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
                      width: 340,
                      height: 300,
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
                      borderRadius: 3,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 16px 32px ${alpha(
                          theme.palette.primary.main,
                          0.15
                        )}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
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
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ px: 1 }}
                      >
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

      {/* Interactive Concentration Explorer */}
      <Fade in={loaded} timeout={800}>
        <Box sx={{ mb: 6 }}>
          <Container maxWidth="xl">
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
              🎚️ Concentration Spectrum
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 4,
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Explore the complete range of fragrance concentrations from
              lightest to most intense. Slide to discover how each concentration
              affects performance, longevity, and ideal usage scenarios.
            </Typography>

            <Alert
              severity="info"
              sx={{
                mb: 4,
                fontSize: "0.9rem",
                p: 2,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                backgroundColor: alpha(theme.palette.info.main, 0.08),
                maxWidth: 800,
                mx: "auto",
              }}
            >
              <Typography variant="body2" fontStyle="italic">
                <strong>Note:</strong> Eau de Cologne and Cologne are
                essentially the same. Parfum and Extrait de Parfum are very
                similar, with Extrait typically having slightly higher
                concentration (20-40% vs 20-30%). Elixir is a modern marketing
                term for ultra-high concentrations.
              </Typography>
            </Alert>

            {/* Single Combined Component - Now with proper side-by-side layout */}
            <ConcentrationExplorer />
          </Container>
        </Box>
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
                        "Higher concentration = more perfume oil = longer longevity and stronger projection",
                        "Cologne/EDC (2-4%): Light, refreshing, perfect for hot weather and quick refreshes",
                        "Eau de Toilette (5-15%): Balanced for everyday wear and casual occasions",
                        "Eau de Parfum (15-20%): Versatile choice with excellent performance for most situations",
                        "Parfum/Extrait (20-30%): Luxury experience with maximum longevity and complexity",
                        "Elixir (25-40%): Ultra-concentrated for special occasions and maximum impact",
                        "Choose concentration based on occasion, season, and desired performance level",
                        "Price generally increases with concentration due to higher oil content",
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
                <strong>Ready for more?</strong> Continue to the next module to
                explore fragrance families and learn how to identify your
                signature scent!
              </Alert>
            </Fade>
          </Container>
        </Box>
      </Fade>

      {/* Module Completion */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <ModuleCompletion
          loaded={loaded}
          moduleId="module-3"
          moduleTitle="Module 3: Fragrance Concentrations"
        />
      </Container>

      <ModuleNavigation sx={{ mt: 4 }} />
    </Container>
  );
}
