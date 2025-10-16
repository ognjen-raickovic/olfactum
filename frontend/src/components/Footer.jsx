import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { GitHub, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: `1px solid`,
        borderColor: "divider",
        py: 5,
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
            gap: 3,
          }}
        >
          {/* Logo + tagline */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: "primary.main",
                textTransform: "lowercase",
                fontWeight: 600,
              }}
            >
              olfactum
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover the art of fragrance
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {[
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" },
            ].map((link) => (
              <Link
                key={link.to}
                component={RouterLink}
                to={link.to}
                underline="none"
                color="text.secondary"
                sx={{
                  position: "relative",
                  fontWeight: 500,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: 0,
                    height: "2px",
                    bgcolor: "primary.main",
                    transition: "width 0.25s ease-in-out",
                  },
                  "&:hover": {
                    color: "primary.main",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Social icons */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton
              href="https://github.com/"
              target="_blank"
              rel="noopener"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://instagram.com/"
              target="_blank"
              rel="noopener"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 3 }}
        >
          © {new Date().getFullYear()} Olfactum. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
