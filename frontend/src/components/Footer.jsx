import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: `1px solid`,
        borderColor: "divider",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Logo and tagline */}
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: "primary.main",
                textTransform: "lowercase",
              }}
            >
              olfactum
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover the art of fragrance
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link href="#" color="text.secondary" underline="hover">
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Privacy
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Terms
            </Link>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary">
            © 2025 Olfactum. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
