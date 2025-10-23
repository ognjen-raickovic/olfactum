import React from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { humanizeName } from "../utils/humanizeName";

const FragranceNotes = ({ fragrance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!fragrance) return null;

  const { topNotes, middleNotes, baseNotes } = fragrance;

  return (
    <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Fragrance Notes
      </Typography>
      <Grid container spacing={2}>
        {topNotes && topNotes.length > 0 && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Top Notes
            </Typography>
            <Stack spacing={0.5}>
              {topNotes.slice(0, 6).map((note, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ fontSize: "0.8rem" }}
                >
                  • {humanizeName(note)}
                </Typography>
              ))}
              {topNotes.length > 6 && (
                <Typography variant="caption" color="text.secondary">
                  +{topNotes.length - 6} more
                </Typography>
              )}
            </Stack>
          </Grid>
        )}
        {middleNotes && middleNotes.length > 0 && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Heart Notes
            </Typography>
            <Stack spacing={0.5}>
              {middleNotes.slice(0, 6).map((note, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ fontSize: "0.8rem" }}
                >
                  • {humanizeName(note)}
                </Typography>
              ))}
              {middleNotes.length > 6 && (
                <Typography variant="caption" color="text.secondary">
                  +{middleNotes.length - 6} more
                </Typography>
              )}
            </Stack>
          </Grid>
        )}
        {baseNotes && baseNotes.length > 0 && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Base Notes
            </Typography>
            <Stack spacing={0.5}>
              {baseNotes.slice(0, 6).map((note, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ fontSize: "0.8rem" }}
                >
                  • {humanizeName(note)}
                </Typography>
              ))}
              {baseNotes.length > 6 && (
                <Typography variant="caption" color="text.secondary">
                  +{baseNotes.length - 6} more
                </Typography>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default FragranceNotes;
