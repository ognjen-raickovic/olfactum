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
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedFragrances } from "../utils/fragranceUtils";
import FragranceModal from "./FragranceModal";
import FragranceCard from "./FragranceCard";
import { motion, AnimatePresence } from "framer-motion";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortMode, setSortMode] = useState("balanced");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  useEffect(() => {
    setVisibleCount(8);
  }, [sortMode]); // This runs every time sortMode changes
  // Memoize recommendations with updated algorithm
  const recommendations = useMemo(() => {
    return getRecommendedFragrances(answers, sortMode, 40);
  }, [answers, sortMode]);

  const visibleFragrances = recommendations.slice(0, visibleCount);

  // Calculate grid columns based on screen size - SAME AS FRAGRANCES PAGE
  const getGridColumns = () => {
    if (isMobile) return 2; // 2 columns on mobile
    if (isTablet) return 3; // 3 columns on tablet
    return 4; // 4 columns on desktop
  };

  const gridColumns = getGridColumns();

  // Get user-friendly description
  const getUserProfileDescription = () => {
    const {
      scentStyle,
      weatherClimate,
      occasionTime,
      strengthLongevity,
      mood,
    } = answers;

    let profile = [];

    // Scent style
    const styleMap = {
      fresh: "fresh & approachable",
      sweet: "sweet & comforting",
      dark: "dark & mysterious",
      elegant: "elegant & classic",
      bold: "bold & confident",
    };
    if (scentStyle && styleMap[scentStyle]) {
      profile.push(styleMap[scentStyle]);
    }

    // Climate
    const climateMap = {
      warmClimate: "warm weather",
      coolClimate: "cool weather",
      variableClimate: "variable weather",
      allWeather: "all-weather versatile",
    };
    if (weatherClimate && climateMap[weatherClimate]) {
      profile.push(climateMap[weatherClimate]);
    }

    // Occasion
    const occasionMap = {
      dayCasual: "daytime casual",
      nightOut: "night out",
      professional: "professional settings",
      specialEvents: "special occasions",
      versatile: "versatile wear",
    };
    if (occasionTime && occasionMap[occasionTime]) {
      profile.push(occasionMap[occasionTime]);
    }

    // Strength
    const strengthMap = {
      subtle: "subtle intimacy",
      balanced: "balanced presence",
      strong: "strong projection",
    };
    if (strengthLongevity && strengthMap[strengthLongevity]) {
      profile.push(strengthMap[strengthLongevity]);
    }

    // Mood
    const moodMap = {
      romantic: "romantic vibe",
      confident: "confident presence",
      relaxed: "relaxed energy",
      luxurious: "luxurious feel",
      energetic: "energetic spirit",
    };
    if (mood && moodMap[mood]) {
      profile.push(moodMap[mood]);
    }

    return profile.slice(0, 3).join(", ");
  };

  // Get matched criteria for display
  const getMatchedCriteria = () => {
    const criteria = [];
    const {
      scentPreferences,
      scentStyle,
      weatherClimate,
      occasionTime,
      strengthLongevity,
      notes,
      mood,
    } = answers;

    // Scent Preferences
    if (scentPreferences && Array.isArray(scentPreferences)) {
      const prefMap = {
        freshClean: "Fresh & Clean",
        sweetGourmand: "Sweet & Gourmand",
        woodyEarthy: "Woody & Earthy",
        floralRomantic: "Floral & Romantic",
        spicyWarm: "Spicy & Warm",
        citrusBright: "Citrus & Bright",
      };
      scentPreferences.slice(0, 2).forEach((pref) => {
        if (prefMap[pref]) criteria.push(prefMap[pref]);
      });
    }

    // Scent Style
    if (scentStyle) {
      const styleMap = {
        fresh: "Fresh style",
        sweet: "Sweet style",
        dark: "Dark style",
        elegant: "Elegant style",
        bold: "Bold style",
      };
      criteria.push(styleMap[scentStyle]);
    }

    // Weather/Climate
    if (weatherClimate) {
      const climateMap = {
        warmClimate: "Warm climate",
        coolClimate: "Cool climate",
        variableClimate: "Variable weather",
        allWeather: "All weather",
      };
      criteria.push(climateMap[weatherClimate]);
    }

    // Occasion/Time
    if (occasionTime) {
      const occasionMap = {
        dayCasual: "Daytime casual",
        nightOut: "Night out",
        professional: "Professional",
        specialEvents: "Special occasions",
        versatile: "Versatile",
      };
      criteria.push(occasionMap[occasionTime]);
    }

    // Strength/Longevity
    if (strengthLongevity) {
      criteria.push(
        `${
          strengthLongevity === "subtle"
            ? "Subtle"
            : strengthLongevity === "balanced"
            ? "Balanced"
            : "Strong"
        } strength`
      );
    }

    // Notes
    if (notes && Array.isArray(notes)) {
      notes.slice(0, 3).forEach((note) => {
        criteria.push(`${note.charAt(0).toUpperCase() + note.slice(1)} notes`);
      });
    }

    // Mood
    if (mood) {
      criteria.push(`${mood.charAt(0).toUpperCase() + mood.slice(1)} vibe`);
    }

    return criteria;
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
    <Box sx={{ width: "100%", minHeight: "100vh", py: 4 }}>
      {/* Header  */}
      <Box sx={{ textAlign: "center", mb: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
            textAlign: "center",
            fontSize: { xs: "1.75rem", md: "2.125rem" },
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
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Your Scent Profile
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            We found {recommendations.length} fragrances that match your style:{" "}
            {getUserProfileDescription()}.
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
          px: { xs: 2, sm: 3, md: 4 },
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

        <Box
          sx={{
            color: "text.secondary",
            maxWidth: 400,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            textAlign: { xs: "center", sm: "left" },
            lineHeight: 1.4,
          }}
        >
          <Typography variant="body2" component="div">
            🔹 <strong>Best match</strong> = more tailored to your answers
          </Typography>
          <Typography variant="body2" component="div">
            🔹 <strong>Proven</strong> = higher-rated, popular picks
          </Typography>
          <Typography variant="body2" component="div">
            🔹 <strong>Balanced</strong> = mix of both
          </Typography>
        </Box>
      </Box>

      {/* Results Count */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        Showing {Math.min(visibleCount, recommendations.length)} of{" "}
        {recommendations.length} fragrances
      </Typography>

      {/* Recommendations Grid */}
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
              px: { xs: 2, sm: 3, md: 4 },
              width: "100%",
            }}
          >
            {recommendations.length === 0 ? (
              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 8 }}
              >
                No fragrances found. Try adjusting your quiz answers.
              </Typography>
            ) : (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                    gap: { xs: 2, md: 3 },
                    justifyItems: "stretch",
                  }}
                >
                  {visibleFragrances.map((fragrance) => (
                    <FragranceCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      onClick={handleFragranceClick}
                      sx={{
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: isMobile ? "none" : "translateY(-4px)",
                          boxShadow: isMobile ? 1 : 3,
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 1.5, sm: 2 },
          mt: 2,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Load More / Show Less */}
        {visibleCount < recommendations.length ? (
          <Button
            variant="outlined"
            size="large"
            onClick={() => setVisibleCount((prev) => prev + 8)}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { xs: "auto", sm: 140 },
            }}
          >
            Load More ({recommendations.length - visibleCount} remaining)
          </Button>
        ) : visibleCount > 8 ? (
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              setVisibleCount(8);
              // Smooth scroll to the top of the fragrance results
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { xs: "auto", sm: 140 },
            }}
          >
            Show Less
          </Button>
        ) : null}

        {/* Retake Quiz Button */}
        <Button
          variant="outlined"
          onClick={onRestart}
          size="large"
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { xs: "auto", sm: 140 },
          }}
        >
          Retake Quiz
        </Button>

        {/* Browse All Fragrances Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleBrowseAllFragrances}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { xs: "auto", sm: 180 },
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
        disableRouting={false}
        noNavigate={true}
      />
    </Box>
  );
};

export default QuizResults;
