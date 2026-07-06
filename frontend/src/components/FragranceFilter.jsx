import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FilterList,
  ExpandMore,
  Close,
  Search as SearchIcon,
} from "@mui/icons-material";

// ---------- Sidebar / Drawer content ----------
const FilterContent = ({
  filters,
  onFilterChange,
  onClearFilters,
  isMobile,
  onClose,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  references,
}) => {
  const theme = useTheme();

  const toggleArrayFilter = (category, value) => {
    const current = filters[category] || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: newValues });
  };

  const clearSearch = () => onSearchChange?.("");

  // Local state for brand search
  const [brandSearch, setBrandSearch] = useState("");

  // Sort options – always show both admin and public ones
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "name-asc", label: "Name (A → Z)" },
    { value: "name-desc", label: "Name (Z → A)" },
    { value: "rating-desc", label: "Rating (high → low)" },
    { value: "rating-asc", label: "Rating (low → high)" },
    { value: "popularity-desc", label: "Popularity (most → least)" },
    { value: "popularity-asc", label: "Popularity (least → most)" },
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
  ];

  // References data
  const {
    tags = [],
    brands = [],
    families = [],
    types = [],
    seasons = [],
    occasions = [],
  } = references || {};

  const categoryTags = tags.filter((t) => t.type === "category");
  const priceTags = tags.filter((t) => t.type === "price");
  const genderOptions = ["Male", "Female", "Unisex"];

  // Filter brands by local search
  const filteredBrands = (brands || []).filter((b) =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "80vh" : "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: isMobile ? 0 : 2,
          }}
        >
          <Typography variant="h6">Filters</Typography>
          {isMobile && (
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          )}
        </Box>

        {/* Search (public only, optional) */}
        {onSearchChange && (
          <TextField
            variant="outlined"
            placeholder="Search fragrances..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.primary" }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end" size="small">
                    <Close sx={{ color: "text.primary", fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>

      {/* Scrollable filters */}
      <Box sx={{ flex: 1, overflow: "auto", p: 2, pb: isMobile ? 8 : 2 }}>
        {/* Sort */}
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy || "relevance"}
            label="Sort by"
            onChange={(e) => onSortChange?.(e.target.value)}
            MenuProps={{ disableScrollLock: true, sx: { zIndex: 9999 } }}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ mb: 2 }} />

        {/* Category Tags (admin mode only if needed, but we can always show) */}
        {categoryTags.length > 0 && (
          <Accordion defaultExpanded sx={accordionStyle(theme)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>Category Tags</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {categoryTags.map((tag) => (
                  <FormControlLabel
                    key={tag.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={(filters.tags || []).includes(tag.id)}
                        onChange={() => toggleArrayFilter("tags", tag.id)}
                      />
                    }
                    label={tag.name}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Price Tags */}
        {priceTags.length > 0 && (
          <Accordion defaultExpanded sx={accordionStyle(theme)}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>Price Tags</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {priceTags.map((tag) => (
                  <FormControlLabel
                    key={tag.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={(filters.tags || []).includes(tag.id)}
                        onChange={() => toggleArrayFilter("tags", tag.id)}
                      />
                    }
                    label={tag.name}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Brands with search */}
        <Accordion defaultExpanded sx={accordionStyle(theme)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Brand</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              size="small"
              placeholder="Search brands..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: brandSearch && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setBrandSearch("")}>
                      <Close fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormGroup>
              {filteredBrands.slice(0, 20).map((brand) => (
                <FormControlLabel
                  key={brand.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={(filters.brands || []).includes(brand.id)}
                      onChange={() => toggleArrayFilter("brands", brand.id)}
                    />
                  }
                  label={brand.name}
                />
              ))}
              {filteredBrands.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No brands found.
                </Typography>
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Scent Families */}
        <Accordion defaultExpanded sx={accordionStyle(theme)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Scent Family</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(families || []).map((family) => (
                <FormControlLabel
                  key={family.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={(filters.families || []).includes(family.id)}
                      onChange={() => toggleArrayFilter("families", family.id)}
                    />
                  }
                  label={family.name}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Types */}
        <Accordion defaultExpanded sx={accordionStyle(theme)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(types || []).map((type) => (
                <FormControlLabel
                  key={type.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={(filters.types || []).includes(type.id)}
                      onChange={() => toggleArrayFilter("types", type.id)}
                    />
                  }
                  label={type.name}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Seasons */}
        <Accordion defaultExpanded sx={accordionStyle(theme)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Season</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(seasons || []).map((season) => (
                <FormControlLabel
                  key={season.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={(filters.seasons || []).includes(season.id)}
                      onChange={() => toggleArrayFilter("seasons", season.id)}
                    />
                  }
                  label={season.name}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Occasions */}
        <Accordion defaultExpanded sx={accordionStyle(theme)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Occasion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(occasions || []).map((occasion) => (
                <FormControlLabel
                  key={occasion.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={(filters.occasions || []).includes(occasion.id)}
                      onChange={() =>
                        toggleArrayFilter("occasions", occasion.id)
                      }
                    />
                  }
                  label={occasion.name}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Gender */}
        <Accordion defaultExpanded sx={accordionStyle(theme)}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Gender</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {genderOptions.map((gender) => (
                <FormControlLabel
                  key={gender}
                  control={
                    <Checkbox
                      size="small"
                      checked={(filters.genders || []).includes(gender)}
                      onChange={() => toggleArrayFilter("genders", gender)}
                    />
                  }
                  label={gender}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          flexShrink: 0,
          bgcolor: "background.paper",
        }}
      >
        {isMobile && (
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{ mb: 1 }}
          >
            Apply Filters
          </Button>
        )}
        <Button
          fullWidth
          variant="outlined"
          onClick={onClearFilters}
          disabled={
            Object.values(filters).every(
              (val) => !val || (Array.isArray(val) && val.length === 0),
            ) && filters.sortBy === "relevance"
          }
        >
          Clear All Filters
        </Button>
      </Box>
    </Box>
  );
};

const accordionStyle = (theme) => ({
  mb: 1,
  "&:before": { display: "none" },
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 1,
});

// ---------- Main exported component ----------
const FragranceFilter = ({
  onFilterChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  references,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const empty = {
      tags: [],
      brands: [],
      families: [],
      types: [],
      seasons: [],
      occasions: [],
      genders: [],
      sortBy: "relevance",
    };
    setFilters(empty);
    onFilterChange(empty);
  };

  const activeFilterCount =
    (filters.tags?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.families?.length || 0) +
    (filters.types?.length || 0) +
    (filters.seasons?.length || 0) +
    (filters.occasions?.length || 0) +
    (filters.genders?.length || 0);

  if (!isMobile) {
    return (
      <FilterContent
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isMobile={false}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        references={references}
      />
    );
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          startIcon={<FilterList />}
          onClick={() => setMobileOpen(true)}
          sx={{
            borderRadius: 8,
            px: 3,
            py: 1.5,
            boxShadow: 3,
            minWidth: 140,
            position: "relative",
          }}
        >
          Filters
          {activeFilterCount > 0 && (
            <Chip
              label={activeFilterCount}
              size="small"
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                height: 20,
                minWidth: 20,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Button>
      </Box>

      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "80vh",
          },
        }}
      >
        <FilterContent
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isMobile={true}
          onClose={() => setMobileOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          references={references}
        />
      </Drawer>
    </>
  );
};

export default FragranceFilter;
