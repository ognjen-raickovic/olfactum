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
import {
  getBrandDisplayName,
  getFragranceTypeAbbreviation,
  cleanFragranceName,
  nameIncludesConcentration,
} from "../../utils/fragranceModalUtils";

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

  // 1) compute abbreviation from the fragrance.type (EDP/EDT/Extrait/..)
  const fragranceTypeAbbrev = useMemo(
    () => getFragranceTypeAbbreviation(fragrance?.type),
    [fragrance]
  );

  // 2) detect whether the *original* name/slug actually contains a concentration term
  // If neither the name nor the slug contains any concentration terms, we will NOT show the abbreviation.
  const shouldShowTypeAbbrev = useMemo(() => {
    const rawName = fragrance?.name || "";
    const slug = fragrance?.slug || "";
    return (
      nameIncludesConcentration(rawName) || nameIncludesConcentration(slug)
    );
  }, [fragrance]);

  // 3) clean the name (remove embedded concentration words so the humanized name is nice)
  const cleanedName = useMemo(
    () => cleanFragranceName(fragrance?.name || "", fragrance?.type),
    [fragrance]
  );

  const brandPart = useMemo(
    () => getBrandDisplayName(fragrance?.brand || "", isMobile),
    [fragrance, isMobile]
  );

  const namePart = useMemo(() => humanizeName(cleanedName), [cleanedName]);

  // Compose: Only append the type abbreviation if shouldShowTypeAbbrev is true
  const displayTitle = useMemo(() => {
    const parts = [];
    if (brandPart) parts.push(brandPart);
    if (namePart) parts.push(namePart);
    if (shouldShowTypeAbbrev && fragranceTypeAbbrev)
      parts.push(fragranceTypeAbbrev);
    return parts.join(" ");
  }, [brandPart, namePart, fragranceTypeAbbrev, shouldShowTypeAbbrev]);

  const ratingValue = fragrance?.rating || fragrance?.ratingValue || 4.2;

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
      {/* Desktop layout */}
      {!isMobile && (
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
                label={`${Number(ratingValue).toFixed(1)}/5`}
                size="small"
                variant="filled"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
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
      )}

      {/* Mobile layout */}
      {isMobile && (
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
                label={`${Number(ratingValue).toFixed(1)}/5`}
                size="small"
                color="primary"
                sx={{ fontWeight: 600, height: 22 }}
              />
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
