import {
  Modal,
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import FragranceCard from "../../FragranceCard";

export default function FamilyModal({
  family,
  open,
  onClose,
  onFragranceClick,
}) {
  const theme = useTheme();

  const getFamilyColor = (familyId) => {
    const colors = {
      fresh: "#4FC3F7",
      woody: "#8D6E63",
      oriental: "#FFB74D",
      floral: "#F06292",
      fougere: "#4DB6AC",
      chypre: "#BA68C8",
    };
    return colors[familyId] || theme.palette.primary.main;
  };

  if (!family) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "800px", lg: "1000px" },
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          overflow: "auto",
          outline: "none",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(135deg, ${alpha(
              getFamilyColor(family.id),
              0.1
            )} 0%, ${alpha(getFamilyColor(family.id), 0.05)} 100%)`,
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <Close />
          </IconButton>

          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: getFamilyColor(family.id) }}
          >
            {family.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {family.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {family.characteristics.map((char) => (
              <Chip
                key={char}
                label={char}
                sx={{
                  borderColor: alpha(getFamilyColor(family.id), 0.3),
                  color: getFamilyColor(family.id),
                  backgroundColor: alpha(getFamilyColor(family.id), 0.1),
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Sub-Families & Popular Fragrances
          </Typography>

          {family.subFamilies.map((subFamily, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                mb: 3,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {subFamily.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Key Notes:</strong> {subFamily.notes.join(", ")}
              </Typography>

              {subFamily.examples.length > 0 && (
                <>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: "bold", mt: 2 }}
                  >
                    Popular Examples:
                  </Typography>
                  <Grid container spacing={2}>
                    {subFamily.examples.map((fragrance, fragIndex) => (
                      <Grid item xs={12} sm={6} md={4} key={fragIndex}>
                        <FragranceCard
                          fragrance={fragrance}
                          onClick={onFragranceClick}
                          sx={{
                            transform: "none",
                            height: "100%",
                            "& .MuiCardContent-root": {
                              p: 1.5,
                              "&:last-child": { pb: 1.5 },
                            },
                            "& .MuiTypography-h6": {
                              fontSize: "0.9rem",
                              lineHeight: 1.2,
                              mb: 0.5,
                            },
                            "& .MuiTypography-body2": {
                              fontSize: "0.8rem",
                            },
                            "& .MuiChip-root": {
                              height: 20,
                              fontSize: "0.7rem",
                            },
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: 3,
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
