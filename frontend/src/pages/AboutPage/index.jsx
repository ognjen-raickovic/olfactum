import { Box } from "@mui/material";
import AboutHero from "../../components/AboutHero";
import AboutMission from "../../components/AboutMission";
import AboutTeam from "../../components/AboutTeam";

const AboutPage = () => {
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <AboutHero />
      <AboutMission />
      <AboutTeam />
    </Box>
  );
};

export default AboutPage;
