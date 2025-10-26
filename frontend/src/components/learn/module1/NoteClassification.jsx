import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import {
  Spa,
  Forest,
  Favorite,
  LocalFlorist,
  Restaurant,
  Park,
  Waves,
  AcUnit,
  Whatshot,
  Speed,
  CalendarToday,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

const noteClassifications = [
  {
    category: "Citrus",
    description:
      "Fresh, zesty notes derived from citrus fruits. Bright and energizing.",
    icon: <AcUnit />,
    color: "#FFD93D", // Yellow
    intensity: "High",
    season: "Spring/Summer",
    examples: ["Bergamot", "Lemon", "Orange", "Grapefruit", "Mandarin", "Yuzu"],
  },
  {
    category: "Fruity",
    description: "Sweet, juicy notes from various fruits. Playful and vibrant.",
    icon: <Restaurant />,
    color: "#FF6B6B", // Red
    intensity: "Medium",
    season: "All Seasons",
    examples: ["Apple", "Peach", "Berry", "Pear", "Mango", "Pineapple"],
  },
  {
    category: "Floral",
    description: "Delicate, romantic notes from flowers. Elegant and timeless.",
    icon: <LocalFlorist />,
    color: "#FF9FF3", // Pink
    intensity: "Medium-High",
    season: "Spring",
    examples: ["Rose", "Jasmine", "Lily", "Violet", "Peony", "Orchid"],
  },
  {
    category: "Green",
    description:
      "Fresh, crisp notes reminiscent of nature. Clean and revitalizing.",
    icon: <Park />,
    color: "#1DD1A1", // Green
    intensity: "Medium",
    season: "Spring/Summer",
    examples: ["Grass", "Leaves", "Green Tea", "Galbanum", "Vetiver", "Bamboo"],
  },
  {
    category: "Aquatic",
    description: "Fresh, oceanic notes that evoke water. Cool and refreshing.",
    icon: <Waves />,
    color: "#54A0FF", // Blue
    intensity: "Low-Medium",
    season: "Summer",
    examples: ["Sea Notes", "Ocean Breeze", "Water Lily", "Calone", "Marine"],
  },
  {
    category: "Woody",
    description:
      "Earthy, warm notes from trees and woods. Grounding and sophisticated.",
    icon: <Forest />,
    color: "#A55C1B", // Brown
    intensity: "High",
    season: "Fall/Winter",
    examples: [
      "Sandalwood",
      "Cedar",
      "Patchouli",
      "Oakmoss",
      "Guaiac Wood",
      "Birch",
    ],
  },
  {
    category: "Spicy",
    description: "Warm, aromatic notes from spices. Exotic and stimulating.",
    icon: <Whatshot />,
    color: "#FF5252", // Bright red
    intensity: "High",
    season: "Fall/Winter",
    examples: ["Cinnamon", "Clove", "Cardamom", "Pepper", "Nutmeg", "Ginger"],
  },
  {
    category: "Oriental",
    description:
      "Rich, exotic notes with warmth and sweetness. Luxurious and sensual.",
    icon: <Spa />,
    color: "#FDCB6E", // Gold
    intensity: "Very High",
    season: "Fall/Winter",
    examples: [
      "Vanilla",
      "Amber",
      "Benzoin",
      "Labdanum",
      "Tonka Bean",
      "Myrrh",
    ],
  },
];

const typicalPlacements = {
  top: ["Citrus", "Fruity", "Green", "Aquatic"],
  middle: ["Floral", "Spicy", "Fruity", "Green"],
  base: ["Woody", "Oriental", "Spicy"],
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`note-tabpanel-${index}`}
      aria-labelledby={`note-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const NoteCard = ({ note }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        height: "100%",
        borderLeft: 4,
        borderColor: note.color,
        transition: "all 0.3s ease",
        backgroundColor:
          theme.palette.mode === "dark"
            ? alpha(note.color, 0.08)
            : alpha(note.color, 0.05),
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        {/* Header with icon and basic info */}
        <Box display="flex" alignItems="flex-start" mb={2}>
          <Avatar
            sx={{
              bgcolor: alpha(note.color, 0.2),
              color: note.color,
              mr: 2,
              width: 40,
              height: 40,
              flexShrink: 0,
            }}
          >
            {note.icon}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.2,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              {note.category}
            </Typography>

            {/* Chips with icons - more compact */}
            <Box display="flex" gap={0.5} flexWrap="wrap">
              <Chip
                icon={<Speed />}
                label={note.intensity}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.65rem",
                  height: 22,
                  borderColor: note.color,
                  color: note.color,
                  backgroundColor: alpha(note.color, 0.1),
                }}
              />
              <Chip
                icon={<CalendarToday />}
                label={note.season}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.65rem",
                  height: 22,
                  borderColor: note.color,
                  color: note.color,
                  backgroundColor: alpha(note.color, 0.1),
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Description - always show full text */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.5,
            mb: 2,
            flexShrink: 0,
          }}
        >
          {note.description}
        </Typography>

        {/* Examples Section - Show ALL examples with proper spacing */}
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              fontSize: "0.8rem",
              mb: 1,
            }}
          >
            Common Examples:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              alignContent: "flex-start",
            }}
          >
            {note.examples.map((example, idx) => (
              <Chip
                key={idx}
                label={example}
                size="small"
                sx={{
                  backgroundColor: alpha(note.color, 0.2),
                  color: note.color,
                  fontSize: "0.7rem",
                  fontWeight: "500",
                  border: `1px solid ${alpha(note.color, 0.3)}`,
                  height: 24,
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function NoteClassification() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box mb={6}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Fragrance Note Classification Guide
      </Typography>

      <Paper
        sx={{
          width: "100%",
          mb: 4,
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? true : false}
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              fontWeight: "bold",
              minHeight: 60,
              fontSize: isMobile ? "0.8rem" : "0.9rem",
            },
            "& .MuiTabs-scrollButtons": {
              color: "primary.main",
              "&.Mui-disabled": {
                opacity: 0.3,
              },
            },
          }}
        >
          <Tab
            label={isMobile ? "All" : "All Notes"}
            icon={isMobile ? <LocalFlorist /> : <LocalFlorist />}
            iconPosition="start"
          />
          <Tab
            label={isMobile ? "Top" : "Top Notes"}
            icon={isMobile ? <Whatshot /> : <Whatshot />}
            iconPosition="start"
          />
          <Tab
            label={isMobile ? "Middle" : "Middle Notes"}
            icon={isMobile ? <Favorite /> : <Favorite />}
            iconPosition="start"
          />
          <Tab
            label={isMobile ? "Base" : "Base Notes"}
            icon={isMobile ? <Park /> : <Park />}
            iconPosition="start"
          />
        </Tabs>

        {/* Navigation Hint for Mobile */}
        {isMobile && (
          <Box
            sx={{
              px: 2,
              py: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              align="center"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <KeyboardArrowLeft fontSize="small" />
              Swipe or use arrows to see more categories
              <KeyboardArrowRight fontSize="small" />
            </Typography>
          </Box>
        )}

        {/* All Notes Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <LocalFlorist sx={{ mr: 1, color: theme.palette.primary.main }} />
            All Fragrance Notes
          </Typography>
          <Grid container spacing={2}>
            {noteClassifications.map((note, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <NoteCard note={note} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Top Notes Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Whatshot sx={{ mr: 1, color: "#FFD93D" }} />
            Top Notes - First Impression (5-15 minutes)
          </Typography>
          <Grid container spacing={2}>
            {noteClassifications
              .filter((note) => typicalPlacements.top.includes(note.category))
              .map((note, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <NoteCard note={note} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/* Middle Notes Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Favorite sx={{ mr: 1, color: "#FF6B9D" }} />
            Middle Notes - Heart of the Fragrance (20-60 minutes)
          </Typography>
          <Grid container spacing={2}>
            {noteClassifications
              .filter((note) =>
                typicalPlacements.middle.includes(note.category)
              )
              .map((note, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <NoteCard note={note} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>

        {/* Base Notes Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Park sx={{ mr: 1, color: "#A55C1B" }} />
            Base Notes - Foundation (2+ hours)
          </Typography>
          <Grid container spacing={2}>
            {noteClassifications
              .filter((note) => typicalPlacements.base.includes(note.category))
              .map((note, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <NoteCard note={note} />
                </Grid>
              ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
}
