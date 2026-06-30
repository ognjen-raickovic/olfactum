import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const GenderStats = ({ fragrance }) => {
  const theme = useTheme();

  // Fallback data if fragrance doesn't have genderStats
  const defaultStats = { male: 45, female: 20, unisex: 35 };
  const genderData = fragrance?.genderStats || defaultStats;

  const stats = [
    { label: "Male", percentage: genderData.male, color: "#1976d2" },
    { label: "Female", percentage: genderData.female, color: "#f48fb1" },
    { label: "Unisex", percentage: genderData.unisex, color: "#9c27b0" },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2, textAlign: "center" }}>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{ fontSize: "0.9rem", mb: 2 }}
      >
        Gender
      </Typography>

      {/* Horizontal bars with labels */}
      {stats.map(({ label, percentage, color }) => (
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
                transition: "width 0.5s ease",
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
      ))}
    </Box>
  );
};

export default GenderStats;
