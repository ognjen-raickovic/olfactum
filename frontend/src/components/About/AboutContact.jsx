import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Button,
  Link,
} from "@mui/material";
import { Email, Chat, BugReport, Lightbulb } from "@mui/icons-material";

const AboutContact = () => {
  const theme = useTheme();

  const contactMethods = [
    {
      icon: <Email sx={{ fontSize: 32 }} />,
      title: "General Inquiries",
      description:
        "Have questions about Olfactum or need help getting started?",
      action: "Email Us",
      color: "primary",
    },
    {
      icon: <BugReport sx={{ fontSize: 32 }} />,
      title: "Report Issues",
      description:
        "Found a bug or technical issue? Let us know so we can fix it.",
      action: "Report Bug",
      color: "error",
    },
    {
      icon: <Lightbulb sx={{ fontSize: 32 }} />,
      title: "Suggestions",
      description: "Have ideas to improve Olfactum? We'd love to hear them!",
      action: "Share Idea",
      color: "warning",
    },
    {
      icon: <Chat sx={{ fontSize: 32 }} />,
      title: "Feedback",
      description: "Share your experience and help us make Olfactum better.",
      action: "Send Feedback",
      color: "info",
    },
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.background.default,
          0.8
        )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        py: 8,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 3, color: "text.primary" }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            This is a passion project - your feedback and questions help shape
            Olfactum's future
          </Typography>
        </Box>

        {/* Clean 2x2 Grid */}
        <Grid container spacing={4} sx={{ maxWidth: 800, mx: "auto" }}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  width: "100%",
                  height: 260,
                  maxWidth: 350,
                  mx: "auto",
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette[method.color].main,
                    0.05
                  )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
                  border: `1px solid ${alpha(
                    theme.palette[method.color].main,
                    0.1
                  )}`,
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 8px 32px ${alpha(
                      theme.palette[method.color].main,
                      0.15
                    )}`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ color: `${method.color}.main`, mb: 2 }}>
                    {method.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {method.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.5,
                      color: "text.secondary",
                      mb: 3,
                      flex: 1,
                    }}
                  >
                    {method.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    href={`mailto:info.olfactum@gmail.com?subject=Olfactum: ${method.title}`}
                    sx={{
                      color: `${method.color}.main`,
                      borderColor: `${method.color}.main`,
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette[method.color].main,
                          0.1
                        ),
                      },
                    }}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Email Section */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Email Us Directly
          </Typography>
          <Link
            href="mailto:info.olfactum@gmail.com"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              wordBreak: "break-word",
              display: "inline-block",
              maxWidth: "100%",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            info.olfactum@gmail.com
          </Link>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mt: 2,
              maxWidth: 500,
              mx: "auto",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            We typically respond within 24-48 hours. This is a passion project,
            so your patience is appreciated!
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            pt: 4,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontStyle: "italic" }}
          >
            Created with passion for the fragrance community • Always evolving •
            Your feedback matters
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutContact;
