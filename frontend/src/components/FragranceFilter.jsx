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
  Stack,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FragranceFilter = ({
  onFilterChange,
  seasons = [],
  occasions = [],
  genders = ["male", "female", "unisex"], // new gender prop
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const toggleArrayValue = (array, setFn, value) => {
    if (array.includes(value)) setFn(array.filter((v) => v !== value));
    else setFn([...array, value]);
  };

  const handleClearFilters = () => {
    setSelectedSeasons([]);
    setSelectedOccasions([]);
    setSelectedGenders([]);
    setSortBy("relevance");
  };

  const applyFilters = () => {
    onFilterChange({
      selectedSeasons,
      selectedOccasions,
      selectedGenders,
      sortBy,
    });
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Button to open filter drawer */}
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
          {/* Header */}
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
            {seasons.map((s) => (
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
            {occasions.map((o) => (
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

          {/* Genders */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Gender
          </Typography>
          <FormGroup sx={{ mb: 2 }}>
            {genders.map((g) => (
              <FormControlLabel
                key={g}
                control={
                  <Checkbox
                    checked={selectedGenders.includes(g)}
                    onChange={() =>
                      toggleArrayValue(selectedGenders, setSelectedGenders, g)
                    }
                  />
                }
                label={g.charAt(0).toUpperCase() + g.slice(1)}
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
              <MenuItem value="rating-desc">Rating (high → low)</MenuItem>
              <MenuItem value="rating-asc">Rating (low → high)</MenuItem>
              <MenuItem value="popularity-desc">
                Popularity (most → least rated)
              </MenuItem>
              <MenuItem value="popularity-asc">
                Popularity (least → most rated)
              </MenuItem>
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
            </Select>
          </FormControl>

          {/* Buttons */}
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
