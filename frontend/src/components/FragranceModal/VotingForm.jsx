import React, { useState } from "react";
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
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Allowed scent categories (max 3)
const SCENT_CATEGORIES = [
  "Fresh",
  "Citrus",
  "Floral",
  "Green",
  "Aquatic",
  "Spicy",
  "Woody",
  "Amber",
  "Oriental",
  "Gourmand",
  "Earthy",
  "Musky",
  "Aromatic",
];

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

// Precise 5‑star rating component (supports half‑star hover/click)
const PreciseStarRating = ({ value, onChange, label }) => {
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

  // Determine which value to display (hover vs actual)
  const displayValue = isHovering ? hoverValue : value;
  const numericValue = ((displayValue / 5) * 10).toFixed(1);
  const currentDescription = getRatingDescription(
    label.toLowerCase(),
    displayValue,
  );

  // Render a single star (full, half, or empty)
  const renderStar = (position) => {
    const isActive = displayValue >= position;
    const isHalf = displayValue >= position - 0.5 && displayValue < position;
    return (
      <Box
        key={position}
        sx={{
          cursor: "pointer",
          padding: "1px",
          fontSize: isMobile ? "1.6rem" : "1.8rem",
          color: isActive
            ? theme.palette.warning.main
            : isHalf
              ? theme.palette.warning.main
              : theme.palette.text.disabled,
          position: "relative",
          "&:hover": { transform: "scale(1.1)" },
          transition: "all 0.2s ease",
        }}
        onClick={() => handleStarClick(position)}
        onMouseEnter={() => handleStarHover(position)}
      >
        {isActive ? (
          <StarIcon fontSize="inherit" />
        ) : isHalf ? (
          <StarHalfIcon fontSize="inherit" />
        ) : (
          <StarBorderIcon fontSize="inherit" />
        )}
      </Box>
    );
  };

  return (
    // Container with FIXED width to prevent layout shift
    <Box
      sx={{
        textAlign: "center",
        mb: isMobile ? 2 : 3,
        p: isMobile ? 0.5 : 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 220, // fixed width – no more size changes
        maxWidth: 220,
        minWidth: 220,
        mx: "auto", // center horizontally
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

      {/* Star icons */}
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
        {[1, 2, 3, 4, 5].map(renderStar)}
      </Box>

      {/* Numeric score */}
      <Typography
        variant={isMobile ? "body1" : "h6"}
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 700,
          minHeight: isMobile ? "24px" : "32px",
          fontSize: isMobile ? "0.9rem" : "1rem",
          mb: 0.5,
        }}
      >
        {value > 0 ? `${numericValue}/10` : "Not rated"}
      </Typography>

      {/* Description – fixed width + nowrap to stay on one line */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: isMobile ? "0.75rem" : "0.8rem",
            textAlign: "center",
            lineHeight: 1.3,
            whiteSpace: "nowrap", // keep on one line
            overflow: "hidden",
            textOverflow: "ellipsis", // just in case, but not needed with 220px
          }}
        >
          {currentDescription}
        </Typography>
      </Box>
    </Box>
  );
};

