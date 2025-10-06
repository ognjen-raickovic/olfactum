import { Box } from "@mui/material";
import HeroSection from "../../components/HeroSection";
import FeaturesSection from "../../components/FeaturesSection";

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <HeroSection />
      <FeaturesSection />
    </Box>
  );
};

export default HomePage;
