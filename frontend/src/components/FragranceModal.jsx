import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Rating,
  CardMedia,
  Stack,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  Close,
  AccessTime,
  VolumeUp,
  Favorite,
  FavoriteBorder,
  PlaylistAdd,
  Share,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { humanizeName } from "../utils/humanizeName";
import FragranceNotes from "./FragranceNotes";
import FragranceDescription from "./FragranceDescription";

// Helper to check if we're in quiz context
const useIsQuizContext = () => {
  const location = useLocation();
  return (
    location.pathname.includes("quiz") || location.search.includes("quiz=true")
  );
};

// Performance indicators
const getPerformanceInfo = (fragrance) => {
  const intensity = fragrance.intensity;
  const longevity = fragrance.longevity;

  const intensityMap = {
    "Light Projection": {
      label: "Intimate Projection",
      description: "Stays close to the skin",
      level: 1,
    },
    "Moderate Projection": {
      label: "Moderate Projection",
      description: "Noticeable within personal space",
      level: 2,
    },
    "Strong Projection": {
      label: "Strong Projection",
      description: "Creates a scent trail",
      level: 3,
    },
    "Heavy Projection": {
      label: "Powerful Projection",
      description: "Fills the room",
      level: 4,
    },
  };

  const longevityMap = {
    "Very Short Lasting": {
      label: "Short-Lasting",
      description: "2-4 hours",
      level: 1,
    },
    "Short Lasting": {
      label: "Moderate-Lasting",
      description: "4-6 hours",
      level: 2,
    },
    "Moderate Lasting": {
      label: "Long-Lasting",
      description: "6-8 hours",
      level: 3,
    },
    "Long Lasting": {
      label: "Very Long-Lasting",
      description: "8+ hours",
      level: 4,
    },
    "Very Long Lasting": {
      label: "Exceptional Lasting",
      description: "12+ hours",
      level: 5,
    },
  };

  return {
    intensity: intensityMap[intensity] || {
      label: intensity || "Unknown",
      description: "Projection information not available",
      level: 2,
    },
    longevity: longevityMap[longevity] || {
      label: longevity || "Unknown",
      description: "Longevity information not available",
      level: 2,
    },
  };
};

// Brand abbreviations for mobile
const getBrandDisplayName = (brand, isMobile) => {
  if (!isMobile) return humanizeName(brand);

  const abbreviations = {
    "jean paul gaultier": "JPG",
    "christian dior": "Dior",
    "yves saint laurent": "YSL",
    "tom ford": "Tom Ford",
    prada: "Prada",
    chanel: "Chanel",
    gucci: "Gucci",
    versace: "Versace",
    armani: "Armani",
    "dolce gabbana": "D&G",
    "calvin klein": "CK",
    pacorabanne: "Paco",
    bvlgari: "Bvlgari",
    hermes: "Hermès",
    givenchy: "Givenchy",
    burberry: "Burberry",
    lacoste: "Lacoste",
    "hugo boss": "Boss",
    montblanc: "Montblanc",
  };

  return abbreviations[brand.toLowerCase()] || humanizeName(brand);
};

