import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
} from "@mui/material";
import { AutoStories, Psychology } from "@mui/icons-material";

const AboutStory = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3 } }}>
      <Grid container spacing={4} alignItems="stretch">
        {/* The Problem */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              minHeight: 280,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Psychology
                  sx={{ color: "primary.main", mr: 2, fontSize: 32 }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  The Challenge
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1.6,
                  color: "text.secondary",
                  fontWeight: 400,
                  flex: 1,
                }}
              >
                Traditional fragrance platforms overwhelm beginners with complex
                terminology and endless options without proper guidance. We saw
                the need for a space that educates first, recommends second.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* The Solution */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              minHeight: 280,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.secondary.main,
                0.05
              )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AutoStories
                  sx={{ color: "secondary.main", mr: 2, fontSize: 32 }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Our Solution
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  lineHeight: 1.6,
                  color: "text.secondary",
                  fontWeight: 400,
                  flex: 1,
                }}
              >
                Olfactum provides structured learning before exploration. Our
                6-module curriculum builds your fragrance knowledge step by
                step, ensuring you have the foundation to make informed
                decisions about scents you'll love.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutStory;
