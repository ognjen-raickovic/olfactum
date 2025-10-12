import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
  Rating,
  CardMedia,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { humanizeName } from "../utils/humanizeName";

const FragranceModal = ({ fragrance, open, onClose }) => {
  if (!fragrance) return null;
  const ratingNumber =
    fragrance.rating != null
      ? Number(String(fragrance.rating).replace(",", "."))
      : null;

  const imageUrl =
    fragrance.image && fragrance.image !== "/images/default.jpg"
      ? fragrance.image
      : "/images/no-image.png";

  const genderIcon =
    fragrance.genderProfile === "Masculine"
      ? "♂️"
      : fragrance.genderProfile === "Feminine"
      ? "♀️"
      : "⚧";

  const pins = [
    fragrance.scentFamily,
    fragrance.intensity,
    fragrance.longevity,
    ...(fragrance.season || []),
    ...(fragrance.occasion || []),
  ].filter(Boolean);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: "90%", md: "900px" },
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          overflow: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            pb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h4" component="h2">
              {humanizeName(fragrance.brand)} {humanizeName(fragrance.name)}
            </Typography>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ mt: 0.5, mb: 1 }}
            >
              {humanizeName(fragrance.type)} • {genderIcon}{" "}
              {fragrance.genderProfile}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
                mt: 1,
              }}
            >
              {pins.map((pin, index) => (
                <Chip
                  key={index}
                  label={humanizeName(pin)}
                  size="small"
                  color={
                    pin === fragrance.inferredFrom ? "secondary" : "default"
                  }
                />
              ))}
            </Box>
          </Box>

          <Button
            onClick={onClose}
            sx={{ minWidth: "auto", p: 1, mt: { xs: 2, sm: 0 } }}
          >
            <Close />
          </Button>
        </Box>

        <Divider />

        {/* Body */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <CardMedia
                component="img"
                height="350"
                image={imageUrl}
                alt={humanizeName(fragrance.name)}
                sx={{ borderRadius: 2, objectFit: "cover", width: "100%" }}
                onError={(e) => {
                  e.target.src = "/images/no-image.png";
                }}
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">{fragrance.description}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Notes & Review */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fragrance Notes
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {fragrance.notes.map((note, index) => (
                <Chip
                  key={index}
                  label={humanizeName(note)}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Community Reviews
            </Typography>

            {ratingNumber != null && !isNaN(ratingNumber) && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Rating
                  value={ratingNumber}
                  precision={0.1}
                  readOnly
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {ratingNumber.toFixed(1)}/5
                  {fragrance.ratingCount
                    ? ` (${fragrance.ratingCount} reviews)`
                    : ""}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" size="large">
              Add to Favorites
            </Button>
            <Button
              variant="outlined"
              size="large"
              href={fragrance.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Reviews on Fragrantica
            </Button>
            <Button
              variant="text"
              size="large"
              href={`https://www.google.com/search?q=where to buy+${encodeURIComponent(
                humanizeName(fragrance.brand) +
                  " " +
                  humanizeName(fragrance.name)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Where to Buy
            </Button>{" "}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FragranceModal;