const FragranceModal = ({
  fragrance,
  open,
  onClose,
  disableRouting = false,
  noNavigate = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [saveMenuAnchor, setSaveMenuAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isQuizContext = disableRouting || useIsQuizContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const f = fragrance;

  // Define derived variables safely
  const ratingValue = useMemo(() => {
    if (!f) return null;
    return typeof f.rating === "number" ? f.rating : f.ratingValue || 4.2;
  }, [f]);

  const imageUrl = useMemo(() => {
    if (!f) return "/images/no-image.png";
    return f.imageUrl || f.image || "/images/no-image.png";
  }, [f]);

  const performanceInfo = useMemo(() => {
    if (!f) return { intensity: {}, longevity: {} };
    return getPerformanceInfo(f);
  }, [f]);

  const quickDetails = useMemo(() => {
    if (!f) return [];
    return [
      { label: "Brand", value: humanizeName(f.brand) },
      { label: "Launched", value: f.year || "N/A" },
      { label: "Gender", value: humanizeName(f.genderProfile || "Unisex") },
      { label: "Type", value: humanizeName(f.type) || "EDP" },
      ...(f.country
        ? [{ label: "Origin", value: humanizeName(f.country) }]
        : []),
      ...(f.perfumer && f.perfumer !== "Unknown"
        ? [{ label: "Perfumer", value: humanizeName(f.perfumer) }]
        : []),
    ];
  }, [f]);

  // Get display names for header
  const displayTitle = useMemo(() => {
    if (!f) return "";
    const brand = getBrandDisplayName(f.brand, isMobile);
    const name = humanizeName(f.name);

    if (isMobile && `${brand} — ${name}`.length > 35) {
      const shortenedName =
        name.length > 20 ? name.substring(0, 20) + "..." : name;
      return `${brand} — ${shortenedName}`;
    }

    return `${brand} — ${name}`;
  }, [f, isMobile]);

  // Store scroll position before opening modal
  useEffect(() => {
    if (open) {
      scrollPositionRef.current =
        window.pageYOffset || document.documentElement.scrollTop;
    }
  }, [open]);

  // Update URL when modal opens
  useEffect(() => {
    if (open && f && !isQuizContext && !disableRouting) {
      // Added !disableRouting check
      prevRef.current = location.pathname + location.search;

      const fragranceSlug =
        f.slug || `${f.brand}-${f.name}`.toLowerCase().replace(/\s+/g, "-");

      navigate(`/fragrances/${fragranceSlug}`, {
        replace: true,
        state: { noScroll: true },
      });
    }
  }, [open, f, isQuizContext, disableRouting, navigate, location]);

  // Reset loading when fragrance changes
  useEffect(() => {
    if (fragrance) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [fragrance]);

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

  const handleClose = () => {
    // Restore previous URL if we're not in quiz context AND routing is not disabled
    if (!noNavigate && !isQuizContext && !disableRouting && prevRef.current) {
      navigate(prevRef.current, {
        replace: true,
        state: { noScroll: true },
      });
    }

    setTimeout(() => {
      if (scrollPositionRef.current > 0) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    }, 50);

    if (onClose) onClose();
  };

  const handleBackdropClick = (event) => {
    if (isQuizContext || disableRouting) {
      event.stopPropagation();
      return;
    }
  };

  const handleFavorite = () => {
    if (!f) return;

    const favorites = JSON.parse(
      localStorage.getItem("fragranceFavorites") || "[]"
    );
    let newFavorites;

    if (isFavorited) {
      newFavorites = favorites.filter((item) => item.id !== f.id);
      setSnackbarMessage("Removed from favorites");
    } else {
      // Store with timestamp - most important change!
      newFavorites = [
        {
          id: f.id,
          addedAt: Date.now(), // This timestamp enables sorting
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

  const handleWishlist = () => {
    if (!f) return;

    const wishlist = JSON.parse(
      localStorage.getItem("fragranceWishlist") || "[]"
    );
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter((item) => item.id !== f.id);
      setSnackbarMessage("Removed from wishlist");
    } else {
      // Store with timestamp - most important change!
      newWishlist = [
        {
          id: f.id,
          addedAt: Date.now(), // This timestamp enables sorting
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

  const handleSaveMenuOpen = (event) => {
    setSaveMenuAnchor(event.currentTarget);
  };

  const handleSaveMenuClose = () => {
    setSaveMenuAnchor(null);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${humanizeName(f.brand)} ${humanizeName(
      f.name
    )} on Fragrance Finder`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${humanizeName(f.brand)} ${humanizeName(f.name)}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setSnackbarMessage("Link copied to clipboard!");
        setSnackbarOpen(true);
      } catch (err) {
        setSnackbarMessage(`Share this link: ${shareUrl}`);
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={isQuizContext || disableRouting ? undefined : handleClose}
        closeAfterTransition
        disableScrollLock={false}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
            onClick: handleBackdropClick,
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,
        }}
      >
        <Fade in={open} timeout={300}>
          <Box
            sx={{
              position: "relative",
              width: { xs: "95%", sm: "92%", md: "900px" },
              maxHeight: "92vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              overflowY: "auto",
              overflowX: "hidden",
              outline: "none",
              p: 0,
              mx: "auto",
              my: "auto",

              scrollbarWidth: "thin",
              scrollbarColor: `${theme.palette.primary.light} ${theme.palette.background.paper}`,

              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: theme.palette.background.paper,
                borderRadius: "12px",
                border: `1px solid ${
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[100]
                }`,
              },
              "&::-webkit-scrollbar-thumb": {
                background: `linear-gradient(180deg, ${
                  theme.palette.mode === "light"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark
                }, ${
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : theme.palette.primary.light
                })`,
                borderRadius: "12px",
                border: `2px solid ${theme.palette.background.paper}`,
                transition: "background 0.3s ease",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: `linear-gradient(180deg, ${
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : theme.palette.primary.light
                }, ${
                  theme.palette.mode === "light"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.main
                })`,
              },
            }}
          >
            {/* STICKY HEADER */}
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                pb: { xs: 1.5, sm: 2 },
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                position: "sticky",
                top: 0,
                zIndex: 10,
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Tooltip title="Share fragrance">
                  <IconButton
                    onClick={handleShare}
                    sx={{
                      bgcolor: "background.paper",
                      boxShadow: 1,
                      "&:hover": {
                        bgcolor: "action.hover",
                        transform: "scale(1.1)",
                      },
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                      minWidth: { xs: 32, sm: 40 },
                      border: "1px solid",
                      borderColor: "divider",
                      flexShrink: 0,
                    }}
                    aria-label="Share"
                  >
                    <Share fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                </Tooltip>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    textAlign: "center",
                    px: { xs: 0.5, sm: 2 },
                  }}
                >
                  <Typography
                    variant={isMobile ? "h6" : "h4"}
                    component="h2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      lineHeight: 1.2,
                      fontWeight: isMobile ? 600 : 500,
                    }}
                  >
                    {displayTitle}
                  </Typography>

                  {ratingValue != null && f && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <Rating
                        size={isMobile ? "small" : "medium"}
                        value={ratingValue}
                        precision={0.1}
                        readOnly
                      />
                      <Typography
                        variant={isMobile ? "caption" : "body2"}
                        color="text.secondary"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {ratingValue.toFixed(1)}/5
                        {f.ratingCount ? ` (${f.ratingCount})` : ""}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Tooltip title="Save to list">
                    <IconButton
                      onClick={handleSaveMenuOpen}
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: 1,
                        "&:hover": {
                          bgcolor: "action.hover",
                          transform: "scale(1.1)",
                        },
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        minWidth: { xs: 32, sm: 40 },
                        border: "1px solid",
                        borderColor: "divider",
                        flexShrink: 0,
                      }}
                      aria-label="Save to list"
                    >
                      <PlaylistAdd fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Close">
                    <IconButton
                      onClick={handleClose}
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: 1,
                        "&:hover": {
                          bgcolor: "action.hover",
                          transform: "scale(1.1)",
                        },
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        minWidth: { xs: 32, sm: 40 },
                        border: "1px solid",
                        borderColor: "divider",
                        flexShrink: 0,
                      }}
                      aria-label="Close"
                    >
                      <Close fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            {/* Save Menu Dropdown */}
            <Menu
              anchorEl={saveMenuAnchor}
              open={Boolean(saveMenuAnchor)}
              onClose={handleSaveMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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

            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <CircularProgress />
              </Box>
            ) : f ? (
              <>
                {/* MAIN CONTENT */}
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  {/* DESKTOP LAYOUT - Image left, Description right */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      flexDirection: "row",
                      gap: 3,
                      alignItems: "flex-start",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ width: "45%" }}>
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={humanizeName(f.name)}
                        sx={{
                          borderRadius: 2,
                          objectFit: "contain",
                          width: "100%",
                          height: "auto",
                          maxHeight: "500px",
                        }}
                        onError={(e) => {
                          e.target.src = "/images/no-image.png";
                        }}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <FragranceDescription fragrance={f} />

                      <Stack
                        direction="row"
                        gap={1}
                        flexWrap="wrap"
                        sx={{ mt: 2 }}
                      >
                        {quickDetails.map((d, idx) => (
                          <Chip
                            key={idx}
                            label={`${d.label}: ${d.value}`}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Box>

                  {/* MOBILE/TABLET LAYOUT - Stacked */}
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      flexDirection: "column",
                      gap: 3,
                      mb: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      alt={humanizeName(f.name)}
                      sx={{
                        borderRadius: 2,
                        objectFit: "contain",
                        width: "100%",
                        height: "auto",
                        maxHeight: "400px",
                      }}
                      onError={(e) => {
                        e.target.src = "/images/no-image.png";
                      }}
                    />

                    <FragranceDescription fragrance={f} />

                    <Stack direction="row" gap={1} flexWrap="wrap">
                      {quickDetails.map((d, idx) => (
                        <Chip
                          key={idx}
                          label={`${d.label}: ${d.value}`}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* THREE COLUMN LAYOUT FOR DESKTOP - Notes, Performance, Occasions */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    {/* COLUMN 1: Fragrance Notes */}
                    <Grid item xs={12} md={4}>
                      <FragranceNotes fragrance={f} />
                    </Grid>

                    {/* COLUMN 2: Performance */}
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          Performance
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <VolumeUp fontSize="small" color="primary" />
                              <Typography variant="subtitle2">
                                Projection
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="medium">
                              {performanceInfo.intensity.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {performanceInfo.intensity.description}
                            </Typography>
                          </Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <AccessTime fontSize="small" color="primary" />
                              <Typography variant="subtitle2">
                                Longevity
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="medium">
                              {performanceInfo.longevity.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {performanceInfo.longevity.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </Card>
                    </Grid>

                    {/* COLUMN 3: Occasions & Details */}
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          Occasions & Details
                        </Typography>

                        {/* Accords */}
                        {(f.accords || []).length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              gutterBottom
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 1,
                              }}
                            >
                              🎵 Main Accords
                            </Typography>
                            <Stack direction="row" gap={0.5} flexWrap="wrap">
                              {(f.accords || []).slice(0, 3).map((a, i) => (
                                <Chip
                                  key={`acc-${i}`}
                                  label={humanizeName(a)}
                                  size="small"
                                  color="primary"
                                  variant="filled"
                                />
                              ))}
                            </Stack>
                          </Box>
                        )}

                        {/* Season & Occasion */}
                        {(f.season || f.occasion) && (
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              gutterBottom
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 2,
                              }}
                            >
                              📅 Ideal For
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                              }}
                            >
                              {f.season && f.season.length > 0 && (
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    Season
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    gap={0.5}
                                    flexWrap="wrap"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {f.season.map((season, i) => (
                                      <Chip
                                        key={`season-${i}`}
                                        label={season}
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                      />
                                    ))}
                                  </Stack>
                                </Box>
                              )}
                              {f.occasion && f.occasion.length > 0 && (
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    Occasion
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    gap={0.5}
                                    flexWrap="wrap"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {f.occasion.map((occ, i) => (
                                      <Chip
                                        key={`occ-${i}`}
                                        label={occ}
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                      />
                                    ))}
                                  </Stack>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        )}
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                {/* EXTERNAL LINKS SECTION */}
                <Box
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {f.sourceUrl && (
                      <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        href={f.sourceUrl}
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
                      href={`https://www.google.com/search?q=where+to+buy+${encodeURIComponent(
                        `${humanizeName(f.brand)} ${humanizeName(f.name)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<span>🛒</span>}
                    >
                      Where to Buy
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography>Fragrance data not available.</Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>

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

export default FragranceModal;
