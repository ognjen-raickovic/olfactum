import React, { useMemo, useState } from "react";
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
  Stack,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { fragranceData } from "../services/fragranceData";

const FragranceFilter = ({ onFilterChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const availableOptions = useMemo(() => {
    const s = new Set();
    const o = new Set();
    const p = new Set();
    fragranceData.forEach((f) => {
      (f.season || []).forEach((x) => s.add(x));
      (f.occasion || []).forEach((x) => o.add(x));
      if (f.priceRange) p.add(f.priceRange);
    });
    return {
      seasons: Array.from(s).sort(),
      occasions: Array.from(o).sort(),
      priceRanges: Array.from(p).sort(),
    };
  }, []);

  const toggleArrayValue = (array, setFn, value) => {
    if (array.includes(value)) setFn(array.filter((v) => v !== value));
    else setFn([...array, value]);
  };

  const handleClearFilters = () => {
    setSelectedSeasons([]);
    setSelectedOccasions([]);
    setSelectedPriceRanges([]);
    setSortBy("relevance");
  };

  const applyFilters = () => {
    onFilterChange({
      selectedSeasons,
      selectedOccasions,
      selectedPriceRanges,
      sortBy,
    });
    setDrawerOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 3 }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setDrawerOpen(true)}
        >
          Filters
        </Button>
      </Stack>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 420 } } }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Filter & Sort</Typography>
            <Button onClick={handleClearFilters}>Clear</Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Seasons */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Seasons
          </Typography>
          <FormGroup sx={{ mb: 2 }}>
            {availableOptions.seasons.map((s) => (
              <FormControlLabel
                key={s}
                control={
                  <Checkbox
                    checked={selectedSeasons.includes(s)}
                    onChange={() =>
                      toggleArrayValue(selectedSeasons, setSelectedSeasons, s)
                    }
                  />
                }
                label={s}
              />
            ))}
          </FormGroup>

          {/* Occasions */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Occasions
          </Typography>
          <FormGroup sx={{ mb: 2 }}>
            {availableOptions.occasions.map((o) => (
              <FormControlLabel
                key={o}
                control={
                  <Checkbox
                    checked={selectedOccasions.includes(o)}
                    onChange={() =>
                      toggleArrayValue(
                        selectedOccasions,
                        setSelectedOccasions,
                        o
                      )
                    }
                  />
                }
                label={o}
              />
            ))}
          </FormGroup>

          {/* Price ranges */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Price Range
          </Typography>
          <FormGroup sx={{ mb: 2 }}>
            {availableOptions.priceRanges.map((p) => (
              <FormControlLabel
                key={p}
                control={
                  <Checkbox
                    checked={selectedPriceRanges.includes(p)}
                    onChange={() =>
                      toggleArrayValue(
                        selectedPriceRanges,
                        setSelectedPriceRanges,
                        p
                      )
                    }
                  />
                }
                label={p}
              />
            ))}
          </FormGroup>

          <Divider sx={{ mb: 2 }} />

          {/* Sort */}
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="name-asc">Name (A → Z)</MenuItem>
              <MenuItem value="name-desc">Name (Z → A)</MenuItem>
              <MenuItem value="longevity-desc">
                Longevity (long → short)
              </MenuItem>
              <MenuItem value="longevity-asc">
                Longevity (short → long)
              </MenuItem>
              <MenuItem value="intensity-desc">
                Intensity (strong → light)
              </MenuItem>
              <MenuItem value="intensity-asc">
                Intensity (light → strong)
              </MenuItem>
              <MenuItem value="price-desc">Price (high → low)</MenuItem>
              <MenuItem value="price-asc">Price (low → high)</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <Button variant="contained" fullWidth onClick={applyFilters}>
              Apply
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                handleClearFilters();
                setDrawerOpen(false);
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default FragranceFilter;
