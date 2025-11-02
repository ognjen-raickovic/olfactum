// Helper to migrate from old storage format to new format
export const migrateStorage = (key) => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // If it's already the new format (array of objects), return as is
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      typeof parsed[0] === "object" &&
      parsed[0].id
    ) {
      return parsed;
    }

    // If it's the old format (array of IDs), migrate to new format
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      (typeof parsed[0] === "string" || typeof parsed[0] === "number")
    ) {
      const migrated = parsed.map((id) => ({
        id,
        addedAt: Date.now(), // Use current time for migration
        migrated: true, // Flag to identify migrated items
      }));
      localStorage.setItem(key, JSON.stringify(migrated));
      console.log(`Migrated ${key} from old format to new format`);
      return migrated;
    }

    return [];
  } catch (error) {
    console.error(`Error migrating ${key}:`, error);
    return [];
  }
};
