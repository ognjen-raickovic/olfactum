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
  // Handle both direct fragrance objects and wrapped ones (like { fragrance, createdAt })
  const f = fragrance?.fragrance ? fragrance.fragrance : fragrance;

  const ratingNumber =
    f.rating != null ? Number(String(f.rating).replace(",", ".")) : null;

  const handleOpen = (frag) => {
    if (onClick) return onClick(frag);
    if (onViewDetails) return onViewDetails(frag);
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

  const gender = f.genderProfile?.toLowerCase();
  const GenderIcon =
    gender === "masculine"
      ? MaleIcon
      : gender === "feminine"
      ? FemaleIcon
      : TransgenderIcon;

  return (
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
                width: 30,
                height: 30,
              }}
              size="small"
            >
              <GenderIcon
                fontSize="small"
                sx={{
                  color:
                    gender === "men"
                      ? "#1976d2"
                      : gender === "women"
                      ? "#e91e63"
                      : "#4caf50",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>

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
  );
};

export default FragranceCard;
