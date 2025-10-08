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
        height: 420,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {/* Larger image to reduce empty space */}
      <CardMedia
        component="img"
        height="275"
        image={fragrance.image || `/images/${fragrance.slug}.jpg`}
        alt={fragrance.name}
        sx={{
          objectFit: "cover",
          bgcolor: "grey.100",
          width: "100%",
        }}
        onError={(e) => {
          e.target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkZyYWdyYW5jZSBJbWFnZTwvdGV4dD4KPC9zdmc+";
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          pt: 1.5,
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

          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            {fragrance.brand} • {fragrance.type}
          </Typography>

          <Chip
            label={fragrance.priceRange}
            size="small"
            color={
              fragrance.priceRange === "Luxury" ||
              fragrance.priceRange === "Premium"
                ? "secondary"
                : "default"
            }
            sx={{ mt: 0.8 }}
          />
        </Box>

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
