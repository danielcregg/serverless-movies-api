# 🎬 Movies API

A simple, free, and publicly accessible movies API with **two deployment options**:
- **GitHub Pages** - Static JSON API (read-only)
- **Vercel** - Full dynamic API with CRUD operations

## 🚀 Live Demos

- **GitHub Pages (Static)**: `https://danielcregg.github.io/public-hosted-api/`
- **Vercel (Dynamic)**: `https://your-project.vercel.app/` (after deployment)

## 📚 API Endpoints

### GitHub Pages (Static API - Read Only)

#### Get All Movies
```
https://danielcregg.github.io/public-hosted-api/api/movies.json
```

#### Get All Genres
```
https://danielcregg.github.io/public-hosted-api/api/genres.json
```

#### Get Irish Box Office (Updated Weekly) 🆕
```
https://danielcregg.github.io/public-hosted-api/api/boxoffice.json
```

### Vercel (Dynamic API - Full CRUD)

#### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/1` - Get movie by ID
- `GET /api/movies?genre=Action` - Filter by genre
- `GET /api/movies?year=1994` - Filter by year
- `GET /api/movies?minRating=9.0` - Filter by rating
- `GET /api/movies?search=batman` - Search movies
- `GET /api/movies?sortBy=rating&order=desc` - Sort movies
- `POST /api/movies` - Add new movie
- `PUT /api/movies/1` - Update movie
- `DELETE /api/movies/1` - Delete movie

#### Genres
- `GET /api/genres` - Get all genres
- `GET /api/genres/1` - Get genre by ID
- `POST /api/genres` - Add new genre
- `PUT /api/genres/1` - Update genre
- `DELETE /api/genres/1` - Delete genre

#### Irish Box Office (Auto-updated every Monday) 🆕
- `GET /api/boxoffice` - Get top 10 box office movies in Ireland
- `GET /api/boxoffice/1` - Get #1 movie by rank
- `GET /api/boxoffice?genre=Action` - Filter by genre
- `GET /api/boxoffice?minRating=8.0` - Filter by rating
- `GET /api/boxoffice?year=2024` - Filter by year

## 💡 Usage Examples

### GitHub Pages (Static - Read Only)

```javascript
// Get all movies
fetch('https://danielcregg.github.io/public-hosted-api/api/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Vercel (Dynamic - Full CRUD)

```javascript
// Get all movies
fetch('https://your-project.vercel.app/api/movies')
  .then(res => res.json())
  .then(data => console.log(data));

// Get filtered movies
fetch('https://your-project.vercel.app/api/movies?genre=Action&minRating=8.5')
  .then(res => res.json())
  .then(data => console.log(data));

// Add a new movie
fetch('https://your-project.vercel.app/api/movies', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Movie',
    year: 2024,
    director: 'Director Name',
    genre: ['Action'],
    rating: 8.5,
    description: 'Movie description'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Update a movie
fetch('https://your-project.vercel.app/api/movies/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ rating: 9.5 })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Delete a movie
fetch('https://your-project.vercel.app/api/movies/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 📖 Response Format

### Movie Object
```json
{
  "id": 1,
  "title": "The Shawshank Redemption",
  "year": 1994,
  "genre": ["Drama"],
  "director": "Frank Darabont",
  "rating": 9.3,
  "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
}
```

### Genre Object
```json
{
  "id": 1,
  "name": "Action",
  "description": "Action films feature high energy, big-budget physical stunts and chases."
}
```

## 🛠️ Setup Instructions

### GitHub Pages (Static API)

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"

3. **Wait a few minutes** for GitHub Pages to deploy

4. **Access your API** at:
   ```
   https://[your-username].github.io/public-hosted-api/
   ```

### Vercel (Dynamic API)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login

2. **Import your repository**:
   - Click "Add New Project"
   - Import your `public-hosted-api` repository
   - Click "Deploy"

3. **Done!** Your dynamic API will be live at `https://your-project.vercel.app`

For detailed Vercel setup and API usage, see [VERCEL_SETUP.md](VERCEL_SETUP.md)

**🆕 For Irish Box Office setup**, see [BOXOFFICE_SETUP.md](BOXOFFICE_SETUP.md)

## ✨ Features

### GitHub Pages Version
- ✅ No authentication required
- ✅ Free to use
- ✅ 100% uptime (static files)
- ✅ CORS enabled
- ✅ Perfect for read-only use cases
- ✅ Interactive documentation page

### Vercel Version
- ✅ Full CRUD operations (POST/PUT/DELETE)
- ✅ Query parameters and filtering
- ✅ Search functionality
- ✅ Sort by any field
- ✅ Get single resources by ID
- ✅ RESTful API design
- ✅ Professional error handling
- ✅ CORS enabled

### 🆕 Irish Box Office (Automatic Weekly Updates)
- ✅ Auto-updates every Monday at 9 AM UTC
- ✅ Real data from The Movie Database (TMDB)
- ✅ Top 10 movies in Ireland
- ✅ Includes posters, ratings, and full details
- ✅ Works on both GitHub Pages and Vercel
- ✅ Filter by genre, rating, or year

## 📝 Data Structure

The API includes:
- **10 classic movies** with titles, years, genres, directors, ratings, and descriptions
- **9 genres** with descriptions
- **🆕 Top 10 Irish box office movies** (auto-updated weekly) with full details, posters, and ratings

## 🔄 Which Version Should I Use?

| Use Case | Recommended |
|----------|-------------|
| Read-only access | GitHub Pages |
| Need to add/update/delete data | Vercel |
| Learning REST APIs | Vercel |
| Portfolio projects | Both |
| Production with persistence | Vercel + Database |
| Maximum reliability | GitHub Pages |

## 🤝 Contributing

Feel free to fork this repository and add more movies or features! Some ideas:
- Add more movies to the database
- Add movie posters (via URLs)
- Include cast information
- Add box office data
- Integrate a real database (MongoDB, PostgreSQL)
- Add authentication
- Add rate limiting

## 📄 License

This project is open source and available for anyone to use freely.

## 🌟 Credits

Movie data is for educational purposes only. All movie titles, names, and related content are properties of their respective owners.