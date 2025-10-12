const normalize = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]/g, " ") // replace hyphens/underscores with spaces
    .replace(/\s+/g, " ") // normalize multiple spaces
    .trim();

export const filterFragrances = (fragrances, term) => {
  if (!term?.trim()) return fragrances;
  const lower = normalize(term);

  return fragrances.filter((f) => {
    const name = normalize(f.name || "");
    const brand = normalize(f.brand || "");
    const scentFamily = normalize(f.scentFamily || "");
    const notes = (f.notes || []).map(normalize);
    const season = (f.season || []).map(normalize);
    const occasion = (f.occasion || []).map(normalize);

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
