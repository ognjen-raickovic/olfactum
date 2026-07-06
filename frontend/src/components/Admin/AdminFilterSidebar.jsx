import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const AdminFilterSidebar = ({
  filters,
  onFilterChange,
  references,
  isMobile,
  onClose,
}) => {
  const theme = useTheme();

  const handleClearFilters = () => {
    onFilterChange({
      tags: [],
      brands: [],
      families: [],
      types: [],
      sortBy: "name",
    });
  };

  const toggleArrayFilter = (category, value) => {
    const current = filters[category] || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: newValues });
  };

  // Group tags by type for filter sections
  const categoryTags =
    references?.tags?.filter((t) => t.type === "category") || [];
  const priceTags = references?.tags?.filter((t) => t.type === "price") || [];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6">Filters</Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        {/* Sort */}
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={filters.sortBy || "name"}
            label="Sort by"
            onChange={(e) =>
              onFilterChange({ ...filters, sortBy: e.target.value })
            }
            MenuProps={{ disableScrollLock: true, sx: { zIndex: 9999 } }}
          >
            <MenuItem value="name">Name (A → Z)</MenuItem>
            <MenuItem value="newest">Newest first</MenuItem>
            <MenuItem value="oldest">Oldest first</MenuItem>
          </Select>
        </FormControl>

        {/* Category Tags */}
        <Accordion
          defaultExpanded
          sx={{
            mb: 1,
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Category Tags
            </Typography>
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

        {/* Price Tags */}
        <Accordion
          defaultExpanded
          sx={{
            mb: 1,
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Price Tags
            </Typography>
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

        {/* Brands */}
        <Accordion
          defaultExpanded
          sx={{
            mb: 1,
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Brand
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(references?.brands || []).slice(0, 10).map((brand) => (
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
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Families */}
        <Accordion
          defaultExpanded
          sx={{
            mb: 1,
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Scent Family
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(references?.families || []).slice(0, 10).map((family) => (
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
        <Accordion
          defaultExpanded
          sx={{
            mb: 1,
            boxShadow: "none",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {(references?.types || []).map((type) => (
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
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
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
          onClick={handleClearFilters}
          disabled={
            (filters.tags || []).length === 0 &&
            (filters.brands || []).length === 0 &&
            (filters.families || []).length === 0 &&
            (filters.types || []).length === 0 &&
            filters.sortBy === "name"
          }
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default AdminFilterSidebar;
