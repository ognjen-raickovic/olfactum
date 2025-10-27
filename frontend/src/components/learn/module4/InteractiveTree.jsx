import {
  Paper,
  Typography,
  Box,
  useTheme,
  Grid,
  Card,
  CardContent,
  Chip,
  alpha,
} from "@mui/material";
import { fragranceFamilies } from "./fragranceFamiliesData";

export default function FamilyOverview() {
  const theme = useTheme();

  const getFamilyColor = (familyId) => {
    const colors = {
      fresh: theme.palette.info.main,
      woody: theme.palette.success.main,
      oriental: theme.palette.warning.main,
      floral: theme.palette.secondary.main,
      fougere: theme.palette.primary.main,
      chypre: theme.palette.error.main,
    };
    return colors[familyId] || theme.palette.primary.main;
  };

  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.background.paper,
          0.8
        )} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Fragrance Families at a Glance
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          A quick reference to the six main fragrance families and their core
          characteristics
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {fragranceFamilies.map((family) => (
          <Grid item key={family.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${alpha(
                  getFamilyColor(family.id),
                  0.1
                )} 0%, ${alpha(getFamilyColor(family.id), 0.05)} 100%)`,
                border: `1px solid ${alpha(getFamilyColor(family.id), 0.2)}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  border: `1px solid ${alpha(getFamilyColor(family.id), 0.4)}`,
                  boxShadow: `0 4px 12px ${alpha(
                    getFamilyColor(family.id),
                    0.15
                  )}`,
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: getFamilyColor(family.id),
                  }}
                >
                  {family.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 40 }}
                >
                  {family.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  {family.characteristics.slice(0, 2).map((char) => (
                    <Chip
                      key={char}
                      label={char}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: "0.7rem",
                        borderColor: alpha(getFamilyColor(family.id), 0.3),
                        color: getFamilyColor(family.id),
                      }}
                    />
                  ))}
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  {family.subFamilies.length} sub-categories
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          💡 <strong>Tip:</strong> Click on any family card below to explore
          detailed information and real fragrance examples
        </Typography>
      </Box>
    </Paper>
  );
}
