export const filterFragrances = (fragrances, term) => {
  if (!term || !term.trim()) return fragrances; // empty -> all results (good for /fragrances)
  const lower = term.toLowerCase();

  return fragrances.filter((f) => {
    const name = (f.name || "").toLowerCase();
    const brand = (f.brand || "").toLowerCase();
    const scentFamily = (f.scentFamily || "").toLowerCase();
    const notes = (f.notes || []).map((n) => n.toLowerCase());
    const season = (f.season || []).map((s) => s.toLowerCase());
    const occasion = (f.occasion || []).map((o) => o.toLowerCase());

    return (
      name.includes(lower) ||
      brand.includes(lower) ||
      scentFamily.includes(lower) ||
      notes.some((n) => n.includes(lower)) ||
      season.some((s) => s.includes(lower)) ||
      occasion.some((o) => o.includes(lower))
    );
  });
};
