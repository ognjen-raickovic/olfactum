export const humanizeName = (input) => {
  if (input === null || input === undefined) return "Unknown";
  if (!String(input).trim()) return "";

  let str = String(input).toLowerCase();

  // Replace separators with spaces
  str = str.replace(/[-_]+/g, " ").trim();

  // Edge case replacements
  const edgeCases = {
    "don t": "don't",
    "can t": "can't",
    "i m": "I'm",
    "you re": "you're",
    "we re": "we're",
    "they re": "they're",
    "o clock": "o'clock",
    "rock n": "rock'n",
  };

  for (const [pattern, replacement] of Object.entries(edgeCases)) {
    const regex = new RegExp(`\\b${pattern}\\b`, "gi");
    str = str.replace(regex, replacement);
  }

  // Capitalize each word
  str = str
    .split(" ")
    .map((word) => {
      if (!word) return "";
      if (word.includes("'")) {
        const [before, after] = word.split("'");
        return before.charAt(0).toUpperCase() + before.slice(1) + "'" + after;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return str.trim();
};
