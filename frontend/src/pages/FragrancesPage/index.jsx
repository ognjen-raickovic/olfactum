import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FragranceCard from "../../components/FragranceCard";
import FragranceModal from "../../components/FragranceModal";
import FragranceFilter from "../../components/FragranceFilter";
import { fragranceData } from "../../services/fragranceData";
import { filterFragrances } from "../../utils/filterFragrances";

const FragrancesPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || params.get("search") || "";

  const baseResults = useMemo(
    () => filterFragrances(fragranceData, query),
    [query]
  );

  const [filters, setFilters] = useState({
    selectedSeasons: [],
    selectedOccasions: [],
    selectedPriceRanges: [],
    sortBy: "relevance",
  });

  const [visibleCount, setVisibleCount] = useState(15);
  const [selected, setSelected] = useState(null);

  // Apply filtering + sorting logic
  const filteredResults = useMemo(() => {
    let items = baseResults.slice();

    const { selectedSeasons, selectedOccasions, selectedPriceRanges, sortBy } =
      filters;

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

    const longevityRank = { short: 0, moderate: 1, long: 2 };
    const intensityRank = { light: 0, moderate: 1, strong: 2 };
    const priceRank = { Budget: 0, Mid: 1, Premium: 2, Luxury: 3 };

    const getLongevity = (f) =>
      longevityRank[f.longevity?.toLowerCase?.()] ?? 0;
    const getIntensity = (f) =>
      intensityRank[f.intensity?.toLowerCase?.()] ?? 0;
    const getPrice = (f) =>
      priceRank[f.priceRange] ?? (typeof f.price === "number" ? f.price : 0);

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
      case "price-desc":
        items.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "price-asc":
        items.sort((a, b) => getPrice(a) - getPrice(b));
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
      <FragranceFilter onFilterChange={setFilters} />

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
