import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { humanizeName } from "../utils/humanizeName";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import {
  PlaylistAdd,
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";

const FragranceCard = ({ fragrance, onClick, onViewDetails, sx = {} }) => {
  // Handle both direct fragrance objects and wrapped ones (like { fragrance, createdAt })
  const f = fragrance?.fragrance ? fragrance.fragrance : fragrance;

  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [saveMenuAnchor, setSaveMenuAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const ratingNumber =
    f.rating != null ? Number(String(f.rating).replace(",", ".")) : null;

  const gender = f.genderProfile?.toLowerCase();
  const GenderIcon =
    gender === "men"
      ? MaleIcon
      : gender === "women"
      ? FemaleIcon
      : TransgenderIcon;

  // Color scheme based on gender
  const getGenderColors = () => {
    switch (gender) {
      case "men":
        return {
          bgcolor: "rgba(33, 150, 243, 0.1)", // Light blue background
          color: "#2196f3", // Blue icon
          hoverBg: "rgba(33, 150, 243, 0.2)", // Darker blue on hover
        };
      case "women":
        return {
          bgcolor: "rgba(233, 30, 99, 0.1)", // Light pink background
          color: "#e91e63", // Pink icon
          hoverBg: "rgba(233, 30, 99, 0.2)", // Darker pink on hover
        };
      default: // unisex
        return {
          bgcolor: "rgba(76, 175, 80, 0.1)", // Light green background
          color: "#4caf50", // Green icon
          hoverBg: "rgba(76, 175, 80, 0.2)", // Darker green on hover
        };
    }
  };

  const genderColors = getGenderColors();

  const handleOpen = (frag) => {
    if (onClick) return onClick(frag);
    if (onViewDetails) return onViewDetails(frag);
  };

  // Load favorite/wishlist status from localStorage
  useEffect(() => {
    if (f) {
      const favorites = JSON.parse(
        localStorage.getItem("fragranceFavorites") || "[]"
      );
      const wishlist = JSON.parse(
        localStorage.getItem("fragranceWishlist") || "[]"
      );

      // Check if current fragrance is in either list (handle both old and new formats)
      setIsFavorited(
        favorites.some((item) =>
          typeof item === "object" ? item.id === f.id : item === f.id
        )
      );
      setIsInWishlist(
        wishlist.some((item) =>
          typeof item === "object" ? item.id === f.id : item === f.id
        )
      );
    }
  }, [f]);

  const handleSaveMenuOpen = (event) => {
    event.stopPropagation(); // Prevent card click when menu is opened
    setSaveMenuAnchor(event.currentTarget);
  };

  const handleSaveMenuClose = (event) => {
    event?.stopPropagation();
    setSaveMenuAnchor(null);
  };

  const handleFavorite = (event) => {
    event.stopPropagation();
    if (!f) return;

    const favorites = JSON.parse(
      localStorage.getItem("fragranceFavorites") || "[]"
    );
    let newFavorites;

    if (isFavorited) {
      newFavorites = favorites.filter((item) => item.id !== f.id);
      setSnackbarMessage("Removed from favorites");
    } else {
      // Store with timestamp for chronological sorting
      newFavorites = [
        {
          id: f.id,
          addedAt: Date.now(),
          fragranceData: f,
        },
        ...favorites.filter((item) => item.id !== f.id),
      ];
      setSnackbarMessage("Added to favorites");
    }

    localStorage.setItem("fragranceFavorites", JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
    setSnackbarOpen(true);
    setSaveMenuAnchor(null);
  };

  const handleWishlist = (event) => {
    event.stopPropagation();
    if (!f) return;

    const wishlist = JSON.parse(
      localStorage.getItem("fragranceWishlist") || "[]"
    );
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter((item) => item.id !== f.id);
      setSnackbarMessage("Removed from wishlist");
    } else {
      // Store with timestamp for chronological sorting
      newWishlist = [
        {
          id: f.id,
          addedAt: Date.now(),
          fragranceData: f,
        },
        ...wishlist.filter((item) => item.id !== f.id),
      ];
      setSnackbarMessage("Added to wishlist");
    }

    localStorage.setItem("fragranceWishlist", JSON.stringify(newWishlist));
    setIsInWishlist(!isInWishlist);
    setSnackbarOpen(true);
    setSaveMenuAnchor(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const splitOccasions =
    f.occasion
      ?.flatMap((o) =>
        String(o)
          .split("/")
          .map((x) => x.trim())
      )
      .filter(Boolean) || [];

  const splitSeasons =
    f.season
      ?.flatMap((s) =>
        String(s)
          .split("/")
          .map((x) => x.trim())
      )
      .filter(Boolean) || [];

  const imageSrc =
    f.image && f.image !== "/images/default.jpg"
      ? f.image
      : "/images/no-image.png";

  return (
    <>
      <Card
        onClick={() => handleOpen(f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpen(f);
        }}
        role="button"
        tabIndex={0}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
          height: "100%",
          justifyContent: "space-between",
          ...sx,
        }}
      >
        {/* --- IMAGE SECTION --- */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 4",
            overflow: "hidden",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#20160F" : "grey.50",
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <LazyLoadImage
            src={imageSrc}
            alt={humanizeName(f.name)}
            effect="blur"
            onError={(e) => {
              e.target.src = "/images/no-image.png";
            }}
            wrapperProps={{
              style: {
                display: "block",
                width: "100%",
                height: "100%",
                lineHeight: 0,
              },
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Save Menu Button - Top Left */}
          <Tooltip title="Save to list" placement="top" arrow>
            <IconButton
              onClick={handleSaveMenuOpen}
              sx={{
                position: "absolute",
                top: 6,
                left: 6,
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "primary.main",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                },
                width: 30,
                height: 30,
                p: 0.6,
                transition: "all 0.2s ease-in-out",
              }}
              size="small"
              aria-label="Save to list"
            >
              <PlaylistAdd
                fontSize="small"
                sx={{
                  color: "text.primary",
                  transition: "color 0.2s ease-in-out",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Gender Icon - Top Right */}
          {gender && (
            <Tooltip title={humanizeName(gender)} placement="top" arrow>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  bgcolor: genderColors.bgcolor,
                  boxShadow: 1,
                  "&:hover": {
                    bgcolor: genderColors.hoverBg,
                  },
                  p: 0.6,
                  width: 30,
                  height: 30,
                  transition: "background-color 0.2s ease-in-out",
                }}
                size="small"
              >
                <GenderIcon
                  fontSize="small"
                  sx={{
                    color: genderColors.color,
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Save Menu Dropdown */}
        <Menu
          anchorEl={saveMenuAnchor}
          open={Boolean(saveMenuAnchor)}
          onClose={handleSaveMenuClose}
          onClick={handleSaveMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleFavorite}>
            <ListItemIcon>
              {isFavorited ? (
                <Favorite sx={{ color: "error.main" }} />
              ) : (
                <FavoriteBorder />
              )}
            </ListItemIcon>
            <ListItemText>
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleWishlist}>
            <ListItemIcon>
              {isInWishlist ? (
                <Bookmark sx={{ color: "primary.main" }} />
              ) : (
                <BookmarkBorder />
              )}
            </ListItemIcon>
            <ListItemText>
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </ListItemText>
          </MenuItem>
        </Menu>

        {/* --- CONTENT SECTION --- */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 1.5, sm: 2 },
            pb: { xs: 1.5, sm: 2 },
            "&:last-child": { pb: { xs: 1.5, sm: 2 } },
          }}
        >
          {/* Brand + Fragrance Name (centered) */}
          <Box sx={{ textAlign: "center" }}>
            {/* Brand Name */}
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: 13, sm: 14 },
                mb: 0.3,
                display: "block",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {humanizeName(f.brand)}
            </Typography>

            {/* Fragrance Name */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                lineHeight: 1.3,
                mb: 1,
                minHeight: { xs: "2.4em", sm: "2.6em" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
              }}
            >
              {humanizeName(f.name)}
            </Typography>
          </Box>

          {/* Rating - centered */}
          {ratingNumber != null && !isNaN(ratingNumber) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mb: { xs: 0.5, sm: 1 },
              }}
            >
              <Rating
                value={ratingNumber}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {ratingNumber.toFixed(1)}
              </Typography>
            </Box>
          )}
          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Season & Occasion Chips */}
          <Box
            sx={{
              display: "flex",
              gap: 0.4,
              flexWrap: "wrap",
              justifyContent: "center",
              mt: { xs: 1, sm: 1.5 },
            }}
          >
            {splitSeasons.slice(0, 2).map((season) => (
              <Chip
                key={season}
                label={humanizeName(season)}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 20, sm: 22 },
                }}
              />
            ))}
            {splitOccasions.slice(0, 2).map((occasion) => (
              <Chip
                key={occasion}
                label={humanizeName(occasion)}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 20, sm: 22 },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FragranceCard;
