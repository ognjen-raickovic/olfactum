import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const FragranceCard = ({ fragrance, onClick, onViewDetails }) => {
  const handleOpen = (f) => {
    if (onClick) return onClick(f);
    if (onViewDetails) return onViewDetails(f);
  };

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
          alt={fragrance.name}
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
            {fragrance.name}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: 13, display: "block" }}
          >
            {fragrance.brand}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: 13, display: "block" }}
          >
            {fragrance.type}
          </Typography>

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
            <Chip
              label={fragrance.priceRange}
              size="small"
              color={
                fragrance.priceRange === "Luxury" ||
                fragrance.priceRange === "Premium"
                  ? "secondary"
                  : "default"
              }
            />
            {fragrance.genderProfile && (
              <Chip
                label={fragrance.genderProfile}
                size="small"
                color={
                  fragrance.genderProfile === "Masculine"
                    ? "primary"
                    : fragrance.genderProfile === "Feminine"
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
          {fragrance.season?.slice(0, 2).map((s) => (
            <Chip key={s} label={s} size="small" variant="outlined" />
          ))}
          {fragrance.occasion?.slice(0, 1).map((o) => (
            <Chip key={o} label={o} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FragranceCard;
