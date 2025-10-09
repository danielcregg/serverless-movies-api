# 🚀 Vercel Deployment Guide

This API now supports **two deployment options**:

1. **GitHub Pages** - Static JSON API (read-only)
2. **Vercel** - Full dynamic API with POST/PUT/DELETE support

## 📦 Vercel Features

The Vercel deployment adds these dynamic capabilities:

### 🎬 Movies API

#### Get All Movies
```bash
GET https://your-project.vercel.app/api/movies
```

#### Get Movie by ID
```bash
GET https://your-project.vercel.app/api/movies/1
```

#### Filter Movies by Genre
```bash
GET https://your-project.vercel.app/api/movies?genre=Action
```

#### Filter Movies by Year
```bash
GET https://your-project.vercel.app/api/movies?year=1994
```

#### Filter Movies by Minimum Rating
```bash
GET https://your-project.vercel.app/api/movies?minRating=9.0
```

#### Search Movies
```bash
GET https://your-project.vercel.app/api/movies?search=redemption
```

#### Sort Movies
```bash
# Sort by rating (descending)
GET https://your-project.vercel.app/api/movies?sortBy=rating&order=desc

# Sort by year (ascending)
GET https://your-project.vercel.app/api/movies?sortBy=year&order=asc
```

#### Add New Movie
```bash
POST https://your-project.vercel.app/api/movies
Content-Type: application/json

{
  "title": "New Movie",
  "year": 2024,
  "genre": ["Action"],
  "director": "Director Name",
  "rating": 8.5,
  "description": "Movie description"
}
```

#### Update Movie
```bash
PUT https://your-project.vercel.app/api/movies/1
Content-Type: application/json

{
  "rating": 9.5,
  "description": "Updated description"
}
```

#### Delete Movie
```bash
DELETE https://your-project.vercel.app/api/movies/1
```

### 🎭 Genres API

Similar endpoints available for genres:
- `GET /api/genres` - Get all genres
- `GET /api/genres/1` - Get genre by ID
- `POST /api/genres` - Add new genre
- `PUT /api/genres/1` - Update genre
- `DELETE /api/genres/1` - Delete genre

## 🛠️ Setup Instructions

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "Add New Project"
4. Import your `public-hosted-api` repository
5. Click "Deploy"
6. Done! Your API will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Test Your API

Once deployed, test it:

```bash
# Get all movies
curl https://your-project.vercel.app/api/movies

# Get movie by ID
curl https://your-project.vercel.app/api/movies/1

# Filter by genre
curl https://your-project.vercel.app/api/movies?genre=Action

# Add a new movie
curl -X POST https://your-project.vercel.app/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Movie",
    "year": 2024,
    "director": "Me",
    "genre": ["Drama"],
    "rating": 8.0
  }'
```

## 💡 Usage Examples

### JavaScript (Fetch API)

```javascript
// Get all movies
fetch('https://your-project.vercel.app/api/movies')
  .then(res => res.json())
  .then(data => console.log(data));

// Get movies by genre
fetch('https://your-project.vercel.app/api/movies?genre=Action')
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
    rating: 8.5
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

### Python (requests)

```python
import requests
import json

# Get all movies
response = requests.get('https://your-project.vercel.app/api/movies')
movies = response.json()

# Filter by genre
response = requests.get('https://your-project.vercel.app/api/movies?genre=Action')
action_movies = response.json()

# Add a new movie
new_movie = {
    'title': 'New Movie',
    'year': 2024,
    'director': 'Director Name',
    'genre': ['Action'],
    'rating': 8.5
}
response = requests.post(
    'https://your-project.vercel.app/api/movies',
    json=new_movie
)
created_movie = response.json()

# Update a movie
response = requests.put(
    'https://your-project.vercel.app/api/movies/1',
    json={'rating': 9.5}
)
updated_movie = response.json()

# Delete a movie
response = requests.delete('https://your-project.vercel.app/api/movies/1')
result = response.json()
```

## ⚠️ Important Notes

### Data Persistence
⚠️ **The data is stored in-memory** and will reset when:
- The serverless function cold-starts
- Vercel redeploys your app
- The function hasn't been called for a while

For persistent data, you would need to add a database (MongoDB, PostgreSQL, etc.).

### GitHub Pages vs Vercel

| Feature | GitHub Pages | Vercel |
|---------|-------------|---------|
| GET requests | ✅ | ✅ |
| POST/PUT/DELETE | ❌ | ✅ |
| Query parameters | ❌ | ✅ |
| Dynamic filtering | ❌ | ✅ |
| Single resource by ID | ❌ | ✅ |
| CORS | ✅ | ✅ |
| Free hosting | ✅ | ✅ |
| Data persistence | ✅ | ❌ (in-memory) |

## 🔄 Adding Database Persistence

To make data persistent, you can integrate a database. Here are some options:

1. **MongoDB Atlas** (Free tier available)
2. **PostgreSQL** (with Vercel Postgres)
3. **Firebase** (Google)
4. **Supabase** (Open source)

Let me know if you'd like help setting up database integration!

## 📚 Query Parameters Reference

### Movies Endpoint

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| genre | string | `?genre=Action` | Filter by genre |
| year | number | `?year=1994` | Filter by year |
| minRating | number | `?minRating=9.0` | Filter by minimum rating |
| search | string | `?search=batman` | Search in title, description, director |
| sortBy | string | `?sortBy=rating` | Sort by field (id, title, year, rating) |
| order | string | `?order=desc` | Sort order (asc or desc) |

You can combine multiple parameters:
```
?genre=Action&minRating=8.5&sortBy=rating&order=desc
```

## 🎉 You're All Set!

Your API now has:
- ✅ Static version on GitHub Pages (read-only, always available)
- ✅ Dynamic version on Vercel (full CRUD operations)
- ✅ Query parameters and filtering
- ✅ RESTful endpoints
- ✅ CORS enabled
- ✅ Professional error handling

Choose the deployment that fits your needs!
