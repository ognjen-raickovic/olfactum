import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import api from "../../services/api";

const VoteBar = ({ label, count, total, maxCount }) => {
  const theme = useTheme();
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

  return (
    <Box sx={{ mb: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography variant="body2" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {count} ({percentage}%)
        </Typography>
      </Box>
      <Box
        sx={{
          height: 12,
          borderRadius: 1,
          bgcolor: theme.palette.action.hover,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${barWidth}%`,
            borderRadius: 1,
            bgcolor: theme.palette.primary.main,
          }}
        />
      </Box>
    </Box>
  );
};

const SeasonOccasionCharts = ({ fragrance, refreshKey }) => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(`/reviews/${fragrance.perfume_id}/stats`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [fragrance.perfume_id, refreshKey]);

  if (loading) return <CircularProgress />;
  if (!stats) return null;

  // Seasons: show all 5 if no votes, else top 5 by count
  const seasonTotal = stats.seasons.reduce((s, v) => s + v.count, 0);
  const hasSeasonVotes = seasonTotal > 0;
  const sortedSeasons = [...stats.seasons].sort((a, b) => b.count - a.count);
  const displayedSeasons = hasSeasonVotes
    ? sortedSeasons.slice(0, 5)
    : stats.seasons;
  const seasonMax = Math.max(...displayedSeasons.map((v) => v.count), 1);

  // Occasions: show first 4 if no votes, else top 4 by count
  const occasionTotal = stats.occasions.reduce((s, v) => s + v.count, 0);
  const hasOccasionVotes = occasionTotal > 0;
  const sortedOccasions = [...stats.occasions].sort(
    (a, b) => b.count - a.count,
  );
  const displayedOccasions = hasOccasionVotes
    ? sortedOccasions.slice(0, 4)
    : stats.occasions.slice(0, 4);
  const occasionMax = Math.max(...displayedOccasions.map((v) => v.count), 1);

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} gutterBottom textAlign="center">
        Community Season Votes
      </Typography>
      {displayedSeasons.map((v) => (
        <VoteBar
          key={v.name}
          label={v.name}
          count={v.count}
          total={seasonTotal}
          maxCount={seasonMax}
        />
      ))}
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          textAlign="center"
        >
          Community Occasion Votes
        </Typography>
        {displayedOccasions.map((v) => (
          <VoteBar
            key={v.name}
            label={v.name}
            count={v.count}
            total={occasionTotal}
            maxCount={occasionMax}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SeasonOccasionCharts;
