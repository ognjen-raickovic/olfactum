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
        p: { xs: 3, sm: 4 }, // Responsive padding
        background: currentColors.background,
        position: "relative",
        overflow: "hidden",
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
          fontSize: { xs: "1.75rem", sm: "2.125rem" }, // Responsive font size
        }}
      >
        <Lightbulb sx={{ fontSize: { xs: 28, sm: 32 } }} /> Pro Tips & Tricks
      </Typography>

      <Box sx={{ position: "relative", minHeight: 280, zIndex: 1 }}>
        <Slide in={true} direction={direction} timeout={400} key={currentTip}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                width: "100%",
                maxWidth: { xs: "90%", sm: 600 }, // Smaller on mobile
                mt: 2,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "white"
                    : theme.palette.grey[800],
                minHeight: { xs: 200, sm: 240 }, // Responsive height
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  p: { xs: 3, sm: 4 }, // Responsive padding
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
                    mb: { xs: 2, sm: 3 }, // Responsive margin
                    fontSize: { xs: "2.5rem", sm: "3rem" }, // Responsive icon
                  }}
                >
                  {tips[currentTip].icon}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 1, sm: 2 }, // Responsive gap
                    mb: { xs: 2, sm: 3 },
                    flexShrink: 0,
                    flexWrap: "wrap", // Allow wrapping on very small screens
                  }}
                >
                  <Chip
                    label={tips[currentTip].category}
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: theme.palette.text.secondary,
                      fontSize: isMobile ? "0.8rem" : "0.9rem",
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
                    sx={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                  />
                </Box>

                <Typography
                  variant={isMobile ? "h6" : "h5"} // Responsive title size
                  gutterBottom
                  sx={{
                    color: theme.palette.text.primary,
                    flexShrink: 0,
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                >
                  {tips[currentTip].title}
                </Typography>

                <Typography
                  variant={isMobile ? "body2" : "body1"} // Smaller text on mobile
                  sx={{
                    color: theme.palette.text.secondary,
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {tips[currentTip].description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Slide>

        {/* Navigation - Better mobile placement */}
        <IconButton
          onClick={prevTip}
          sx={{
            position: "absolute",
            left: { xs: 5, sm: 10 }, // Closer to edge on mobile
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
            width: { xs: 40, sm: 48 }, // Smaller on mobile
            height: { xs: 40, sm: 48 },
            zIndex: 2,
          }}
        >
          <ChevronLeft sx={{ fontSize: { xs: 24, sm: 28 } }} />
        </IconButton>

        <IconButton
          onClick={nextTip}
          sx={{
            position: "absolute",
            right: { xs: 5, sm: 10 }, // Closer to edge on mobile
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
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            zIndex: 2,
          }}
        >
          <ChevronRight sx={{ fontSize: { xs: 24, sm: 28 } }} />
        </IconButton>
      </Box>

      {/* Dots indicator - Better mobile visibility */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 4 }}>
        {tips.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToTip(index)}
            sx={{
              width: { xs: 10, sm: 12 },
              height: { xs: 10, sm: 12 },
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
