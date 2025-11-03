import { useState, useEffect } from "react";
import { getAllFragrances } from "../services/fragranceService";
import { migrateStorage } from "../utils/migrateStorage";

const useFragranceLibrary = () => {
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all fragrances and map IDs to full objects with proper sorting
  const loadLibrary = () => {
    try {
      const allFrags = getAllFragrances();

      // Use the centralized migrateStorage function
      const favoriteItems = migrateStorage("fragranceFavorites");
      const wishlistItems = migrateStorage("fragranceWishlist");

      // Process favorites: sort by addedAt (newest first) and get full fragrance data
      const favoriteFragrances = favoriteItems
        .sort((a, b) => b.addedAt - a.addedAt) // Newest first (most recent at top)
        .map((item) => {
          // Use stored fragrance data if available and complete, otherwise look it up
          if (
            item.fragranceData &&
            item.fragranceData.id &&
            item.fragranceData.name
          ) {
            return { ...item.fragranceData, addedAt: item.addedAt };
          }
          const fragrance = allFrags.find((f) => f.id === item.id);
          return fragrance ? { ...fragrance, addedAt: item.addedAt } : null;
        })
        .filter(Boolean);

      // Process wishlist: sort by addedAt (newest first) and get full fragrance data
      const wishlistFragrances = wishlistItems
        .sort((a, b) => b.addedAt - a.addedAt) // Newest first (most recent at top)
        .map((item) => {
          // Use stored fragrance data if available and complete, otherwise look it up
          if (
            item.fragranceData &&
            item.fragranceData.id &&
            item.fragranceData.name
          ) {
            return { ...item.fragranceData, addedAt: item.addedAt };
          }
          const fragrance = allFrags.find((f) => f.id === item.id);
          return fragrance ? { ...fragrance, addedAt: item.addedAt } : null;
        })
        .filter(Boolean);

      setFavorites(favoriteFragrances);
      setWishlist(wishlistFragrances);
    } catch (error) {
      console.error("Error loading fragrance library:", error);
      setFavorites([]);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // Load library on mount
  useEffect(() => {
    loadLibrary();
  }, []);

  // Set up storage event listener to sync between tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "fragranceFavorites" || e.key === "fragranceWishlist") {
        loadLibrary(); // Reload when storage changes
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Remove from favorites
  const removeFromFavorites = (fragranceId) => {
    const favoriteItems = migrateStorage("fragranceFavorites");
    const updatedItems = favoriteItems.filter(
      (item) => item.id !== fragranceId
    );
    localStorage.setItem("fragranceFavorites", JSON.stringify(updatedItems));

    // Update state immediately
    setFavorites((prev) => prev.filter((f) => f.id !== fragranceId));
  };

  // Remove from wishlist
  const removeFromWishlist = (fragranceId) => {
    const wishlistItems = migrateStorage("fragranceWishlist");
    const updatedItems = wishlistItems.filter(
      (item) => item.id !== fragranceId
    );
    localStorage.setItem("fragranceWishlist", JSON.stringify(updatedItems));

    // Update state immediately
    setWishlist((prev) => prev.filter((f) => f.id !== fragranceId));
  };

  // Add refresh function in case we need to manually reload
  const refreshLibrary = () => {
    setLoading(true);
    loadLibrary();
  };

  return {
    favorites,
    wishlist,
    loading,
    removeFromFavorites,
    removeFromWishlist,
    refreshLibrary, // Optional: in case you need manual refresh
  };
};

export default useFragranceLibrary;
