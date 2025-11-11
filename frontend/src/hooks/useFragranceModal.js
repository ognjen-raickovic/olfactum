import { useEffect, useState, useRef } from "react";

export const useScrollLock = (open) => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (open) {
      scrollPositionRef.current = window.pageYOffset;
      document.body.style.cssText = `
        position: fixed;
        top: -${scrollPositionRef.current}px;
        left: 0;
        right: 0;
        overflow: hidden;
      `;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.cssText = "";
    };
  }, [open]);
};

export const useFragranceState = (fragrance) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // ✅ Define handlers
  const handleFavorite = () => {
    setIsFavorited((prev) => !prev);
    setSnackbarMessage(
      !isFavorited
        ? `${fragrance.name} added to favorites`
        : `${fragrance.name} removed from favorites`
    );
    setSnackbarOpen(true);
  };

  const handleWishlist = () => {
    setIsInWishlist((prev) => !prev);
    setSnackbarMessage(
      !isInWishlist
        ? `${fragrance.name} added to wishlist`
        : `${fragrance.name} removed from wishlist`
    );
    setSnackbarOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: fragrance.name,
        text: `Check out ${fragrance.name}!`,
        url: window.location.href,
      });
    } else {
      setSnackbarMessage("Sharing is not supported on this device.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    isFavorited,
    isInWishlist,
    snackbarOpen,
    snackbarMessage,
    handleFavorite,
    handleWishlist,
    handleShare,
    handleSnackbarClose,
  };
};
