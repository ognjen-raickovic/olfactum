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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { humanizeName } from "../utils/humanizeName";

// Helper to check if we're in quiz context
const useIsQuizContext = () => {
  const location = useLocation();
  return (
    location.pathname.includes("quiz") || location.search.includes("quiz=true")
  );
};

const FragranceModal = ({
  fragrance,
  open,
  onClose,
  disableRouting = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const isQuizContext = disableRouting || useIsQuizContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const f = fragrance;

  // ✅ Define derived variables safely
  const ratingValue = useMemo(() => {
    if (!f) return null;
    return typeof f.rating === "number" ? f.rating : f.ratingValue || 4.2;
  }, [f]);

  const imageUrl = useMemo(() => {
    if (!f) return "/images/no-image.png";
    return f.imageUrl || f.image || "/images/no-image.png";
  }, [f]);

  const description = useMemo(() => {
    if (!f) return "No description available.";
    return f.description || "No detailed description for this fragrance.";
  }, [f]);

  const quickDetails = useMemo(() => {
    if (!f) return [];
    return [
      { label: "Brand", value: humanizeName(f.brand) },
      { label: "Launched", value: f.year || "N/A" },
      { label: "Gender", value: humanizeName(f.genderProfile || "Unisex") },
      { label: "Type", value: f.type || "EDP" },
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
    if (!isQuizContext) {
      const prev = prevRef.current;
      const fallback = "/fragrances";
      navigate(
        prev && prev !== location.pathname + location.search ? prev : fallback,
        { replace: true }
      );
    }

    setIsLoading(true);
    onClose?.();
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
        // This ensures the modal backdrop covers the entire screen
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "92%", md: "950px" },
            maxHeight: "92vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            overflowY: "auto",
            overflowX: "hidden",
            outline: "none",
            p: 0,
          }}
        >
          {/* FIXED CLOSE BUTTON - Now properly positioned outside scrollable content */}
          {/* STICKY CLOSE BUTTON - Always visible while scrolling inside modal */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "flex-end",
              zIndex: 10,
              bgcolor: "background.paper",
              p: isMobile ? 1 : 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
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
          </Box>

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

              {/* MAIN CONTENT */}
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                    alignItems: "flex-start",
                  }}
                >
                  {/* LEFT - IMAGE */}
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={humanizeName(f.name)}
                    sx={{
                      borderRadius: 2,
                      objectFit: "cover",
                      width: { xs: "100%", md: "45%" },
                      height: "auto",
                      maxHeight: "480px",
                    }}
                    onError={(e) => {
                      e.target.src = "/images/no-image.png";
                    }}
                  />

                  {/* RIGHT - OVERVIEW */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Overview
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        whiteSpace: "pre-line",
                        lineHeight: 1.8,
                      }}
                    >
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* QUICK DETAILS & ACTIONS */}
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Details
                </Typography>

                <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  {quickDetails.map((d, idx) => (
                    <Chip
                      key={idx}
                      label={`${d.label}: ${d.value}`}
                      size="small"
                    />
                  ))}

                  {(f.accords || []).slice(0, 5).map((a, i) => (
                    <Chip
                      key={`acc-${i}`}
                      label={humanizeName(a)}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
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
                      Read Reviews on Fragrantica
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
