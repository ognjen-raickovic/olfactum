import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Tabs,
  Tab,
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
import ReviewsTab from "./ReviewsTab";
import SeasonOccasionCharts from "./SeasonOccasionCharts";

const FragranceContent = ({ fragrance, onRefreshFragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tab, setTab] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((k) => k + 1);
  const imageUrl = fragrance?.image || "/images/no-image.png";

  if (!fragrance)
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

  return (
    <Box sx={{ textAlign: "center" }}>
      {/* Tabs at the top */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          centered
          textColor="primary"
          indicatorColor="primary"
          variant={isMobile ? "fullWidth" : "standard"}
        >
          <Tab label="Details" />
          <Tab label={`Reviews (${fragrance.rating_count || 0})`} />
        </Tabs>
      </Box>

      {/* Details Tab */}
      {tab === 0 && (
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            maxHeight: "calc(92vh - 200px)",
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
          {isMobile ? (
            <Grid container spacing={2} direction="column" alignItems="center">
              {/* Image + Gender */}
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
                  <GenderStats fragrance={fragrance} refreshKey={refreshKey} />
                </Card>
              </Grid>

              {/* Scent Profile */}
              <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
                <ScentProfileBars
                  fragrance={fragrance}
                  refreshKey={refreshKey}
                />
              </Grid>

              {/* Performance Stats */}
              <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
                <PerformanceStats
                  fragrance={fragrance}
                  refreshKey={refreshKey}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12} sx={{ width: "100%", maxWidth: 600 }}>
                <FragranceDescription fragrance={fragrance} />
              </Grid>

              {/* Notes */}
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

              {/* Season & Occasion Charts */}
              <Grid item xs={12} sx={{ width: "100%", maxWidth: 500 }}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <SeasonOccasionCharts
                    fragrance={fragrance}
                    refreshKey={refreshKey}
                  />
                </Box>
              </Grid>

              {/* Voting Form */}
              <Grid item xs={12} sx={{ width: "100%", maxWidth: 600 }}>
                <VotingForm
                  fragrance={fragrance}
                  onReviewSubmitted={() => {
                    triggerRefresh();
                    onRefreshFragrance();
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            /* Desktop Layout */
            <Grid container spacing={3} justifyContent="center">
              {/* Image + Gender */}
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
                  <GenderStats fragrance={fragrance} refreshKey={refreshKey} />
                </Card>
              </Grid>

              {/* Scent Profile + Performance */}
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
                  <ScentProfileBars
                    fragrance={fragrance}
                    refreshKey={refreshKey}
                  />
                  <PerformanceStats
                    fragrance={fragrance}
                    refreshKey={refreshKey}
                  />
                </Box>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <FragranceDescription fragrance={fragrance} />
              </Grid>

              {/* Notes */}
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

              {/* Season & Occasion Charts */}
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
                  <SeasonOccasionCharts
                    fragrance={fragrance}
                    refreshKey={refreshKey}
                  />
                </Box>
              </Grid>

              {/* Voting Form */}
              <Grid item xs={12}>
                <VotingForm
                  fragrance={fragrance}
                  onReviewSubmitted={() => {
                    triggerRefresh();
                    onRefreshFragrance();
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      )}

      {/* Reviews Tab */}
      {tab === 1 && (
        <Box
          sx={{
            px: { xs: 1, sm: 3 },
            maxHeight: "calc(92vh - 200px)",
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
          <ReviewsTab
            fragrance={fragrance}
            onRefresh={() => {
              triggerRefresh();
              onRefreshFragrance();
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FragranceContent;
