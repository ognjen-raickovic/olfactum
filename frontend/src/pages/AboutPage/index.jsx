import { Box } from "@mui/material";
import AboutHero from "../../components/About/AboutHero";
import AboutStory from "../../components/About/AboutStory";
import AboutFeatures from "../../components/About/AboutFeatures";
import AboutVision from "../../components/About/AboutVision";
// import AboutContact from "../../components/About/AboutContact";

const AboutPage = () => {
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <AboutHero />
      <AboutStory />
      <AboutFeatures />
      <AboutVision />
      {/*<AboutContact />*/}
    </Box>
  );
};

export default AboutPage;
