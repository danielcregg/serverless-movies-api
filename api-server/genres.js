const { genres } = require('./data/genres');

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

  // Parse the URL to get genre ID if present
  const urlParts = req.url.split('/');
  const genreId = urlParts[urlParts.length - 1];
  const isNumericId = !isNaN(genreId) && genreId !== '';

  try {
    switch (req.method) {
      case 'GET':
        // Get single genre by ID
        if (isNumericId) {
          const genre = genres.find(g => g.id === parseInt(genreId));
          if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
          }
          return res.status(200).json(genre);
        }

        // Get all genres
        return res.status(200).json(genres);

      case 'POST':
        // Add new genre
        const newGenre = req.body;
        
        // Validate required fields
        if (!newGenre.name) {
          return res.status(400).json({ 
            error: 'Missing required field: name is required' 
          });
        }

        // Generate new ID
        const maxId = Math.max(...genres.map(g => g.id), 0);
        newGenre.id = maxId + 1;
        newGenre.description = newGenre.description || '';

        genres.push(newGenre);
        return res.status(201).json(newGenre);

      case 'PUT':
        // Update existing genre
        if (!isNumericId) {
          return res.status(400).json({ error: 'Genre ID is required for updates' });
        }

        const genreIndex = genres.findIndex(g => g.id === parseInt(genreId));
        if (genreIndex === -1) {
          return res.status(404).json({ error: 'Genre not found' });
        }

        const updatedGenre = { ...genres[genreIndex], ...req.body, id: parseInt(genreId) };
        genres[genreIndex] = updatedGenre;
        return res.status(200).json(updatedGenre);

      case 'DELETE':
        // Delete genre
        if (!isNumericId) {
          return res.status(400).json({ error: 'Genre ID is required for deletion' });
        }

        const deleteIndex = genres.findIndex(g => g.id === parseInt(genreId));
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'Genre not found' });
        }

        const deletedGenre = genres.splice(deleteIndex, 1)[0];
        return res.status(200).json({ message: 'Genre deleted successfully', genre: deletedGenre });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
