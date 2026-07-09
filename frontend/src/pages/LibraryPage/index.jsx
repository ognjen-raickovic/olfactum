import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Fade,
  CircularProgress,
  Container,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { Favorite, BookmarkBorder } from "@mui/icons-material";
import LibraryGrid from "../../components/LibraryGrid";
import FragranceModal from "../../components/FragranceModal/FragranceModal";
import api from "../../services/api";

const LibraryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [tab, setTab] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFragrance, setSelectedFragrance] = useState(null);

  const fetchLibrary = async () => {
    setLoading(true);
    try {
      const [favRes, wlRes] = await Promise.all([
        api.get("/library/favorites"),
        api.get("/library/wishlist"),
      ]);
      setFavorites(favRes.data.favorites);
      setWishlist(wlRes.data.wishlist);
    } catch (err) {
      console.error("Failed to load library", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLibrary();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleRemove = async (perfumeId) => {
    if (tab === 0) {
      await api.post("/library/favorites", { perfume_id: perfumeId });
      setFavorites((prev) => prev.filter((f) => f.perfume_id !== perfumeId));
    } else {
      await api.post("/library/wishlist", { perfume_id: perfumeId });
      setWishlist((prev) => prev.filter((f) => f.perfume_id !== perfumeId));
    }
  };

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleFragranceClick = (fragrance) => setSelectedFragrance(fragrance);
  const handleCloseModal = () => setSelectedFragrance(null);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 50%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
          py: { xs: 10, md: 14 },
          width: "100%",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.75rem", md: "4rem" },
              mb: 3,
              color: "text.primary",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Library
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              lineHeight: 1.3,
              color: "text.secondary",
              fontSize: { xs: "1.25rem", md: "1.75rem" },
              maxWidth: 760,
              mx: "auto",
            }}
          >
            Manage your favorite fragrances and wishlist in one place.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          centered
          sx={{ mb: 4, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            icon={<Favorite />}
            iconPosition="start"
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Favorites{" "}
                {favorites.length > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 10,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {favorites.length}
                  </Typography>
                )}
              </Box>
            }
          />
          <Tab
            icon={<BookmarkBorder />}
            iconPosition="start"
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Wishlist{" "}
                {wishlist.length > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 10,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {wishlist.length}
                  </Typography>
                )}
              </Box>
            }
          />
        </Tabs>

        <Fade in={tab === 0} timeout={500}>
          <Box hidden={tab !== 0}>
            {isLoggedIn ? (
              <LibraryGrid
                fragrances={favorites}
                variant="favorite"
                onFragranceClick={handleFragranceClick}
                onRemoveFragrance={handleRemove}
                emptyMessage="No favorites yet"
                emptyIcon={
                  <Favorite
                    sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                  />
                }
              />
            ) : (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                <Favorite
                  sx={{
                    fontSize: 64,
                    color: "error.main",
                    mb: 2,
                  }}
                />

                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Log in to use Favorites
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  You need to be logged in to add perfumes to your Favorites
                  collection.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate("/register")}
                  >
                    Create Account
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
        <Fade in={tab === 1} timeout={500}>
          <Box hidden={tab !== 1}>
            {isLoggedIn ? (
              <LibraryGrid
                fragrances={wishlist}
                variant="wishlist"
                onFragranceClick={handleFragranceClick}
                onRemoveFragrance={handleRemove}
                emptyMessage="Wishlist is empty"
                emptyIcon={
                  <BookmarkBorder
                    sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                  />
                }
              />
            ) : (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                <BookmarkBorder
                  sx={{
                    fontSize: 64,
                    color: "primary.main",
                    mb: 2,
                  }}
                />

                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Log in to use Wishlist
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  You need to be logged in to add perfumes to your Wishlist.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate("/register")}
                  >
                    Create Account
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>

        <FragranceModal
          fragrance={selectedFragrance}
          open={!!selectedFragrance}
          onClose={handleCloseModal}
          disableRouting={true}
        />
      </Container>
    </Box>
  );
};

export default LibraryPage;
