import React from "react";
import {
  Box,
  Grid,
  Card,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FragranceDescription from "./FragranceDescription";
import FragranceNotes from "./FragranceNotes";
import ScentProfileBars from "./ScentProfileBars";
import PerformanceStats from "./PerformanceStats";
import GenderStats from "./GenderStats";
import VotingForm from "./VotingForm";

const FragranceContent = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const imageUrl =
    fragrance?.imageUrl || fragrance?.image || "/images/no-image.png";

  if (!fragrance) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        maxHeight: "calc(92vh - 120px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.paper,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.light,
          borderRadius: "4px",
        },
      }}
    >
      {/* Main Content Grid */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 2 }}>
        {/* Left column: Image + Gender Stats - Centered */}
        <Grid item xs={12} md={2.5}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                p: { xs: 1, sm: 2 },
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                height: "fit-content",
                width: "100%",
                maxWidth: isMobile ? "300px" : "100%",
              }}
            >
              <img
                src={imageUrl}
                alt={fragrance?.name || "Fragrance"}
                style={{
                  borderRadius: 8,
                  objectFit: "contain",
                  width: "100%",
                  maxHeight: 300,
                  minHeight: isMobile ? 200 : 250,
                }}
                onError={(e) => {
                  e.target.src = "/images/no-image.png";
                }}
              />
              <GenderStats fragrance={fragrance} />
            </Card>
          </Box>
        </Grid>

        {/* Middle and Right Columns */}
        {isMobile ? (
          // Mobile Layout: Centered with proper spacing
          <>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: 4, // Increased gap significantly
                }}
              >
                {/* Scent Profile - Centered content */}
                <Box
                  sx={{
                    width: "48%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ScentProfileBars fragrance={fragrance} />
                </Box>

                {/* Performance Stats - Centered content */}
                <Box
                  sx={{
                    width: "48%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <PerformanceStats fragrance={fragrance} />
                </Box>
              </Box>
            </Grid>

            {/* Fragrance Notes - Full width and centered */}
            <Grid item xs={12}>
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: theme.palette.background.paper,
                  minHeight: 400,
                  mt: 2,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%", maxWidth: "100%" }}>
                  <FragranceNotes fragrance={fragrance} />
                </Box>
              </Box>
            </Grid>
          </>
        ) : (
          // Desktop Layout
          <>
            {/* Middle column: Scent Profile + Performance Stats */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <ScentProfileBars fragrance={fragrance} />
              </Box>
              <PerformanceStats fragrance={fragrance} />
            </Grid>

            {/* Right column: Fragrance Notes - Full width */}
            <Grid item xs={12} md={5.5}>
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: theme.palette.background.paper,
                  height: "100%",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <FragranceNotes fragrance={fragrance} />
              </Box>
            </Grid>
          </>
        )}
      </Grid>

      {/* Description and Voting Form */}
      <Box sx={{ mb: 3 }}>
        <FragranceDescription fragrance={fragrance} />
      </Box>

      <VotingForm fragrance={fragrance} />
    </Box>
  );
};

export default FragranceContent;
