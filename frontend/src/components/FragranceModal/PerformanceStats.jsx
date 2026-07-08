import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const PerformanceStats = ({ fragrance, refreshKey }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(`/reviews/${fragrance.perfume_id}/averages`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load performance stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [fragrance.perfume_id, refreshKey]);

  if (loading) return <CircularProgress />;

  const data = stats
    ? [
        { label: "Scent", value: Number(stats.avg_scent) || 0 },
        { label: "Longevity", value: Number(stats.avg_longevity) || 0 },
        { label: "Sillage", value: Number(stats.avg_sillage) || 0 },
      ]
    : [];

  const getStatDescription = (value) => {
    if (value >= 4.5) return "Excellent";
    if (value >= 3.5) return "Very Good";
    if (value >= 2.5) return "Good";
    if (value >= 1.5) return "Fair";
    return "Poor";
  };

  const StatBar = ({ label, value }) => (
    <Box sx={{ mb: 3.5, width: "100%", maxWidth: 500, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 1,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 0.5 : 1,
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{
            textTransform: "capitalize",
            fontSize: "0.95rem",
            minWidth: "80px",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.85rem",
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {value > 0
            ? `${value.toFixed(1)}/5 - ${getStatDescription(value)}`
            : "No ratings yet"}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 16,
          borderRadius: 1,
          bgcolor: theme.palette.action.hover,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${(value / 5) * 100}%`,
            borderRadius: 1,
            background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            transition: "width 0.5s ease",
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Overall
      </Typography>
      {data.map((stat) => (
        <StatBar key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </Box>
  );
};

export default PerformanceStats;
