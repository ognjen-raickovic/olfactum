import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

const FragranceCard = ({ fragrance, onViewDetails }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        height="260"
        image={fragrance.image || `/images/${fragrance.slug}.jpg`}
        alt={fragrance.name}
        sx={{
          objectFit: "cover",
          bgcolor: "grey.100",
        }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x260?text=No+Image";
        }}
      />

      {/* Content Section */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {fragrance.name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
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
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Season & Occasion Chips */}
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}>
          {fragrance.season.slice(0, 2).map((season) => (
            <Chip key={season} label={season} size="small" variant="outlined" />
          ))}
          {fragrance.occasion.slice(0, 1).map((occasion) => (
            <Chip
              key={occasion}
              label={occasion}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        {/* Action Button */}
        <Button
          variant="outlined"
          size="small"
          fullWidth
          onClick={() => onViewDetails(fragrance)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default FragranceCard;
