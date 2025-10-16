import { useState } from "react";
import { Box, Tabs, Tab, Typography, Fade } from "@mui/material";

export default function LibraryPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        My Library
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Favorites" />
        <Tab label="Wishlist" />
      </Tabs>

      <Fade in={tab === 0}>
        <Box hidden={tab !== 0}>
          <Typography variant="body1" color="text.secondary">
            Your favorite fragrances will appear here.
          </Typography>
        </Box>
      </Fade>

      <Fade in={tab === 1}>
        <Box hidden={tab !== 1}>
          <Typography variant="body1" color="text.secondary">
            Fragrances you’ve added to your wishlist will appear here.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}