const VotingForm = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [scores, setScores] = useState({ scent: 0, longevity: 0, sillage: 0 });
  const [gender, setGender] = useState("");
  const [review, setReview] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Where to Buy dropdown state
  const [buyMenuAnchor, setBuyMenuAnchor] = useState(null);

  const handleScoreChange = (key) => (newValue) =>
    setScores((old) => ({ ...old, [key]: newValue }));
  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) setGender(newGender);
  };
  const handleCategoryChange = (event, newValue) => {
    if (newValue.length <= 3) setSelectedCategories(newValue);
  };

  // Form is valid only when all required fields are filled
  const isFormValid = () =>
    scores.scent > 0 &&
    scores.longevity > 0 &&
    scores.sillage > 0 &&
    gender &&
    review.trim().length > 0;

  // Submit handler (currently logs to console)
  const handleSubmit = () => {
    if (!isFormValid()) return;
    const submission = {
      scores: {
        scent: ((scores.scent / 5) * 10).toFixed(1),
        longevity: ((scores.longevity / 5) * 10).toFixed(1),
        sillage: ((scores.sillage / 5) * 10).toFixed(1),
      },
      gender,
      categories: selectedCategories,
      review: review.trim(),
      rawScores: scores,
    };
    console.log("Vote submission:", submission);
    setSnackbarOpen(true);
  };

  // Purchase links (fallback to Google search)
  const purchaseLinks = fragrance?.purchaseLinks || [];
  const defaultSearchUrl = `https://www.google.com/search?q=where+to+buy+${encodeURIComponent(
    `${fragrance?.brand} ${fragrance?.name}`,
  )}`;
  const handleBuyMenuOpen = (event) => setBuyMenuAnchor(event.currentTarget);
  const handleBuyMenuClose = () => setBuyMenuAnchor(null);

  return (
    <>
      {/* Review card */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          p: isMobile ? 2 : 3,
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="700"
          gutterBottom
          sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem" }}
        >
          Review this fragrance
        </Typography>

        {/* Scent categories autocomplete (max 3) */}
        <Autocomplete
          multiple
          freeSolo
          options={SCENT_CATEGORIES}
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Scent profile (max 3)"
              placeholder="Select or add up to 3 scent categories"
              size={isMobile ? "small" : "medium"}
            />
          )}
          sx={{ mb: isMobile ? 3 : 4 }}
          getOptionDisabled={() => selectedCategories.length >= 3}
        />

        {/* Star ratings for scent, longevity, sillage */}
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <PreciseStarRating
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
            <PreciseStarRating
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
            <PreciseStarRating
              value={scores.sillage}
              onChange={handleScoreChange("sillage")}
              label="Sillage"
            />
          </Grid>
        </Grid>

        {/* Gender selection */}
        <Box
          sx={{
            textAlign: "center",
            mb: isMobile ? 2 : 3,
            p: isMobile ? 1 : 2,
          }}
        >
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
            aria-label="gender selection"
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
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
                "&:not(.Mui-selected)": {
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              },
            }}
          >
            <ToggleButton value="male" aria-label="male">
              Male
            </ToggleButton>
            <ToggleButton value="unisex" aria-label="unisex">
              Unisex
            </ToggleButton>
            <ToggleButton value="female" aria-label="female">
              Female
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              minHeight: "20px",
              fontSize: isMobile ? "0.8rem" : "0.85rem",
            }}
          >
            {gender
              ? `Selected: ${gender.charAt(0).toUpperCase() + gender.slice(1)}`
              : "Please select a gender"}
          </Typography>
        </Box>

        {/* Review textarea (required) */}
        <TextField
          label="Review *"
          placeholder="Share your thoughts about this fragrance..."
          multiline
          fullWidth
          minRows={3}
          size={isMobile ? "small" : "medium"}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ mt: 1, mb: 2 }}
          error={
            !review.trim() &&
            (scores.scent > 0 || scores.longevity > 0 || scores.sillage > 0)
          }
          helperText={
            !review.trim() &&
            (scores.scent > 0 || scores.longevity > 0 || scores.sillage > 0)
              ? "Review is required"
              : ""
          }
        />

        {/* Submit button (disabled until form is valid) */}
        <Button
          variant="contained"
          color={isFormValid() ? "primary" : "inherit"}
          onClick={handleSubmit}
          size={isMobile ? "medium" : "large"}
          disabled={!isFormValid()}
          sx={{
            width: "100%",
            py: isMobile ? 1 : 1.5,
            opacity: isFormValid() ? 1 : 0.7,
            fontSize: isMobile ? "0.9rem" : "1rem",
            backgroundColor: isFormValid()
              ? undefined
              : theme.palette.action.disabledBackground,
            color: isFormValid() ? undefined : theme.palette.text.disabled,
            "&:hover": isFormValid()
              ? {}
              : {
                  backgroundColor: theme.palette.action.disabledBackground,
                  cursor: "not-allowed",
                },
          }}
        >
          {isFormValid() ? "Submit Review" : "Complete all fields to submit"}
        </Button>
      </Box>

      {/* External links: Fragrantica Reviews + Where to Buy dropdown */}
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
            sx={{
              flex: { xs: "1 1 100%", sm: "0 1 auto" },
              fontSize: isMobile ? "0.8rem" : "0.9rem",
            }}
          >
            Fragrantica Reviews
          </Button>
        )}

        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          onClick={handleBuyMenuOpen}
          startIcon={<ShoppingCartIcon />}
          sx={{
            flex: { xs: "1 1 100%", sm: "0 1 auto" },
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
          }}
        >
          Where to Buy
        </Button>

        {/* Dropdown with purchase links (or Google search fallback) */}
        <Menu
          anchorEl={buyMenuAnchor}
          open={Boolean(buyMenuAnchor)}
          onClose={handleBuyMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          PaperProps={{ sx: { minWidth: 220, borderRadius: 2, mt: 1 } }}
        >
          {purchaseLinks.length > 0
            ? purchaseLinks.map((link, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBuyMenuClose}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={link.store || "Buy online"}
                    secondary={link.price || ""}
                  />
                  <OpenInNewIcon fontSize="small" />
                </MenuItem>
              ))
            : [
                <MenuItem
                  key="default"
                  component={Link}
                  href={defaultSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBuyMenuClose}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Search on Google" />
                  <OpenInNewIcon fontSize="small" />
                </MenuItem>,
              ]}
        </Menu>
      </Box>

      {/* Success snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Thank you for your review! It has been submitted.
        </Alert>
      </Snackbar>
    </>
  );
};

export default VotingForm;
