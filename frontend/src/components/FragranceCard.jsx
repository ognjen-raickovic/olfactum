import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
} from "@mui/material";
import { humanizeName } from "../utils/humanizeName";

const FragranceCard = ({ fragrance, onClick, onViewDetails }) => {
  const ratingNumber =
    fragrance.rating != null
      ? Number(String(fragrance.rating).replace(",", "."))
      : null;
  const handleOpen = (f) => {
    if (onClick) return onClick(f);
    if (onViewDetails) return onViewDetails(f);
  };
  // Split occasions by "/" and trim them
  const splitOccasions =
    fragrance.occasion
      ?.flatMap((o) => o.split("/").map((x) => x.trim()))
      .filter(Boolean) || [];

  // Optionally, you can also split seasons if you ever have multiple in a string
  const splitSeasons =
    fragrance.season
      ?.flatMap((s) => s.split("/").map((x) => x.trim()))
      .filter(Boolean) || [];

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
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: "100%",
          flexShrink: 0,
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#20160F" : "grey.100",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardMedia
          component="img"
          image={fragrance.image || `/images/${fragrance.slug}.jpg`}
          alt={humanizeName(fragrance.name)}
          sx={{
            objectFit: "contain",
            maxHeight: "100%",
            maxWidth: "100%",
            width: "auto",
          }}
          onError={(e) => {
            e.target.src = "/images/no-image.png";
          }}
        />
      </Box>

      {/* Info */}
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
        <Box>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: "1.05rem",
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {humanizeName(fragrance.name)}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: 13, display: "block" }}
          >
            {humanizeName(fragrance.brand)}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: 13, display: "block" }}
          >
            {humanizeName(fragrance.type)}
          </Typography>

          {/* Rating */}
          {ratingNumber != null && !isNaN(ratingNumber) && (
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

          {/* Price + Gender Chips */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 0.8,
              mt: 0.8,
              flexWrap: "wrap",
            }}
          >
            {/* Only show price chip if it exists and isn’t “Unknown” */}
            {fragrance.priceRange &&
              fragrance.priceRange.toLowerCase() !== "unknown" && (
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
              )}

            {/* Gender chip, capitalize and style */}
            {fragrance.genderProfile && (
              <Chip
                label={humanizeName(fragrance.genderProfile)}
                size="small"
                color={
                  fragrance.genderProfile.toLowerCase() === "masculine"
                    ? "primary"
                    : fragrance.genderProfile.toLowerCase() === "feminine"
                    ? "secondary"
                    : "default"
                }
                variant="outlined"
              />
            )}
          </Box>
        </Box>
        {/* Season + Occasion Chips */}
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            justifyContent: "center",
            mt: 1.3,
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
