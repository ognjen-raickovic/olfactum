import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Collapse,
  IconButton,
  Grid,
} from "@mui/material";
import {
  ExpandMore,
  Spa,
  Forest,
  WbSunny,
  LocalFlorist,
  Grass,
  Park,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import FragranceCard from "../../FragranceCard";

const familyIcons = {
  fresh: <Spa />,
  woody: <Forest />,
  oriental: <WbSunny />,
  floral: <LocalFlorist />,
  fougere: <Grass />,
  chypre: <Park />,
};

export default function FamilyCard({ family, onFragranceClick }) {
  const [expanded, setExpanded] = useState(false);

  const memoizedSubFamilies = useMemo(
    () =>
      family.subFamilies.map((subFamily) => ({
        ...subFamily,
        examples: subFamily.examples || [],
      })),
    [family.subFamilies]
  );

  return (
    <Card
      id={`family-card-${family.id}`}
      sx={{
        height: "100%",
        minHeight: 120,
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" alignItems="flex-start" gap={2} mb={1}>
          <Box
            sx={{
              color: "primary.main",
              mt: 0.5,
              flexShrink: 0,
            }}
          >
            {familyIcons[family.id]}
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.2,
                fontSize: { xs: "1.2rem", sm: "1.3rem" },
              }}
            >
              {family.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                lineHeight: 1.3,
              }}
            >
              {family.description}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              flexShrink: 0,
            }}
          >
            <ExpandMore />
          </IconButton>
        </Box>

        <Box sx={{ mb: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {family.characteristics.slice(0, 3).map((char) => (
            <Chip
              key={char}
              label={char}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.65rem",
                height: 22,
              }}
            />
          ))}
        </Box>

        <Collapse in={expanded} timeout="auto">
          <Box
            sx={{
              mt: 2,
              borderTop: 1,
              borderColor: "divider",
              pt: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: "1rem",
              }}
            >
              Sub-Families & Popular Fragrances
            </Typography>
            {memoizedSubFamilies.map((subFamily, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    mb: 0.5,
                    fontSize: "0.9rem",
                  }}
                >
                  {subFamily.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, fontSize: "0.8rem" }}
                >
                  <strong>Key Notes:</strong> {subFamily.notes.join(", ")}
                </Typography>

                {subFamily.examples.length > 0 && (
                  <>
                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      {subFamily.examples.map((fragrance, fragIndex) => (
                        <Grid item xs={12} sm={6} key={fragIndex}>
                          <FragranceCard
                            fragrance={fragrance}
                            onClick={onFragranceClick}
                            sx={{
                              transform: "none",
                              maxWidth: "100%",
                              height: "100%",
                              // Ultra compact styling
                              "& .MuiCardContent-root": {
                                p: 1,
                                "&:last-child": { pb: 1 },
                              },
                              "& .MuiTypography-h6": {
                                fontSize: "0.75rem",
                                lineHeight: 1.1,
                                mb: 0.3,
                                minHeight: "auto",
                              },
                              "& .MuiTypography-body2": {
                                fontSize: "0.65rem",
                              },
                              "& .MuiChip-root": {
                                height: 16,
                                fontSize: "0.55rem",
                              },
                              "& .MuiRating-root": {
                                fontSize: "0.8rem",
                              },
                              "&:hover": {
                                transform: "translateY(-1px)",
                                boxShadow: 2,
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
