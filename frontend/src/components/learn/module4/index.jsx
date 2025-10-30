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
  Palette,
  Spa,
  LocalFlorist,
  Park,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import FamilyOverview from "./FamilyOverview";
import FamilyModal from "./FamilyModal";
import FragranceModal from "../../FragranceModal";
import ModuleNavigation from "../ModuleNavigation";
import ModuleCompletion from "../ModuleCompletion";

export default function Module4() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [fragranceModalOpen, setFragranceModalOpen] = useState(false);
  const [familyModalOpen, setFamilyModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleFragranceClick = (fragrance) => {
    setSelectedFragrance(fragrance);
    setFragranceModalOpen(true);
  };

  const handleFamilyClick = (family) => {
    setSelectedFamily(family);
    setFamilyModalOpen(true);
  };

  const handleCloseFragranceModal = () => {
    setFragranceModalOpen(false);
    setSelectedFragrance(null);
  };

  const handleCloseFamilyModal = () => {
    setFamilyModalOpen(false);
    setSelectedFamily(null);
  };

  const featureCards = [
    {
      icon: <Palette sx={{ fontSize: 40 }} />,
      title: "Family Classification",
      description:
        "Learn to categorize fragrances into major families and understand their unique characteristics",
    },
    {
      icon: <Spa sx={{ fontSize: 40 }} />,
      title: "Scent Recognition",
      description:
        "Develop your ability to identify fragrance families by their dominant notes and accords",
    },
    {
      icon: <LocalFlorist sx={{ fontSize: 40 }} />,
      title: "Personal Discovery",
      description:
        "Discover which fragrance families resonate with your personality and preferences",
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
              Module 4: Fragrance Families
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
              <Palette sx={{ fontSize: { xs: 48, md: 64 } }} color="primary" />
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
                  Fragrance Families
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                    maxWidth: 600,
                  }}
                >
                  Discover the major fragrance families and learn to identify
                  your signature scent style through systematic classification
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
                  What are Fragrance Families?
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
                  Fragrance families are classification systems that group
                  perfumes based on their dominant scent characteristics and
                  olfactory profiles. Understanding these families helps you
                  navigate the vast world of fragrances, identify scents you'll
                  love, and build a cohesive collection that reflects your
                  personal style across different occasions and seasons.
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
                    🎨 Your Olfactory Palette
                  </Typography>
                  <Typography variant="body1">
                    Just as artists have color palettes, fragrance lovers have
                    scent families. Learning to recognize these families helps
                    you become more intentional about the scents you choose and
                    wear.
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

      {/* Interactive Fragrance Families Explorer */}
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
              🎨 Fragrance Families Explorer
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
              Explore the major fragrance families and their characteristics.
              Click on each family to discover its unique scent profile, popular
              examples, and ideal occasions.
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
                <strong>Tip:</strong> Most modern fragrances blend multiple
                families, creating unique and complex scent profiles. Use these
                classifications as a starting point for your fragrance journey.
              </Typography>
            </Alert>

            <FamilyOverview onFamilyClick={handleFamilyClick} />
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
                        "Fragrance families help categorize scents based on dominant characteristics",
                        "Citrus/Fresh: Bright, uplifting scents perfect for daytime and warm weather",
                        "Floral: Romantic, feminine scents featuring flower notes like rose and jasmine",
                        "Oriental: Warm, spicy scents with amber, vanilla, and exotic spices",
                        "Woody: Earthy, masculine scents featuring sandalwood, cedar, and vetiver",
                        "Fougère: Classic masculine scents with lavender, oakmoss, and coumarin",
                        "Chypre: Sophisticated scents built on bergamot, oakmoss, and labdanum",
                        "Gourmand: Sweet, edible scents featuring vanilla, chocolate, and caramel",
                        "Most modern fragrances blend multiple families for complexity",
                        "Understanding families helps you discover new scents you'll love",
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
                <strong>Congratulations!</strong> You've completed the
                foundational modules. Continue exploring to deepen your
                fragrance knowledge and build your perfect scent wardrobe!
              </Alert>
            </Fade>
          </Container>
        </Box>
      </Fade>

      {/* Module Completion - Only keeping the lower one */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <ModuleCompletion
          loaded={loaded}
          moduleId="module-4"
          moduleTitle="Module 4: Fragrance Families"
        />
      </Container>

      {/* Modals */}
      <FamilyModal
        family={selectedFamily}
        open={familyModalOpen}
        onClose={handleCloseFamilyModal}
        onFragranceClick={handleFragranceClick}
      />

      <FragranceModal
        fragrance={selectedFragrance}
        open={fragranceModalOpen}
        onClose={handleCloseFragranceModal}
      />

      <ModuleNavigation sx={{ mt: 4 }} />
    </Container>
  );
}
