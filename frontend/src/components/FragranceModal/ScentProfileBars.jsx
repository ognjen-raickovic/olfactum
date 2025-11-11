import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

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

const ScentProfileBars = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const data = [
    { label: "Spicy", percentage: 85 },
    { label: "Aromatic", percentage: 65 },
    { label: "Fresh", percentage: 45 },
    { label: "Woody", percentage: 30 },
    { label: "Floral", percentage: 20 },
    { label: "Citrus", percentage: 10 },
  ];

  const topFive = [...data]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Scent profile
      </Typography>

      {topFive.map(({ label, percentage }) => (
        <Box
          key={label}
          sx={{
            position: "relative",
            height: isMobile ? 30 : 35, // Slightly smaller on mobile
            borderRadius: 1,
            bgcolor: theme.palette.action.hover,
            overflow: "hidden",
            mb: isMobile ? 1.5 : 2,
            width: "100%",
          }}
        >
          {/* Colored bar that extends based on percentage */}
          <Box
            sx={{
              height: "100%",
              width: `${percentage}%`,
              borderRadius: 1,
              backgroundColor:
                SCENT_CATEGORY_COLORS[label] || theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: isMobile ? 1 : 2, // Less padding on mobile
              transition: "width 0.6s ease",
              minWidth: "fit-content",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.getContrastText(
                  SCENT_CATEGORY_COLORS[label] || theme.palette.primary.main
                ),
                fontSize: isMobile ? "0.7rem" : "0.85rem", // Smaller font on mobile
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ScentProfileBars;
