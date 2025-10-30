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
  Grid,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import {
  Home,
  School,
  Waves,
  AccessTime,
  TrendingUp,
  Whatshot,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import SillageVisualizer from "./SillageVisualizer";
import LongevityTracker from "./LongevityTracker";
import ProTipsCarousel from "./ProTipsCarousel";
import ModuleNavigation from "../ModuleNavigation";
import ModuleCompletion from "../ModuleCompletion";

export default function Module2() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const performanceCards = [
    {
      icon: <Waves sx={{ fontSize: 40 }} />,
      title: "Sillage Mastery",
      description:
        "Learn to control your scent trail and understand how fragrances project in different environments",
    },
    {
      icon: <AccessTime sx={{ fontSize: 40 }} />,
      title: "Longevity Secrets",
      description:
        "Discover techniques to make your fragrances last longer and maintain their character throughout the day",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "Performance Optimization",
      description:
        "Master the art of fragrance application for optimal projection and lasting power",
    },
  ];

  const coreConcepts = [
    {
      icon: <Waves />,
      title: "Sillage",
      description:
        "The scent trail you leave behind - your fragrance's footprint in the air",
      items: [
        "Measured by distance and intensity",
        "Affected by fragrance concentration",
        "Varies by environment and movement",
        "Can be intimate, moderate, or strong",
      ],
    },
    {
      icon: <AccessTime />,
      title: "Longevity",
      description: "How long your fragrance remains detectable on your skin",
      items: [
        "Ranges from 2-12+ hours typically",
        "Depends on skin chemistry and type",
        "Influenced by application technique",
        "Varies by fragrance concentration",
      ],
    },
    {
      icon: <TrendingUp />,
      title: "Projection",
      description: "How far your fragrance travels from your skin",
      items: [
        "Different from sillage (trail vs distance)",
        "Strongest in the first 1-2 hours",
        "Affected by body heat and pulse points",
        "Can be controlled with application",
      ],
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
              Module 2: Sillage & Longevity
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
              <Whatshot sx={{ fontSize: { xs: 48, md: 64 } }} color="primary" />
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
                  Sillage & Longevity
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                    maxWidth: 600,
                  }}
                >
                  Master the art of fragrance performance and learn how to
                  control your scent's trail and lasting power
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Slide>

      {/* Introduction Section - Full Width */}
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
            <Box>
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
                The Science of Fragrance Performance
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
                Understanding sillage and longevity transforms how you choose
                and wear fragrances. These two factors determine not just how
                long your scent lasts, but how it interacts with your
                environment and the people around you. Master these concepts to
                become a more intentional and sophisticated fragrance wearer.
              </Typography>

              <Alert
                severity="info"
                sx={{
                  fontSize: "1.1rem",
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                  backgroundColor: alpha(theme.palette.info.main, 0.08),
                  "& .MuiAlert-message": {
                    width: "100%",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "info.main" }}
                >
                  🎯 Performance Matters
                </Typography>
                <Typography variant="body1">
                  A fragrance that performs well adapts to your lifestyle -
                  intimate when needed, projecting when desired, and lasting as
                  long as you need it to.
                </Typography>
              </Alert>
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Performance Cards - Three in One Row (smaller fixed size, centered layout) */}
      <Fade in={loaded} timeout={1000}>
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
            sx={{ flexWrap: "wrap" }}
          >
            {performanceCards.map((card, index) => (
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
                      width: 340, // fixed width for consistency
                      height: 300, // fixed height for proportionate layout
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

      {/* Core Performance Concepts */}
      <Fade in={loaded} timeout={1000}>
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            🔬 Core Performance Concepts
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 720, mx: "auto" }}
          >
            Understand the fundamental concepts that determine how your
            fragrance performs throughout the day.
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
            sx={{ flexWrap: "wrap" }}
          >
            {[
              {
                title: "Sillage",
                description:
                  "The scent trail you leave behind — your fragrance's footprint in the air.",
                points: [
                  "Measured by distance and intensity",
                  "Affected by fragrance concentration",
                  "Varies by environment and movement",
                  "Can be intimate, moderate, or strong",
                ],
                icon: "🌫️",
              },
              {
                title: "Longevity",
                description:
                  "How long your fragrance remains detectable on your skin.",
                points: [
                  "Ranges from 2–12+ hours typically",
                  "Depends on skin chemistry and type",
                  "Influenced by application technique",
                  "Varies by fragrance concentration",
                ],
                icon: "⏳",
              },
              {
                title: "Projection",
                description: "How far your fragrance travels from your skin.",
                points: [
                  "Different from sillage (trail vs distance)",
                  "Strongest in the first 1–2 hours",
                  "Affected by body heat and pulse points",
                  "Can be controlled with application",
                ],
                icon: "📡",
              },
            ].map((concept, index) => (
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
                      height: 340,
                      textAlign: "center",
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
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
                    <CardContent sx={{ p: 0, width: "100%" }}>
                      <Typography
                        variant="h3"
                        sx={{ color: "primary.main", mb: 1 }}
                      >
                        {concept.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {concept.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, px: 1 }}
                      >
                        {concept.description}
                      </Typography>
                      <Box
                        component="ul"
                        sx={{
                          listStyle: "none",
                          p: 0,
                          m: 0,
                          textAlign: "left",
                          color: "text.secondary",
                          fontSize: "0.9rem",
                        }}
                      >
                        {concept.points.map((point, i) => (
                          <Typography
                            component="li"
                            key={i}
                            sx={{
                              mb: 0.6,
                              "&::before": {
                                content: '"•"',
                                color: theme.palette.primary.main,
                                fontWeight: "bold",
                                display: "inline-block",
                                width: "1em",
                                marginLeft: "-1em",
                              },
                            }}
                          >
                            {point}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Fade>

      {/* Interactive Components Section */}
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
              🎮 Interactive Tools
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
              Explore these interactive tools to visualize and understand
              fragrance performance concepts
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} lg={6}>
                <SillageVisualizer />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LongevityTracker />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Fade>

      {/* Pro Tips Section */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            mb: 6,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.success.main,
              0.05
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            borderRadius: 0,
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
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              💡 Professional Tips & Techniques
            </Typography>

            <ProTipsCarousel />
          </Container>
        </Paper>
      </Fade>

      {/* Key Takeaways */}
      <Fade in={loaded} timeout={800}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            py: { xs: 4, md: 6 },
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
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
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      border: `2px solid ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box component="ul" sx={{ pl: 0, textAlign: "left" }}>
                      {[
                        "Sillage is your scent trail, longevity is duration, projection is distance",
                        "Proper application on pulse points maximizes both sillage and longevity",
                        "Fragrance concentration (EDT, EDP, Parfum) directly affects performance",
                        "Skin type and chemistry significantly influence how fragrances develop",
                        "Environment and temperature impact how your fragrance projects",
                        "Layering with unscented moisturizers can extend longevity",
                        "Strategic reapplication beats initial overspraying for balanced performance",
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
                              theme.palette.primary.main,
                              0.08
                            ),
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
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
          </Container>
        </Box>
      </Fade>

      {/* Module Completion */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <ModuleCompletion
          loaded={loaded}
          moduleId="module-2"
          moduleTitle="Module 2: Sillage & Longevity"
        />
      </Container>

      <ModuleNavigation sx={{ mt: 4 }} />
    </Container>
  );
}
