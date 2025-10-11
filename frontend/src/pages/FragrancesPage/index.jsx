import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FragranceCard from "../../components/FragranceCard";
import FragranceModal from "../../components/FragranceModal";
import FragranceFilter from "../../components/FragranceFilter";
import { filterFragrances } from "../../utils/filterFragrances";
import { getAllFragrances } from "../../services/fragranceService";

const FragrancesPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || params.get("search") || "";

  // Fetch all fragrances once
  const allFragrances = useMemo(() => getAllFragrances(), []);

  // Compute filter options dynamically
  const allSeasons = useMemo(
    () => Array.from(new Set(allFragrances.flatMap((f) => f.season || []))),
    [allFragrances]
  );
  const allOccasions = useMemo(
    () => Array.from(new Set(allFragrances.flatMap((f) => f.occasion || []))),
    [allFragrances]
  );
  const allPriceRanges = useMemo(
    () =>
      Array.from(
        new Set(allFragrances.map((f) => f.priceRange).filter(Boolean))
      ),
    [allFragrances]
  );

  // Base results after search term
  const baseResults = useMemo(
    () => filterFragrances(allFragrances, query),
    [allFragrances, query]
  );

  const [filters, setFilters] = useState({
    selectedSeasons: [],
    selectedOccasions: [],
    selectedPriceRanges: [],
    sortBy: "relevance",
  });
  const [visibleCount, setVisibleCount] = useState(15);
  const [selected, setSelected] = useState(null);

  // Apply filtering + sorting
  const filteredResults = useMemo(() => {
    let items = baseResults.slice();
    const { selectedSeasons, selectedOccasions, selectedPriceRanges, sortBy } =
      filters;

    // --- FILTERS ---
    if (selectedSeasons.length)
      items = items.filter((f) =>
        (f.season || []).some((s) => selectedSeasons.includes(s))
      );

    if (selectedOccasions.length)
      items = items.filter((f) =>
        (f.occasion || []).some((o) => selectedOccasions.includes(o))
      );

    if (selectedPriceRanges.length)
      items = items.filter((f) => selectedPriceRanges.includes(f.priceRange));

    // --- SORTING HELPERS ---
    const longevityRank = { short: 0, moderate: 1, long: 2 };
    const intensityRank = { light: 0, moderate: 1, strong: 2 };

    const getLongevity = (f) =>
      longevityRank[f.longevity?.toLowerCase?.()] ?? 0;
    const getIntensity = (f) =>
      intensityRank[f.intensity?.toLowerCase?.()] ?? 0;
    const getRating = (f) => f.rating ?? 0;
    const getPopularity = (f) => f.ratingCount ?? 0;

    // --- SORTING ---
    switch (sortBy) {
      case "name-asc":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "longevity-desc":
        items.sort((a, b) => getLongevity(b) - getLongevity(a));
        break;
      case "longevity-asc":
        items.sort((a, b) => getLongevity(a) - getLongevity(b));
        break;
      case "intensity-desc":
        items.sort((a, b) => getIntensity(b) - getIntensity(a));
        break;
      case "intensity-asc":
        items.sort((a, b) => getIntensity(a) - getIntensity(b));
        break;
      case "rating-desc":
        items.sort((a, b) => getRating(b) - getRating(a));
        break;
      case "rating-asc":
        items.sort((a, b) => getRating(a) - getRating(b));
        break;
      case "popularity-desc":
        items.sort((a, b) => getPopularity(b) - getPopularity(a));
        break;
      case "popularity-asc":
        items.sort((a, b) => getPopularity(a) - getPopularity(b));
        break;
      default:
        break;
    }

    return items;
  }, [baseResults, filters]);

  const handleCardClick = (f) => setSelected(f);
  const handleClose = () => setSelected(null);

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 6 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
      >
        {query ? `Searched for “${query}”` : "All Fragrances"}
      </Typography>

      {/* Filter Component */}
      <FragranceFilter
        onFilterChange={setFilters}
        seasons={allSeasons}
        occasions={allOccasions}
        priceRanges={allPriceRanges}
      />

      {filteredResults.length === 0 ? (
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
            {filteredResults.slice(0, visibleCount).map((f) => (
              <FragranceCard
                key={f.id}
                fragrance={f}
                onClick={handleCardClick}
              />
            ))}
          </Box>

          {visibleCount < filteredResults.length && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + 5, filteredResults.length)
                  )
                }
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}

      <FragranceModal
        fragrance={selected}
        open={!!selected}
        onClose={handleClose}
      />
    </Box>
  );
};

export default FragrancesPage;
