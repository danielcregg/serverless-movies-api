# Serverless Movies API

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

A free, publicly accessible movies REST API with two deployment options: static JSON via GitHub Pages and a full dynamic CRUD API via Vercel serverless functions.

## Overview

This project provides a lightweight movies API designed for learning, prototyping, and portfolio projects. It ships with curated movie data, genre listings, and an auto-updating Irish box office feed powered by TMDB. The GitHub Pages deployment serves read-only JSON files, while the Vercel deployment exposes full RESTful CRUD endpoints with filtering, searching, and sorting capabilities.

## Features

- **Dual deployment** -- static read-only API on GitHub Pages and dynamic CRUD API on Vercel
- **Full CRUD operations** -- create, read, update, and delete movies and genres (Vercel)
- **Query parameters** -- filter by genre, year, and minimum rating
- **Search** -- full-text search across titles, descriptions, and directors
- **Sorting** -- sort by any field in ascending or descending order
- **Irish Box Office** -- auto-updated weekly with real data from TMDB
- **CORS enabled** -- accessible from any frontend application
- **No authentication required** -- free and open for public use

## Prerequisites

- **Node.js 18+** (for local development and Vercel functions)
- **Git** for cloning the repository
- A **Vercel** account (optional, for dynamic API deployment)
- A **GitHub** account with Pages enabled (optional, for static deployment)

## Getting Started

### Installation

```bash
git clone https://github.com/danielcregg/serverless-movies-api.git
cd serverless-movies-api
```

### Usage

#### GitHub Pages (Static API -- Read Only)

Enable GitHub Pages in your repository settings (source: `main` branch), then access:

```
GET /api/movies.json    # All movies
GET /api/genres.json    # All genres
GET /api/boxoffice.json # Irish box office (updated weekly)
```

#### Vercel (Dynamic API -- Full CRUD)

Deploy to Vercel by importing the repository, then use the full REST API:

```
GET    /api/movies            # List all movies
GET    /api/movies/1          # Get movie by ID
GET    /api/movies?genre=Action&minRating=8.5  # Filter movies
POST   /api/movies            # Add a new movie
PUT    /api/movies/1          # Update a movie
DELETE /api/movies/1          # Delete a movie

GET    /api/genres            # List all genres
GET    /api/boxoffice         # Irish box office top 10
```

**Example -- Fetch all movies:**

```javascript
fetch('https://your-project.vercel.app/api/movies')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Example -- Add a movie:**

```javascript
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
```

For detailed Vercel setup instructions, see [VERCEL_SETUP.md](VERCEL_SETUP.md). For Irish box office configuration, see [BOXOFFICE_SETUP.md](BOXOFFICE_SETUP.md).

## Tech Stack

- **Language:** JavaScript (Node.js)
- **Serverless Platform:** Vercel
- **Static Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions (weekly box office updates)
- **External API:** TMDB (The Movie Database)

## License

This project is licensed under the [MIT License](LICENSE).
