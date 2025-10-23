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
} from "@mui/material";
import { Close, AccessTime, VolumeUp } from "@mui/icons-material";
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
  const [isLoading, setIsLoading] = useState(true);
  const isQuizContext = disableRouting || useIsQuizContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      { label: "Type", value: f.type || "EDP" },
      ...(f.country ? [{ label: "Origin", value: f.country }] : []),
      ...(f.perfumer && f.perfumer !== "Unknown"
        ? [{ label: "Perfumer", value: f.perfumer }]
        : []),
    ];
  }, [f]);

  // Reset loading when fragrance changes
  useEffect(() => {
    if (fragrance) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [fragrance]);

  const handleClose = () => {
    if (!noNavigate && !isQuizContext) {
      const prev = prevRef.current;
      const fallback = "/fragrances";
      navigate(
        prev && prev !== location.pathname + location.search ? prev : fallback,
        { replace: true }
      );
    }
    if (onClose) onClose();
  };

  const handleBackdropClick = (event) => {
    if (isQuizContext) {
      event.stopPropagation();
      return;
    }
  };

  return (
    <Modal
      open={open}
      onClose={isQuizContext ? undefined : handleClose}
      closeAfterTransition
      disableScrollLock
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

            /* ✨ Elegant, theme-matching scrollbar styling */
            scrollbarWidth: "thin", // Firefox
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
          {/* CLOSE BUTTON - Absolutely positioned relative to modal container */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "action.hover",
                transform: "scale(1.1)",
              },
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
              border: "1px solid",
              borderColor: "divider",
            }}
            aria-label="Close"
          >
            <Close />
          </IconButton>
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
              {/* HEADER */}
              <Box sx={{ p: 3, pb: 2, textAlign: "center" }}>
                <Typography variant="h4" component="h2">
                  {humanizeName(f.brand)} — {humanizeName(f.name)}
                </Typography>

                <Typography
                  variant="h6"
                  color="primary.main"
                  sx={{ mt: 0.5, mb: 1 }}
                >
                  {humanizeName(f.genderProfile || "Unisex")}
                </Typography>

                {ratingValue != null && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Rating value={ratingValue} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {ratingValue.toFixed(1)}/5{" "}
                      {f.ratingCount ? `(${f.ratingCount} reviews)` : ""}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider />

              {/* MAIN CONTENT - SIDE BY SIDE LAYOUT RESTORED */}
              <Box sx={{ p: 3 }}>
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
                  {/* LEFT COLUMN - Image */}
                  <Box sx={{ width: "45%" }}>
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      alt={humanizeName(f.name)}
                      sx={{
                        borderRadius: 2,
                        objectFit: "cover",
                        width: "100%",
                        height: "auto",
                        maxHeight: "400px",
                      }}
                      onError={(e) => {
                        e.target.src = "/images/no-image.png";
                      }}
                    />
                  </Box>

                  {/* RIGHT COLUMN - Description */}
                  <Box sx={{ flex: 1 }}>
                    <FragranceDescription fragrance={f} />

                    {/* Quick details below description */}
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

                {/* MOBILE LAYOUT - Stacked */}
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    flexDirection: "column",
                    gap: 3,
                    mb: 3,
                  }}
                >
                  {/* IMAGE */}
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={humanizeName(f.name)}
                    sx={{
                      borderRadius: 2,
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                      maxHeight: "300px",
                    }}
                    onError={(e) => {
                      e.target.src = "/images/no-image.png";
                    }}
                  />

                  {/* DESCRIPTION */}
                  <FragranceDescription fragrance={f} />

                  {/* Quick details */}
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

                {/* NOTES AND PERFORMANCE ROW - BELOW THE IMAGE/DESCRIPTION */}
                <Grid container spacing={3}>
                  {/* FRAGRANCE NOTES */}
                  <Grid size={{ xs: 12, md: 8 }}>
                    <FragranceNotes fragrance={f} />
                  </Grid>

                  {/* PERFORMANCE */}
                  <Grid size={{ xs: 12, md: 4 }}>
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
                          <Typography variant="caption" color="text.secondary">
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
                          <Typography variant="caption" color="text.secondary">
                            {performanceInfo.longevity.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* DETAILS & ACTIONS SECTION */}
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Details & Accords
                </Typography>

                <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  {(f.accords || []).slice(0, 6).map((a, i) => (
                    <Chip
                      key={`acc-${i}`}
                      label={humanizeName(a)}
                      size="small"
                      color="primary"
                    />
                  ))}
                </Stack>

                {/* SEASON & OCCASION */}
                {(f.season || f.occasion) && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="text.secondary"
                      gutterBottom
                    >
                      Ideal For:
                    </Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                      {f.season &&
                        f.season.map((season, i) => (
                          <Chip
                            key={`season-${i}`}
                            label={season}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      {f.occasion &&
                        f.occasion.map((occ, i) => (
                          <Chip
                            key={`occ-${i}`}
                            label={occ}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                    </Stack>
                  </Box>
                )}

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                  <Button variant="contained" size="large">
                    Add to Favorites
                  </Button>
                  <Button variant="outlined" size="large">
                    Add to Wishlist
                  </Button>

                  {f.sourceUrl && (
                    <Button
                      variant="outlined"
                      size="large"
                      href={f.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Fragrantica Reviews
                    </Button>
                  )}

                  <Button
                    variant="text"
                    size="large"
                    href={`https://www.google.com/search?q=where to buy+${encodeURIComponent(
                      `${humanizeName(f.brand)} ${humanizeName(f.name)}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
  );
};

export default FragranceModal;
