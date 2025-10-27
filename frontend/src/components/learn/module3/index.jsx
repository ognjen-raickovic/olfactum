import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Home, School, LocalBar } from "@mui/icons-material";
import SectionHeader from "../SectionHeader";
import ModuleNavigation from "../ModuleNavigation";
import ConcentrationSlider from "./ConcentrationSlider";
import ConcentrationDetails from "./ConcentrationDetails";

export default function Module3() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedConcentration, setSelectedConcentration] = useState(2); // Start with Eau de Parfum

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
      name: "Parfum / Extrait de Parfum",
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
            Module 3: Fragrance Concentrations
          </Typography>
        </Breadcrumbs>
      </Box>

      <ModuleNavigation />

      {/* Module 3 Header */}
      <SectionHeader
        title="Module 3: Fragrance Concentrations"
        subtitle="Understand the differences between Cologne, Eau de Toilette, Eau de Parfum, Parfum, and Elixir - and how concentration affects longevity and sillage"
        icon={<LocalBar />}
      />

      {/* Introduction */}
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          What is Fragrance Concentration?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Fragrance concentration refers to the percentage of aromatic compounds
          (perfume oil) in the fragrance mixture. Higher concentrations mean
          more perfume oil and less alcohol, resulting in longer-lasting scents
          with stronger projection.
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            backgroundColor:
              theme.palette.mode === "dark" ? "grey.900" : "grey.50",
            borderColor:
              theme.palette.mode === "dark" ? "grey.700" : "grey.200",
          }}
        >
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            <strong>Note:</strong> Eau de Cologne and Cologne are essentially
            the same. Parfum and Extrait de Parfum are very similar, with
            Extrait typically having slightly higher concentration (20-40% vs
            20-30%). Elixir is a modern marketing term for ultra-high
            concentrations.
          </Typography>
        </Paper>
      </Paper>

      {/* Concentration Slider + Details */}
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} lg={6}>
          <ConcentrationSlider
            concentrations={concentrations}
            selectedIndex={selectedConcentration}
            onChange={setSelectedConcentration}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ConcentrationDetails
            concentration={concentrations[selectedConcentration]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
