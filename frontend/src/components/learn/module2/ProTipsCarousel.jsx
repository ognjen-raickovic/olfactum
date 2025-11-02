import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  IconButton,
  Chip,
  Fade,
  Slide,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Spa,
  Thermostat,
  Psychology,
} from "@mui/icons-material";

const tips = [
  {
    icon: <Spa />,
    title: "Moisturize First",
    description:
      "Apply fragrance to moisturized skin. Use unscented lotion or a bit of Vaseline on pulse points before spraying to create a hydrated base that locks in scent.",
    category: "Application",
    impact: "High",
  },
  {
    icon: <Psychology />,
    title: "Pulse Points Strategy",
    description:
      "Spray on wrists, neck, and behind ears. These warm areas help diffuse fragrance throughout the day. Avoid rubbing wrists together as it breaks down fragrance molecules.",
    category: "Technique",
    impact: "High",
  },
  {
    icon: <Thermostat />,
    title: "Weather Wisdom",
    description:
      "In hot weather, go for lighter application but more frequent reapplication. Heat intensifies scent projection but significantly shortens its lifespan on skin.",
    category: "Environment",
    impact: "Medium",
  },
  {
    icon: <Lightbulb />,
    title: "Layering Technique",
    description:
      "Use matching shower gel and lotion before applying fragrance. This creates a scent foundation that lasts longer and develops more complexity throughout the day.",
    category: "Technique",
    impact: "Medium",
  },
];

export default function ProTipsCarousel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentTip, setCurrentTip] = useState(0);
  const [direction, setDirection] = useState("left");

  const nextTip = () => {
    setDirection("left");
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setDirection("right");
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const goToTip = (index) => {
    setDirection(index > currentTip ? "left" : "right");
    setCurrentTip(index);
  };

  const tipColors = {
    light: {
      background: "linear-gradient(135deg, #FFF9C4 0%, #FFEB3B 100%)",
      text: "#5D4037",
    },
    dark: {
      background: "linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)",
      text: "#FFF9C4",
    },
  };

  const currentColors = tipColors[theme.palette.mode];

  return (
    <Paper
      sx={{
        p: { xs: 3, sm: 4 },
        background: currentColors.background,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.1)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.2)"
              : "rgba(255,255,255,0.05)",
        }}
      />

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          zIndex: 1,
          position: "relative",
          color: currentColors.text,
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
        }}
      >
        <Lightbulb sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} /> Pro Tips &
        Tricks
      </Typography>

      <Box sx={{ position: "relative", minHeight: 280, zIndex: 1 }}>
        <Slide in={true} direction={direction} timeout={400} key={currentTip}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                width: "100%",
                maxWidth: { xs: "95%", sm: 500, md: 600 },
                mt: 2,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "white"
                    : theme.palette.grey[800],
                minHeight: { xs: 220, sm: 240, md: 260 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  p: { xs: 2, sm: 3, md: 4 },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    color:
                      theme.palette.mode === "light"
                        ? theme.palette.warning.main
                        : theme.palette.warning.light,
                    mb: { xs: 1, sm: 2, md: 3 },
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  }}
                >
                  {tips[currentTip].icon}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 1, sm: 2 },
                    mb: { xs: 1, sm: 2, md: 3 },
                    flexShrink: 0,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label={tips[currentTip].category}
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: theme.palette.text.secondary,
                      fontSize: isMobile ? "0.7rem" : "0.875rem",
                    }}
                  />
                  <Chip
                    label={tips[currentTip].impact}
                    size={isMobile ? "small" : "medium"}
                    color={
                      tips[currentTip].impact === "High"
                        ? "primary"
                        : "secondary"
                    }
                    sx={{ fontSize: isMobile ? "0.7rem" : "0.875rem" }}
                  />
                </Box>

                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  gutterBottom
                  sx={{
                    color: theme.palette.text.primary,
                    flexShrink: 0,
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {tips[currentTip].title}
                </Typography>

                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{
                    color: theme.palette.text.secondary,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.8rem", sm: "0.875rem", md: "1rem" },
                    px: { xs: 0.5, sm: 0 },
                  }}
                >
                  {tips[currentTip].description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Slide>

        {/* Navigation - Positioned outside the card */}
        <IconButton
          onClick={prevTip}
          sx={{
            position: "absolute",
            left: { xs: -10, sm: -15, md: -20 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.grey[800],
            color:
              theme.palette.mode === "light"
                ? theme.palette.text.primary
                : "white",
            boxShadow: 3,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? "grey.100"
                  : theme.palette.grey[700],
            },
            transition: "all 0.3s ease",
            width: { xs: 36, sm: 44, md: 48 },
            height: { xs: 36, sm: 44, md: 48 },
            zIndex: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ChevronLeft sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
        </IconButton>

        <IconButton
          onClick={nextTip}
          sx={{
            position: "absolute",
            right: { xs: -10, sm: -15, md: -20 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.grey[800],
            color:
              theme.palette.mode === "light"
                ? theme.palette.text.primary
                : "white",
            boxShadow: 3,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? "grey.100"
                  : theme.palette.grey[700],
            },
            transition: "all 0.3s ease",
            width: { xs: 36, sm: 44, md: 48 },
            height: { xs: 36, sm: 44, md: 48 },
            zIndex: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ChevronRight sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
        </IconButton>
      </Box>

      {/* Dots indicator */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 4 }}>
        {tips.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToTip(index)}
            sx={{
              width: { xs: 8, sm: 10, md: 12 },
              height: { xs: 8, sm: 10, md: 12 },
              borderRadius: "50%",
              backgroundColor:
                index === currentTip
                  ? theme.palette.mode === "light"
                    ? "white"
                    : theme.palette.grey[800]
                  : theme.palette.mode === "light"
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}
