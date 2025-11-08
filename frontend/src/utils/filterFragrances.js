export const normalizeSearch = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/['’`-]/g, "") // remove apostrophes & hyphens
    .replace(/\s+/g, " ") // normalize multiple spaces to one
    .trim();
};

export const filterFragrances = (fragrances, term) => {
  if (!term?.trim()) return fragrances;

  const normalizedTerm = normalizeSearch(term);
  const searchTokens = normalizedTerm.split(" ").filter(Boolean); // split by space
  console.log("🔍 Searching for tokens:", searchTokens);

  return fragrances.filter((f) => {
    const searchableText = normalizeSearch(
      [
        f.name || "",
        f.brand || "",
        f.scentFamily || "",
        ...(f.notes || []),
        ...(f.season || []),
        ...(f.occasion || []),
      ].join(" ")
    );

    // Require all tokens to be found
    const matches = searchTokens.every((token) =>
      searchableText.includes(token)
    );

    return matches;
  });
};
