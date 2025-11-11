import { Container, Typography, Box, useTheme, alpha } from "@mui/material";
import { Visibility, Group, Update } from "@mui/icons-material";

const AboutVision = () => {
  const theme = useTheme();

  const visionPoints = [
    {
      icon: <Visibility sx={{ fontSize: 40 }} />,
      title: "Our Vision",
      description:
        "To become the most trusted educational platform for fragrance enthusiasts, where anyone can start their scent journey with confidence and clarity.",
    },
    {
      icon: <Group sx={{ fontSize: 40 }} />,
      title: "For the Community",
      description:
        "Built for fragrance lovers by a fragrance lover. Every feature is designed with real user experiences in mind.",
    },
    {
      icon: <Update sx={{ fontSize: 40 }} />,
      title: "Always Evolving",
      description:
        "Olfactum grows with your feedback. Future features include user reviews, community discussions, and advanced AI recommendations.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "text.primary",
          }}
        >
          Looking Forward
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {visionPoints.map((point, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mb: 4,
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.03
              )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box sx={{ color: "primary.main", mr: 3, mt: 0.5 }}>
              {point.icon}
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {point.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.6,
                  color: "text.secondary",
                }}
              >
                {point.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Final Mission Statement - Comma Separated */}
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
          p: 4,
          borderRadius: 3,
          background: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: "primary.main",
            lineHeight: { xs: 1.5, sm: 1.3 }, // Better spacing for mobile
          }}
        >
          {/* Single line with commas - will wrap naturally on mobile */}
          Feel Good, Look Good, Smell Good
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 400,
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          This isn't just about finding scents - it's about building confidence
          in your choices and developing a deeper appreciation for the art of
          perfumery.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutVision;
