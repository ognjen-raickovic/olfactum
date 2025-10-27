import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Alert,
  Card,
  CardContent,
  useTheme,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Home,
  School,
  AccessTime,
  Waves,
  TrendingUp,
  Lightbulb,
} from "@mui/icons-material";
import SectionHeader from "../SectionHeader";
import SillageVisualizer from "./SillageVisualizer";
import LongevityTracker from "./LongevityTracker";
import ProTipsCarousel from "./ProTipsCarousel";
import ModuleNavigation from "../ModuleNavigation";

export default function Module2() {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
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
            Module 2: Sillage & Longevity
          </Typography>
        </Breadcrumbs>
      </Box>

      <ModuleNavigation />

      <SectionHeader
        title="Module 2: Sillage & Longevity"
        subtitle="Master the art of fragrance performance and scent projection"
      />

      {/* Hero Introduction */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
              : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Master Your Scent's Performance
        </Typography>
        <Typography
          variant="h6"
          sx={{ opacity: 0.9, maxWidth: 600, mx: "auto" }}
        >
          Discover how to control your fragrance's trail and lasting power.
          Learn the science behind sillage and longevity through interactive
          tools.
        </Typography>
      </Paper>

      {/* Key Concepts */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
        {[
          {
            icon: <Waves sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />,
            title: "Sillage",
            text: "The scent trail you leave behind. Like a visual shadow, but for your fragrance.",
          },
          {
            icon: (
              <AccessTime
                sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
              />
            ),
            title: "Longevity",
            text: "How long your fragrance remains detectable on your skin throughout the day.",
          },
          {
            icon: (
              <TrendingUp sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
            ),
            title: "Projection",
            text: "How far from your skin the fragrance can be detected by others.",
          },
        ].map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={8}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                textAlign: "center",
                height: "100%",
                width: "100%",
                maxWidth: 300,
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {item.icon}
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: theme.palette.text.primary }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Interactive Components */}
      <Grid container spacing={4} sx={{ mb: 4, justifyContent: "center" }}>
        <Grid item xs={12} xl={10}>
          <Grid container spacing={4} justifyContent="center">
            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%", maxWidth: 800 }}>
                <SillageVisualizer />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ width: "100%", maxWidth: 800 }}>
                <LongevityTracker />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Pro Tips */}
      <Box sx={{ mb: 4 }}>
        <ProTipsCarousel />
      </Box>

      {/* Quick Reference */}
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
        {/* Application Tips */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            sx={{
              p: 3,
              height: "100%",
              width: "100%",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.text.primary,
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Lightbulb color="warning" /> Application Tips
            </Typography>
            <Box component="ul" sx={{ pl: 2, textAlign: "left" }}>
              {[
                "Apply to moisturized, hydrated skin",
                "Focus on pulse points (wrists, neck, behind ears)",
                "Don't rub wrists together - it breaks fragrance molecules",
                "Spray from 6-8 inches away for even distribution",
                "Layer with matching lotions or oils for longevity",
              ].map((tip, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1.5, color: theme.palette.text.secondary }}
                >
                  {tip}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Sillage Control */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            sx={{
              p: 3,
              height: "100%",
              width: "100%",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.text.primary,
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Waves color="info" /> Sillage Control
            </Typography>
            <Box component="ul" sx={{ pl: 2, textAlign: "left" }}>
              {[
                "Start with 1-2 sprays and build up as needed",
                "Spray under clothing for intimate sillage",
                "Consider your environment and occasion",
                "Use lighter concentrations for close quarters",
                "Carry a travel spray for on-the-go adjustments",
                "Avoid overspraying in confined spaces",
              ].map((tip, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1.5, color: theme.palette.text.secondary }}
                >
                  {tip}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Longevity Boosters */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            sx={{
              p: 3,
              height: "100%",
              width: "100%",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.text.primary,
                justifyContent: "center",
                mb: 3,
              }}
            >
              <AccessTime color="success" /> Longevity Boosters
            </Typography>
            <Box component="ul" sx={{ pl: 2, textAlign: "left" }}>
              {[
                "Store fragrances away from heat and direct light",
                "Keep bottles in their original boxes when not in use",
                "Apply after showering to clean, moisturized skin",
                "Choose fragrances with strong base notes for longevity",
                "Reapply strategically rather than overspraying initially",
                "Use fragrance-free moisturizer as a base layer",
              ].map((tip, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1.5, color: theme.palette.text.secondary }}
                >
                  {tip}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Forward-looking Note */}
      <Alert
        severity="info"
        sx={{
          mt: 4,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.info.dark
              : theme.palette.info.light,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}
        >
          <strong>Coming Next:</strong> In Module 3, you'll learn how fragrance
          concentrations (EDT, EDP, Parfum) directly impact both sillage and
          longevity, and how to choose the right one for any occasion!
        </Typography>
      </Alert>
    </Container>
  );
}
