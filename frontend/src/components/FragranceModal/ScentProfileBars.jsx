import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const SCENT_CATEGORY_COLORS = {
  Fresh: "#4FC3F7",
  Citrus: "#FFF176",
  Floral: "#F48FB1",
  Aquatic: "#29B6F6",
  Woody: "#8D6E63",
  Earthy: "#795548",
  Spicy: "#FF7043",
  Amber: "#FFB74D",
  Oriental: "#BA68C8",
  Gourmand: "#A1887F",
  Musky: "#90A4AE",
  Aromatic: "#81C784",
  Green: "#66BB6A",
};

const ScentProfileBars = ({ fragrance, refreshKey }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(
          `/reviews/${fragrance.perfume_id}/scent-stats`,
        );
        setData(res.data.slice(0, 5)); // top 5
      } catch (err) {
        console.error("Failed to load scent stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [fragrance.perfume_id, refreshKey]);

  if (loading) return <CircularProgress />;

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <Box sx={{ mb: 3, width: "100%", textAlign: "center" }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Scent profile
      </Typography>

      {data.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No scent votes yet
        </Typography>
      ) : (
        data.map((item) => (
          <Box
            key={item.name}
            sx={{
              position: "relative",
              height: isMobile ? 30 : 40,
              borderRadius: 1,
              bgcolor: theme.palette.action.hover,
              overflow: "hidden",
              mb: isMobile ? 1.5 : 2,
              width: "100%",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${(item.count / maxCount) * 100}%`,
                borderRadius: 1,
                backgroundColor:
                  SCENT_CATEGORY_COLORS[item.name] ||
                  theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                px: isMobile ? 1 : 2,
                transition: "width 0.6s ease",
                minWidth: "fit-content",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.getContrastText(
                    SCENT_CATEGORY_COLORS[item.name] ||
                      theme.palette.primary.main,
                  ),
                  fontSize: isMobile ? "0.7rem" : "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name} ({item.count})
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ScentProfileBars;
