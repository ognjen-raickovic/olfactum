import { Typography, Box, Divider } from "@mui/material";

export default function SectionHeader({ title, subtitle, icon }) {
  return (
    <Box textAlign="center" mb={4}>
      {icon && <Box sx={{ color: "primary.main", mb: 2 }}>{icon}</Box>}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Divider
        sx={{
          mt: 3,
          mx: "auto",
          width: 100,
          height: 4,
          backgroundColor: "primary.main",
          borderRadius: 2,
        }}
      />
    </Box>
  );
}
