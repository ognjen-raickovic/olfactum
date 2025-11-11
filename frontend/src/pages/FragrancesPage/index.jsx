import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FragranceCard from "../../components/FragranceCard";
import FragranceModal from "../../components/FragranceModal/FragranceModal";
import FragranceFilter from "../../components/FragranceFilter";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getAllFragrances } from "../../services/fragranceService";
import { filterFragrances } from "../../utils/filterFragrances";
import { humanizeName } from "../../utils/humanizeName";

const FragrancesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get("query") || params.get("search") || "";

  const [allFragrances, setAllFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(queryParam);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState({
    seasons: [],
    occasions: [],
    genders: [],
    performance: [],
    sortBy: "relevance",
  });
  const [visibleCount, setVisibleCount] = useState(20);
  const [selected, setSelected] = useState(null);

  // Check if we're in a modal context
  const isModal = !!location.state?.background;

  // Debounce search term - 300ms delay
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Load fragrances
  useEffect(() => {
    const loadFragrances = async () => {
      setLoading(true);
      try {
        const data = getAllFragrances();
        setAllFragrances(data);
      } catch (error) {
        console.error("Error loading fragrances:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFragrances();
  }, []);

  // Async filtering function
  const performFiltering = useCallback(
    async (fragrances, search, filterOptions) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let items = filterFragrances(fragrances, search);

          const { seasons, occasions, genders, performance, sortBy } =
            filterOptions;

          if (seasons.length > 0) {
            items = items.filter((f) =>
              seasons.some((season) =>
                (f.season || []).some((fSeason) =>
                  fSeason.toLowerCase().includes(season.toLowerCase())
                )
              )
            );
          }

          if (occasions.length > 0) {
            items = items.filter((f) =>
              occasions.some((occasion) =>
                (f.occasion || []).some((fOccasion) =>
                  fOccasion.toLowerCase().includes(occasion.toLowerCase())
                )
              )
            );
          }

          if (genders.length > 0) {
            items = items.filter((f) => {
              const genderTokens = (f.genderProfile || "")
                .toLowerCase()
                .split(/[\s/,&]+/)
                .map((t) => t.trim())
                .filter(Boolean);
              return genders.some((g) =>
                genderTokens.includes(g.toLowerCase())
              );
            });
          }

          if (performance.length > 0) {
            items = items.filter((f) => {
              const fragranceLongevity = (f.longevity || "").toLowerCase();
              const fragranceProjection = (f.intensity || "").toLowerCase();
              return performance.some((perf) => {
                const perfLower = perf.toLowerCase();
                return (
                  fragranceLongevity.includes(perfLower) ||
                  fragranceProjection.includes(perfLower)
                );
              });
            });
          }

          // Sorting
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

          resolve(items);
        }, 0);
      });
    },
    []
  );

  // Filtered results with async processing
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (loading || allFragrances.length === 0) return;

    const filterData = async () => {
      setFiltering(true);
      try {
        const results = await performFiltering(
          allFragrances,
          debouncedSearchTerm,
          filters
        );
        setFilteredResults(results);
      } catch (error) {
        console.error("Error filtering fragrances:", error);
      } finally {
        setFiltering(false);
      }
    };

    filterData();
  }, [allFragrances, debouncedSearchTerm, filters, loading, performFiltering]);

  const scrollbarWidth = useMemo(() => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth - document.documentElement.clientWidth;
  }, []);

  useEffect(() => {
    if (selected && !isModal) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [selected, scrollbarWidth, isModal]);

  useEffect(() => {
    if (queryParam) {
      setSearchTerm(queryParam);
      setDebouncedSearchTerm(queryParam);
    } else {
      setSearchTerm("");
      setDebouncedSearchTerm("");
    }
  }, [queryParam]);

  // Handle fragrance selection - use modal pattern
  useEffect(() => {
    if (!slug || loading || allFragrances.length === 0) return;

    const match = allFragrances.find(
      (f) =>
        f.slug === slug ||
        `${f.brand}-${f.name}`.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (match) {
      setSelected(match);
    }
  }, [slug, allFragrances, loading]);

  const handleCardClick = (f) => {
    const fragranceSlug =
      f.slug || `${f.brand}-${f.name}`.toLowerCase().replace(/\s+/g, "-");

    // Navigate to fragrance with background location for modal behavior
    navigate(`/fragrances/${fragranceSlug}`, {
      state: { background: location },
    });
  };

  const handleClose = () => {
    // Go back to the background location (search results)
    if (location.state?.background) {
      navigate(location.state.background);
    } else {
      // Fallback: navigate to fragrances page
      navigate("/fragrances");
    }
    setSelected(null);
  };

  const headerText = useMemo(() => {
    if (loading) return "Loading Fragrances...";
    if (filtering) return "Searching...";

    if (debouncedSearchTerm && debouncedSearchTerm.trim()) {
      const displayTerm =
        humanizeName(debouncedSearchTerm) || debouncedSearchTerm;
      return `Searched for "${displayTerm}"`;
    }

    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => key !== "sortBy" && value.length > 0)
      .flatMap(([key, value]) => value);

    if (activeFilters.length) {
      return `Filtered by: ${activeFilters.slice(0, 3).join(", ")}${
        activeFilters.length > 3 ? "..." : ""
      }`;
    }

    return "All Fragrances";
  }, [debouncedSearchTerm, filters, loading, filtering]);

  const getGridColumns = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

  const gridColumns = getGridColumns();

  // If we're in modal mode and have a selected fragrance, only render the modal
  if (isModal && selected) {
    return (
      <FragranceModal
        fragrance={selected}
        open={true}
        onClose={handleClose}
        disableRouting={true}
      />
    );
  }

  if (loading && !isModal) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "80vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner size="large" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: 4,
          pb: isMobile ? 10 : 4,
          pr: { md: `calc(320px + ${theme.spacing(4)})` },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
            textAlign: "center",
            fontSize: { xs: "1.75rem", md: "2.125rem" },
          }}
        >
          {headerText}
        </Typography>

        {filtering && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <LoadingSpinner size="small" />
          </Box>
        )}

        {isMobile && (
          <FragranceFilter
            onFilterChange={setFilters}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={filters.sortBy}
            onSortChange={(value) =>
              setFilters((prev) => ({ ...prev, sortBy: value }))
            }
          />
        )}

        {filteredResults.length === 0 && !filtering ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 8 }}>
            No fragrances found. Try adjusting your filters or search terms.
          </Typography>
        ) : (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
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

        {/* Regular modal for non-route usage */}
        {!isModal && (
          <FragranceModal
            fragrance={selected}
            open={!!selected}
            onClose={handleClose}
          />
        )}
      </Box>

      {!isMobile && (
        <Box
          sx={{
            width: 320,
            position: "fixed",
            top: 64,
            right: 0,
            height: "calc(100vh - 64px)",
            borderLeft: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
            overflowY: "auto",
            zIndex: 1000,
            ...(selected && {
              paddingRight: `${scrollbarWidth}px`,
            }),
          }}
        >
          <FragranceFilter
            onFilterChange={setFilters}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={filters.sortBy}
            onSortChange={(value) =>
              setFilters((prev) => ({ ...prev, sortBy: value }))
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default FragrancesPage;
