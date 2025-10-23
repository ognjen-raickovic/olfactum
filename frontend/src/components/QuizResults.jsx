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

  // Memoize recommendations with updated algorithm
  const recommendations = useMemo(() => {
    return getRecommendedFragrances(answers, sortMode, 48);
  }, [answers, sortMode]);

  const visibleFragrances = recommendations.slice(0, visibleCount);

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
          {/* IMPROVED MOBILE LAYOUT */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)", // Consistent 2 columns on mobile
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: {
                xs: 1.5, // Tighter gap on mobile
                sm: 2.5,
                md: 3,
              },
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
                  width: "100%",
                  // Better mobile sizing
                  maxWidth: {
                    xs: "none", // Let grid handle width
                    sm: "280px",
                    md: "300px",
                  },
                }}
              >
                <FragranceCard
                  fragrance={fragrance}
                  onViewDetails={handleFragranceClick}
                  showMatchScore={sortMode === "accuracy"}
                  sx={{
                    width: "100%",
                    // Optimized mobile height
                    minHeight: {
                      xs: "200px", // Shorter on mobile
                      sm: "260px",
                      md: "300px",
                    },
                    // Better mobile typography
                    "& .MuiTypography-h6": {
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                    },
                    "& .MuiTypography-body2": {
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.8rem",
                      },
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
        disableRouting={false} // true -> false, allowing modal close when pressing outside it
        noNavigate={true} // keep click-to-close but stop redirect
      />
    </Container>
  );
};

export default QuizResults;
