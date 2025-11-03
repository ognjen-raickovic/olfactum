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
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
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

    if (isMobile) {
      // Mobile: Show only fragrance name
      const name = humanizeName(f.name);
      return name.length > 35 ? name.substring(0, 32) + "..." : name;
    } else {
      // Desktop: Keep brand + name
      const brand = getBrandDisplayName(f.brand, isMobile);
      const name = humanizeName(f.name);
      return `${brand} — ${name}`;
    }
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
              width: { xs: "95%", sm: "92%", md: "1100px" },
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
                    <Box sx={{ width: "40%" }}>
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

                  {/* Fragrance Notes & Performance Section */}
                  <Box sx={{ mb: 3 }}>
                    <FragranceNotes fragrance={f} />
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
