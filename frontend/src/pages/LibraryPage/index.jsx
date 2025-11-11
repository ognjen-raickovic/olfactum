import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Fade,
  CircularProgress,
  Container,
} from "@mui/material";
import { Favorite, BookmarkBorder } from "@mui/icons-material";
import LibraryGrid from "../../components/LibraryGrid";
import FragranceModal from "../../components/FragranceModal/FragranceModal";
import useFragranceLibrary from "../../hooks/useFragranceLibrary";

const LibraryPage = () => {
  const [tab, setTab] = useState(0);
  const [selectedFragrance, setSelectedFragrance] = useState(null);

  const {
    favorites,
    wishlist,
    loading,
    removeFromFavorites,
    removeFromWishlist,
  } = useFragranceLibrary();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleFragranceClick = (fragrance) => {
    setSelectedFragrance(fragrance);
  };

  const handleCloseModal = () => {
    setSelectedFragrance(null);
  };

  const handleRemoveFragrance = (fragranceId) => {
    if (tab === 0) {
      removeFromFavorites(fragranceId);
    } else {
      removeFromWishlist(fragranceId);
    }
  };

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
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #1976d2, #7b1fa2)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
        >
          My Library
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Manage your favorite fragrances and wishlist
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{
          mb: 4,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tab
          icon={<Favorite />}
          iconPosition="start"
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Favorites
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
              Wishlist
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

      {/* Favorites Tab */}
      <Fade in={tab === 0} timeout={500}>
        <Box hidden={tab !== 0}>
          <LibraryGrid
            fragrances={favorites}
            variant="favorite"
            onFragranceClick={handleFragranceClick}
            onRemoveFragrance={handleRemoveFragrance}
            emptyMessage="No favorites yet"
            emptyIcon={
              <Favorite sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            }
          />
        </Box>
      </Fade>

      {/* Wishlist Tab */}
      <Fade in={tab === 1} timeout={500}>
        <Box hidden={tab !== 1}>
          <LibraryGrid
            fragrances={wishlist}
            variant="wishlist"
            onFragranceClick={handleFragranceClick}
            onRemoveFragrance={handleRemoveFragrance}
            emptyMessage="Wishlist is empty"
            emptyIcon={
              <BookmarkBorder
                sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
              />
            }
          />
        </Box>
      </Fade>

      {/* Fragrance Modal - ADD disableRouting TO PREVENT URL CHANGES */}
      <FragranceModal
        fragrance={selectedFragrance}
        open={!!selectedFragrance}
        onClose={handleCloseModal}
        disableRouting={true} // prevents URL changes in library context
      />
    </Container>
  );
};

export default LibraryPage;
