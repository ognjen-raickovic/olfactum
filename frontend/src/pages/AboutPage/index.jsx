import { Box } from "@mui/material";
import AboutHero from "../../components/AboutHero";
import AboutStory from "../../components/AboutStory";
import AboutFeatures from "../../components/AboutFeatures";
import AboutVision from "../../components/AboutVision";
import AboutContact from "../../components/AboutContact";

const AboutPage = () => {
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <AboutHero />
      <AboutStory />
      <AboutFeatures />
      <AboutVision />
      <AboutContact />
    </Box>
  );
};

export default AboutPage;
