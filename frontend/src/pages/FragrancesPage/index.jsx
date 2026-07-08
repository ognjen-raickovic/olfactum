import { useState, useEffect, useCallback } from "react";
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
import api from "../../services/api";

const FragrancesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // now using perfume ID in URL
  const params = new URLSearchParams(location.search);
  const queryParam = params.get("query") || params.get("search") || "";

  const [allPerfumes, setAllPerfumes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(queryParam);
  const [filters, setFilters] = useState({
    tags: [],
    brands: [],
    families: [],
    types: [],
    seasons: [],
    occasions: [],
    genders: [],
    sortBy: "relevance",
  });
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(20);
  const [selected, setSelected] = useState(null);
  const [references, setReferences] = useState(null);

  const isModal = !!location.state?.background;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load references for filters
  useEffect(() => {
    const loadRefs = async () => {
      try {
        const res = await api.get("/references");
        setReferences(res.data);
      } catch (err) {
        console.error("Failed to load references", err);
      }
    };
    loadRefs();
  }, []);

  // Fetch perfumes from API whenever filters/search/page change
  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearchTerm)
          queryParams.append("search", debouncedSearchTerm);
        queryParams.append("sort", filters.sortBy);
        queryParams.append("page", page);
        queryParams.append("limit", 20);

        // Append multiple IDs
        filters.brands.forEach((id) => queryParams.append("brand_id", id));
        filters.families.forEach((id) => queryParams.append("family_id", id));
        filters.types.forEach((id) => queryParams.append("type_id", id));
        filters.seasons.forEach((id) => queryParams.append("season_id", id));
        filters.occasions.forEach((id) =>
          queryParams.append("occasion_id", id),
        );
        filters.genders.forEach((g) => queryParams.append("gender", g));
        filters.tags.forEach((id) => queryParams.append("tag_id", id));

        const res = await api.get(`/perfumes?${queryParams.toString()}`);

        if (page === 1) {
          setAllPerfumes(res.data.perfumes);
        } else {
          setAllPerfumes((prev) => [...prev, ...res.data.perfumes]);
        }
        setTotal(res.data.total);
      } catch (err) {
        console.error("Failed to fetch perfumes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, [debouncedSearchTerm, filters, page]);

  // When filters/search change, reset page
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, filters]);

  // Load more
  const loadMore = () => {
    setPage((prev) => prev + 1);
    setVisibleCount((prev) => prev + 20);
  };

  const handleClearSearch = () => setSearchTerm("");

  // Modal: fetch perfume detail whenever the URL id changes
  useEffect(() => {
    if (!id) {
      setSelected(null);
      return;
    }

    let cancelled = false;

    const fetchDetail = async () => {
      try {
        const res = await api.get(`/perfumes/${id}`);
        if (!cancelled) {
          setSelected(res.data);
        }
      } catch (err) {
        console.error("Failed to load perfume detail", err);
      }
    };

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleCardClick = (f) => {
    // Navigate with perfume ID
    navigate(`/fragrances/${f.perfume_id}`, {
      state: { background: location },
    });
  };

  const handleClose = () => {
    if (location.state?.background) {
      navigate(location.state.background);
    } else {
      navigate("/fragrances");
    }
    setSelected(null);
  };

  const handleUpdatePerfume = (updatedPerfume) => {
    setAllPerfumes((prev) =>
      prev.map((p) =>
        p.perfume_id === updatedPerfume.perfume_id ? updatedPerfume : p,
      ),
    );
  };

  const headerText = () => {
    if (loading && allPerfumes.length === 0) return "Loading...";
    const active = [];
    if (filters.brands.length) active.push(`${filters.brands.length} brand(s)`);
    if (filters.families.length)
      active.push(`${filters.families.length} family(s)`);
    if (filters.types.length) active.push(`${filters.types.length} type(s)`);
    if (filters.seasons.length)
      active.push(`${filters.seasons.length} season(s)`);
    if (filters.occasions.length)
      active.push(`${filters.occasions.length} occasion(s)`);
    if (filters.genders.length)
      active.push(`${filters.genders.length} gender(s)`);
    if (filters.tags.length) active.push(`${filters.tags.length} tag(s)`);
    if (debouncedSearchTerm) return `Searched for "${debouncedSearchTerm}"`;
    if (active.length) return `Filtered by: ${active.join(", ")}`;
    return "All Fragrances";
  };

  const getGridColumns = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };
  const gridColumns = getGridColumns();

  // Modal mode
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
          {headerText()}
        </Typography>

        {loading && allPerfumes.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <LoadingSpinner size="large" />
          </Box>
        )}

        {allPerfumes.length === 0 && !loading ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 8 }}>
            No fragrances found.
          </Typography>
        ) : (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Showing {Math.min(visibleCount, total)} of {total} fragrances
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: { xs: 2, md: 3 },
                justifyItems: "stretch",
              }}
            >
              {allPerfumes.slice(0, visibleCount).map((f) => (
                <FragranceCard
                  key={`${f.perfume_id}-${f.average_rating || 0}`}
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

            {visibleCount < total && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button variant="outlined" size="large" onClick={loadMore}>
                  Load More ({total - visibleCount} remaining)
                </Button>
              </Box>
            )}
          </>
        )}

        {!isModal && (
          <FragranceModal
            fragrance={selected}
            open={!!selected}
            onClose={handleClose}
            onUpdatePerfume={handleUpdatePerfume}
          />
        )}
      </Box>

      {/* Filter sidebar (desktop) */}
      {!isMobile && references && (
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
          }}
        >
          <FragranceFilter
            onFilterChange={setFilters}
            references={references}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={filters.sortBy}
            onSortChange={(value) =>
              setFilters((prev) => ({ ...prev, sortBy: value }))
            }
          />
        </Box>
      )}

      {/* Mobile filter (button + drawer handled inside FragranceFilter) */}
      {isMobile && references && (
        <FragranceFilter
          onFilterChange={setFilters}
          references={references}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={filters.sortBy}
          onSortChange={(value) =>
            setFilters((prev) => ({ ...prev, sortBy: value }))
          }
        />
      )}
    </Box>
  );
};

export default FragrancesPage;
