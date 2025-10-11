/**
 * Helper function to convert names like "pride-edition-man" or "bruno-bananini"
 * into "Pride Edition Man" or "Bruno Bananini"
 */
export const humanizeName = (str) => {
  if (!str) return "Unknown";
  return str
    .replace(/[-_]/g, " ") // replace - or _ with space
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letter of each word
};
