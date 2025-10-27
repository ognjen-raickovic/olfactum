// Service to handle large JSON data more efficiently
class FragranceDataLoader {
  constructor() {
    this.data = null;
    this.isLoading = false;
    this.loadCallbacks = [];
  }

  async loadData() {
    if (this.data) {
      return this.data;
    }

    if (this.isLoading) {
      return new Promise((resolve) => {
        this.loadCallbacks.push(resolve);
      });
    }

    this.isLoading = true;

    try {
      // Dynamic import for code splitting
      const module = await import("../data/fragranceData.json");
      this.data = module.default;
      this.isLoading = false;

      // Resolve all waiting callbacks
      this.loadCallbacks.forEach((callback) => callback(this.data));
      this.loadCallbacks = [];

      return this.data;
    } catch (error) {
      console.error("Failed to load fragrance data:", error);
      this.isLoading = false;
      throw error;
    }
  }

  // Get a subset of data for initial display
  async getInitialData(limit = 100) {
    const data = await this.loadData();
    return data.slice(0, limit);
  }

  // Search within the data with limits
  async searchData(query, limit = 50) {
    const data = await this.loadData();
    // Implement search logic here
    return this.simpleSearch(data, query, limit);
  }

  simpleSearch(data, query, limit) {
    if (!query) return data.slice(0, limit);

    const normalizedQuery = query.toLowerCase().trim();
    const results = [];

    for (let i = 0; i < data.length && results.length < limit; i++) {
      const item = data[i];
      const searchableText = `${item.name} ${item.brand}`.toLowerCase();

      if (searchableText.includes(normalizedQuery)) {
        results.push(item);
      }
    }

    return results;
  }
}

export default new FragranceDataLoader();
