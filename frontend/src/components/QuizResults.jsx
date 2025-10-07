import { Box, Typography, Button, Grid } from "@mui/material";
import { useState } from "react";
import { getRecommendedFragrances } from "../services/fragranceData";
import FragranceModal from "./FragranceModal";
import FragranceCard from "./FragranceCard";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const recommendations = getRecommendedFragrances(answers);

  const getScentFamilyDescription = () => {
    const scentFamilyMapping = {
      fresh: "Fresh & Clean",
      sweet: "Warm & Sweet",
      dark: "Dark & Mysterious",
      elegant: "Elegant & Classic",
      bold: "Bold & Energetic",
    };
    return scentFamilyMapping[answers.scentType] || "Perfectly Matched";
  };

  const getDescription = () => {
    const descriptions = {
      fresh:
        "You prefer fresh, clean scents that are perfect for daily wear and warm weather. These fragrances are uplifting and versatile.",
      sweet:
        "You're drawn to warm, comforting scents that feel like a cozy embrace. Perfect for intimate settings and cooler weather.",
      dark: "You love sophisticated, mysterious fragrances with depth and character. These scents make a statement.",
      elegant:
        "You appreciate classic, refined scents that never go out of style. Timeless elegance for any occasion.",
      bold: "You enjoy confident, attention-grabbing fragrances that make a statement. Perfect for those who want to be noticed.",
    };
    return (
      descriptions[answers.scentType] ||
      "We've found some great fragrance matches based on your preferences!"
    );
  };

  const handleFragranceClick = (fragrance) => {
    setSelectedFragrance(fragrance);
    setModalOpen(true);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Perfect Scent Matches! 🎉
        </Typography>

        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 4,
            px: 3,
            borderRadius: 2,
            mb: 4,
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your Scent Profile: {getScentFamilyDescription()}
          </Typography>
          <Typography variant="body1">{getDescription()}</Typography>
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Recommended For You ({recommendations.length} matches)
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {recommendations.map((fragrance) => (
          <Grid item xs={12} sm={6} md={4} key={fragrance.id}>
            <FragranceCard
              fragrance={fragrance}
              onViewDetails={handleFragranceClick}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button variant="outlined" onClick={onRestart} size="large">
          Retake Quiz
        </Button>
        <Button variant="contained" size="large">
          Browse All Fragrances
        </Button>
      </Box>

      <FragranceModal
        fragrance={selectedFragrance}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default QuizResults;
