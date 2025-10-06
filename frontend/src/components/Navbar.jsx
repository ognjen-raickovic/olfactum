import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  useTheme,
} from "@mui/material";
import { Search, Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../contexts/ThemeContext"; // Updated import

const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext(); // Updated hook

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side - Logo */}
        <Typography
          variant="h4"
          component="h1"
          onClick={handleLogoClick}
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: "primary.main",
            cursor: "pointer",
            textTransform: "lowercase",
            "&:hover": { opacity: 0.8 },
          }}
        >
          olfactum
        </Typography>

        {/* Center - Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Typography
            variant="body1"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            Home
          </Typography>
          <Typography
            variant="body1"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            Browse
          </Typography>
          <Typography
            variant="body1"
            sx={{
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
            }}
          >
            About
          </Typography>
        </Box>

        {/* Right side - Search and Theme Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "background.default",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              mr: 2,
            }}
          >
            <Search sx={{ color: "text.secondary", mr: 1 }} />
            <InputBase
              placeholder="Search fragrances..."
              sx={{ color: "text.primary" }}
            />
          </Box>

          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
