import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Breadcrumbs,
  Link,
  Fade,
  Slide,
  Zoom,
  List,
  Chip,
  Alert,
} from "@mui/material";
import {
  Home,
  School,
  Science,
  Compare,
  Psychology,
  Timeline,
  Biotech,
  Lightbulb,
  Thermostat,
  WaterDrop,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import ModuleNavigation from "../ModuleNavigation";
import ModuleCompletion from "../ModuleCompletion";

export default function Module6() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const testingTechniques = [
    {
      icon: <Compare />,
      title: "Skin vs Paper Testing",
      description:
        "Understand when to use each method for accurate fragrance evaluation",
      items: [
        "Skin testing reveals personal chemistry effects",
        "Paper testing shows fragrance's true character",
        "Always test on skin before purchasing",
        "Use paper for quick comparisons",
      ],
    },
    {
      icon: <Psychology />,
      title: "Skin Chemistry Factors",
      description: "How your unique biology transforms fragrances",
      items: [
        "pH levels (acidic vs alkaline skin)",
        "Moisture content (dry vs oily)",
        "Body temperature variations",
        "Natural skin oils composition",
      ],
    },
    {
      icon: <Timeline />,
      title: "Fragrance Evolution",
      description: "Understanding the complete scent journey on your skin",
      items: [
        "Top Notes: 0-30 minutes",
        "Heart Notes: 30 min - 4 hours",
        "Base Notes: 4+ hours",
        "Skin chemistry affects each phase differently",
      ],
    },
    {
      icon: <Biotech />,
      title: "Aging Processes",
      description: "How time transforms fragrances in bottle and on skin",
      items: [
        "Maceration: Intentional blending",
        "Oxidation: Chemical degradation",
        "Maturation: Natural evolution",
        "Proper storage preserves quality",
      ],
    },
  ];

  const skinChemistryEffects = [
    {
      icon: <Thermostat />,
      title: "Temperature Effects",
      effects: [
        "Warmer skin intensifies projection",
        "Cooler skin makes scents subtler",
        "Body heat accelerates note evolution",
      ],
    },
    {
      icon: <WaterDrop />,
      title: "Moisture Levels",
      effects: [
        "Oily skin extends longevity",
        "Dry skin reduces scent duration",
        "Hydrated skin maintains balance",
      ],
    },
    {
      icon: <Science />,
      title: "pH Balance",
      effects: [
        "Acidic skin can sour sweet notes",
        "Alkaline skin mutes freshness",
        "Neutral pH preserves true character",
      ],
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Fade in={loaded} timeout={500}>
        <Box mb={3}>
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
              Module 6: Fragrance Testing & Skin Chemistry
            </Typography>
          </Breadcrumbs>
        </Box>
      </Fade>

      <ModuleNavigation />

      {/* Header */}
      <Slide in={loaded} direction="down" timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            textAlign: "center",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mb={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Science sx={{ fontSize: { xs: 32, md: 40 } }} color="primary" />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", md: "3rem" },
                textAlign: "center",
              }}
            >
              Fragrance Testing & Skin Chemistry
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Master the art of fragrance testing and understand how your unique
            skin chemistry transforms scents
          </Typography>
        </Paper>
      </Slide>

      {/* Introduction */}
      <Zoom in={loaded} timeout={600}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            border: `1px solid ${theme.palette.divider}`,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: 4,
              transform: "translateY(-2px)",
            },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            The Science of Scent Testing
          </Typography>
          <Typography variant="body1" paragraph>
            Testing fragrances is both an art and a science. Your skin chemistry
            acts as a unique canvas that can dramatically alter how a fragrance
            develops and performs. Understanding these interactions helps you
            make better purchasing decisions and appreciate the full complexity
            of each scent.
          </Typography>
          <Typography variant="body1">
            From the initial spray to the final dry-down, every fragrance tells
            a story on your skin that's different from anyone else's. Learning
            proper testing techniques ensures you experience the perfumer's true
            vision.
          </Typography>
        </Paper>
      </Zoom>

      {/* Testing Techniques Grid */}
      <Fade in={loaded} timeout={800}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          Essential Testing Techniques
        </Typography>
      </Fade>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{
          mb: 6,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {testingTechniques.map((technique, index) => (
          <Grid
            item
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Slide in={loaded} direction="up" timeout={800 + index * 200}>
              <Card
                sx={{
                  width: 380,
                  height: 420,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 16px 32px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}`,
                    "& .card-icon": {
                      transform: "scale(1.1)",
                      color: theme.palette.secondary.main,
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    textAlign: "center",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Box
                      className="card-icon"
                      sx={{
                        color: "primary.main",
                        fontSize: 56,
                        mb: 2,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {technique.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: "bold", fontSize: "1.5rem", mb: 1 }}
                    >
                      {technique.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {technique.description}
                    </Typography>
                  </Box>

                  <Box
                    component="ul"
                    sx={{
                      textAlign: "left",
                      pl: 2,
                      mt: "auto",
                      mb: 0,
                      overflow: "hidden",
                    }}
                  >
                    {technique.items.map((item, itemIndex) => (
                      <Typography
                        key={itemIndex}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "primary.main",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
      {/* Skin Chemistry Effects */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            border: `2px solid ${theme.palette.info.main}`,
            backgroundColor: alpha(theme.palette.info.main, 0.05),
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "info.main",
              textAlign: "center",
              mb: 4,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            🔬 Skin Chemistry Effects
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}
          >
            Your skin's unique composition acts as a chemical laboratory that
            transforms every fragrance you wear
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {skinChemistryEffects.map((effect, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in={loaded} timeout={600 + index * 200}>
                  <Box sx={{ textAlign: "center", height: "100%" }}>
                    <Box
                      sx={{
                        color: "info.main",
                        fontSize: { xs: 48, md: 56 },
                        mb: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {effect.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "info.main", mb: 3 }}
                    >
                      {effect.title}
                    </Typography>
                    <Box component="ul" sx={{ textAlign: "left", pl: 0 }}>
                      {effect.effects.map((item, itemIndex) => (
                        <Typography
                          key={itemIndex}
                          component="li"
                          variant="body1"
                          sx={{
                            mb: 2,
                            padding: "8px 12px",
                            borderRadius: 1,
                            backgroundColor: alpha(
                              theme.palette.info.main,
                              0.05
                            ),
                            borderLeft: `4px solid ${theme.palette.info.main}`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.info.main,
                                0.1
                              ),
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Fade>

      {/* Aging Processes */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            border: `2px solid ${theme.palette.warning.main}`,
            backgroundColor: alpha(theme.palette.warning.main, 0.05),
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "warning.main",
              textAlign: "center",
              mb: 4,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            ⚗️ Aging Processes Explained
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Slide in={loaded} direction="right" timeout={800}>
                <Card
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Biotech color="primary" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography
                      variant="h5"
                      gutterBottom
                      color="primary"
                      fontWeight="bold"
                    >
                      Maceration
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Intentional aging process where fragrance ingredients
                      blend and harmonize over time
                    </Typography>
                    <Chip
                      label="Controlled Process"
                      color="primary"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide in={loaded} direction="up" timeout={800}>
                <Card
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Science color="secondary" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography
                      variant="h5"
                      gutterBottom
                      color="secondary"
                      fontWeight="bold"
                    >
                      Oxidation
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Chemical reaction with oxygen that can degrade fragrance
                      quality over time
                    </Typography>
                    <Chip
                      label="Degradation"
                      color="warning"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide in={loaded} direction="left" timeout={800}>
                <Card
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Lightbulb color="success" sx={{ fontSize: 48, mb: 2 }} />
                    <Typography
                      variant="h5"
                      gutterBottom
                      color="success"
                      fontWeight="bold"
                    >
                      Maturation
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Natural evolution where fragrance develops complexity and
                      depth after opening
                    </Typography>
                    <Chip
                      label="Natural Evolution"
                      color="success"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          </Grid>
        </Paper>
      </Fade>

      {/* Best Practices - Centered and Symmetrical */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.success.main,
              0.1
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "success.main",
              textAlign: "center",
              mb: 6,
              fontSize: { xs: "1.5rem", md: "2.25rem" },
            }}
          >
            ✅ Professional Testing Checklist
          </Typography>

          <Grid
            container
            spacing={6}
            justifyContent="center"
            sx={{ maxWidth: 1200, mx: "auto" }}
          >
            <Grid item xs={12} md={5}>
              <Zoom in={loaded} timeout={600}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.success.main, 0.05),
                    border: `2px solid ${alpha(
                      theme.palette.success.main,
                      0.3
                    )}`,
                    height: "100%",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.success.main, 0.08),
                      transform: "translateY(-6px)",
                      boxShadow: `0 12px 24px ${alpha(
                        theme.palette.success.main,
                        0.15
                      )}`,
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "success.main", mb: 4 }}
                  >
                    Do:
                  </Typography>
                  <Box component="ul" sx={{ pl: 0, textAlign: "left" }}>
                    {[
                      "Test on clean, fragrance-free skin",
                      "Spray from 6-8 inches distance",
                      "Wait 30 minutes for heart notes",
                      "Test maximum 3-4 scents per session",
                      "Re-evaluate after 4-6 hours",
                      "Take notes on each development phase",
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
                </Box>
              </Zoom>
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: "80%",
                  background: `linear-gradient(180deg, ${theme.palette.success.main}, ${theme.palette.error.main})`,
                  borderRadius: 2,
                  opacity: 0.6,
                }}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Zoom in={loaded} timeout={800}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                    border: `2px solid ${alpha(theme.palette.error.main, 0.3)}`,
                    height: "100%",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.error.main, 0.08),
                      transform: "translateY(-6px)",
                      boxShadow: `0 12px 24px ${alpha(
                        theme.palette.error.main,
                        0.15
                      )}`,
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "error.main", mb: 4 }}
                  >
                    Don't:
                  </Typography>
                  <Box component="ul" sx={{ pl: 0, textAlign: "left" }}>
                    {[
                      "Don't rub wrists together (breaks molecules)",
                      "Don't test on empty stomach",
                      "Don't make quick judgments",
                      "Don't test too many at once",
                      "Don't ignore skin chemistry effects",
                      "Don't rely only on paper testing",
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
                            theme.palette.error.main,
                            0.08
                          ),
                          borderLeft: `4px solid ${theme.palette.error.main}`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.error.main,
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
                </Box>
              </Zoom>
            </Grid>
          </Grid>

          <Fade in={loaded} timeout={1000}>
            <Alert
              severity="warning"
              sx={{
                mt: 6,
                fontSize: "1.1rem",
                maxWidth: 800,
                mx: "auto",
                textAlign: "center",
                p: 3,
                borderRadius: 3,
              }}
            >
              <strong>Remember:</strong> Always test fragrances on your own
              skin. Paper strips and other people's experiences can't predict
              how a scent will interact with your unique chemistry.
            </Alert>
          </Fade>
        </Paper>
      </Fade>
      <ModuleCompletion
        loaded={loaded}
        moduleId="module-6"
        moduleTitle="Module 6: Fragrance Testing & Skin Chemistry"
      />
      <ModuleNavigation sx={{ mt: 4 }} />
    </Container>
  );
}
