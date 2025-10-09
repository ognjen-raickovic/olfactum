import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { getRecommendedFragrances } from "../utils/fragranceUtils";
import FragranceModal from "./FragranceModal";
import FragranceCard from "./FragranceCard";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // --- Generate recommendations based on quiz answers ---
  const recommendations = getRecommendedFragrances(answers);

  // --- Human-friendly scent type label ---
  const getScentFamilyDescription = () => {
    const mapping = {
      fresh: "Fresh & Clean",
      sweet: "Warm & Sweet",
      dark: "Dark & Mysterious",
      elegant: "Elegant & Classic",
      bold: "Bold & Energetic",
    };
    return mapping[answers.scentType] || "Perfectly Matched";
  };

  // --- Build a personalized description for user ---
  const getDescription = () => {
    const { scentType, season, occasion, intensity, notes } = answers;
    let desc = "";

    switch (scentType) {
      case "fresh":
        desc +=
          "You enjoy bright, refreshing scents that feel effortlessly clean. ";
        break;
      case "sweet":
        desc +=
          "You’re drawn to warm, cozy fragrances with a touch of sweetness. ";
        break;
      case "dark":
        desc +=
          "You love deep, mysterious notes that exude confidence and class. ";
        break;
      case "elegant":
        desc +=
          "You appreciate timeless sophistication and refined compositions. ";
        break;
      case "bold":
        desc +=
          "You’re all about strong, charismatic scents that stand out in a crowd. ";
        break;
      default:
        desc += "You have a balanced taste in fragrances. ";
    }

    if (season) {
      const seasonDesc = {
        spring: "Perfect for the lively freshness of spring days. ",
        summer: "Ideal for hot summer weather with a refreshing vibe. ",
        autumn: "Great for the cozy, spicy warmth of autumn. ",
        winter: "Rich and long-lasting—great for cold winter nights. ",
        all: "Versatile for any time of year. ",
      };
      desc += seasonDesc[season] || "";
    }

    if (occasion) {
      const occasionDesc = {
        everyday: "Suited for daily wear and casual settings. ",
        office: "Refined enough for the office or college. ",
        date: "Perfect choice for romantic moments. ",
        party: "Bold and attention-grabbing for nights out. ",
        special: "Sophisticated and memorable for special occasions. ",
      };
      desc += occasionDesc[occasion] || "";
    }

    if (intensity === "strong") {
      desc += "You like your scent to last and make a statement. ";
    } else if (intensity === "noticeable") {
      desc +=
        "You prefer a balanced projection that’s noticeable but not too heavy. ";
    } else if (intensity === "subtle") {
      desc += "You enjoy fragrances that stay close to the skin. ";
    }

    if (notes) {
      desc += `Your chosen note, ${notes}, adds a distinctive touch to your scent personality.`;
    }

    return desc.trim();
  };

  const handleFragranceClick = (fragrance) => {
    setSelectedFragrance(fragrance);
    setModalOpen(true);
  };

  return (
    <Box sx={{ py: 6 }}>
      {/* Header */}
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

      {/* Recommendations */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Recommended For You ({recommendations.length} matches)
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 6,
          justifyItems: "center",
        }}
      >
        {recommendations.map((fragrance) => (
          <FragranceCard
            key={fragrance.id}
            fragrance={fragrance}
            onViewDetails={handleFragranceClick}
          />
        ))}
      </Box>

      {/* Buttons */}
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

      {/* Modal */}
      <FragranceModal
        fragrance={selectedFragrance}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default QuizResults;
