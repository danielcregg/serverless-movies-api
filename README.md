# 🎬 Movies API

A simple, free, and publicly accessible movies API hosted on GitHub Pages.

## 🚀 Live Demo

Visit the API documentation: `https://[your-username].github.io/public-hosted-api/`

## 📚 API Endpoints

### Get All Movies
```
https://[your-username].github.io/public-hosted-api/api/movies.json
```
Returns a list of 10 popular movies with detailed information.

### Get All Genres
```
https://[your-username].github.io/public-hosted-api/api/genres.json
```
Returns a list of available movie genres.

## 💡 Usage Examples

### JavaScript (Fetch API)
```javascript
fetch('https://[your-username].github.io/public-hosted-api/api/movies.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Python (requests)
```python
import requests

response = requests.get('https://[your-username].github.io/public-hosted-api/api/movies.json')
movies = response.json()
print(movies)
```

### cURL
```bash
curl https://[your-username].github.io/public-hosted-api/api/movies.json
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

5. **Update URLs**: Replace `[your-username]` in the examples with your actual GitHub username

## ✨ Features

- ✅ No authentication required
- ✅ Free to use
- ✅ Fast and reliable (hosted on GitHub Pages)
- ✅ CORS enabled (works from any domain)
- ✅ Clean JSON format
- ✅ Interactive documentation
- ✅ Responsive design

## 📝 Data Structure

The API includes:
- **10 movies** with titles, years, genres, directors, ratings, and descriptions
- **9 genres** with descriptions

## 🤝 Contributing

Feel free to fork this repository and add more movies or features! Some ideas:
- Add more movies to the database
- Create additional endpoints (by year, by genre, etc.)
- Add movie posters (via URLs)
- Include cast information
- Add box office data

## 📄 License

This project is open source and available for anyone to use freely.

## 🌟 Credits

Movie data is for educational purposes only. All movie titles, names, and related content are properties of their respective owners.