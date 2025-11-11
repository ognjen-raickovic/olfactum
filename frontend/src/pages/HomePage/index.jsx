import { Box } from "@mui/material";
import HeroSection from "../../components/Home/HeroSection";
import HomeFeatures from "../../components/Home/HomeFeatures";
// import HomeStats from "../../components/Home/HomeStats";
import FeaturesSection from "../../components/Home/FeaturesSection";
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
