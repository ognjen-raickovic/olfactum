import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, Search } from "@mui/icons-material";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 3,
          py: 8,
        }}
      >
        <Typography variant="h1" fontWeight="bold" color="primary.main">
          404
        </Typography>

        <Typography variant="h4" gutterBottom>
          Scent Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary">
          The fragrance page you're looking for has evaporated into thin air.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<Home />}
            size="large"
          >
            Return Home
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/fragrances"
            startIcon={<Search />}
            size="large"
          >
            Browse Fragrances
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
