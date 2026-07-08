import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import api from "../../services/api";

const GenderStats = ({ fragrance, refreshKey }) => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(
          `/reviews/${fragrance.perfume_id}/gender-stats`,
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to load gender stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [fragrance.perfume_id, refreshKey]);

  if (loading) return <CircularProgress />;

  const hasData = data && (data.male > 0 || data.female > 0 || data.unisex > 0);

  return (
    <Box sx={{ width: "100%", mt: 2, textAlign: "center" }}>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{ fontSize: "0.9rem", mb: 2 }}
      >
        Gender
      </Typography>
      {!hasData ? (
        <Typography variant="body2" color="text.secondary">
          No gender data yet
        </Typography>
      ) : (
        ["Male", "Female", "Unisex"].map((label) => {
          const percentage = data[label.toLowerCase()] || 0;
          const color =
            label === "Male"
              ? "#1976d2"
              : label === "Female"
                ? "#f48fb1"
                : "#9c27b0";
          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
                gap: 1,
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ minWidth: 65, fontWeight: 600, textAlign: "right" }}
              >
                {label}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  maxWidth: 200,
                  height: 10,
                  borderRadius: 5,
                  bgcolor: theme.palette.action.hover,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: `${percentage}%`,
                    borderRadius: 5,
                    backgroundColor: color,
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ minWidth: 40, fontWeight: 500, textAlign: "left" }}
              >
                {percentage}%
              </Typography>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default GenderStats;
