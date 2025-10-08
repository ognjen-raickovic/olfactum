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
} from "@mui/material";
import { Search, Brightness4, Brightness7 } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import { fragranceData } from "../services/fragranceData";
import { filterFragrances } from "../utils/filterFragrances";
import FragranceModal from "./FragranceModal";

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const navigate = useNavigate();

  // display label: if name starts with brand, remove brand prefix -> "Sauvage – Dior"
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

    // use helper; if you prefer inline, you can copy filterFragrances logic here
    const filtered = filterFragrances(fragranceData, val);
    setResults(filtered.slice(0, 6)); // show top 6 suggestions
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    navigate(`/fragrances?query=${encodeURIComponent(query.trim())}`);
    setResults([]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleResultClick = (f) => {
    setSelectedFragrance(f);
    setResults([]);
    setQuery("");
  };

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

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Typography
              variant="body1"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Home
            </Typography>

            {/* changed label to Fragrances */}
            <Typography
              variant="body1"
              component={Link}
              to="/fragrances"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Fragrances
            </Typography>

            <Typography
              variant="body1"
              component={Link}
              to="/about"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              About
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              position: "relative",
            }}
          >
            {/* wrapper to allow absolute dropdown positioned relative to this box */}
            <Box sx={{ position: "relative", width: 360 }}>
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

              {/* Dropdown suggestions */}
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
                        py: 1.25, // slightly larger rows
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
