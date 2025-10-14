import React, { useEffect, useRef, useMemo } from "react";
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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { humanizeName } from "../utils/humanizeName";

// --- Helper function to build fragrance overview ---
const buildOverview = (f) => {
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
    overview += `\n\nIdeal for ${occ || "various occasions"} and suitable for ${
      sea || "year-round wear"
    }.`;
  }

  // Return with proper newlines for rendering
  return overview;
};

const FragranceModal = ({ fragrance, open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevRef = useRef(null);
  const f = fragrance;
  const isReady = open && !!f;

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

  const quickDetails = [
    { label: "Country", value: f?.country || "Unknown" },
    { label: "Year", value: f?.year || "Unknown" },
    {
      label: "Perfumer",
      value: f?.perfumer ? humanizeName(f.perfumer) : "Unknown",
    },
    ...(f?.scentFamily
      ? [{ label: "Family", value: humanizeName(f.scentFamily) }]
      : []),
    ...(f?.intensity
      ? [{ label: "Intensity", value: humanizeName(f.intensity) }]
      : []),
    ...(f?.longevity
      ? [{ label: "Longevity", value: humanizeName(f.longevity) }]
      : []),
  ];

  const description = useMemo(() => (f ? buildOverview(f) : ""), [f]);

  useEffect(() => {
    if (!open || !f) return;
    prevRef.current = location.pathname + location.search;
    const slug = f.slug || `id-${f.id}`;
    navigate(`/fragrances/${slug}`, { replace: false });
  }, [open, f, location, navigate]);

  const handleClose = () => {
    const prev = prevRef.current;
    const fallback = "/fragrances";
    navigate(
      prev && prev !== location.pathname + location.search ? prev : fallback,
      { replace: true }
    );
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableScrollLock
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={isReady} timeout={300}>
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
          {f ? (
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

              {/* MAIN CONTENT: IMAGE LEFT, OVERVIEW + NOTES RIGHT */}
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
              <Typography>Loading fragrance data...</Typography>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default FragranceModal;
