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

  const f = fragrance;

  // Reset loading when fragrance changes
  useEffect(() => {
    if (fragrance) {
      setIsLoading(true);
      // Simulate loading time for better UX
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [fragrance]);

  const ratingNumber = f?.rating
    ? Number(String(f.rating).replace(",", "."))
    : null;
  const ratingValue =
    ratingNumber != null && !isNaN(ratingNumber)
      ? Math.min(5, ratingNumber)
      : null;

  const imageUrl =
    f?.image && f.image !== "/images/default.jpg"
      ? f.image
      : "/images/no-image.png";

  // Build overview only when needed
  const description = useMemo(() => {
    if (!f) return "";

    const brand = humanizeName(f.brand);
    const name = humanizeName(f.name);
    const country = f.country || "Unknown country";
    const year = f.year || "Unknown year";
    const gender = f.genderProfile || "unisex";
    const perfumer = f.perfumer
      ? humanizeName(f.perfumer)
      : "an unknown perfumer";
    const scentFamily = f.scentFamily ? humanizeName(f.scentFamily) : null;

    const toList = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val.map(humanizeName);
      return String(val)
        .split(",")
        .map((s) => humanizeName(s.trim()))
        .filter(Boolean);
    };

    const top = toList(f.top || f.topNotes);
    const mid = toList(f.middle || f.middleNotes);
    const base = toList(f.base || f.baseNotes);

    let overview = `${name} by ${brand} is${
      scentFamily ? ` a ${scentFamily.toLowerCase()}` : ""
    } fragrance for ${gender}, created in ${country} in ${year} by perfumer ${perfumer}.`;

    if (top.length || mid.length || base.length) {
      const topText = top.length ? `It opens with ${top.join(", ")}.` : "";
      const midText = mid.length ? ` It evolves with ${mid.join(", ")}.` : "";
      const baseText = base.length
        ? ` Finally, it settles into a base of ${base.join(", ")}.`
        : "";
      overview += `\n\n${topText}${midText}${baseText}`;
    }

    const accords = (f.accords || []).map(humanizeName);
    if (accords.length) {
      overview += `\n\nIt carries ${accords.slice(0, 2).join(" and ")} tones.`;
    }

    if (f.occasion || f.season) {
      const occ = (f.occasion || []).join(", ");
      const sea = (f.season || []).join(", ");
      overview += `\n\nIdeal for ${
        occ || "various occasions"
      } and suitable for ${sea || "year-round wear"}.`;
    }

    return overview;
  }, [f]);

  // Quick details with memoization
  const quickDetails = useMemo(() => {
    if (!f) return [];

    const details = [
      { label: "Country", value: f.country || "Unknown" },
      { label: "Year", value: f.year || "Unknown" },
      {
        label: "Perfumer",
        value: f.perfumer ? humanizeName(f.perfumer) : "Unknown",
      },
    ];

    if (f.scentFamily) {
      details.push({ label: "Family", value: humanizeName(f.scentFamily) });
    }
    if (f.intensity) {
      details.push({ label: "Intensity", value: humanizeName(f.intensity) });
    }
    if (f.longevity) {
      details.push({ label: "Longevity", value: humanizeName(f.longevity) });
    }

    return details;
  }, [f]);

  // Handle URL updates - ONLY if not in quiz context
  useEffect(() => {
    if (!open || !f || isQuizContext) return;

    prevRef.current = location.pathname + location.search;
    const slug = f.slug || `id-${f.id}`;
    navigate(`/fragrances/${slug}`, { replace: false });
  }, [open, f, location, navigate, isQuizContext]);

  const handleClose = () => {
    // Only navigate back if we're not in quiz context and we have a previous location
    if (!isQuizContext) {
      const prev = prevRef.current;
      const fallback = "/fragrances";
      navigate(
        prev && prev !== location.pathname + location.search ? prev : fallback,
        { replace: true }
      );
    }

    setIsLoading(true); // Reset loading state
    onClose?.();
  };

  // Prevent modal close on backdrop click in quiz context to avoid accidental closes
  const handleBackdropClick = (event) => {
    if (isQuizContext) {
      event.stopPropagation();
      return;
    }
  };

  return (
    <Modal
      open={open}
      onClose={isQuizContext ? undefined : handleClose} // Prevent close on backdrop click in quiz
      closeAfterTransition
      disableScrollLock
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          onClick: handleBackdropClick,
        },
      }}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "92%", md: "950px" },
            maxHeight: "92vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            overflow: "auto",
            outline: "none",
            p: 0,
          }}
        >
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
              <Box
                sx={{
                  p: 3,
                  pb: 2,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                  }}
                  aria-label="Close"
                >
                  <Close />
                </IconButton>

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

                  {/* RIGHT - OVERVIEW + NOTES */}
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

                    <Typography variant="subtitle1" gutterBottom>
                      Fragrance Notes
                    </Typography>

                    {(() => {
                      const toList = (val) => {
                        if (!val) return [];
                        if (Array.isArray(val)) return val.map(humanizeName);
                        return String(val)
                          .split(",")
                          .map((s) => humanizeName(s.trim()))
                          .filter(Boolean);
                      };

                      const top = toList(f.top || f.topNotes);
                      const heart = toList(f.middle || f.middleNotes);
                      const base = toList(f.base || f.baseNotes);
                      const fallbackNotes = (f.notes || []).map(humanizeName);

                      if (
                        !top.length &&
                        !heart.length &&
                        !base.length &&
                        fallbackNotes.length
                      ) {
                        return (
                          <Typography variant="body2" color="text.secondary">
                            {fallbackNotes.join(", ")}
                          </Typography>
                        );
                      }

                      return (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          <strong>Top:</strong>{" "}
                          {top.length ? top.join(", ") : "—"}
                          <br />
                          <strong>Heart:</strong>{" "}
                          {heart.length ? heart.join(", ") : "—"}
                          <br />
                          <strong>Base:</strong>{" "}
                          {base.length ? base.join(", ") : "—"}
                        </Typography>
                      );
                    })()}
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
