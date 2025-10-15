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
  Container,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedFragrances } from "../utils/fragranceUtils";
import FragranceModal from "./FragranceModal";
import FragranceCard from "./FragranceCard";
import { motion, AnimatePresence } from "framer-motion";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortMode, setSortMode] = useState("balanced");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  // Memoize recommendations
  const recommendations = useMemo(() => {
    return getRecommendedFragrances(answers, sortMode, 48);
  }, [answers, sortMode]);

  const visibleFragrances = recommendations.slice(0, visibleCount);

  // Handle multiple notes selection
  const getNotesDisplay = () => {
    if (!answers.notes) return "";
    if (Array.isArray(answers.notes)) {
      return answers.notes.join(", ");
    }
    return answers.notes;
  };

  // Improved scent family description
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
      if (Array.isArray(notes)) {
        criteria.push(...notes.map((note) => `${note} notes`));
      } else {
        criteria.push(`${notes} notes`);
      }
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
      if (Array.isArray(notes)) {
        criteriaParts.push(
          `featuring ${notes.slice(0, 2).join(" and ")} accords`
        );
      } else {
        criteriaParts.push(`featuring ${notes} accords`);
      }
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

  const handleBrowseAllFragrances = () => {
    navigate("/fragrances");
  };

  const matchedCriteria = getMatchedCriteria();

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        px: { xs: 1, sm: 2, md: 3 },
        width: "100%",
        maxWidth: "1200px !important",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4, width: "100%" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
            px: { xs: 1, sm: 0 },
            wordWrap: "break-word",
          }}
        >
          Your Perfect Scent Matches! 🎉
        </Typography>

        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 3,
            px: { xs: 2, sm: 3 },
            borderRadius: 2,
            mb: 3,
            maxWidth: 900,
            mx: "auto",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Your Scent Profile: {getScentFamilyDescription()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
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
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
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
          width: "100%",
        }}
      >
        <FormControl
          size="small"
          sx={{
            minWidth: { xs: 150, sm: 200 },
            flexShrink: 0,
          }}
        >
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
          sx={{
            color: "text.secondary",
            maxWidth: 400,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          💡 <strong>Best match</strong> = more tailored to your answers.{" "}
          <strong>Proven</strong> = higher-rated, popular picks.{" "}
          <strong>Balanced</strong> = mix of both.
        </Typography>
      </Box>

      {/* Recommendations Grid */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 3,
          textAlign: "center",
          fontSize: {
            xs: "1.25rem",
            sm: "1.5rem",
            md: "2rem",
          },
          width: "100%",
        }}
      >
        Recommended For You ({recommendations.length} matches)
      </Typography>

      <AnimatePresence mode="wait">
        <motion.div
          key={sortMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))", // force 2 per row even on narrow screens
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              columnGap: { xs: 1.5, sm: 2.5, md: 3 },
              rowGap: { xs: 2, sm: 3 },
              justifyItems: "center",
              alignItems: "stretch",
              width: "100%",
              mx: "auto",
              mb: 4,
            }}
          >
            {visibleFragrances.map((fragrance) => (
              <Box
                key={fragrance.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: "100%",
                  width: "100%",
                  maxWidth: {
                    xs: "none", // Let grid handle width on mobile
                    sm: "300px",
                    md: "320px",
                  },
                }}
              >
                <FragranceCard
                  fragrance={fragrance}
                  onViewDetails={handleFragranceClick}
                  showMatchScore={sortMode === "accuracy"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: {
                      xs: "240px", // Slightly smaller on mobile for 2-column layout
                      sm: "280px",
                      md: "320px",
                    },
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: isMobile ? "none" : "translateY(-4px)",
                      boxShadow: isMobile ? 1 : 3,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Show More Button */}
      {recommendations.length > visibleCount && (
        <Box sx={{ textAlign: "center", mb: 4, width: "100%" }}>
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
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          onClick={onRestart}
          size="large"
          sx={{
            flex: { xs: 1, sm: "none" },
            maxWidth: { xs: "100%", sm: "none" },
            minWidth: { xs: "auto", sm: "140px" },
          }}
        >
          Retake Quiz
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={handleBrowseAllFragrances}
          sx={{
            flex: { xs: 1, sm: "none" },
            maxWidth: { xs: "100%", sm: "none" },
            minWidth: { xs: "auto", sm: "180px" },
          }}
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
    </Container>
  );
};

export default QuizResults;
