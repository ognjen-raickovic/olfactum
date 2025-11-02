import { useState, useEffect } from "react";
import { getAllFragrances } from "../services/fragranceService";

const useFragranceLibrary = () => {
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to migrate from old storage format to new format with timestamps
  const migrateStorage = (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return [];

      const parsed = JSON.parse(stored);

      // If it's already the new format (array of objects with id), return as is
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        typeof parsed[0] === "object" &&
        parsed[0].id
      ) {
        return parsed;
      }

      // If it's the old format (array of IDs), migrate to new format
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        (typeof parsed[0] === "string" || typeof parsed[0] === "number")
      ) {
        const migrated = parsed.map((id) => ({
          id,
          addedAt: Date.now(), // Use current time for migration
          migrated: true, // Flag to identify migrated items
        }));
        localStorage.setItem(key, JSON.stringify(migrated));
        console.log(`Migrated ${key} from old format to new format`);
        return migrated;
      }

      return [];
    } catch (error) {
      console.error(`Error migrating ${key}:`, error);
      return [];
    }
  };

  // Load all fragrances and map IDs to full objects with proper sorting
  useEffect(() => {
    const loadLibrary = () => {
      try {
        const allFrags = getAllFragrances();

        // Migrate and load favorites and wishlist
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

    loadLibrary();
  }, []);

  // Remove from favorites
  const removeFromFavorites = (fragranceId) => {
    const updatedFavorites = favorites.filter((f) => f.id !== fragranceId);
    setFavorites(updatedFavorites);

    // Update localStorage
    const favoriteItems = migrateStorage("fragranceFavorites");
    const updatedItems = favoriteItems.filter(
      (item) => item.id !== fragranceId
    );
    localStorage.setItem("fragranceFavorites", JSON.stringify(updatedItems));
  };

  // Remove from wishlist
  const removeFromWishlist = (fragranceId) => {
    const updatedWishlist = wishlist.filter((f) => f.id !== fragranceId);
    setWishlist(updatedWishlist);

    // Update localStorage
    const wishlistItems = migrateStorage("fragranceWishlist");
    const updatedItems = wishlistItems.filter(
      (item) => item.id !== fragranceId
    );
    localStorage.setItem("fragranceWishlist", JSON.stringify(updatedItems));
  };

  return {
    favorites,
    wishlist,
    loading,
    removeFromFavorites,
    removeFromWishlist,
  };
};

export default useFragranceLibrary;
