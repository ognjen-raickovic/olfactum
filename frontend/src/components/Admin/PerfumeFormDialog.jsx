import { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  GlobalStyles,
  Paper,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import api from "../../services/api";

// Abbreviate perfume type names for display
const typeAbbreviations = {
  "Eau de Parfum": "EDP",
  "Eau de Toilette": "EDT",
  "Eau de Cologne": "EDC",
  Parfum: "Parfum",
  "Extrait / Elixir / Pure Parfum": "Extrait",
};
const getTypeLabel = (name) => typeAbbreviations[name] || name;

const emptyForm = {
  name: "",
  brand_id: null,
  family_id: null,
  type_id: null,
  release_year: "",
  description: "",
  image: "",
  notes: { top: [], middle: [], base: [] },
  accords: [],
  seasons: [],
  occasions: [],
  perfumers: [],
  tags: [],
  retailers: [],
};

// Wider dropdown panel so long option names aren't clipped
const WidePaper = (props) => (
  <Paper
    {...props}
    sx={{
      minWidth: { xs: 260, sm: 320 },
      maxWidth: "90vw",
      ...(props.sx || {}),
    }}
  />
);

const PerfumeFormDialog = ({
  open,
  onClose,
  references,
  perfume,
  onSuccess,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Resolve IDs to full objects when editing
  useEffect(() => {
    if (!references) return;
    if (perfume) {
      const findById = (list, id) =>
        list?.find((item) => item.id === id) || null;
      setForm({
        name: perfume.name || "",
        brand_id: findById(references.brands, perfume.brand_id),
        family_id: findById(references.families, perfume.family_id),
        type_id: findById(references.types, perfume.type_id),
        release_year: perfume.release_year || "",
        description: perfume.description || "",
        image: perfume.image || "",
        notes: perfume.notes || { top: [], middle: [], base: [] },
        accords: perfume.accords || [],
        seasons: perfume.seasons || [],
        occasions: perfume.occasions || [],
        perfumers: perfume.perfumers || [],
        tags: perfume.tags || [],
        retailers: perfume.retailers || [],
      });
    } else {
      setForm(emptyForm);
      setImageFile(null);
      setError("");
    }
  }, [perfume, references]);

  // Helpers
  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });
  const handleNotesChange = (layer) => (event, newValue) => {
    setForm({ ...form, notes: { ...form.notes, [layer]: newValue } });
  };
  const handleArrayChange = (field) => (event, newValue) => {
    setForm({ ...form, [field]: newValue });
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await api.post("/admin/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setForm({ ...form, image: res.data.imageUrl });
    setImageFile(null);
  };

  // Retailers
  const addRetailer = () => {
    setForm({
      ...form,
      retailers: [...form.retailers, { id: null, name: "", url: "" }],
    });
  };
  const updateRetailer = (index, field) => (e) => {
    const updated = [...form.retailers];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setForm({ ...form, retailers: updated });
  };
  const selectRetailer = (index) => (event, newValue) => {
    const updated = [...form.retailers];
    if (newValue) {
      updated[index] = {
        id: newValue.id,
        name: newValue.name,
        url: updated[index]?.url || "",
      };
    } else {
      updated[index] = { id: null, name: "", url: "" };
    }
    setForm({ ...form, retailers: updated });
  };
  const removeRetailer = (index) => {
    setForm({
      ...form,
      retailers: form.retailers.filter((_, i) => i !== index),
    });
  };
  const removeLastRetailer = () => {
    if (!form.retailers.length) return;
    setForm({ ...form, retailers: form.retailers.slice(0, -1) });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        release_year: form.release_year
          ? parseInt(form.release_year, 10)
          : null,
        brand_id: form.brand_id?.id,
        family_id: form.family_id?.id,
        type_id: form.type_id?.id,
        description: form.description,
        image: form.image,
        notes: {
          top: form.notes.top.map((n) => n.id),
          middle: form.notes.middle.map((n) => n.id),
          base: form.notes.base.map((n) => n.id),
        },
        accords: form.accords.map((a) => a.id),
        seasons: form.seasons.map((s) => s.id),
        occasions: form.occasions.map((o) => o.id),
        perfumers: form.perfumers.map((p) => p.id),
        tags: form.tags.map((t) => t.id),
        retailers: form.retailers
          .filter((r) => r.id)
          .map((r) => ({ retailer_id: r.id, url: r.url })),
        price: 0,
      };

      if (perfume) {
        await api.put(`/admin/perfumes/${perfume.perfume_id}`, payload);
      } else {
        await api.post("/admin/perfumes", payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving perfume");
    } finally {
      setLoading(false);
    }
  };

  if (!references) return <CircularProgress />;

  const scrollbarStyles = {
    "*::-webkit-scrollbar": {
      width: 8,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.05)"
          : "rgba(0,0,0,0.05)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 4,
    },
  };

  // Remove duplicate perfermers (fixes React key warning)
  const uniquePerfumers = (references?.perfumers || []).filter(
    (item, index, self) =>
      self.findIndex((t) => t.name === item.name) === index,
  );

  // Tag options
  const categoryTagOptions =
    references.tags?.filter((t) => t.type === "category") || [];
  const priceTagOptions =
    references.tags?.filter((t) => t.type === "price") || [];

  const getTagType = (tag) =>
    references.tags?.find((r) => r.id === tag.id)?.type || tag.type || "";

  const selectedCategoryTag =
    form.tags.find((t) => getTagType(t) === "category") || null;
  const selectedPriceTag =
    form.tags.find((t) => getTagType(t) === "price") || null;

  const setSingleTag = (type, selectedTag) => {
    const remaining = form.tags.filter((t) => getTagType(t) !== type);
    setForm({
      ...form,
      tags: selectedTag ? [...remaining, selectedTag] : remaining,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="xl"
      fullWidth
    >
      <GlobalStyles styles={scrollbarStyles} />
      <DialogTitle>{perfume ? "Edit Perfume" : "Add New Perfume"}</DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Row 1: Name + Brand (Brand now with extra width) */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Autocomplete
              options={references.brands || []}
              getOptionLabel={(opt) =>
                typeof opt === "string" ? opt : opt.name
              }
              value={form.brand_id}
              onChange={(e, val) => setForm({ ...form, brand_id: val })}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  fullWidth
                  sx={{ minWidth: 280 }} // ← increased for long brand names
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Row 2: Scent Family (1/3), Type (1/3), Release Year (1/3) */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              options={references.families || []}
              getOptionLabel={(opt) =>
                typeof opt === "string" ? opt : opt.name
              }
              value={form.family_id}
              onChange={(e, val) => setForm({ ...form, family_id: val })}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Scent Family"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              options={references.types || []}
              getOptionLabel={(opt) =>
                getTypeLabel(typeof opt === "string" ? opt : opt.name)
              }
              value={form.type_id}
              onChange={(e, val) => setForm({ ...form, type_id: val })}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Release Year"
              type="number"
              value={form.release_year}
              onChange={handleChange("release_year")}
            />
          </Grid>
        </Grid>

        {/* Row 3: Description */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={form.description}
          onChange={handleChange("description")}
          sx={{ mb: 3 }}
        />

        {/* Row 4: Image (URL now wider) */}
        <Typography variant="h6" gutterBottom>
          Image
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            {" "}
            {/* ← doubled from 6 to 8 */}
            <TextField
              fullWidth
              label="Image URL"
              value={form.image}
              onChange={handleChange("image")}
              placeholder="https://..."
              helperText="Paste a direct image link, or upload a file below"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <Button
                variant="outlined"
                disabled={!imageFile}
                onClick={handleImageUpload}
                sx={{ ml: { xs: 0, sm: "auto" } }}
              >
                Upload
              </Button>
              {form.image && (
                <Box
                  component="img"
                  src={form.image}
                  sx={{
                    maxHeight: 80,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 5: Notes */}
        <Typography variant="h6" gutterBottom>
          Notes
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {["top", "middle", "base"].map((layer) => (
            <Grid item xs={12} md={4} key={layer}>
              <Autocomplete
                multiple
                options={references.notes || []}
                getOptionLabel={(opt) =>
                  typeof opt === "string" ? opt : opt.name
                }
                value={form.notes[layer] || []}
                onChange={handleNotesChange(layer)}
                filterSelectedOptions
                PaperComponent={WidePaper}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`${layer.charAt(0).toUpperCase() + layer.slice(1)} Notes`}
                    fullWidth
                    sx={{ minWidth: 200 }}
                  />
                )}
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 6: Classification (Perfumers now uses deduplicated list) */}
        <Typography variant="h6" gutterBottom>
          Classification
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              options={references.accords || []}
              getOptionLabel={(o) => o.name}
              value={form.accords}
              onChange={handleArrayChange("accords")}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Accords"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              options={references.seasons || []}
              getOptionLabel={(o) => o.name}
              value={form.seasons}
              onChange={handleArrayChange("seasons")}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seasons"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              options={references.occasions || []}
              getOptionLabel={(o) => o.name}
              value={form.occasions}
              onChange={handleArrayChange("occasions")}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Occasions"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              options={uniquePerfumers} // ← no more duplicate keys
              getOptionLabel={(o) => o.name}
              value={form.perfumers}
              onChange={handleArrayChange("perfumers")}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Perfumers"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Row 7: Tags */}
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={categoryTagOptions}
              getOptionLabel={(o) => o.name}
              value={selectedCategoryTag}
              onChange={(e, newValue) => setSingleTag("category", newValue)}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category Tag"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={priceTagOptions}
              getOptionLabel={(o) => o.name}
              value={selectedPriceTag}
              onChange={(e, newValue) => setSingleTag("price", newValue)}
              PaperComponent={WidePaper}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Price Tag"
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Where to Buy */}
        <Typography variant="h6" gutterBottom>
          Where to Buy
        </Typography>
        <Box sx={{ mb: 3 }}>
          {form.retailers.map((ret, idx) => (
            <Grid
              container
              spacing={2}
              key={idx}
              sx={{ mb: 2 }}
              alignItems="center"
            >
              <Grid item xs={12} sm={5} md={5}>
                <Autocomplete
                  options={references.retailers || []}
                  getOptionLabel={(opt) =>
                    typeof opt === "string" ? opt : opt.name
                  }
                  value={
                    ret.id
                      ? references.retailers?.find((r) => r.id === ret.id)
                      : null
                  }
                  onChange={selectRetailer(idx)}
                  PaperComponent={WidePaper}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Retailer"
                      fullWidth
                      sx={{ minWidth: 200 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5}>
                <TextField
                  fullWidth
                  label="Product URL"
                  value={ret.url}
                  onChange={updateRetailer(idx, "url")}
                  placeholder="https://..."
                />
              </Grid>
              {!isMobile && (
                <Grid
                  item
                  sm={2}
                  md={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton color="error" onClick={() => removeRetailer(idx)}>
                    <Delete />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}

          {/* Mobile: delete button + add retailer in one row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            {isMobile && (
              <IconButton
                color="error"
                onClick={removeLastRetailer}
                disabled={!form.retailers.length}
              >
                <Delete />
              </IconButton>
            )}
            <Button
              startIcon={<Add />}
              onClick={addRetailer}
              sx={{ ml: isMobile ? "auto" : 0 }}
            >
              Add Retailer
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PerfumeFormDialog;
