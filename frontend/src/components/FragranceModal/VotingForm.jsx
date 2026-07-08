import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  useTheme,
  Snackbar,
  Alert,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import api from "../../services/api";

// Maps star level to descriptive text for each rating category
const getRatingDescription = (category, value) => {
  const descriptions = {
    scent: {
      1: "Very poor - I don't like it at all",
      2: "Poor - I don't like it",
      3: "Average - It's okay",
      4: "Good - I like it",
      5: "Very good - I like it a lot",
    },
    longevity: {
      1: "Very weak - Less than 1 hour",
      2: "Weak - 1-3 hours",
      3: "Moderate - 3-6 hours",
      4: "Long - 6-12 hours",
      5: "Very long - More than 12 hours",
    },
    sillage: {
      1: "Intimate - Stays very close to skin",
      2: "Moderate - Personal bubble",
      3: "Strong - Arm's length",
      4: "Enormous - Room filling",
      5: "Massive - Leaves a trail",
    },
  };
  const starLevel = Math.ceil(value);
  return descriptions[category]?.[starLevel] || "Click stars to rate";
};

// Precise 5‑star rating component (supports hover description)
const StarRating = ({ value, onChange, label }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoverValue, setHoverValue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleStarClick = (clickedValue) => onChange(clickedValue);
  const handleStarHover = (hoveredValue) => {
    setHoverValue(hoveredValue);
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverValue(0);
  };

  const displayValue = isHovering ? hoverValue : value;
  const numericValue = ((displayValue / 5) * 10).toFixed(1);
  const currentDescription = getRatingDescription(
    label.toLowerCase(),
    displayValue,
  );

  return (
    <Box
      sx={{
        textAlign: "center",
        mb: isMobile ? 2 : 3,
        p: isMobile ? 0.5 : 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 220,
        maxWidth: 220,
        minWidth: 220,
        mx: "auto",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          mb: 1,
          textTransform: "capitalize",
          fontSize: isMobile ? "0.85rem" : "0.95rem",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: isMobile ? 0.5 : 1,
          mb: 1.5,
          minHeight: isMobile ? "1.6rem" : "1.8rem",
        }}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            sx={{
              cursor: "pointer",
              fontSize: isMobile ? "1.6rem" : "1.8rem",
              color:
                star <= displayValue
                  ? theme.palette.warning.main
                  : theme.palette.text.disabled,
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
          >
            {star <= displayValue ? (
              <StarIcon fontSize="inherit" />
            ) : (
              <StarBorderIcon fontSize="inherit" />
            )}
          </Box>
        ))}
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: isMobile ? "0.75rem" : "0.8rem",
          textAlign: "center",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {currentDescription}
      </Typography>
    </Box>
  );
};

