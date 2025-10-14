import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { getRecommendedFragrances } from "../utils/fragranceUtils";
import FragranceModal from "./FragranceModal";
import FragranceCard from "./FragranceCard";
import { motion, AnimatePresence } from "framer-motion";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortMode, setSortMode] = useState("balanced");

  // ADD NAVIGATION HOOK
  const navigate = useNavigate();

  // Use MUI's responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Memoize recommendations to prevent unnecessary recalculations
  const recommendations = useMemo(() => {
    return getRecommendedFragrances(answers, sortMode, 48);
  }, [answers, sortMode]);

  const visibleFragrances = recommendations.slice(0, visibleCount);

  // Calculate grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 2; // 2 columns on mobile
    if (isTablet) return 3; // 3 columns on tablet
    return 4; // 4 columns on desktop
  };

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (isMobile) return "100%"; // Full width on mobile
    return "100%"; // Let grid handle the width
  };

  const gridColumns = getGridColumns();

  // Improved scent family description with more specificity
  const getScentFamilyDescription = () => {
    const mapping = {
      fresh: "Fresh & Clean Scents",
      sweet: "Warm & Sweet Gourmands",
      dark: "Dark & Mysterious Orientals",
      elegant: "Elegant & Classic Florals",
      bold: "Bold & Energetic Spices",
    };
    return mapping[answers.scentType] || "Perfectly Matched Scents";
  };

  // Get matched criteria for transparency
  const getMatchedCriteria = () => {
    const criteria = [];
    const { scentType, season, occasion, intensity, notes, mood } = answers;

    if (scentType) {
      const typeMap = {
        fresh: "Fresh scents",
        sweet: "Sweet gourmands",
        dark: "Dark orientals",
        elegant: "Elegant florals",
        bold: "Bold spices",
      };
      criteria.push(typeMap[scentType]);
    }

    if (season && season !== "all") {
      criteria.push(`${season} season`);
    }

    if (occasion) {
      criteria.push(`${occasion.replace("everyday", "daily")} wear`);
    }

    if (intensity) {
      criteria.push(`${intensity} intensity`);
    }

    if (notes) {
      criteria.push(`${notes} notes`);
    }

    if (mood) {
      criteria.push(`${mood} vibe`);
    }

    return criteria;
  };

  // Enhanced personalized description
  const getDescription = () => {
    const { scentType, season, occasion, intensity, notes, mood } = answers;
    let desc = "Based on your preferences, we've found fragrances that match ";

    const criteriaParts = [];

    if (scentType) {
      const typeDesc = {
        fresh: "bright, refreshing scents with clean notes",
        sweet: "warm, comforting fragrances with sweet accords",
        dark: "deep, sophisticated scents with mysterious character",
        elegant: "timeless, refined compositions with classic appeal",
        bold: "confident, attention-grabbing fragrances with strong presence",
      };
      criteriaParts.push(typeDesc[scentType]);
    }

    if (season && season !== "all") {
      const seasonDesc = {
        spring: `perfect for ${season}'s fresh florals`,
        summer: `ideal for ${season}'s warm days`,
        autumn: `great for ${season}'s cozy atmosphere`,
        winter: `suited for ${season}'s rich evenings`,
      };
      criteriaParts.push(seasonDesc[season]);
    }

    if (occasion) {
      const occasionDesc = {
        everyday: "versatile enough for daily wear",
        office: "professional and office-appropriate",
        date: "romantic and sensual for special moments",
        party: "bold and perfect for social events",
        special: "sophisticated for memorable occasions",
      };
      criteriaParts.push(occasionDesc[occasion]);
    }

    if (intensity === "strong") {
      criteriaParts.push("with long-lasting projection");
    } else if (intensity === "noticeable") {
      criteriaParts.push("with balanced presence");
    } else if (intensity === "subtle") {
      criteriaParts.push("with subtle, skin-close intimacy");
    }

    if (notes) {
      criteriaParts.push(`featuring ${notes} accords`);
    }

    if (mood) {
      criteriaParts.push(`creating a ${mood} atmosphere`);
    }

    desc += criteriaParts.slice(0, 3).join(", ") + ". ";

    if (recommendations.length > 0) {
      desc += `We found ${recommendations.length} fragrances that match your style.`;
    }

    return desc;
  };

  const handleFragranceClick = (fragrance) => {
    setSelectedFragrance(fragrance);
    setModalOpen(true);
  };

  // ADD THIS FUNCTION TO HANDLE BROWSING ALL FRAGRANCES
  const handleBrowseAllFragrances = () => {
    navigate("/fragrances");
  };

  const matchedCriteria = getMatchedCriteria();

  return (
    <Box sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Perfect Scent Matches! 🎉
        </Typography>

        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 3,
            px: 3,
            borderRadius: 2,
            mb: 3,
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your Scent Profile: {getScentFamilyDescription()}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {getDescription()}
          </Typography>

          {/* Matched Criteria Chips */}
          {matchedCriteria.length > 0 && (
            <Stack
              direction="row"
              gap={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {matchedCriteria.map((criterion, index) => (
                <Chip
                  key={index}
                  label={criterion}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    bgcolor: "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>

      {/* Sort Controls */}
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

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", maxWidth: 400 }}
        >
          💡 <strong>Best match</strong> = more tailored to your answers.
          <strong> Proven</strong> = higher-rated, popular picks.
          <strong> Balanced</strong> = mix of both.
        </Typography>
      </Box>

      {/* Recommendations Grid */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
        Recommended For You ({recommendations.length} matches)
      </Typography>

      <AnimatePresence mode="wait">
        <motion.div
          key={sortMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gap: isMobile ? "12px" : "16px",
            justifyItems: "stretch",
            alignItems: "stretch",
            marginBottom: "32px",
          }}
        >
          {visibleFragrances.map((fragrance) => (
            <Box
              key={fragrance.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "100%",
              }}
            >
              <FragranceCard
                fragrance={fragrance}
                onViewDetails={handleFragranceClick}
                showMatchScore={sortMode === "accuracy"}
                sx={{
                  width: getCardWidth(),
                  height: "100%",
                  maxWidth: isMobile ? "none" : "320px",
                  minHeight: isMobile ? "280px" : "320px",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: isMobile ? "none" : "translateY(-4px)",
                    boxShadow: isMobile ? 1 : 3,
                  },
                }}
              />
            </Box>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Show More Button */}
      {recommendations.length > visibleCount && (
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setVisibleCount((prev) => prev + 12)}
          >
            Show More ({recommendations.length - visibleCount} remaining)
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

        {/* UPDATED BUTTON WITH NAVIGATION */}
        <Button
          variant="contained"
          size="large"
          onClick={handleBrowseAllFragrances}
        >
          Browse All Fragrances
        </Button>
      </Box>

      {/* Fragrance Modal */}
      <FragranceModal
        fragrance={selectedFragrance}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        disableRouting={true}
      />
    </Box>
  );
};

export default QuizResults;
