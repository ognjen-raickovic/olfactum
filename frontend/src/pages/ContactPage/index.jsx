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

export default function Contact() {
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
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          background: `
            linear-gradient(135deg,
              ${alpha(theme.palette.primary.main, 0.1)} 0%,
              ${alpha(theme.palette.secondary.main, 0.05)} 50%,
              ${alpha(theme.palette.background.paper, 0.9)} 100%
            )
          `,
          py: { xs: 10, md: 14 },
          width: "100%",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.75rem", md: "4rem" },
              mb: 3,
              color: "text.primary",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Get In Touch
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              lineHeight: 1.3,
              color: "text.secondary",
              fontSize: { xs: "1.25rem", md: "1.75rem" },
              maxWidth: 760,
              mx: "auto",
            }}
          >
            This is a passion project — your feedback helps shape Olfactum's
            future.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          justifyContent="center"
          sx={{
            width: "100%",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {contactMethods.map((method, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 420 },
                  height: 270,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette[method.color].main,
                    0.05,
                  )} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                  border: `1px solid ${alpha(
                    theme.palette[method.color].main,
                    0.15,
                  )}`,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 12px 36px ${alpha(
                      theme.palette[method.color].main,
                      0.2,
                    )}`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                  }}
                >
                  <Box sx={{ color: `${method.color}.main`, mb: 2 }}>
                    {method.icon}
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {method.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 3,
                      maxWidth: 260,
                    }}
                  >
                    {method.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    href={`mailto:info.olfactum@gmail.com?subject=Olfactum: ${method.title}`}
                    sx={{
                      mt: "auto",
                      color: `${method.color}.main`,
                      borderColor: `${method.color}.main`,
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette[method.color].main,
                          0.1,
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

        <Box
          sx={{
            textAlign: "center",
            mt: { xs: 6, md: 8 },
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: alpha(theme.palette.primary.main, 0.04),
            maxWidth: 700,
            mx: "auto",
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
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              wordBreak: "break-word",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            info.olfactum@gmail.com
          </Link>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 2,
              maxWidth: 400,
              mx: "auto",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            We usually respond within 24–48 hours. Since this is a passion
            project, your patience is appreciated.
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            pt: 4,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 1.2, sm: 3 },
              color: "text.secondary",
              fontStyle: "italic",
              fontSize: "0.95rem",
            }}
          >
            <Typography>
              Created with passion for the fragrance community
            </Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              •
            </Typography>
            <Typography>Always evolving</Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              •
            </Typography>
            <Typography>Your feedback matters</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
