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
        p: { xs: 2, sm: 3 },
        maxHeight: "calc(92vh - 120px)",
        overflowY: "auto",
        textAlign: "center",
        background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
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
      {/* Mobile – Notes now after Overview */}
      {isMobile ? (
        <Grid container spacing={2} direction="column" alignItems="center">
          {/* 1. Image + Gender */}
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
                maxWidth: 450,
                mx: "auto",
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={imageUrl}
                alt={fragrance?.name || "Fragrance"}
                style={{
                  borderRadius: 8,
                  objectFit: "contain",
                  width: "100%",
                  maxHeight: 360,
                  minHeight: 250,
                }}
                onError={(e) => {
                  e.target.src = "/images/no-image.png";
                }}
              />
              <GenderStats fragrance={fragrance} />
            </Card>
          </Grid>

          {/* 2. Scent Profile */}
          <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
            <ScentProfileBars fragrance={fragrance} />
          </Grid>

          {/* 3. Overall (Performance) */}
          <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
            <PerformanceStats fragrance={fragrance} />
          </Grid>

          {/* 4. Overview / Description */}
          <Grid item xs={12} sx={{ width: "100%", maxWidth: 600 }}>
            <FragranceDescription fragrance={fragrance} />
          </Grid>

          {/* 5. Notes (now after overview) */}
          <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                p: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <FragranceNotes fragrance={fragrance} />
            </Box>
          </Grid>

          {/* 6. Voting */}
          <Grid item xs={12} sx={{ width: "100%", maxWidth: 600 }}>
            <VotingForm fragrance={fragrance} />
          </Grid>
        </Grid>
      ) : (
        /* Desktop – unchanged from previous (big image, etc.) */
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={imageUrl}
                alt={fragrance?.name || "Fragrance"}
                style={{
                  borderRadius: 12,
                  objectFit: "contain",
                  width: "100%",
                  maxHeight: 520,
                  minHeight: 400,
                  marginBottom: 32,
                }}
                onError={(e) => {
                  e.target.src = "/images/no-image.png";
                }}
              />
              <GenderStats fragrance={fragrance} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                height: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <ScentProfileBars fragrance={fragrance} />
              <PerformanceStats fragrance={fragrance} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FragranceDescription fragrance={fragrance} />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                p: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <FragranceNotes fragrance={fragrance} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <VotingForm fragrance={fragrance} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FragranceContent;
