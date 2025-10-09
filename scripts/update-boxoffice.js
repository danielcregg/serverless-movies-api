const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Fetches Irish box office data from The Movie Database (TMDB) API
 * Note: You'll need to set TMDB_API_KEY as a GitHub secret
 * Get your free API key at: https://www.themoviedb.org/settings/api
 */

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const REGION = 'IE'; // Ireland

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getIrishBoxOffice() {
  try {
    if (!TMDB_API_KEY) {
      throw new Error('TMDB_API_KEY environment variable is not set');
    }

    console.log('Fetching Irish box office data...');
    
    // Get popular movies in Ireland
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&region=${REGION}&language=en-US&page=1`;
    const data = await fetchData(url);
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No movies found');
    }

    // Get top 10 and fetch additional details for each
    const top10 = data.results.slice(0, 10);
    
    const boxOfficeMovies = await Promise.all(
      top10.map(async (movie, index) => {
        // Fetch movie details for more information
        const detailUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`;
        const details = await fetchData(detailUrl);
        
        // Fetch credits for director info
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`;
        const credits = await fetchData(creditsUrl);
        const director = credits.crew.find(person => person.job === 'Director');
        
        return {
          id: movie.id,
          rank: index + 1,
          title: movie.title,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
          releaseDate: movie.release_date,
          genre: details.genres.map(g => g.name),
          director: director ? director.name : 'Unknown',
          rating: Math.round(movie.vote_average * 10) / 10,
          voteCount: movie.vote_count,
          popularity: Math.round(movie.popularity * 10) / 10,
          overview: movie.overview,
          posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
          runtime: details.runtime,
          budget: details.budget,
          revenue: details.revenue
        };
      })
    );

    return {
      lastUpdated: new Date().toISOString(),
      region: 'Ireland',
      source: 'The Movie Database (TMDB)',
      movies: boxOfficeMovies
    };

  } catch (error) {
    console.error('Error fetching box office data:', error.message);
    throw error;
  }
}

async function updateBoxOfficeData() {
  try {
    const boxOfficeData = await getIrishBoxOffice();
    
    // Save to api folder (for GitHub Pages)
    const apiDir = path.join(__dirname, '..', 'api');
    if (!fs.existsSync(apiDir)) {
      fs.mkdirSync(apiDir, { recursive: true });
    }
    
    const apiFilePath = path.join(apiDir, 'boxoffice.json');
    fs.writeFileSync(apiFilePath, JSON.stringify(boxOfficeData, null, 2));
    console.log('✅ Updated api/boxoffice.json for GitHub Pages');
    
    // Save to api-server/data folder (for Vercel)
    const serverDataDir = path.join(__dirname, '..', 'api-server', 'data');
    if (!fs.existsSync(serverDataDir)) {
      fs.mkdirSync(serverDataDir, { recursive: true });
    }
    
    const serverFilePath = path.join(serverDataDir, 'boxoffice.js');
    const serverContent = `// Auto-generated box office data
// Last updated: ${boxOfficeData.lastUpdated}

let boxOfficeData = ${JSON.stringify(boxOfficeData, null, 2)};

module.exports = { boxOfficeData };
`;
    fs.writeFileSync(serverFilePath, serverContent);
    console.log('✅ Updated api-server/data/boxoffice.js for Vercel');
    
    console.log(`\n🎬 Successfully updated Irish Box Office Top 10!`);
    console.log(`Last updated: ${boxOfficeData.lastUpdated}`);
    console.log(`\nTop 3 movies:`);
    boxOfficeData.movies.slice(0, 3).forEach(movie => {
      console.log(`${movie.rank}. ${movie.title} (${movie.year}) - Rating: ${movie.rating}`);
    });
    
    return boxOfficeData;
    
  } catch (error) {
    console.error('❌ Failed to update box office data:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  updateBoxOfficeData();
}

module.exports = { updateBoxOfficeData, getIrishBoxOffice };
