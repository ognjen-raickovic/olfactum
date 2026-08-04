import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, Add, Close } from "@mui/icons-material";
import api from "../../services/api";
import FragranceCard from "../../components/FragranceCard";
import FragranceFilter from "../../components/FragranceFilter";
import PerfumeFormDialog from "../../components/Admin/PerfumeFormDialog";

const AdminPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [allPerfumes, setAllPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
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
  const [visibleCount, setVisibleCount] = useState(12);
  const [references, setReferences] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch all perfumes
  useEffect(() => {
    const loadPerfumes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/perfumes/all");
        setAllPerfumes(res.data.perfumes);
      } catch (err) {
        console.error("Failed to load perfumes", err);
        setNotification({
          open: true,
          message: "Failed to load perfumes",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPerfumes();
  }, []);

  // Load references
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

  const normalizeGender = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  // Client-side filtering
  const performFiltering = useCallback((fragrances, search, filterOptions) => {
    let items = [...fragrances];

    if (search) {
      const term = search.toLowerCase();
      items = items.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          (f.brand_name && f.brand_name.toLowerCase().includes(term)),
      );
    }

    const {
      tags,
      brands,
      families,
      types,
      seasons,
      occasions,
      genders,
      sortBy,
    } = filterOptions;

    if (tags && tags.length > 0) {
      items = items.filter((f) => f.tags?.some((t) => tags.includes(t.id)));
    }

    if (brands && brands.length > 0) {
      items = items.filter((f) => brands.includes(f.brand_id));
    }

    if (families && families.length > 0) {
      items = items.filter((f) => families.includes(f.family_id));
    }

    if (types && types.length > 0) {
      items = items.filter((f) => types.includes(f.type_id));
    }

    if (seasons && seasons.length > 0) {
      items = items.filter((f) =>
        f.seasons?.some((s) => seasons.includes(s.id)),
      );
    }

    if (occasions && occasions.length > 0) {
      items = items.filter((f) =>
        f.occasions?.some((o) => occasions.includes(o.id)),
      );
    }

    if (genders && genders.length > 0) {
      items = items.filter((f) => {
        const perfumeGender = normalizeGender(
          f.gender_profile || f.genderProfile,
        );
        return genders.some((g) => normalizeGender(g) === perfumeGender);
      });
    }

    const getRating = (f) => f.average_rating || 0;
    const getPopularity = (f) => f.rating_count || 0;

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

      case "newest":
        items.sort((a, b) => (b.release_year || 0) - (a.release_year || 0));
        break;

      case "oldest":
        items.sort((a, b) => (a.release_year || 0) - (b.release_year || 0));
        break;

      default:
        items.sort((a, b) => a.name.localeCompare(b.name));
    }
    return items;
  }, []);

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (loading || allPerfumes.length === 0) return;
    const results = performFiltering(allPerfumes, debouncedSearch, filters);
    setFilteredResults(results);
  }, [allPerfumes, debouncedSearch, filters, loading, performFiltering]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this perfume?"))
      return;

    try {
      await api.delete(`/admin/perfumes/${id}`);
      setAllPerfumes((prev) => prev.filter((p) => p.perfume_id !== id));
      setNotification({
        open: true,
        message: "Perfume successfully deleted",
        severity: "success",
      });
    } catch (err) {
      console.error("Delete failed", err);
      setNotification({
        open: true,
        message: "Failed to delete perfume",
        severity: "error",
      });
    }
  };

  const handleEdit = async (perfume) => {
    try {
      const res = await api.get(`/admin/perfumes/${perfume.perfume_id}`);
      setEditingPerfume(res.data);
      setFormOpen(true);
    } catch (err) {
      console.error("Failed to fetch perfume details", err);
      setNotification({
        open: true,
        message: "Failed to load perfume details",
        severity: "error",
      });
    }
  };

  const handleFormSuccess = async () => {
    const wasEditing = Boolean(editingPerfume);
    setFormOpen(false);
    setEditingPerfume(null);

    try {
      const res = await api.get("/admin/perfumes/all");
      setAllPerfumes(res.data.perfumes);
      setNotification({
        open: true,
        message: wasEditing
          ? "Perfume successfully edited"
          : "Perfume successfully added",
        severity: "success",
      });
    } catch (err) {
      console.error("Refresh failed", err);
      setNotification({
        open: true,
        message: "Failed to refresh perfumes",
        severity: "error",
      });
    }
  };

  const loadMore = () => setVisibleCount((prev) => prev + 12);
  const handleClearSearch = () => setSearchTerm("");

  const getGridColumns = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

  const gridColumns = getGridColumns();

  const headerText = () => {
    if (loading) return "Loading...";

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

    if (debouncedSearch) return `Searched for "${debouncedSearch}"`;
    if (active.length) return `Filtered by: ${active.join(", ")}`;
    return "All Perfumes";
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {headerText()}
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
          >
            Add New Perfume
          </Button>
        </Box>

        <TextField
          fullWidth
          placeholder="Search perfumes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} edge="end" size="small">
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredResults.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 8 }}>
            No perfumes found.
          </Typography>
        ) : (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Showing {Math.min(visibleCount, filteredResults.length)} of{" "}
              {filteredResults.length} perfumes
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: { xs: 2, md: 3 },
                justifyItems: "stretch",
              }}
            >
              {filteredResults.slice(0, visibleCount).map((p) => (
                <FragranceCard
                  key={p.perfume_id}
                  fragrance={p}
                  admin={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  sx={{ cursor: "default" }}
                />
              ))}
            </Box>

            {visibleCount < filteredResults.length && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button variant="outlined" onClick={loadMore}>
                  Load More ({filteredResults.length - visibleCount} remaining)
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

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
            sortBy={filters.sortBy}
            onSortChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: value,
              }))
            }
          />
        </Box>
      )}

      {isMobile && references && (
        <FragranceFilter
          onFilterChange={setFilters}
          references={references}
          sortBy={filters.sortBy}
          onSortChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              sortBy: value,
            }))
          }
        />
      )}

      {formOpen && references && (
        <PerfumeFormDialog
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setEditingPerfume(null);
          }}
          references={references}
          perfume={editingPerfume}
          onSuccess={handleFormSuccess}
        />
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
