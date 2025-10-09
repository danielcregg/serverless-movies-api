const { movies } = require('./data/movies');

// Helper function to set CORS headers
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
};

module.exports = async (req, res) => {
  setCorsHeaders(res);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse the URL to get movie ID if present
  const urlParts = req.url.split('/');
  const movieId = urlParts[urlParts.length - 1];
  const isNumericId = !isNaN(movieId) && movieId !== '';

  // Parse query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const genre = url.searchParams.get('genre');
  const year = url.searchParams.get('year');
  const minRating = url.searchParams.get('minRating');
  const search = url.searchParams.get('search');
  const sortBy = url.searchParams.get('sortBy') || 'id';
  const order = url.searchParams.get('order') || 'asc';

  try {
    switch (req.method) {
      case 'GET':
        // Get single movie by ID
        if (isNumericId) {
          const movie = movies.find(m => m.id === parseInt(movieId));
          if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
          }
          return res.status(200).json(movie);
        }

        // Get all movies with optional filtering
        let filteredMovies = [...movies];

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

        // Filter by minimum rating
        if (minRating) {
          filteredMovies = filteredMovies.filter(m => m.rating >= parseFloat(minRating));
        }

        // Search in title or description
        if (search) {
          const searchLower = search.toLowerCase();
          filteredMovies = filteredMovies.filter(m => 
            m.title.toLowerCase().includes(searchLower) || 
            m.description.toLowerCase().includes(searchLower) ||
            m.director.toLowerCase().includes(searchLower)
          );
        }

        // Sort movies
        filteredMovies.sort((a, b) => {
          let aVal = a[sortBy];
          let bVal = b[sortBy];
          
          if (sortBy === 'title' || sortBy === 'director') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
          }
          
          if (order === 'desc') {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
          }
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });

        return res.status(200).json(filteredMovies);

      case 'POST':
        // Add new movie
        const newMovie = req.body;
        
        // Validate required fields
        if (!newMovie.title || !newMovie.year || !newMovie.director) {
          return res.status(400).json({ 
            error: 'Missing required fields: title, year, and director are required' 
          });
        }

        // Generate new ID
        const maxId = Math.max(...movies.map(m => m.id), 0);
        newMovie.id = maxId + 1;
        
        // Set defaults
        newMovie.genre = newMovie.genre || [];
        newMovie.rating = newMovie.rating || 0;
        newMovie.description = newMovie.description || '';

        movies.push(newMovie);
        return res.status(201).json(newMovie);

      case 'PUT':
        // Update existing movie
        if (!isNumericId) {
          return res.status(400).json({ error: 'Movie ID is required for updates' });
        }

        const movieIndex = movies.findIndex(m => m.id === parseInt(movieId));
        if (movieIndex === -1) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        const updatedMovie = { ...movies[movieIndex], ...req.body, id: parseInt(movieId) };
        movies[movieIndex] = updatedMovie;
        return res.status(200).json(updatedMovie);

      case 'DELETE':
        // Delete movie
        if (!isNumericId) {
          return res.status(400).json({ error: 'Movie ID is required for deletion' });
        }

        const deleteIndex = movies.findIndex(m => m.id === parseInt(movieId));
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        const deletedMovie = movies.splice(deleteIndex, 1)[0];
        return res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
