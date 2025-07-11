require('dotenv').config();
console.log('Loaded API Key:', process.env.TMDB_API_KEY);

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
    const { query } = req.query;
    const apiKey = process.env.TMDB_API_KEY;
    console.log('API Key:', apiKey); // Debug: print API key
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: apiKey,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false
      }
    });
    console.log('TMDb API response:', response.data); // Debug: print TMDb response
    res.json(response.data);
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

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-US'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 