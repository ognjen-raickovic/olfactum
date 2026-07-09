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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import FragranceModal from "../FragranceModal/FragranceModal";
import FragranceCard from "../FragranceCard";
import { motion, AnimatePresence } from "framer-motion";
import { clearQuizResults } from "../../utils/quizStorage";
import LoadingSpinner from "../LoadingSpinner";

const QuizResults = ({ answers, onRestart }) => {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortMode, setSortMode] = useState("balanced");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setVisibleCount(8);
  }, [sortMode]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);

      try {
        const res = await api.post("/quiz/recommend", {
          answers,
          sortMode,
        });

        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [answers, sortMode]);

  const visibleFragrances = recommendations.slice(0, visibleCount);

  const getGridColumns = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

  const gridColumns = getGridColumns();

  const getUserProfileDescription = () => {
    const {
      scentStyle,
      weatherClimate,
      occasionTime,
      strengthLongevity,
      mood,
    } = answers;

    let profile = [];

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

    const climateMap = {
      warmClimate: "warm weather",
      coolClimate: "cool weather",
      variableClimate: "variable weather",
      allWeather: "all-weather versatile",
    };
    if (weatherClimate && climateMap[weatherClimate]) {
      profile.push(climateMap[weatherClimate]);
    }

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

    const strengthMap = {
      subtle: "subtle intimacy",
      balanced: "balanced presence",
      strong: "strong projection",
    };
    if (strengthLongevity && strengthMap[strengthLongevity]) {
      profile.push(strengthMap[strengthLongevity]);
    }

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

    if (weatherClimate) {
      const climateMap = {
        warmClimate: "Warm climate",
        coolClimate: "Cool climate",
        variableClimate: "Variable weather",
        allWeather: "All weather",
      };
      criteria.push(climateMap[weatherClimate]);
    }

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

    if (strengthLongevity) {
      criteria.push(
        `${
          strengthLongevity === "subtle"
            ? "Subtle"
            : strengthLongevity === "balanced"
              ? "Balanced"
              : "Strong"
        } strength`,
      );
    }

    if (notes && Array.isArray(notes)) {
      notes.slice(0, 3).forEach((note) => {
        criteria.push(`${note.charAt(0).toUpperCase() + note.slice(1)} notes`);
      });
    }

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

  const handleRetakeQuiz = () => {
    clearQuizResults();
    onRestart();
  };

  const matchedCriteria = getMatchedCriteria();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", py: 4 }}>
      {/* Header */}
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
        <FormControl size="small" sx={{ minWidth: { xs: 150, sm: 200 } }}>
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
      </Box>

      {loading ? (
        <LoadingSpinner size="medium" />
      ) : (
        <>
          {/* Results Count */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
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
            >
              <Box sx={{ px: { xs: 1, sm: 3, md: 4 } }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                    gap: { xs: 2, md: 3 },
                  }}
                >
                  {visibleFragrances.map((fragrance) => (
                    <FragranceCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      onClick={handleFragranceClick}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          gap: 2,
          mt: 3,
        }}
      >
        {visibleCount < recommendations.length && (
          <Button onClick={() => setVisibleCount((prev) => prev + 8)}>
            Load More
          </Button>
        )}

        <Button variant="outlined" onClick={handleRetakeQuiz}>
          Retake Quiz
        </Button>

        <Button variant="contained" onClick={handleBrowseAllFragrances}>
          Browse All Fragrances
        </Button>
      </Box>

      <FragranceModal
        fragrance={selectedFragrance}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        disableRouting={true}
        noNavigate={true}
      />
    </Box>
  );
};

export default QuizResults;
