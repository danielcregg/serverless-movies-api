const { boxOfficeData } = require('./data/boxoffice');

// Helper function to set CORS headers
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
};

module.exports = async (req, res) => {
  setCorsHeaders(res);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse the URL to get rank if present
  const urlParts = req.url.split('/');
  const rank = urlParts[urlParts.length - 1];
  const isNumericRank = !isNaN(rank) && rank !== '';

  // Parse query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const minRating = url.searchParams.get('minRating');
  const genre = url.searchParams.get('genre');
  const year = url.searchParams.get('year');

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed. This endpoint is read-only.' });
    }

    // Get single movie by rank
    if (isNumericRank) {
      const movie = boxOfficeData.movies.find(m => m.rank === parseInt(rank));
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found at that rank' });
      }
      return res.status(200).json({
        ...boxOfficeData,
        movies: [movie]
      });
    }

    // Get all movies with optional filtering
    let filteredMovies = [...boxOfficeData.movies];

    // Filter by minimum rating
    if (minRating) {
      filteredMovies = filteredMovies.filter(m => m.rating >= parseFloat(minRating));
    }

    // Filter by genre
    if (genre) {
      filteredMovies = filteredMovies.filter(m => 
        m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }

    // Filter by year
    if (year) {
      filteredMovies = filteredMovies.filter(m => m.year === parseInt(year));
    }

    return res.status(200).json({
      ...boxOfficeData,
      movies: filteredMovies
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
