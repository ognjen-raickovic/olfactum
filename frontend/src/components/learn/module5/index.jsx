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
  LightMode,
  AcUnit,
  Inventory2,
  Warning,
  Storage,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import ModuleNavigation from "../ModuleNavigation";
import ModuleCompletion from "../ModuleCompletion";

export default function Module5() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const storageTips = [
    {
      icon: <LightMode sx={{ fontSize: 40 }} />,
      title: "Avoid Direct Sunlight",
      description:
        "UV rays break down fragrance molecules and alter the scent composition",
      tips: [
        "Store in dark cabinets or drawers",
        "Keep in original boxes when possible",
        "Avoid windowsills and display shelves in direct light",
      ],
    },
    {
      icon: <AcUnit sx={{ fontSize: 40 }} />,
      title: "Control Temperature",
      description:
        "Heat accelerates chemical reactions that degrade fragrance quality",
      tips: [
        "Ideal temperature: 15-20°C (59-68°F)",
        "Avoid bathrooms (humidity and temperature fluctuations)",
        "Never leave in cars or near heaters",
      ],
    },
    {
      icon: <Inventory2 sx={{ fontSize: 40 }} />,
      title: "Proper Positioning",
      description:
        "How you store bottles affects their longevity and preservation",
      tips: [
        "Keep bottles upright to prevent leakage",
        "Store in cool, dry places",
        "Consider a dedicated fragrance storage box",
      ],
    },
    {
      icon: <Warning sx={{ fontSize: 40 }} />,
      title: "Avoid Oxygen Exposure",
      description: "Oxidation can change fragrance character over time",
      tips: [
        "Keep caps tightly sealed",
        "Use regularly to maintain freshness",
        "Consider smaller bottles for rarely used scents",
      ],
    },
  ];

  const featureCards = [
    {
      icon: <Storage sx={{ fontSize: 40 }} />,
      title: "Preserve Quality",
      description:
        "Proper storage maintains the perfumer's original vision and scent integrity for years",
    },
    {
      icon: <LightMode sx={{ fontSize: 40 }} />,
      title: "Prevent Damage",
      description:
        "Protect your investment from environmental factors that can ruin fragrances",
    },
    {
      icon: <AcUnit sx={{ fontSize: 40 }} />,
      title: "Extend Longevity",
      description:
        "Well-stored fragrances maintain their character and performance over time",
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
              Module 5: Fragrance Storage & Care
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
              <Storage sx={{ fontSize: { xs: 48, md: 64 } }} color="primary" />
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
                  Fragrance Storage & Care
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                    maxWidth: 600,
                  }}
                >
                  Learn how to properly store and maintain your fragrance
                  collection to preserve scent quality and longevity for years
                  to come
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
                  Why Proper Storage Matters
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
                  Fragrances are delicate chemical compositions that can be
                  easily damaged by environmental factors. Proper storage isn't
                  just about organization—it's about preserving the artistic
                  integrity of the scent and ensuring it smells exactly as the
                  perfumer intended for years to come. Think of your fragrance
                  collection as an investment that deserves proper care.
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
                    🛡️ Protect Your Investment
                  </Typography>
                  <Typography variant="body1">
                    A well-maintained bottle can last for decades, while
                    improper storage can ruin a fragrance in months. Proper care
                    ensures your collection maintains its value and scent
                    integrity over time.
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

      {/* Storage Guidelines Section - Now in 2x2 Grid */}
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
              📦 Essential Storage Guidelines
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
              Follow these essential guidelines to protect your fragrance
              collection from common environmental threats and ensure
              long-lasting quality
            </Typography>

            {/* 2x2 Grid Layout */}
            <Grid container spacing={4} justifyContent="center">
              {storageTips.map((tip, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Zoom in={loaded} timeout={800 + index * 200}>
                    <Card
                      sx={{
                        height: "100%",
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
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Box sx={{ color: "primary.main", mb: 2 }}>
                          {tip.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          {tip.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 3, lineHeight: 1.6 }}
                        >
                          {tip.description}
                        </Typography>
                        <Box component="ul" sx={{ textAlign: "left", pl: 2 }}>
                          {tip.tips.map((item, tipIndex) => (
                            <Typography
                              key={tipIndex}
                              component="li"
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: 1.5,
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
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Fade>

      {/* Sunlight Damage Warning */}
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
              ⚠️ Sunlight Damage: Real Example
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
              <strong>Direct sunlight is the #1 enemy of fragrances.</strong> UV
              radiation breaks down the delicate aromatic compounds, causing
              irreversible damage as shown in this real-world example.
            </Typography>

            {/* Image Comparison */}
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
              <Grid item xs={12} md={5}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src="/images/module5_regular.webp"
                    alt="Lattafa Ameer Al Oudh Intense Oud - Normal Color"
                    sx={{
                      width: "100%",
                      maxWidth: 400,
                      height: 420,
                      objectFit: "cover",
                      borderRadius: 3,
                      boxShadow: 4,
                      mb: 3,
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.03)",
                        boxShadow: `0 20px 40px ${alpha(
                          theme.palette.success.main,
                          0.3
                        )}`,
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="success.main"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    ✅ Properly Stored
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lattafa Ameer Al Oudh Intense Oud stored in dark, cool
                    conditions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src="/images/module5_green.jpeg"
                    alt="Lattafa Ameer Al Oudh Intense Oud - Damaged by Sunlight"
                    sx={{
                      width: "100%",
                      maxWidth: 400,
                      height: 420,
                      objectFit: "cover",
                      borderRadius: 3,
                      boxShadow: 4,
                      mb: 3,
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.03)",
                        boxShadow: `0 20px 40px ${alpha(
                          theme.palette.warning.main,
                          0.3
                        )}`,
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="warning.main"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    ❌ Sunlight Damaged
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Same fragrance turned green after prolonged sun exposure
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Alert
              severity="warning"
              sx={{
                mb: 4,
                fontSize: "1rem",
                p: 3,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                backgroundColor: alpha(theme.palette.warning.main, 0.08),
              }}
            >
              <Typography variant="body1" fontStyle="italic">
                <strong>What Sunlight Damage Causes:</strong> Color changes,
                scent alteration, reduced longevity, and chemical breakdown that
                permanently alters the molecular structure.
              </Typography>
            </Alert>

            <Paper
              sx={{
                p: 3,
                backgroundColor: alpha(theme.palette.info.main, 0.1),
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                fontStyle="italic"
                sx={{ lineHeight: 1.6 }}
              >
                💡 <strong>Pro Tip:</strong> If you want to display your
                collection, use UV-protected glass cabinets or keep bottles in
                their original boxes. The few seconds of sunlight exposure each
                day when displaying fragrances can accumulate over time and
                cause significant damage.
              </Typography>
            </Paper>
          </Container>
        </Paper>
      </Fade>

      {/* Do's and Don'ts Section - Inspired by Module 6 */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            mb: 6,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.success.main,
              0.1
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
                mb: 6,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              ✅ Storage Best Practices
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
                        backgroundColor: alpha(
                          theme.palette.success.main,
                          0.08
                        ),
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
                        "Store in cool, dark places (closets, drawers)",
                        "Keep bottles upright and sealed",
                        "Maintain consistent room temperature (15-20°C / 59-68°F)",
                        "Use within 3-5 years for optimal freshness",
                        "Keep in original packaging when possible",
                        "Store in interior rooms away from windows",
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
                      border: `2px solid ${alpha(
                        theme.palette.error.main,
                        0.3
                      )}`,
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
                        "Don't store in bathrooms (heat & humidity)",
                        "Don't leave in direct sunlight",
                        "Don't keep in hot cars or near heaters",
                        "Don't store near windows or in bright rooms",
                        "Don't expose to extreme temperature changes",
                        "Don't display without UV protection",
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
                <strong>Remember:</strong> Even brief daily exposure to sunlight
                can accumulate over time and cause permanent damage to your
                fragrances. When in doubt, store them in the dark!
              </Alert>
            </Fade>
          </Container>
        </Paper>
      </Fade>

      {/* Key Takeaways - Green Theme */}
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
                        "Sunlight is the #1 enemy - UV rays break down fragrance molecules and cause irreversible damage",
                        "Ideal storage temperature: 15-20°C (59-68°F) - avoid extreme heat and cold",
                        "Store in dark, dry places - closets and drawers are perfect, bathrooms are terrible",
                        "Keep bottles upright and sealed - prevents leakage and oxidation",
                        "Use within 3-5 years for optimal freshness - well-stored fragrances can last much longer",
                        "Original boxes provide excellent protection - especially from light exposure",
                        "Avoid temperature fluctuations - consistent conditions preserve scent integrity",
                        "Display carefully - use UV-protected cabinets if you must display your collection",
                        "Regular use maintains freshness - oxygen exposure during use helps prevent stagnation",
                        "Consider collection size - smaller collections are easier to maintain properly",
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
                <strong>Your collection deserves the best care!</strong> Proper
                storage ensures your fragrances will smell exactly as intended
                for years to come, preserving both their scent and their value.
              </Alert>
            </Fade>
          </Container>
        </Box>
      </Fade>

      {/* Module Completion */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <ModuleCompletion
          loaded={loaded}
          moduleId="module-5"
          moduleTitle="Module 5: Fragrance Storage & Care"
        />
      </Container>

      <ModuleNavigation sx={{ mt: 4 }} />
    </Container>
  );
}
