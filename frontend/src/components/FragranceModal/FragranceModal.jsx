import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FragranceHeader from "./FragranceHeader";
import FragranceContent from "./FragranceContent";
import {
  useScrollLock,
  useFragranceState,
} from "../../hooks/useFragranceModal";

const FragranceModal = ({
  fragrance,
  open,
  onClose,
  disableRouting = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    isFavorited,
    isInWishlist,
    snackbarOpen,
    snackbarMessage,
    handleFavorite,
    handleWishlist,
    handleShare,
    handleSnackbarClose,
  } = useFragranceState(fragrance);

  useScrollLock(open);

  const handleClose = (event, reason) => {
    if (disableRouting && reason === "backdropClick") return;
    if (onClose) onClose();
  };

  const handleBackdropClick = (event) => {
    if (disableRouting) event.stopPropagation();
  };

  if (!fragrance) return null;

  return (
    <>
      <Modal
        open={open}
        onClose={disableRouting ? undefined : handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { timeout: 300, onClick: handleBackdropClick },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
        }}
      >
        <Fade in={open} timeout={300}>
          <Box
            sx={{
              position: "relative",
              width: { xs: "98%", sm: "95%", md: "1350px" }, // slightly wider
              maxHeight: "92vh",
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
              overflow: "hidden",
              outline: "none",
              mx: "auto",
              my: "auto",
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              border: `2px solid ${theme.palette.primary.main}20`,
              transition: "box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0 35px 70px rgba(0,0,0,0.3)" },
            }}
          >
            <FragranceHeader
              fragrance={fragrance}
              onClose={handleClose}
              onShare={handleShare}
              onFavorite={handleFavorite}
              onWishlist={handleWishlist}
              isFavorited={isFavorited}
              isInWishlist={isInWishlist}
              isMobile={isMobile}
            />
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: "10px" },
                "&::-webkit-scrollbar-track": {
                  background: theme.palette.background.paper,
                  borderRadius: "12px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: `linear-gradient(180deg, ${
                    theme.palette.mode === "light"
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark
                  }, ${
                    theme.palette.mode === "light"
                      ? theme.palette.primary.main
                      : theme.palette.primary.light
                  })`,
                  borderRadius: "12px",
                  border: `2px solid ${theme.palette.background.paper}`,
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: `linear-gradient(180deg, ${
                    theme.palette.mode === "light"
                      ? theme.palette.primary.main
                      : theme.palette.primary.light
                  }, ${
                    theme.palette.mode === "light"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.main
                  })`,
                },
              }}
            >
              <FragranceContent fragrance={fragrance} isMobile={isMobile} />
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FragranceModal;
