import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  ButtonBase,
} from "@mui/material";
import {
  LocalFlorist, // Fragrance Library
  School, // Learning Path
  Quiz, // Scent Quiz
  AutoAwesome, // Knowledge Trivia
  Bookmark, // Personal Library
  Search, // Advanced Search
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HomeFeatures = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocalFlorist sx={{ fontSize: 48 }} />,
      title: "26,000+ Fragrances",
      description:
        "Explore our extensive curated collection from niche to designer brands",
      path: "/fragrances",
      color: "primary",
    },
    {
      icon: <School sx={{ fontSize: 48 }} />,
      title: "6 Learning Modules",
      description:
        "Master fragrance knowledge step by step with structured education",
      path: "/learn",
      color: "secondary",
    },
    {
      icon: <Quiz sx={{ fontSize: 48 }} />,
      title: "Scent Quiz",
      description: "Find your perfect fragrance match in just 2 minutes",
      path: "/find-your-fragrance",
      color: "success",
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 48 }} />,
      title: "AI Knowledge Trivia",
      description:
        "Test your fragrance expertise with endless AI-powered questions",
      path: "/learn", // Will link to trivia section
      color: "warning",
    },
    {
      icon: <Bookmark sx={{ fontSize: 48 }} />,
      title: "Personal Library",
      description: "Save your favorite fragrances and create wishlists",
      path: "/library",
      color: "info",
    },
    {
      icon: <Search sx={{ fontSize: 48 }} />,
      title: "Advanced Search",
      description: "Filter by notes, season, occasion, and performance metrics",
      path: "/fragrances", // Will open with search focused
      color: "error",
    },
  ];

  const handleFeatureClick = (feature) => {
    if (feature.path) {
      navigate(feature.path);
    }
    // For future: if feature has specific state, you can pass it here
    // Example: navigate(feature.path, { state: { openSearch: true } });
  };

  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(
            theme.palette.background.default,
            0.6
          )} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
        py: 8,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Explore Olfactum
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 300,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Everything you need for your fragrance journey, all in one place
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid
              item
              xs={6} // 2 per row on mobile
              md={4} // 3 per row on desktop
              lg={4}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ButtonBase
                onClick={() => handleFeatureClick(feature)}
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                  "&:active": {
                    transform: "translateY(-4px)",
                  },
                }}
                disableRipple={!feature.path}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: 280,
                    display: "flex",
                    flexDirection: "column",
                    background: (theme) =>
                      `linear-gradient(135deg, ${alpha(
                        theme.palette[feature.color].main,
                        0.05
                      )} 0%, ${alpha(
                        theme.palette.background.paper,
                        0.9
                      )} 100%)`,
                    border: `1px solid ${alpha(
                      theme.palette[feature.color].main,
                      0.1
                    )}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    cursor: feature.path ? "pointer" : "default",
                    "&:hover": {
                      border: `1px solid ${alpha(
                        theme.palette[feature.color].main,
                        0.3
                      )}`,
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
                      alignItems: "center",
                      textAlign: "center",
                      gap: 2,
                    }}
                  >
                    {/* Icon with colored background */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: alpha(theme.palette[feature.color].main, 0.1),
                        color: `${feature.color}.main`,
                        mb: 1,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        lineHeight: 1.2,
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.4,
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {/* Interactive indicator */}
                    {feature.path && (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: alpha(
                            theme.palette[feature.color].main,
                            0.1
                          ),
                          color: `${feature.color}.main`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          mt: 1,
                        }}
                      >
                        →
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", mt: 6, pt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 300,
              fontStyle: "italic",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            "From complete beginner to fragrance connoisseur – your journey
            starts here"
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeFeatures;
