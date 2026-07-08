import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { humanizeName } from "../utils/humanizeName";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import {
  PlaylistAdd,
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const typeAbbreviations = {
  "Eau de Parfum": "EDP",
  "Eau de Toilette": "EDT",
  "Eau de Cologne": "EDC",
  Parfum: "Parfum",
  "Extrait / Elixir / Pure Parfum": "Extrait",
};
const getTypeLabel = (name) => typeAbbreviations[name] || name;

const FragranceCard = ({
  fragrance,
  onClick,
  onViewDetails,
  sx = {},
  admin = false,
  onEdit,
  onDelete,
  library = false,
  onRemove,
}) => {
  const f = fragrance?.fragrance ? fragrance.fragrance : fragrance;
  const { user } = useAuth();

  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [saveMenuAnchor, setSaveMenuAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const ratingNumber =
    f?.rating != null ? Number(String(f.rating).replace(",", ".")) : 0;
  const hasRating = ratingNumber > 0;

  const rawGender = (f?.gender_profile || f?.genderProfile || "")
    .toString()
    .toLowerCase()
    .trim();
  const gender =
    rawGender === "male"
      ? "men"
      : rawGender === "female"
        ? "women"
        : rawGender === "unisex"
          ? "unisex"
          : "";
  const GenderIcon =
    gender === "men"
      ? MaleIcon
      : gender === "women"
        ? FemaleIcon
        : TransgenderIcon;
  const getGenderColors = () => {
    switch (gender) {
      case "men":
        return {
          bgcolor: "rgba(33,150,243,0.1)",
          color: "#2196f3",
          hoverBg: "rgba(33,150,243,0.2)",
        };
      case "women":
        return {
          bgcolor: "rgba(233,30,99,0.1)",
          color: "#e91e63",
          hoverBg: "rgba(233,30,99,0.2)",
        };
      default:
        return {
          bgcolor: "rgba(76,175,80,0.1)",
          color: "#4caf50",
          hoverBg: "rgba(76,175,80,0.2)",
        };
    }
  };
  const genderColors = getGenderColors();

  const handleOpen = () => {
    if (onClick) onClick(f);
    else if (onViewDetails) onViewDetails(f);
  };

  // Fetch current library state from backend when user is logged in
  useEffect(() => {
    if (!user || !f) return;
    const fetchState = async () => {
      try {
        const perfumeId = f.perfume_id ?? f.id;
        const [favRes, wlRes] = await Promise.all([
          api.get("/library/favorites"),
          api.get("/library/wishlist"),
        ]);
        setIsFavorited(
          favRes.data.favorites.some((p) => p.perfume_id === perfumeId),
        );
        setIsInWishlist(
          wlRes.data.wishlist.some((p) => p.perfume_id === perfumeId),
        );
      } catch (err) {
        console.error("Failed to load library state", err);
      }
    };
    fetchState();
  }, [user, f]);

  const handleSaveMenuOpen = (e) => {
    e.stopPropagation();
    setSaveMenuAnchor(e.currentTarget);
  };
  const handleSaveMenuClose = () => setSaveMenuAnchor(null);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!user) return;
    const perfumeId = f.perfume_id ?? f.id;
    try {
      const res = await api.post("/library/favorites", {
        perfume_id: perfumeId,
      });
      setIsFavorited(res.data.action === "added");
      setSnackbarMessage(res.data.message);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Toggle favorite failed", err);
    }
    setSaveMenuAnchor(null);
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) return;
    const perfumeId = f.perfume_id ?? f.id;
    try {
      const res = await api.post("/library/wishlist", {
        perfume_id: perfumeId,
      });
      setIsInWishlist(res.data.action === "added");
      setSnackbarMessage(res.data.message);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Toggle wishlist failed", err);
    }
    setSaveMenuAnchor(null);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const imageSrc =
    f?.image && f.image !== "/images/default.jpg"
      ? f.image
      : "/images/no-image.png";

  return (
    <>
      <Card
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpen();
        }}
        role="button"
        tabIndex={0}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "all 0.25s ease-in-out",
          "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
          height: "100%",
          justifyContent: "space-between",
          ...sx,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 4",
            overflow: "hidden",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#20160F" : "grey.50",
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <LazyLoadImage
            src={imageSrc}
            alt={humanizeName(f?.name)}
            effect="blur"
            onError={(e) => {
              e.target.src = "/images/no-image.png";
            }}
            wrapperProps={{
              style: {
                display: "block",
                width: "100%",
                height: "100%",
                lineHeight: 0,
              },
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {admin ? (
            <Box
              sx={{
                position: "absolute",
                top: 6,
                left: 6,
                display: "flex",
                gap: 0.5,
              }}
            >
              <Tooltip title="Edit" arrow>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(f);
                  }}
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    width: 30,
                    height: 30,
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete" arrow>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(f.perfume_id ?? f.id);
                  }}
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    width: 30,
                    height: 30,
                    "&:hover": {
                      bgcolor: "error.main",
                      color: "white",
                    },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : library ? (
            <Box
              sx={{
                position: "absolute",
                top: 6,
                left: 6,
              }}
            >
              <Tooltip title="Remove from list" arrow>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.(f.perfume_id ?? f.id);
                  }}
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    width: 30,
                    height: 30,
                    "&:hover": {
                      bgcolor: "error.main",
                      color: "white",
                    },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <>
              <Tooltip title="Save to list" arrow>
                <IconButton
                  onClick={handleSaveMenuOpen}
                  sx={{
                    position: "absolute",
                    top: 6,
                    left: 6,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    "&:hover": {
                      bgcolor: "primary.main",
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    },
                    width: 30,
                    height: 30,
                    p: 0.6,
                  }}
                  size="small"
                >
                  <PlaylistAdd
                    fontSize="small"
                    sx={{ color: "text.primary" }}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={saveMenuAnchor}
                open={Boolean(saveMenuAnchor)}
                onClose={handleSaveMenuClose}
                onClick={handleSaveMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                disableScrollLock
              >
                <MenuItem onClick={toggleFavorite}>
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

                <MenuItem onClick={toggleWishlist}>
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
            </>
          )}
          {gender && (
            <Tooltip title={humanizeName(gender)} arrow>
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  bgcolor: genderColors.bgcolor,
                  boxShadow: 1,
                  "&:hover": { bgcolor: genderColors.hoverBg },
                  p: 0.6,
                  width: 30,
                  height: 30,
                }}
              >
                <GenderIcon
                  fontSize="small"
                  sx={{ color: genderColors.color }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 1.5, sm: 2 },
            pb: { xs: 1.5, sm: 2 },
            "&:last-child": { pb: { xs: 1.5, sm: 2 } },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: 13, sm: 14 },
                mb: 0.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {humanizeName(f?.brand_name || f?.brand)}
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                lineHeight: 1.3,
                mb: 1,
                minHeight: { xs: "2.4em", sm: "2.6em" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {humanizeName(f?.name)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              mb: 1,
            }}
          >
            <Rating
              value={ratingNumber}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {hasRating ? ratingNumber.toFixed(1) : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              gap: 0.4,
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 1,
            }}
          >
            {f?.type_name && (
              <Chip
                label={getTypeLabel(f.type_name)}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: 22 }}
              />
            )}
            {f?.tags
              ?.filter((tag) => tag.type === "category")
              .slice(0, 2)
              .map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.65rem", height: 22 }}
                />
              ))}
            {f?.seasons?.slice(0, 2).map((s) => (
              <Chip
                key={s.id}
                label={s.name}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: 22 }}
              />
            ))}
            {f?.occasions?.slice(0, 2).map((o) => (
              <Chip
                key={o.id}
                label={o.name}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: 22 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FragranceCard;
