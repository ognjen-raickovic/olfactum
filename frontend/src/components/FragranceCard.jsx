import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Tooltip,
  IconButton,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { humanizeName } from "../utils/humanizeName";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const FragranceCard = ({ fragrance, onClick, onViewDetails, sx = {} }) => {
  const ratingNumber =
    fragrance.rating != null
      ? Number(String(fragrance.rating).replace(",", "."))
      : null;

  const handleOpen = (f) => {
    if (onClick) return onClick(f);
    if (onViewDetails) return onViewDetails(f);
  };

  const splitOccasions =
    fragrance.occasion
      ?.flatMap((o) =>
        String(o)
          .split("/")
          .map((x) => x.trim())
      )
      .filter(Boolean) || [];

  const splitSeasons =
    fragrance.season
      ?.flatMap((s) =>
        String(s)
          .split("/")
          .map((x) => x.trim())
      )
      .filter(Boolean) || [];

  const imageSrc =
    fragrance.image && fragrance.image !== "/images/default.jpg"
      ? fragrance.image
      : "/images/no-image.png";

  const gender = fragrance.genderProfile?.toLowerCase();
  const GenderIcon =
    gender === "masculine"
      ? MaleIcon
      : gender === "feminine"
      ? FemaleIcon
      : TransgenderIcon;

  return (
    <Card
      onClick={() => handleOpen(fragrance)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen(fragrance);
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
        ...sx,
      }}
    >
      {/* --- IMAGE --- */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          overflow: "hidden",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#20160F" : "grey.50",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LazyLoadImage
          src={imageSrc}
          alt={humanizeName(fragrance.name)}
          effect="blur"
          onError={(e) => (e.target.src = "/images/no-image.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Changed from "contain" to "cover" to eliminate black space
          }}
        />

        {/* Gender Icon Overlay */}
        {gender && (
          <Tooltip title={humanizeName(gender)} placement="top" arrow>
            <IconButton
              sx={{
                position: "absolute",
                top: 6,
                right: 6,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                p: 0.6,
              }}
            >
              <GenderIcon
                fontSize="small"
                sx={{
                  color:
                    gender === "men" || gender === "masculine"
                      ? "#1976d2" // blue for male
                      : gender === "women" || gender === "feminine"
                      ? "#e91e63" // pink for female
                      : "#4caf50", // green for unisex
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* --- INFO SECTION --- */}
      <CardContent
        sx={{
          textAlign: "center",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        {/* Main info */}
        <Box>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              lineHeight: 1.25,
              mb: 0.6,
            }}
          >
            {humanizeName(fragrance.name)}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: 14, mb: 0.3, display: "block" }}
          >
            {humanizeName(fragrance.brand)}
          </Typography>

          {/* Rating */}
          {ratingNumber != null && !isNaN(ratingNumber) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mt: 0.8,
              }}
            >
              <Rating
                value={ratingNumber}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="caption" color="text.secondary">
                {ratingNumber.toFixed(1)}
              </Typography>
            </Box>
          )}

          {/* Price Chip */}
          {fragrance.priceRange &&
            String(fragrance.priceRange).toLowerCase() !== "unknown" && (
              <Box sx={{ mt: 0.8 }}>
                <Chip
                  label={humanizeName(fragrance.priceRange)}
                  size="small"
                  color={
                    fragrance.priceRange === "Luxury" ||
                    fragrance.priceRange === "Premium"
                      ? "secondary"
                      : "default"
                  }
                />
              </Box>
            )}
        </Box>

        {/* Season + Occasion Chips */}
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 1.5,
          }}
        >
          {splitSeasons.slice(0, 2).map((s) => (
            <Chip
              key={s}
              label={humanizeName(s)}
              size="small"
              variant="outlined"
            />
          ))}
          {splitOccasions.slice(0, 2).map((o) => (
            <Chip
              key={o}
              label={humanizeName(o)}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FragranceCard;
