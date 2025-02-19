/**
 * Adds API base URL to image paths from uploads folder
 * @param {string|string[]} path - Single path or array of paths
 * @returns {string|string[]} Path(s) with API base URL
 */
const addApiUrl = (path) => {
  const API_URL = process.env.API_URL || 'http://localhost:5000';

  if (!path) return path;

  // Handle arrays (e.g., quest images)
  if (Array.isArray(path)) {
    return path.map((p) => (p?.startsWith('/uploads') ? `${API_URL}${p}` : p));
  }

  // Handle single path (e.g., avatar)
  return path?.startsWith('/uploads') ? `${API_URL}${path}` : path;
};

module.exports = {
  addApiUrl,
};
