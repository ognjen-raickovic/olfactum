import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const GenderStats = ({ fragrance }) => {
  const theme = useTheme();

  const genderStats = [
    { label: "Male", percentage: 60 },
    { label: "Unisex", percentage: 30 },
    { label: "Female", percentage: 10 },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{
          textTransform: "capitalize",
          fontSize: "0.9rem",
          mb: 2,
        }}
      >
        Gender
      </Typography>

      {genderStats.map(({ label, percentage }) => (
        <Box
          key={label}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              minWidth: 80,
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {label}
          </Typography>

          <Box
            sx={{
              flex: 1,
              height: 20,
              borderRadius: 1,
              bgcolor: theme.palette.action.hover,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${percentage}%`,
                borderRadius: 1,
                background:
                  label === "Male"
                    ? "#1976d2"
                    : label === "Female"
                    ? "#f48fb1"
                    : "#9c27b0",
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default GenderStats;
