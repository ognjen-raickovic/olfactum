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
  Grow,
} from "@mui/material";
import {
  Home,
  School,
  LightMode,
  AcUnit,
  Inventory2,
  Warning,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import ModuleNavigation from "../ModuleNavigation";

export default function Module5() {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const storageTips = [
    {
      icon: <LightMode />,
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
      icon: <AcUnit />,
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
      icon: <Inventory2 />,
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
      icon: <Warning />,
      title: "Avoid Oxygen Exposure",
      description: "Oxidation can change fragrance character over time",
      tips: [
        "Keep caps tightly sealed",
        "Use regularly to maintain freshness",
        "Consider smaller bottles for rarely used scents",
      ],
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Fade in={loaded} timeout={800}>
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
              Module 5: Fragrance Storage & Care
            </Typography>
          </Breadcrumbs>
        </Box>
      </Fade>

      <ModuleNavigation />

      {/* Header */}
      <Fade in={loaded} timeout={800}>
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
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              transform: "scaleX(0)",
              animation: "slideIn 1s ease-out 0.5s forwards",
            },
            "@keyframes slideIn": {
              "0%": { transform: "scaleX(0)" },
              "100%": { transform: "scaleX(1)" },
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Fragrance Storage & Care
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Learn how to properly store and maintain your fragrance collection
            to preserve scent quality and longevity
          </Typography>
        </Paper>
      </Fade>

      {/* Introduction */}
      <Grow in={loaded} timeout={800}>
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
            Why Proper Storage Matters
          </Typography>
          <Typography variant="body1" paragraph>
            Fragrances are delicate chemical compositions that can be easily
            damaged by environmental factors. Proper storage isn't just about
            organization—it's about preserving the artistic integrity of the
            scent and ensuring it smells exactly as the perfumer intended for
            years to come.
          </Typography>
          <Typography variant="body1">
            Think of your fragrance collection as an investment. A
            well-maintained bottle can last for decades, while improper storage
            can ruin a fragrance in months.
          </Typography>
        </Paper>
      </Grow>

      {/* Storage Tips Grid */}
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
          Essential Storage Guidelines
        </Typography>
      </Fade>

      <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
        {storageTips.map((tip, index) => (
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            lg={5}
            xl={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grow
              in={loaded}
              timeout={1000}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 480, // Increased width
                  height: 420, // Increased height
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}, transparent)`,
                    transition: "left 0.6s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: `0 20px 40px ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                    "&::before": {
                      left: "100%",
                    },
                    "& .card-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
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
                        fontSize: { xs: 48, md: 56 },
                        mb: 3,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {tip.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        fontSize: { xs: "1.5rem", md: "1.75rem" },
                      }}
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
                  </Box>
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
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Sunlight Damage Warning */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            border: `2px solid ${theme.palette.warning.main}`,
            backgroundColor: alpha(theme.palette.warning.main, 0.05),
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: `0 8px 32px ${alpha(theme.palette.warning.main, 0.1)}`,
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "warning.main",
              textAlign: "center",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            ⚠️ Sunlight Damage: Real Example
          </Typography>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}
          >
            <strong>Direct sunlight is the #1 enemy of fragrances.</strong> UV
            radiation breaks down the delicate aromatic compounds, causing
            irreversible damage.
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
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
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
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
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

          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
          >
            What Sunlight Damage Causes:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 2 }}>
            {[
              "Color changes: Fragrances can darken or change color dramatically (as shown with Lattafa Ameer Al Oudh Intense Oud turning green)",
              "Scent alteration: Top notes evaporate faster, middle and base notes break down, completely changing the fragrance profile",
              "Reduced longevity: The fragrance becomes weaker and doesn't project or last as long on skin",
              "Chemical breakdown: UV radiation causes photochemical reactions that permanently alter the molecular structure",
            ].map((item, index) => (
              <Typography
                key={index}
                component="li"
                variant="body1"
                sx={{
                  mb: 2,
                  padding: "8px 12px",
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.warning.main, 0.05),
                  borderLeft: `4px solid ${theme.palette.warning.main}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    transform: "translateX(4px)",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <Paper
            sx={{
              p: 3,
              backgroundColor: alpha(theme.palette.info.main, 0.1),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.info.main, 0.15),
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              fontStyle="italic"
            >
              💡 <strong>Pro Tip:</strong> If you want to display your
              collection, use UV-protected glass cabinets or keep bottles in
              their original boxes. The few seconds of sunlight exposure each
              day when displaying fragrances can accumulate over time and cause
              significant damage.
            </Typography>
          </Paper>
        </Paper>
      </Fade>

      {/* Best Practices Summary */}
      <Fade in={loaded} timeout={800}>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.success.main,
              0.1
            )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: `0 8px 32px ${alpha(theme.palette.success.main, 0.1)}`,
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "success.main",
              textAlign: "center",
              mb: 4,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            ✅ Ideal Storage Checklist
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.success.main, 0.08),
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "success.main" }}
                >
                  Do:
                </Typography>
                <Box component="ul">
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
                        mb: 1.5,
                        padding: "4px 8px",
                        borderRadius: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.success.main,
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.error.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.error.main, 0.08),
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "error.main" }}
                >
                  Don't:
                </Typography>
                <Box component="ul">
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
                        mb: 1.5,
                        padding: "4px 8px",
                        borderRadius: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Container>
  );
}
