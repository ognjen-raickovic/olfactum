import {
  Paper,
  Typography,
  Box,
  Container,
  Breadcrumbs,
  Link,
  useTheme,
  alpha,
} from "@mui/material";
import { Home, School } from "@mui/icons-material";
import SectionHeader from "../SectionHeader";
import FragrancePyramid from "./FragrancePyramid";
import NoteClassification from "./NoteClassification";
import ModuleNavigation from "../ModuleNavigation";

export default function Module1() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      {/* Breadcrumbs */}
      <Box mb={3}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
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

      {/* Navigation */}
      <ModuleNavigation />

      <Paper
        id="module-1"
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        }}
      >
        <SectionHeader
          title="Module 1: The Language of Perfume"
          subtitle="Master the vocabulary of fragrance and understand how perfumes are structured and evolve over time"
        />

        {/* Introduction */}
        <Box mb={4}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            What are Fragrance Notes?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.7, color: "text.primary" }}
          >
            Fragrance notes are the individual scents that make up a perfume's
            composition. They're carefully layered by perfumers to create a
            complex, evolving scent experience that unfolds over time on your
            skin. Understanding these notes helps you predict how a fragrance
            will develop and choose scents that truly resonate with your
            personality.
          </Typography>
          <Paper
            sx={{
              p: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.primary" }}
            >
              💡 <strong>Pro Tip:</strong> A well-crafted fragrance tells a
              story - it has a beginning (top notes), a middle (heart notes),
              and an ending (base notes). Learning to recognize these stages
              will transform how you experience perfume.
            </Typography>
          </Paper>
        </Box>

        {/* Single Interactive Pyramid */}
        <FragrancePyramid />

        {/* Note Classification */}
        <NoteClassification />

        {/* Next Steps */}
        <Paper
          sx={{
            p: 3,
            mt: 4,
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            🎉 Ready for the Next Step?
          </Typography>
          <Typography variant="body1" color="text.primary">
            Now that you understand fragrance notes, continue to{" "}
            <strong>Module 2: Sillage & Longevity</strong>
            to learn how fragrances perform and project throughout the day!
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
}
