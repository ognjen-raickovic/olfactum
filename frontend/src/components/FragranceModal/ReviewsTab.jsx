import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Pagination,
  Chip,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const REVIEWS_PER_PAGE = 5;

const ReviewsTab = ({ fragrance, onRefresh }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role_id === 2 || user?.role_id === 3;

  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/reviews/${fragrance.perfume_id}`, {
        params: { page, limit: REVIEWS_PER_PAGE },
      });
      setReviews(res.data.reviews);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fragrance.perfume_id, page]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      setSnackbarMessage("Review deleted successfully");
      setSnackbarOpen(true);
      fetchReviews();
      if (onRefresh) onRefresh(); // trigger chart refresh
    } catch (err) {
      console.error("Delete failed", err);
      setSnackbarMessage("Failed to delete review");
      setSnackbarOpen(true);
    }
  };

  const pageCount = Math.ceil(total / REVIEWS_PER_PAGE);

  return (
    <Box sx={{ py: 2, px: { xs: 1, sm: 3 } }}>
      <Typography variant="h6" fontWeight={700} gutterBottom textAlign="center">
        User Reviews ({total})
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : total === 0 ? (
        <Typography color="text.secondary" textAlign="center">
          No reviews yet. Be the first!
        </Typography>
      ) : (
        <>
          {reviews.map((review) => (
            <Box
              key={review.review_id}
              sx={{
                mb: 2,
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                textAlign: "left",
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  {review.username}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.created_at).toLocaleDateString()}
                  </Typography>
                  {user && (user.user_id === review.user_id || isAdmin) && (
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(review.review_id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.review_text}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Overall: {review.rating_overall}/5
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Longevity: {review.longevity_rating}/5
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Sillage: {review.sillage_rating}/5
                </Typography>
                {review.scent_rating && (
                  <Typography variant="caption" color="text.secondary">
                    Scent: {review.scent_rating}/5
                  </Typography>
                )}
                {review.scent_profile && (
                  <Typography variant="caption" color="text.secondary">
                    Scent: {review.scent_profile}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {review.seasons?.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: "0.7rem" }}
                  />
                ))}
                {review.occasions?.map((o) => (
                  <Chip
                    key={o}
                    label={o}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    sx={{ fontSize: "0.7rem" }}
                  />
                ))}
              </Box>
            </Box>
          ))}
          {pageCount > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, val) => setPage(val)}
              />
            </Box>
          )}
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewsTab;
