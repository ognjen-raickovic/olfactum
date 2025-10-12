import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import FragranceCard from "../../components/FragranceCard";
import FragranceModal from "../../components/FragranceModal";
import FragranceFilter from "../../components/FragranceFilter";
import { filterFragrances } from "../../utils/filterFragrances";
import { getAllFragrances } from "../../services/fragranceService";

const FragrancesPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || params.get("search") || "";

  // 🔹 All fragrances loaded once
  const allFragrances = useMemo(() => getAllFragrances(), []);

  // 🔹 Extract options dynamically
  const allSeasons = useMemo(
    () => Array.from(new Set(allFragrances.flatMap((f) => f.season || []))),
    [allFragrances]
  );
  const allOccasions = useMemo(
    () => Array.from(new Set(allFragrances.flatMap((f) => f.occasion || []))),
    [allFragrances]
  );
  const allGenders = ["male", "female", "unisex"];

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [filters, setFilters] = useState({
    selectedSeasons: [],
    selectedOccasions: [],
    selectedGenders: [],
    sortBy: "relevance",
  });
  const [visibleCount, setVisibleCount] = useState(15);
  const [selected, setSelected] = useState(null);

  // 🔹 Normalize search term safely
  const normalizedSearch = useMemo(() => {
    return searchTerm
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }, [searchTerm]);

  // 🔹 Base search results
  const baseResults = useMemo(() => {
    return filterFragrances(allFragrances, normalizedSearch);
  }, [allFragrances, normalizedSearch]);

  // 🔹 Apply filters and sorting
  const filteredResults = useMemo(() => {
    let items = baseResults.slice();
    const { selectedSeasons, selectedOccasions, selectedGenders, sortBy } =
      filters;

    // --- FILTERS ---
    if (selectedSeasons.length)
      items = items.filter((f) =>
        selectedSeasons.every((s) => (f.season || []).includes(s))
      );

    if (selectedOccasions.length)
      items = items.filter((f) =>
        selectedOccasions.every((o) => (f.occasion || []).includes(o))
      );

    if (selectedGenders.length)
      items = items.filter((f) =>
        selectedGenders.includes(
          (f.genderProfile || "").toLowerCase().replace(/\s+/g, "")
        )
      );

    // --- SORTING HELPERS ---
    const longevityRank = { short: 0, moderate: 1, long: 2 };
    const intensityRank = { light: 0, moderate: 1, strong: 2 };

    const getLongevity = (f) =>
      longevityRank[f.longevity?.toLowerCase?.()] ?? 0;
    const getIntensity = (f) =>
      intensityRank[f.intensity?.toLowerCase?.()] ?? 0;
    const getRating = (f) => Number(f.rating) || 0;
    const getPopularity = (f) => Number(f.ratingCount) || 0;

    // --- SORTING ---
    switch (sortBy) {
      case "relevance":
        items.sort((a, b) => {
          const aScore = getRating(a) * Math.log(1 + getPopularity(a));
          const bScore = getRating(b) * Math.log(1 + getPopularity(b));
          return bScore - aScore;
        });
        break;
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

  // 🔹 Handlers
  const handleCardClick = (f) => setSelected(f);
  const handleClose = () => setSelected(null);
  const clearSearch = () => setSearchTerm("");

  const headerText = useMemo(() => {
    if (searchTerm) return `Searched for “${searchTerm}”`;
    const activeFilters = [
      ...filters.selectedSeasons,
      ...filters.selectedOccasions,
      ...filters.selectedGenders,
    ];
    if (activeFilters.length)
      return `Filtered by: ${activeFilters
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join(", ")}`;
    return "All Fragrances";
  }, [searchTerm, filters]);

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 6 }}>
      {/* 🔹 Header */}
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
      >
        {headerText}
      </Typography>

      {/* 🔹 Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search fragrances..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ width: { xs: "100%", sm: 400 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.primary" }} />{" "}
                {/* 👈 fixed color */}
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={clearSearch} edge="end" size="small">
                  <CloseIcon sx={{ color: "text.primary" }} />{" "}
                  {/* 👈 fixed color */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 🔹 Filters */}
      <FragranceFilter
        onFilterChange={setFilters}
        seasons={allSeasons}
        occasions={allOccasions}
        genders={allGenders}
      />

      {/* 🔹 Results */}
      {filteredResults.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No fragrances found.
        </Typography>
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
                    Math.min(prev + 10, filteredResults.length)
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
