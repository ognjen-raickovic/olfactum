import { Box } from "@mui/material";
import HeroSection from "../../components/HeroSection";
import HomeFeatures from "../../components/HomeFeatures";
// import HomeStats from "../../components/HomeStats";
import FeaturesSection from "../../components/FeaturesSection";
const HomePage = () => {
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <HeroSection />
      <HomeFeatures />
      {/* <HomeStats /> */}
      <FeaturesSection />
    </Box>
  );
};

export default HomePage;
