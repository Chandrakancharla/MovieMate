require('dotenv').config();

// Check if API key is configured
if (!process.env.TMDB_API_KEY) {
  console.error('ERROR: TMDB_API_KEY environment variable is not set!');
  console.error('Please create a .env file with your TMDb API key.');
  process.exit(1);
}

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/search', async (req, res) => {
  try {
    const { query, genre } = req.query;
    console.log('GENRE PARAM:', genre); // Debug log
    const apiKey = process.env.TMDB_API_KEY;
    
    if (query) {
      // Search by query
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: query,
          language: 'en-US',
          page: 1,
          include_adult: false
        }
      });
      res.json(response.data);
    } else if (genre) {
      if (genre === 'series') {
        // Fetch top-rated TV series from TMDB
        const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: 1
          }
        });
        // Return the first 20 series
        res.json({ results: response.data.results.slice(0, 20) });
      } else {
        // Search by genre (movies)
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: apiKey,
            with_genres: genre,
            language: 'en-US',
            page: 1,
            include_adult: false,
            sort_by: 'popularity.desc'
          }
        });
        res.json(response.data);
      }
    } else {
      return res.status(400).json({ error: 'Query or genre parameter is required' });
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('TMDb API error response:', error.response.data);
      res.status(500).json({ error: 'Failed to fetch movies', tmdb: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('TMDb API no response:', error.request);
      res.status(500).json({ error: 'No response from TMDb API' });
    } else {
      // Something happened in setting up the request
      console.error('Error setting up TMDb API request:', error.message);
      res.status(500).json({ error: 'Error setting up TMDb API request', details: error.message });
    }
  }
});

app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = process.env.TMDB_API_KEY;

    // Validate movie ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid movie ID is required' });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-US'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch movie details' });
    }
  }
});

app.get('/api/tv/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiKey = process.env.TMDB_API_KEY;

    // Validate TV series ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Valid TV series ID is required' });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-US'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching TV series details:', error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'TV series not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch TV series details' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 