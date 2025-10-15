import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import FragranceCard from "../../components/FragranceCard";
import FragranceModal from "../../components/FragranceModal";
import FragranceFilter from "../../components/FragranceFilter";
import { getAllFragrances } from "../../services/fragranceService";
import { filterFragrances } from "../../utils/fragranceUtils";

const FragrancesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const location = useLocation();
  const { slug } = useParams();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get("query") || params.get("search") || "";

  const allFragrances = useMemo(() => getAllFragrances(), []);

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [filters, setFilters] = useState({
    seasons: [],
    occasions: [],
    genders: [],
    performance: [],
    sortBy: "relevance",
  });
  const [visibleCount, setVisibleCount] = useState(20);
  const [selected, setSelected] = useState(null);

  // Update search term if query in URL changes
  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  // Open modal automatically when a slug is present in the URL
  useEffect(() => {
    if (!slug) return;
    const match = allFragrances.find(
      (f) => f.slug === slug || `id-${f.id}` === slug
    );
    if (match) {
      setSelected(match);
    }
  }, [slug, allFragrances]);

  // Enhanced filtering logic with combined performance filter
  const filteredResults = useMemo(() => {
    let items = filterFragrances(allFragrances, searchTerm);

    const { seasons, occasions, genders, performance, sortBy } = filters;

    // Season filtering (OR logic within category)
    if (seasons.length > 0) {
      items = items.filter((f) =>
        seasons.some((season) =>
          (f.season || []).some((fSeason) =>
            fSeason.toLowerCase().includes(season.toLowerCase())
          )
        )
      );
    }

    // Occasion filtering (OR logic within category)
    if (occasions.length > 0) {
      items = items.filter((f) =>
        occasions.some((occasion) =>
          (f.occasion || []).some((fOccasion) =>
            fOccasion.toLowerCase().includes(occasion.toLowerCase())
          )
        )
      );
    }

    // Gender filtering (token-based OR logic)
    if (genders.length > 0) {
      items = items.filter((f) => {
        const genderTokens = (f.genderProfile || "")
          .toLowerCase()
          .split(/[\s/,&]+/) // split by spaces, slashes, commas, ampersands
          .map((t) => t.trim())
          .filter(Boolean);

        return genders.some((g) => genderTokens.includes(g.toLowerCase()));
      });
    }

    // Performance filtering (OR logic between longevity AND projection)
    if (performance.length > 0) {
      items = items.filter((f) => {
        const fragranceLongevity = (f.longevity || "").toLowerCase();
        const fragranceProjection = (f.intensity || "").toLowerCase();

        return performance.some((perf) => {
          const perfLower = perf.toLowerCase();
          // Check both longevity AND projection fields with OR logic
          return (
            fragranceLongevity.includes(perfLower) ||
            fragranceProjection.includes(perfLower)
          );
        });
      });
    }

    // Enhanced sorting
    const getRating = (f) => Number(f.rating) || 0;
    const getPopularity = (f) => Number(f.ratingCount) || 0;

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
  }, [allFragrances, searchTerm, filters]);

  const handleCardClick = (f) => setSelected(f);
  const handleClose = () => setSelected(null);
  const clearSearch = () => setSearchTerm("");

  const headerText = useMemo(() => {
    if (searchTerm) return `Searched for "${searchTerm}"`;

    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => key !== "sortBy" && value.length > 0)
      .flatMap(([key, value]) => value);

    if (activeFilters.length) {
      return `Filtered by: ${activeFilters.slice(0, 3).join(", ")}${
        activeFilters.length > 3 ? "..." : ""
      }`;
    }

    return "All Fragrances";
  }, [searchTerm, filters]);

  // Calculate grid columns based on screen size and sidebar
  const getGridColumns = () => {
    if (isMobile) return 2; // 2 columns on mobile
    if (isTablet) return 3; // 3 columns on tablet
    return 4; // 4 columns on desktop with sidebar
  };

  const gridColumns = getGridColumns();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: isMobile ? "column" : "row-reverse",
      }}
    >
      {/* Desktop Sidebar - Now on the RIGHT */}
      {!isMobile && (
        <Box
          sx={{
            width: 280,
            flexShrink: 0,
            borderLeft: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
          }}
        >
          <FragranceFilter
            onFilterChange={setFilters}
            seasons={[]}
            occasions={[]}
            genders={[]}
          />
        </Box>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: 4,
          pb: isMobile ? 10 : 4,
        }}
      >
        {/* Header - Centered on both mobile and desktop */}
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
            textAlign: "center", // Always centered
            fontSize: { xs: "1.75rem", md: "2.125rem" },
          }}
        >
          {headerText}
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            alignItems: { sm: "center" },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search fragrances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              width: { xs: "100%", sm: 400 },
              mr: { sm: 2 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.primary" }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end" size="small">
                    <CloseIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Desktop Sort Dropdown */}
          {!isMobile && (
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value,
                  }))
                }
                label="Sort by"
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="name-asc">Name (A → Z)</MenuItem>
                <MenuItem value="name-desc">Name (Z → A)</MenuItem>
                <MenuItem value="rating-desc">Rating (high → low)</MenuItem>
                <MenuItem value="rating-asc">Rating (low → high)</MenuItem>
                <MenuItem value="popularity-desc">
                  Popularity (most → least)
                </MenuItem>
                <MenuItem value="popularity-asc">
                  Popularity (least → most)
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>

        {/* Mobile Filter Component (renders floating button) */}
        {isMobile && <FragranceFilter onFilterChange={setFilters} />}

        {/* Results Grid */}
        {filteredResults.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 8 }}>
            No fragrances found. Try adjusting your filters or search terms.
          </Typography>
        ) : (
          <>
            {/* Showing text - Centered on both mobile and desktop */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }} // Always centered
            >
              Showing {Math.min(visibleCount, filteredResults.length)} of{" "}
              {filteredResults.length} fragrances
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: { xs: 2, md: 3 },
                justifyItems: "stretch",
              }}
            >
              {filteredResults.slice(0, visibleCount).map((f) => (
                <FragranceCard
                  key={f.id}
                  fragrance={f}
                  onClick={handleCardClick}
                  sx={{
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: isMobile ? "none" : "translateY(-4px)",
                      boxShadow: isMobile ? 1 : 3,
                    },
                  }}
                />
              ))}
            </Box>

            {/* Load More Button */}
            {visibleCount < filteredResults.length && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setVisibleCount((prev) => prev + 20)}
                >
                  Load More ({filteredResults.length - visibleCount} remaining)
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Fragrance Modal */}
        <FragranceModal
          fragrance={selected}
          open={!!selected}
          onClose={handleClose}
        />
      </Box>
    </Box>
  );
};

export default FragrancesPage;
