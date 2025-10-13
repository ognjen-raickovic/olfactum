import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getRecommendedFragrances } from "../utils/fragranceUtils";
import FragranceModal from "./FragranceModal";
import FragranceCard from "./FragranceCard";
import { motion, AnimatePresence } from "framer-motion";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortMode, setSortMode] = useState("balanced");
  const [recommendations, setRecommendations] = useState([]);

  // --- Generate recommendations dynamically when sort changes ---
  useEffect(() => {
    const recs = getRecommendedFragrances(answers, sortMode);
    setRecommendations(recs);
    setVisibleCount(6); // reset so first 6 are shown
  }, [answers, sortMode]);

  const visibleFragrances = recommendations.slice(0, visibleCount);

  // --- Human-readable scent family label ---
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

  // --- Personalized user description ---
  const getDescription = () => {
    const { scentType, season, occasion, intensity, notes, mood } = answers;
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
      desc += `Your chosen note, ${notes}, adds a distinctive touch to your scent personality. `;
    }

    if (mood) {
      const moodDesc = {
        romantic: "You want to express warmth and affection. ",
        confident: "You exude power and self-assurance. ",
        relaxed: "You prefer calm, easy-going vibes. ",
        luxurious: "You appreciate refinement and class. ",
        sporty: "You love energy and freshness. ",
      };
      desc += moodDesc[mood] || "";
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

      {/* --- Sort Dropdown --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="balanced">Balanced mix</MenuItem>
            <MenuItem value="accuracy">Best personal match</MenuItem>
            <MenuItem value="proven">Proven popular picks</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          💡 “Best match” = more tailored to your answers. “Proven” =
          higher-rated, popular picks.
        </Typography>
      </Box>

      {/* Recommendations Grid */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Recommended For You ({recommendations.length} matches)
      </Typography>

      <AnimatePresence mode="wait">
        <motion.div
          key={sortMode} // triggers animation on sort change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            justifyItems: "center",
            marginBottom: "32px",
          }}
        >
          {visibleFragrances.map((fragrance) => (
            <FragranceCard
              key={fragrance.id}
              fragrance={fragrance}
              onViewDetails={handleFragranceClick}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Show More Button */}
      {recommendations.length > visibleCount && (
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            Show More
          </Button>
        </Box>
      )}

      {/* Action Buttons */}
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

      {/* Fragrance Modal */}
      <FragranceModal
        fragrance={selectedFragrance}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default QuizResults;
