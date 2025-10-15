// src/components/Navbar.jsx
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
  Divider,
} from "@mui/material";
import {
  Search,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import { searchFragrances } from "../services/fragranceService";
import FragranceModal from "./FragranceModal";
import { humanizeName } from "../utils/humanizeName";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Fragrances", path: "/fragrances" },
    { label: "Find Your Fragrance", path: "/find-your-fragrance" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Favorites", path: "/favorites" },
    { label: "About", path: "/about" },
    { label: "FAQ", path: "/faq" },
  ];

  const getDisplayLabel = (f) => {
    if (!f) return "Unknown";
    const name = humanizeName(f.name);
    const brand = humanizeName(f.brand);
    const ln = (name || "").toLowerCase();
    const lb = (brand || "").toLowerCase();
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

    const filtered = searchFragrances(val);
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

  return (
    <>
      {/* Fixed navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          bgcolor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.92)"
              : "rgba(12,12,12,0.78)",
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: { xs: 70, md: 84 },
            px: { xs: 1.5, sm: 3, md: 6 },
            gap: 2,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h3"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
              textTransform: "lowercase",
              letterSpacing: "-0.6px",
              fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.25rem" },
              "&:hover": { opacity: 0.95 },
            }}
          >
            olfactum
          </Typography>

          {/* Center section: search + links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3.5,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {/* Search box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: { xs: 180, sm: 260, md: 360 },
                maxWidth: "46vw",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.default",
                  borderRadius: 3,
                  px: 1.5,
                  py: { xs: 0.7, md: 1 },
                  width: "100%",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 2px 6px rgba(0,0,0,0.06)"
                      : "0 2px 6px rgba(255,255,255,0.03)",
                }}
              >
                <InputBase
                  placeholder="Search fragrances..."
                  value={query}
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
                  sx={{
                    color: "text.primary",
                    width: "100%",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    px: 0.5,
                  }}
                />
                <IconButton
                  onClick={handleSearchSubmit}
                  aria-label="Search"
                  sx={{ p: { xs: 0.5, md: 0.7 } }}
                >
                  <Search
                    sx={{ color: "text.secondary", fontSize: "1.3rem" }}
                  />
                </IconButton>
              </Box>

              {/* Search results */}
              {results.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 4,
                    zIndex: 1400,
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
                        py: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <img
                        src={r.image}
                        alt={r.name}
                        style={{
                          width: 44,
                          height: 44,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                      <Box>
                        <MuiTypography
                          sx={{ fontWeight: 700, fontSize: "0.98rem" }}
                        >
                          {getDisplayLabel(r)}
                        </MuiTypography>
                        <MuiTypography
                          sx={{ fontSize: "0.78rem", color: "text.secondary" }}
                        >
                          {humanizeName(r.brand)}
                        </MuiTypography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>

            {/* Desktop nav links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4.25,
                ml: 1,
              }}
            >
              {navLinks.map((link) => (
                <Typography
                  key={link.path}
                  variant="body1"
                  component={Link}
                  to={link.path}
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    position: "relative",
                    px: 0.25,
                    py: 0.25,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: 0,
                      height: "2px",
                      bottom: -8,
                      left: 0,
                      bgcolor: "primary.main",
                      transition: "width 0.22s ease",
                    },
                    "&:hover::after": { width: "100%" },
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Right side: theme (desktop only), profile, menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            {/* Theme toggle: only visible on md+ */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{ ml: 0.5 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mode}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {mode === "dark" ? (
                      <Brightness7 sx={{ fontSize: "1.75rem" }} />
                    ) : (
                      <Brightness4 sx={{ fontSize: "1.75rem" }} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </IconButton>
            </Box>

            {/* Profile */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton component={Link} to="/profile" sx={{ ml: 0.25 }}>
                <AccountCircle sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Box>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ fontSize: "1.8rem" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to prevent content jump (this is the trick) */}
      <Toolbar />

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
          }}
        >
          {/* Drawer header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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

          {/* Links */}
          <List sx={{ flexGrow: 1 }}>
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

          <Divider />

          {/* Profile */}
          <Box sx={{ px: 2, py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                component={Link}
                to="/profile"
                onClick={() => setDrawerOpen(false)}
              >
                <AccountCircle />
              </IconButton>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  component={Link}
                  to="/profile"
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    fontWeight: 700,
                  }}
                  onClick={() => setDrawerOpen(false)}
                >
                  Profile
                </Typography>
                <Typography
                  sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                >
                  Manage account
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Theme toggle inside drawer (mobile only) */}
          <Box
            onClick={toggleTheme}
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:active": { opacity: 0.7 },
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Theme</Typography>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode} // triggers animation on mode change
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {mode === "dark" ? (
                  <Brightness7 sx={{ fontSize: "1.55rem" }} />
                ) : (
                  <Brightness4 sx={{ fontSize: "1.55rem" }} />
                )}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Drawer>

      {/* Fragrance modal */}
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
