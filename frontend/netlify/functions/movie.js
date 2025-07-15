const axios = require('axios');

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Extract id from path (e.g., /api/movie/123)
    let id = null;
    if (event.path) {
      const match = event.path.match(/movie\/(\d+)/);
      if (match) id = match[1];
    }
    // Fallback to query param
    if (!id) {
      id = (event.queryStringParameters && event.queryStringParameters.id) || null;
    }
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Movie/TV ID parameter is required' })
      };
    }

    // Get type from query param (default to 'movie')
    const type = (event.queryStringParameters && event.queryStringParameters.type) || 'movie';
    if (type !== 'movie' && type !== 'tv') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid type parameter. Must be "movie" or "tv".' })
      };
    }

    // Get API key from environment variable
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'TMDB API key not configured' })
      };
    }

    // Make request to TMDb API
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        append_to_response: 'credits,videos,images'
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch movie/tv details',
        details: error.message 
      })
    };
  }
}; 