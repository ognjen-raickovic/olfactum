import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  useTheme,
  Paper,
  Typography as MuiTypography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  Search,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import {
  getAllFragrances,
  searchFragrances,
} from "../services/fragranceService";
import FragranceModal from "./FragranceModal";

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // --- helper for dropdown label ---
  const getDisplayLabel = (f) => {
    const name = (f.name || "").trim();
    const brand = (f.brand || "").trim();
    const ln = name.toLowerCase();
    const lb = brand.toLowerCase();
    if (brand && ln.startsWith(lb)) {
      const without = name.substring(brand.length).trim();
      if (without) return `${without} – ${brand}`;
    }
    return name;
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (!val.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchFragrances(val); // returns filtered fragrances
    setResults(filtered.slice(0, 6));
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    navigate(`/fragrances?query=${encodeURIComponent(query.trim())}`);
    setResults([]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const handleResultClick = (f) => {
    setSelectedFragrance(f);
    setResults([]);
    setQuery("");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Fragrances", path: "/fragrances" },
    { label: "Find Your Fragrance", path: "/find-your-fragrance" },
    { label: "About", path: "/about" },
    { label: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Logo */}
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              color: "primary.main",
              textDecoration: "none",
              textTransform: "lowercase",
              "&:hover": { opacity: 0.8 },
            }}
          >
            olfactum
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Typography
                key={link.path}
                variant="body1"
                component={Link}
                to={link.path}
                sx={{
                  textDecoration: "none",
                  color: "text.primary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Search + Theme Toggle */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative", width: 280 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.default",
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                }}
              >
                <InputBase
                  placeholder="Search fragrances..."
                  value={query}
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
                  sx={{ color: "text.primary", width: "100%" }}
                />
                <IconButton onClick={handleSearchSubmit} aria-label="Search">
                  <Search sx={{ color: "text.secondary" }} />
                </IconButton>
              </Box>

              {results.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    zIndex: 1300,
                    overflow: "hidden",
                  }}
                >
                  {results.map((r) => (
                    <Box
                      key={r.id}
                      onClick={() => handleResultClick(r)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 2,
                        py: 1.25,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                      <Box>
                        <MuiTypography
                          sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                        >
                          {getDisplayLabel(r)}
                        </MuiTypography>
                        <MuiTypography
                          sx={{ fontSize: "0.78rem", color: "text.secondary" }}
                        >
                          {r.brand}
                        </MuiTypography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>

            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Mobile Menu) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto", px: 2, pb: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Box>
      </Drawer>

      {/* Fragrance modal opens when a dropdown item is clicked */}
      {selectedFragrance && (
        <FragranceModal
          fragrance={selectedFragrance}
          open={Boolean(selectedFragrance)}
          onClose={() => setSelectedFragrance(null)}
        />
      )}
    </>
  );
};

export default Navbar;
