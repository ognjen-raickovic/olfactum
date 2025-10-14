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
        height: "100%", // Ensure card takes full height
        ...sx,
      }}
    >
      {/* --- IMAGE SECTION - Fixed white space issue --- */}
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
          flexShrink: 0, // Prevent image from shrinking
        }}
      >
        <LazyLoadImage
          src={imageSrc}
          alt={humanizeName(fragrance.name)}
          effect="blur"
          onError={(e) => {
            e.target.src = "/images/no-image.png";
          }}
          wrapperProps={{
            style: {
              display: "block",
              width: "100%",
              height: "100%",
              lineHeight: 0, // Remove any line height spacing
            },
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
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
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "background.paper",
                  boxShadow: 2,
                },
                p: 0.6,
                width: 32,
                height: 32,
              }}
              size="small"
            >
              <GenderIcon
                fontSize="small"
                sx={{
                  color:
                    gender === "men"
                      ? "#1976d2" // blue for male
                      : gender === "women"
                      ? "#e91e63" // pink for female
                      : "#4caf50", // green for unisex
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* --- CONTENT SECTION - Improved spacing and layout --- */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          pb: 2,
          "&:last-child": { pb: 2 }, // Remove Material-UI default extra padding
        }}
      >
        {/* Brand Name */}
        <Typography
          color="text.secondary"
          sx={{
            fontSize: 14,
            mb: 0.5,
            display: "block",
            fontWeight: 500,
          }}
        >
          {humanizeName(fragrance.brand)}
        </Typography>

        {/* Fragrance Name */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 1,
            minHeight: "2.6em", // Ensure consistent height for 2 lines
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {humanizeName(fragrance.name)}
        </Typography>

        {/* Rating Section */}
        {ratingNumber != null && !isNaN(ratingNumber) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 1,
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

        {/* Spacer to push chips to bottom */}
        <Box sx={{ flexGrow: 1 }} />

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
          {splitSeasons.slice(0, 2).map((season) => (
            <Chip
              key={season}
              label={humanizeName(season)}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 22,
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
                fontSize: "0.7rem",
                height: 22,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FragranceCard;
