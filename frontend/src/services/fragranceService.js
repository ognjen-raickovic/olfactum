import fragranceData from "./fragranceData.json";
import {
  inferOccasion,
  inferSeason,
  inferIntensity,
  inferLongevity,
} from "./fragranceInference";
import { normalizeString, matchesQuery } from "../utils/fragranceUtils";

/**
 * Adds inferred fields (occasion, season, intensity, longevity)
 * to each fragrance if they are missing.
 */
const enrichedData = fragranceData.map((f, idx) => {
  const accords = [
    f.mainaccord1,
    f.mainaccord2,
    f.mainaccord3,
    f.mainaccord4,
    f.mainaccord5,
  ].filter(Boolean);

  return {
    ...f,
    id: f.id || idx + 1,
    accords,
    occasion: f.occasion || [inferOccasion(accords)],
    season: f.season || [inferSeason(accords)],
    intensity: f.intensity || inferIntensity(accords),
    longevity: f.longevity || inferLongevity(accords),
  };
});

/**
 * Returns all fragrances.
 */
export const getAllFragrances = () => enrichedData;

/**
 * Returns a fragrance by its ID.
 */
export const getFragranceById = (id) => enrichedData.find((f) => f.id === id);

/**
 * Returns fragrances filtered by a search term (name, brand, or scent family).
 * Uses advanced normalization & matching.
 */
export const searchFragrances = (query) => {
  if (!query?.trim()) return [];
  const normalizedQuery = normalizeString(query);

  return enrichedData.filter((f) => matchesQuery(f, normalizedQuery));
};

/**
 * Filter by season, occasion, rating, popularity, etc.
 */
export const filterFragrances = (filters = {}) => {
  const { season, occasion, rating, popularity } = filters;
  return enrichedData.filter((f) => {
    let match = true;
    if (season) match = match && f.season?.includes(season);
    if (occasion) match = match && f.occasion?.includes(occasion);
    if (rating)
      match =
        match &&
        (f.ratingValue || 0) >= rating.min &&
        f.ratingValue <= rating.max;
    if (popularity)
      match =
        match &&
        (f.ratingCount || 0) >= popularity.min &&
        f.ratingCount <= popularity.max;
    return match;
  });
};
