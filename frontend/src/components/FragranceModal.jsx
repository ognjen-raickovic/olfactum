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

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QjlCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPkZyYWdyYW5jZSBJbWFnZTwvdGV4dD4KPC9zdmc+";

const FragranceModal = ({ fragrance, open, onClose }) => {
  if (!fragrance) return null;

  const imageUrl = fragrance.image || `/images/${fragrance.slug}.jpg`;

  // Build gender display
  const genderIcon =
    fragrance.genderProfile === "Masculine"
      ? "♂️"
      : fragrance.genderProfile === "Feminine"
      ? "♀️"
      : "⚧";

  // Pins row
  const pins = [
    fragrance.scentFamily,
    fragrance.longevity,
    fragrance.intensity,
    ...fragrance.season,
    ...fragrance.occasion,
  ];

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
              {fragrance.brand} {fragrance.name}
            </Typography>
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ mt: 0.5, mb: 1 }}
            >
              {fragrance.type} • {genderIcon} {fragrance.genderProfile}
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
                <Chip key={index} label={pin} size="small" />
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
                alt={fragrance.name}
                sx={{ borderRadius: 2, objectFit: "cover", width: "100%" }}
                onError={(e) => {
                  e.target.src = placeholderImage;
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
                <Chip key={index} label={note} variant="outlined" />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Community Reviews
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                4.5/5 (128 reviews)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              "This fragrance is absolutely stunning! Perfect for evening wear."
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" size="large">
              Add to Favorites
            </Button>
            <Button variant="outlined" size="large">
              Read Reviews
            </Button>
            <Button variant="text" size="large">
              Where to Buy
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FragranceModal;