const VotingForm = ({ fragrance, onReviewSubmitted }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [scores, setScores] = useState({ scent: 0, longevity: 0, sillage: 0 });
  const [gender, setGender] = useState("");
  const [review, setReview] = useState("");
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [scentProfiles, setScentProfiles] = useState([]);
  const [allSeasons, setAllSeasons] = useState([]);
  const [allOccasions, setAllOccasions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [buyMenuAnchor, setBuyMenuAnchor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRefs = async () => {
      try {
        const res = await api.get("/references");

        setScentProfiles(res.data.scentProfiles || []);
        setAllSeasons(res.data.seasons || []);
        setAllOccasions(res.data.occasions || []);
      } catch (err) {
        console.error("Failed to load references", err);
      }
    };

    fetchRefs();
  }, []);
  const handleScoreChange = (key) => (newValue) =>
    setScores((old) => ({ ...old, [key]: newValue }));
  const handleGenderChange = (e, newGender) => {
    if (newGender !== null) setGender(newGender);
  };
  const handleCategoryChange = (e, newValue) => {
    if (newValue.length <= 3) setSelectedCategories(newValue);
  };

  const isFormValid = () =>
    scores.scent > 0 &&
    scores.longevity > 0 &&
    scores.sillage > 0 &&
    gender &&
    review.trim().length > 0;

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    setLoading(true);
    setError("");
    try {
      await api.post("/reviews", {
        perfume_id: fragrance.perfume_id,
        scent_rating: scores.scent,
        longevity_rating: scores.longevity,
        sillage_rating: scores.sillage,
        gender_vote: gender.charAt(0).toUpperCase() + gender.slice(1),
        review_text: review.trim(),
        scent_profile_ids: selectedCategories.map((c) => c.id),
        seasons: selectedSeasons.map((s) => s.id),
        occasions: selectedOccasions.map((o) => o.id),
      });
      // success → show snackbar and reset form
      setSnackbarOpen(true);
      // reset form
      setScores({ scent: 0, longevity: 0, sillage: 0 });
      setGender("");
      setReview("");
      setSelectedCategories([]);
      setSelectedSeasons([]);
      setSelectedOccasions([]);
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      if (err.response?.status === 409) {
        setError("You have already reviewed this perfume.");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ py: 2 }}>
        <Typography
          variant="h6"
          fontWeight="700"
          gutterBottom
          sx={{
            fontSize: isMobile ? "1.1rem" : "1.25rem",
            textAlign: "center",
          }}
        >
          Review this fragrance
        </Typography>

        {/* Scent categories autocomplete (max 3) */}
        <Autocomplete
          multiple
          options={scentProfiles}
          getOptionLabel={(option) => option.name}
          value={selectedCategories}
          onChange={(e, newValue) => {
            if (newValue.length <= 3) {
              setSelectedCategories(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Scent profile (max 3)"
              size={isMobile ? "small" : "medium"}
            />
          )}
          sx={{ mb: isMobile ? 3 : 4 }}
        />

        {/* Star ratings for scent, longevity, sillage */}
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <StarRating
              value={scores.scent}
              onChange={handleScoreChange("scent")}
              label="Scent"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <StarRating
              value={scores.longevity}
              onChange={handleScoreChange("longevity")}
              label="Longevity"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <StarRating
              value={scores.sillage}
              onChange={handleScoreChange("sillage")}
              label="Sillage"
            />
          </Grid>
        </Grid>

        {/* Seasons */}
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Season (choose up to 2)
        </Typography>
        <Autocomplete
          multiple
          options={allSeasons}
          getOptionLabel={(opt) => opt.name}
          value={selectedSeasons}
          onChange={(e, newVal) => setSelectedSeasons(newVal.slice(0, 2))}
          renderInput={(params) => (
            <TextField {...params} label="Seasons" size="small" />
          )}
          sx={{ mb: 2 }}
        />

        {/* Occasions */}
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Occasion (choose up to 3)
        </Typography>
        <Autocomplete
          multiple
          options={allOccasions}
          getOptionLabel={(opt) => opt.name}
          value={selectedOccasions}
          onChange={(e, newVal) => setSelectedOccasions(newVal.slice(0, 3))}
          renderInput={(params) => (
            <TextField {...params} label="Occasions" size="small" />
          )}
          sx={{ mb: 3 }}
        />

        {/* Gender */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            sx={{
              fontWeight: 600,
              mb: 1.5,
              fontSize: isMobile ? "0.9rem" : "0.95rem",
            }}
          >
            Gender
          </Typography>
          <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={handleGenderChange}
            sx={{
              mb: 1.5,
              "& .MuiToggleButton-root": {
                px: isMobile ? 2 : 3,
                py: isMobile ? 0.75 : 1,
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                fontWeight: 600,
                border: `1px solid ${theme.palette.divider}`,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": { backgroundColor: theme.palette.primary.dark },
                },
                "&:not(.Mui-selected)": {
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                },
              },
            }}
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="unisex">Unisex</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2" color="text.secondary">
            {gender
              ? `Selected: ${gender.charAt(0).toUpperCase() + gender.slice(1)}`
              : "Please select a gender"}
          </Typography>
        </Box>

        {/* Review text */}
        <TextField
          label="Review *"
          placeholder="Share your thoughts..."
          multiline
          fullWidth
          minRows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ mb: 2 }}
          error={!review.trim() && isFormValid()}
          helperText={
            !review.trim() && isFormValid() ? "Review is required" : ""
          }
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color={isFormValid() ? "primary" : "inherit"}
          onClick={handleSubmit}
          disabled={!isFormValid() || loading}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {loading
            ? "Saving..."
            : isFormValid()
              ? "Submit Review"
              : "Complete all fields to submit"}
        </Button>
      </Box>

      {/* Where to Buy */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 2,
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {fragrance?.sourceUrl && (
          <Button
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            href={fragrance.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<span>📖</span>}
          >
            Fragrantica Reviews
          </Button>
        )}
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          onClick={(e) => setBuyMenuAnchor(e.currentTarget)}
          startIcon={<ShoppingCartIcon />}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
          }}
        >
          Where to Buy
        </Button>
        <Menu
          anchorEl={buyMenuAnchor}
          open={Boolean(buyMenuAnchor)}
          onClose={() => setBuyMenuAnchor(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          PaperProps={{ sx: { minWidth: 220, borderRadius: 2, mt: 1 } }}
        >
          {(fragrance?.retailers || []).length > 0 ? (
            fragrance.retailers.map((ret, idx) => (
              <MenuItem
                key={idx}
                component={Link}
                href={ret.url || ret.website_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setBuyMenuAnchor(null)}
              >
                <ListItemIcon>
                  <ShoppingCartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={ret.name}
                  secondary={ret.url ? "" : ret.website_url}
                />
                <OpenInNewIcon fontSize="small" />
              </MenuItem>
            ))
          ) : (
            <MenuItem
              component={Link}
              href={`https://www.google.com/search?q=where+to+buy+${encodeURIComponent(`${fragrance?.brand_name} ${fragrance?.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setBuyMenuAnchor(null)}
            >
              <ListItemIcon>
                <ShoppingCartIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Search on Google" />
              <OpenInNewIcon fontSize="small" />
            </MenuItem>
          )}
        </Menu>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Review submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default VotingForm;
