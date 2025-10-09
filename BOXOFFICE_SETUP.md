# 🎬 Irish Box Office API Setup

This API automatically updates with the top 10 box office movies in Ireland every Monday!

## 🔑 Setup Instructions

### 1. Get TMDB API Key (Free!)

The box office data comes from [The Movie Database (TMDB)](https://www.themoviedb.org/), which is free to use:

1. Go to https://www.themoviedb.org/signup
2. Create a free account
3. Go to https://www.themoviedb.org/settings/api
4. Click "Create" under "Request an API Key"
5. Choose "Developer"
6. Fill in the form (you can use placeholder info for personal/learning projects)
7. Copy your API Key (v3 auth)

### 2. Add API Key to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `TMDB_API_KEY`
5. Value: Paste your TMDB API key
6. Click **Add secret**

### 3. Enable GitHub Actions

The workflow is already set up! It will:
- ✅ Run every Monday at 9:00 AM UTC (10:00 AM Irish time)
- ✅ Fetch the top 10 movies in Ireland
- ✅ Update both static (GitHub Pages) and dynamic (Vercel) versions
- ✅ Commit changes automatically

### 4. Manual Trigger (Optional)

You can also trigger the update manually:

1. Go to **Actions** tab in your repository
2. Click **Update Irish Box Office** workflow
3. Click **Run workflow**
4. Click the green **Run workflow** button

Or run locally:
```bash
export TMDB_API_KEY="your_api_key_here"
npm run update-boxoffice
```

## 📊 API Endpoints

### GitHub Pages (Static - Updated Weekly)

```bash
# Get Irish box office top 10
GET https://danielcregg.github.io/public-hosted-api/api/boxoffice.json
```

### Vercel (Dynamic - Updated Weekly)

```bash
# Get all box office movies
GET https://your-project.vercel.app/api/boxoffice

# Get movie by rank
GET https://your-project.vercel.app/api/boxoffice/1

# Filter by minimum rating
GET https://your-project.vercel.app/api/boxoffice?minRating=8.0

# Filter by genre
GET https://your-project.vercel.app/api/boxoffice?genre=Action

# Filter by year
GET https://your-project.vercel.app/api/boxoffice?year=2024
```

## 📋 Response Format

```json
{
  "lastUpdated": "2024-10-14T09:00:00.000Z",
  "region": "Ireland",
  "source": "The Movie Database (TMDB)",
  "movies": [
    {
      "id": 123456,
      "rank": 1,
      "title": "Movie Title",
      "year": 2024,
      "releaseDate": "2024-09-15",
      "genre": ["Action", "Adventure"],
      "director": "Director Name",
      "rating": 8.5,
      "voteCount": 12345,
      "popularity": 987.65,
      "overview": "Movie description...",
      "posterPath": "https://image.tmdb.org/t/p/w500/poster.jpg",
      "backdropPath": "https://image.tmdb.org/t/p/original/backdrop.jpg",
      "runtime": 142,
      "budget": 200000000,
      "revenue": 500000000
    }
  ]
}
```

## 💡 Usage Examples

### JavaScript

```javascript
// Fetch Irish box office
fetch('https://your-project.vercel.app/api/boxoffice')
  .then(res => res.json())
  .then(data => {
    console.log(`Last updated: ${data.lastUpdated}`);
    console.log(`#1 Movie: ${data.movies[0].title}`);
  });

// Get top movie
fetch('https://your-project.vercel.app/api/boxoffice/1')
  .then(res => res.json())
  .then(data => {
    const topMovie = data.movies[0];
    console.log(`🏆 ${topMovie.title} is #1 in Ireland!`);
  });

// Filter by genre
fetch('https://your-project.vercel.app/api/boxoffice?genre=Action')
  .then(res => res.json())
  .then(data => {
    console.log(`${data.movies.length} action movies in the top 10`);
  });
```

### Python

```python
import requests

# Get box office data
response = requests.get('https://your-project.vercel.app/api/boxoffice')
data = response.json()

print(f"Last updated: {data['lastUpdated']}")
print(f"\nIrish Box Office Top 10:")

for movie in data['movies']:
    print(f"{movie['rank']}. {movie['title']} ({movie['year']}) - {movie['rating']}/10")
```

### HTML Display

```html
<!DOCTYPE html>
<html>
<body>
  <h1>🎬 Irish Box Office Top 10</h1>
  <div id="boxoffice"></div>

  <script>
    fetch('https://your-project.vercel.app/api/boxoffice')
      .then(res => res.json())
      .then(data => {
        const html = data.movies.map(movie => `
          <div style="margin: 20px; padding: 20px; border: 1px solid #ddd;">
            <h2>#${movie.rank} - ${movie.title}</h2>
            <img src="${movie.posterPath}" width="200" />
            <p><strong>Rating:</strong> ⭐ ${movie.rating}/10</p>
            <p><strong>Genre:</strong> ${movie.genre.join(', ')}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p>${movie.overview}</p>
          </div>
        `).join('');
        
        document.getElementById('boxoffice').innerHTML = html;
      });
  </script>
</body>
</html>
```

## 🔄 How It Works

1. **Every Monday at 9:00 AM UTC**, GitHub Actions triggers the workflow
2. The script fetches data from TMDB API for movies popular in Ireland
3. It retrieves the top 10 movies with full details (director, rating, posters, etc.)
4. Updates `api/boxoffice.json` for GitHub Pages (static)
5. Updates `api-server/data/boxoffice.js` for Vercel (dynamic)
6. Commits and pushes the changes automatically
7. Both deployments are updated automatically!

## 🎯 Data Freshness

- **Update Frequency**: Every Monday at 9:00 AM UTC
- **Source**: The Movie Database (TMDB)
- **Region**: Ireland (IE)
- **Automatic**: No manual intervention needed
- **Reliable**: GitHub Actions handles everything

## 🌟 Features

- ✅ Automatic weekly updates
- ✅ Real box office data from TMDB
- ✅ Full movie details (posters, ratings, overview)
- ✅ Works on both GitHub Pages and Vercel
- ✅ Filterable by genre, rating, year
- ✅ Access by rank (get #1 movie directly)
- ✅ Free to use (no API costs)
- ✅ CORS enabled

## 🐛 Troubleshooting

### Workflow not running?

1. Check if GitHub Actions are enabled in your repository settings
2. Verify `TMDB_API_KEY` secret is set correctly
3. Check the Actions tab for any error messages

### Empty movie list?

1. The first run might not have happened yet - trigger manually
2. Check your TMDB API key is valid
3. Look at the workflow logs in the Actions tab

### Want different timing?

Edit `.github/workflows/update-boxoffice.yml` and change the cron schedule:
```yaml
schedule:
  - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
```

Cron format: `minute hour day-of-month month day-of-week`
Examples:
- Every day at midnight: `0 0 * * *`
- Every Friday at 3 PM: `0 15 * * 5`
- Twice a week (Mon & Thu): `0 9 * * 1,4`

## 📚 Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [GitHub Actions Cron Syntax](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

## 🎉 That's It!

Your API now automatically updates with real Irish box office data every week! 🇮🇪
