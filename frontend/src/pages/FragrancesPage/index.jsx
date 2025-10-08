import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FragranceCard from "../../components/FragranceCard";
import FragranceModal from "../../components/FragranceModal"; // make sure this path is correct
import { fragranceData } from "../../services/fragranceData";
import { filterFragrances } from "../../utils/filterFragrances";
import SearchBar from "../../components/SearchBar";

const FragrancesPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || params.get("search") || "";

  const results = useMemo(
    () => filterFragrances(fragranceData, query),
    [query]
  );

  const [visibleCount, setVisibleCount] = useState(15);
  const [selected, setSelected] = useState(null);

  const handleLoadMore = () =>
    setVisibleCount((prev) => Math.min(prev + 5, results.length));
  const handleCardClick = (f) => setSelected(f);
  const handleClose = () => setSelected(null);

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        {query ? `Searched for “${query}”` : "All Fragrances"}
      </Typography>

      {results.length === 0 ? (
        <Typography color="text.secondary">No fragrances found.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              },
              gap: 3,
            }}
          >
            {results.slice(0, visibleCount).map((f) => (
              <FragranceCard
                key={f.id}
                fragrance={f}
                onClick={handleCardClick}
                onViewDetails={handleCardClick} // support both prop names
              />
            ))}
          </Box>

          {visibleCount < results.length && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button variant="outlined" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </>
      )}

      {/* Use your existing FragranceModal component */}
      <FragranceModal
        fragrance={selected}
        open={!!selected}
        onClose={handleClose}
      />
    </Box>
  );
};

export default FragrancesPage;
