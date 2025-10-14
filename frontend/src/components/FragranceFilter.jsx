import React, { useState } from "react";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FilterList, ExpandMore, Close } from "@mui/icons-material";

// Simplified filter options
const FILTER_CATEGORIES = {
  seasons: {
    label: "Seasons",
    options: ["All Year", "Spring / Summer", "Fall / Winter"],
  },
  occasions: {
    label: "Occasions",
    options: [
      "Everyday / Casual",
      "Office / Daytime",
      "Evening / Special",
      "Date Night",
    ],
  },
  genders: {
    label: "Gender",
    options: ["Men", "Women", "Unisex"],
  },
  performance: {
    label: "Performance",
    options: ["Very Strong", "Strong", "Moderate", "Light"],
  },
};

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  isMobile = false,
  onClose,
}) => {
  const theme = useTheme();

  const toggleFilter = (category, value) => {
    const currentFilters = filters[category] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    onFilterChange({
      ...filters,
      [category]: newFilters,
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, categoryFilters) => {
      return count + (categoryFilters?.length || 0);
    }, 0);
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 280,
        height: isMobile ? "80vh" : "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          flexShrink: 0, // Prevents header from shrinking
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Filters{" "}
            {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Typography>
          {isMobile && (
            <Button onClick={onClose} size="small">
              <Close />
            </Button>
          )}
        </Box>
      </Box>

      {/* Scrollable Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          // Add padding at the bottom to ensure content isn't hidden behind actions
          pb: isMobile ? 8 : 2,
        }}
      >
        {/* Sort - Only show in mobile */}
        {isMobile && (
          <>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={filters.sortBy || "relevance"}
                label="Sort by"
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    sortBy: e.target.value,
                  })
                }
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
            <Divider sx={{ mb: 2 }} />
          </>
        )}

        {/* Filter Categories */}
        {Object.entries(FILTER_CATEGORIES).map(
          ([category, { label, options }]) => (
            <Accordion
              key={category}
              defaultExpanded={!isMobile}
              sx={{
                mb: 1,
                "&:before": { display: "none" },
                boxShadow: "none",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {options.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          size="small"
                          checked={(filters[category] || []).includes(option)}
                          onChange={() => toggleFilter(category, option)}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          )
        )}
      </Box>

      {/* Fixed Action Buttons */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          flexShrink: 0, // Prevents actions from shrinking
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={onClearFilters}
            disabled={getActiveFilterCount() === 0}
          >
            Clear All
          </Button>
          {isMobile && (
            <Button variant="contained" fullWidth onClick={onClose}>
              Apply
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const FragranceFilter = ({ onFilterChange, seasons, occasions, genders }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState({
    seasons: [],
    occasions: [],
    genders: [],
    performance: [],
    sortBy: "relevance",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      seasons: [],
      occasions: [],
      genders: [],
      performance: [],
      sortBy: "relevance",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, categoryFilters) => {
      return (
        count + (Array.isArray(categoryFilters) ? categoryFilters.length : 0)
      );
    }, 0);
  };

  // Desktop: Permanent sidebar
  if (!isMobile) {
    return (
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isMobile={false}
      />
    );
  }

  // Mobile: Bottom sheet drawer
  return (
    <>
      {/* Mobile Filter Button with Badge */}
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
          {getActiveFilterCount() > 0 && (
            <Chip
              label={getActiveFilterCount()}
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
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isMobile={true}
          onClose={() => setMobileOpen(false)}
        />
      </Drawer>
    </>
  );
};

export default FragranceFilter;
