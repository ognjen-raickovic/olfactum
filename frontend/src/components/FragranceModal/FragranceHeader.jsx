import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Chip,
  useTheme,
  Stack,
} from "@mui/material";
import {
  Close,
  PlaylistAdd,
  Share,
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";
import { humanizeName } from "../../utils/humanizeName";

const FragranceHeader = ({
  fragrance,
  onClose,
  onShare,
  onFavorite,
  onWishlist,
  isFavorited,
  isInWishlist,
  isMobile,
}) => {
  const theme = useTheme();
  const [saveMenuAnchor, setSaveMenuAnchor] = useState(null);

  const handleSaveMenuOpen = (event) => setSaveMenuAnchor(event.currentTarget);
  const handleSaveMenuClose = () => setSaveMenuAnchor(null);

  const ratingValue = Number(fragrance?.average_rating) || 0;
  const reviewCount = Number(fragrance?.rating_count) || 0;

  const displayTitle = useMemo(() => {
    const brand = fragrance?.brand_name || fragrance?.brand || "";
    const name = fragrance?.name || "";
    return `${humanizeName(brand)} - ${humanizeName(name)}`.trim();
  }, [fragrance]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        pb: { xs: 1.5, sm: 2 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(10px)",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      {!isMobile ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Tooltip title="Share fragrance">
            <IconButton
              onClick={onShare}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 2,
                "&:hover": {
                  transform: "scale(1.1)",
                  bgcolor: "primary.light",
                },
                width: 44,
                height: 44,
                border: `2px solid ${theme.palette.primary.main}20`,
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>
          <Box sx={{ flex: 1, minWidth: 0, textAlign: "center" }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #FFFFFF, #E0E0E0)"
                    : "linear-gradient(45deg, #1976d2, #5e35b1)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayTitle}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <Rating value={ratingValue} precision={0.1} readOnly />
              <Chip
                label={`${ratingValue.toFixed(1)}/5`}
                size="small"
                variant="filled"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.8rem", fontWeight: 500, ml: 0.5 }}
              >
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Save to list">
              <IconButton
                onClick={handleSaveMenuOpen}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                    bgcolor: "secondary.light",
                  },
                  width: 44,
                  height: 44,
                  border: `2px solid ${theme.palette.secondary.main}20`,
                }}
              >
                <PlaylistAdd />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                onClick={onClose}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                    bgcolor: "error.light",
                  },
                  width: 44,
                  height: 44,
                  border: `2px solid ${theme.palette.error.main}20`,
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 1,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #FFFFFF, #E0E0E0)"
                  : "linear-gradient(45deg, #1976d2, #5e35b1)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {displayTitle}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.2}
          >
            <Tooltip title="Share fragrance">
              <IconButton
                onClick={onShare}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                    bgcolor: "primary.light",
                  },
                  width: 36,
                  height: 36,
                  border: `2px solid ${theme.palette.primary.main}20`,
                }}
              >
                <Share fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                size="small"
                value={ratingValue}
                precision={0.1}
                readOnly
              />
              <Chip
                label={`${ratingValue.toFixed(1)}/5`}
                size="small"
                color="primary"
                sx={{ fontWeight: 600, height: 22 }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                ({reviewCount})
              </Typography>
            </Box>
            <Tooltip title="Save to list">
              <IconButton
                onClick={handleSaveMenuOpen}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                    bgcolor: "secondary.light",
                  },
                  width: 36,
                  height: 36,
                  border: `2px solid ${theme.palette.secondary.main}20`,
                }}
              >
                <PlaylistAdd fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                onClick={onClose}
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "scale(1.1)",
                    bgcolor: "error.light",
                  },
                  width: 36,
                  height: 36,
                  border: `2px solid ${theme.palette.error.main}20`,
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}
      <Menu
        anchorEl={saveMenuAnchor}
        open={Boolean(saveMenuAnchor)}
        onClose={handleSaveMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            onFavorite();
            handleSaveMenuClose();
          }}
        >
          <ListItemIcon>
            {isFavorited ? (
              <Favorite sx={{ color: "error.main" }} />
            ) : (
              <FavoriteBorder />
            )}
          </ListItemIcon>
          <ListItemText>
            {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onWishlist();
            handleSaveMenuClose();
          }}
        >
          <ListItemIcon>
            {isInWishlist ? (
              <Bookmark sx={{ color: "primary.main" }} />
            ) : (
              <BookmarkBorder />
            )}
          </ListItemIcon>
          <ListItemText>
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FragranceHeader;
