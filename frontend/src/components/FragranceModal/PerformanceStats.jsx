import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const PerformanceStats = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const stats = {
    scent: { value: 8.2, max: 10 },
    longevity: { value: 7.5, max: 10 },
    sillage: { value: 6.8, max: 10 },
  };

  const getStatDescription = (value) => {
    if (value >= 9) return "Excellent";
    if (value >= 7) return "Very Good";
    if (value >= 5) return "Good";
    if (value >= 3) return "Fair";
    return "Poor";
  };

  const StatBar = ({ label, value, max }) => {
    const description = `${value}/${max} - ${getStatDescription(value)}`;

    return (
      <Box sx={{ mb: 3.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 0.5 : 2,
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              textTransform: "capitalize",
              fontSize: "0.95rem",
              minWidth: isMobile ? "100%" : "90px",
              textAlign: isMobile ? "left" : "left",
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
              minWidth: isMobile ? "100%" : "140px",
              textAlign: isMobile ? "left" : "right",
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            height: 12,
            borderRadius: 1,
            bgcolor: theme.palette.action.hover,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${(value / max) * 100}%`,
              borderRadius: 1,
              background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              transition: "width 0.5s ease",
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {Object.entries(stats).map(([key, stat]) => (
        <StatBar key={key} label={key} value={stat.value} max={stat.max} />
      ))}
    </Box>
  );
};

export default PerformanceStats;
