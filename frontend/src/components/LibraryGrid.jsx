import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { EmojiObjects, Favorite, BookmarkBorder } from "@mui/icons-material";
import FragranceCard from "./FragranceCard";

const LibraryGrid = ({
  fragrances,
  variant = "favorite",
  onRemoveFragrance,
  onFragranceClick,
  emptyMessage,
  emptyIcon,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // Calculate grid columns based on screen size (same as FragrancesPage)
  const getGridColumns = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

  const gridColumns = getGridColumns();

  if (!fragrances || fragrances.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
        }}
      >
        {emptyIcon ||
          (variant === "favorite" ? (
            <Favorite sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          ) : (
            <BookmarkBorder
              sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
            />
          ))}
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {emptyMessage ||
            `No ${variant === "favorite" ? "favorites" : "wishlist items"} yet`}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {variant === "favorite"
            ? "Start exploring and add fragrances you love to your favorites!"
            : "Save fragrances you'd like to try later to your wishlist!"}
        </Typography>
        <Button variant="contained" href="/fragrances" sx={{ borderRadius: 2 }}>
          Explore Fragrances
        </Button>
      </Box>
    );
  }

  return (
    <>
      {/* Showing text - Centered */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Showing {fragrances.length}{" "}
        {variant === "favorite" ? "favorite" : "wishlist"} fragrance
        {fragrances.length !== 1 ? "s" : ""}
      </Typography>

      {/* Grid Layout - Same as FragrancesPage */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: { xs: 2, md: 3 },
          justifyItems: "stretch",
        }}
      >
        {fragrances.map((fragrance) => (
          <FragranceCard
            key={fragrance.id}
            fragrance={fragrance}
            onClick={onFragranceClick}
            disableNavigation={true}
            sx={{
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: isMobile ? "none" : "translateY(-4px)",
                boxShadow: isMobile ? 1 : 3,
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default LibraryGrid;
