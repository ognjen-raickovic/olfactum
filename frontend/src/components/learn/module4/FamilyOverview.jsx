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
import {
  Explore,
  Spa,
  Forest,
  WbSunny,
  LocalFlorist,
  Grass,
  Park,
} from "@mui/icons-material";
import { fragranceFamilies } from "./fragranceFamiliesData";

const familyIcons = {
  fresh: <Spa />,
  woody: <Forest />,
  oriental: <WbSunny />,
  floral: <LocalFlorist />,
  fougere: <Grass />,
  chypre: <Park />,
};

export default function FamilyOverview({ onFamilyClick }) {
  const theme = useTheme();

  const getFamilyColor = (familyId) => {
    const colors = {
      fresh: "#4FC3F7", // Light Blue
      woody: "#8D6E63", // Brown
      oriental: "#FFB74D", // Amber/Orange
      floral: "#F06292", // Pink
      fougere: "#4DB6AC", // Teal
      chypre: "#BA68C8", // Purple
    };
    return colors[familyId] || theme.palette.primary.main;
  };

  return (
    <Paper
      sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.background.paper,
          0.9
        )} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Explore sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Discover Fragrance Families
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Explore the six main scent categories that form the foundation of
          perfumery
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {fragranceFamilies.map((family) => (
          <Grid item key={family.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: 180,
                background: `linear-gradient(135deg, ${alpha(
                  getFamilyColor(family.id),
                  0.1
                )} 0%, ${alpha(getFamilyColor(family.id), 0.05)} 100%)`,
                border: `2px solid ${alpha(getFamilyColor(family.id), 0.2)}`,
                transition: "all 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                "&:hover": {
                  transform: "translateY(-8px)",
                  border: `2px solid ${alpha(getFamilyColor(family.id), 0.4)}`,
                  boxShadow: `0 12px 30px ${alpha(
                    getFamilyColor(family.id),
                    0.2
                  )}`,
                },
              }}
              onClick={() => onFamilyClick(family)}
            >
              <CardContent
                sx={{
                  p: 3,
                  textAlign: "center",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ color: getFamilyColor(family.id), mb: 2 }}>
                  {familyIcons[family.id]}
                </Box>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: "bold",
                    color: getFamilyColor(family.id),
                    mb: 1,
                  }}
                >
                  {family.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {family.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {family.characteristics.slice(0, 3).map((char) => (
                    <Chip
                      key={char}
                      label={char}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: alpha(getFamilyColor(family.id), 0.3),
                        color: getFamilyColor(family.id),
                        backgroundColor: alpha(getFamilyColor(family.id), 0.1),
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          pt: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          💡 <strong>Click</strong> any family to explore its sub-categories and
          popular fragrances
        </Typography>
      </Box>
    </Paper>
  );
}
