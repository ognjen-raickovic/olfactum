import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Home, School, CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModuleNavigation from "../ModuleNavigation";
import FamilyOverview from "./FamilyOverview";
import FamilyModal from "./FamilyModal";
import FragranceModal from "../../FragranceModal";

export default function Module4() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [fragranceModalOpen, setFragranceModalOpen] = useState(false);
  const [familyModalOpen, setFamilyModalOpen] = useState(false);

  // Check if module was already completed
  useEffect(() => {
    const savedProgress = localStorage.getItem("module4-completed");
    if (savedProgress === "true") {
      setCompleted(true);
    }
  }, []);

  const handleMarkComplete = () => {
    setCompleted(true);
    localStorage.setItem("module4-completed", "true");
  };

  const handleFragranceClick = (fragrance) => {
    setSelectedFragrance(fragrance);
    setFragranceModalOpen(true);
  };

  const handleFamilyClick = (family) => {
    setSelectedFamily(family);
    setFamilyModalOpen(true);
  };

  const handleCloseFragranceModal = () => {
    setFragranceModalOpen(false);
    setSelectedFragrance(null);
  };

  const handleCloseFamilyModal = () => {
    setFamilyModalOpen(false);
    setSelectedFamily(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box mb={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/learn"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <School sx={{ mr: 0.5 }} fontSize="small" />
            Learn
          </Link>
          <Typography
            color="text.primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Module 4: Fragrance Families
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Automatic Navigation */}
      <ModuleNavigation />

      {/* Module Content */}
      <FamilyOverview onFamilyClick={handleFamilyClick} />

      {/* Completion Section */}
      <Paper
        sx={{
          p: 4,
          mt: 6,
          textAlign: "center",
          backgroundColor: completed ? "success.light" : "background.paper",
          border: completed ? 2 : 1,
          borderColor: completed ? "success.main" : "divider",
        }}
      >
        {completed ? (
          <Box>
            <CheckCircle sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "success.main" }}
            >
              Module Completed!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              You've successfully learned about fragrance families. Ready to
              continue your journey?
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/learn")}
              size="large"
            >
              Return to Learning Hub
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Complete This Module
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Have you explored all the fragrance families and their
              characteristics?
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleMarkComplete}
            >
              Mark Module as Completed
            </Button>
          </Box>
        )}
      </Paper>

      {/* Family Modal */}
      <FamilyModal
        family={selectedFamily}
        open={familyModalOpen}
        onClose={handleCloseFamilyModal}
        onFragranceClick={handleFragranceClick}
      />

      {/* Fragrance Modal */}
      <FragranceModal
        fragrance={selectedFragrance}
        open={fragranceModalOpen}
        onClose={handleCloseFragranceModal}
      />
    </Container>
  );
}
