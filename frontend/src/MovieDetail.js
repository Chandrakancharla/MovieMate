import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

function getTypeFromQuery(search) {
  const params = new URLSearchParams(search);
  return params.get('type') || 'movie';
}

function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const type = getTypeFromQuery(location.search);
  console.log('MovieDetail type from query:', type);
  const API_BASE = process.env.REACT_APP_API_BASE || '/api';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError('');
        const endpoint = type === 'tv' ? 'tv' : 'movie';
        console.log('Fetching details for', id, 'type:', type, 'endpoint:', endpoint);
        const response = await axios.get(`${API_BASE}/${endpoint}/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, type, API_BASE]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#181818',
      color: '#fff',
      padding: '0',
      margin: '0'
    }}>
      {/* Left Side - Movie Info */}
      <div style={{
        flex: '1',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            background: 'linear-gradient(135deg, #00eaff 60%, #00fff0 100%)',
            color: '#181818',
            border: 'none',
            width: '1cm',
            height: '1cm',
            borderRadius: '50%',
            fontSize: '1.3rem',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 2px 10px 0 #00eaff66, 0 0 0 2px #00eaff22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, box-shadow 0.2s',
            outline: 'none',
            zIndex: 2,
            padding: 0,
            minWidth: '1cm',
            minHeight: '1cm',
            maxWidth: '1cm',
            maxHeight: '1cm',
            aspectRatio: '1/1'
          }}
          onMouseOver={e => {
            e.target.style.background = 'linear-gradient(135deg, #00fff0 60%, #00eaff 100%)';
            e.target.style.boxShadow = '0 4px 16px 0 #00fff066, 0 0 0 3px #00eaff44';
          }}
          onMouseOut={e => {
            e.target.style.background = 'linear-gradient(135deg, #00eaff 60%, #00fff0 100%)';
            e.target.style.boxShadow = '0 2px 10px 0 #00eaff66, 0 0 0 2px #00eaff22';
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#181818', fontSize: '1.3rem', fontWeight: 900, lineHeight: 1, textAlign: 'center' }}>
            {'<'}
          </span>
        </button>

        {/* Centered Title */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          margin: '0 0 30px 0',
          color: '#fff',
          textAlign: 'center'
        }}>
          {movie.title || movie.name}
        </h1>

        {/* Movie Details */}
        <div style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.7',
          textAlign: 'left',
          maxWidth: '600px',
          width: '100%',
          marginTop: '10px',
        }}>
          <div style={{ margin: '0 0 18px 0' }}>
            <span style={{ color: '#00eaff', fontWeight: 700, fontSize: '1.18rem' }}>Overview:</span>
            <div style={{ color: '#fff', fontWeight: 400, marginTop: 4 }}>{movie.overview}</div>
          </div>
          <div style={{ margin: '0 0 8px 0' }}>
            <span style={{ color: '#00eaff', fontWeight: 700 }}>Rating:</span>
            <span style={{ color: '#fff', fontWeight: 400, marginLeft: 8 }}>{movie.vote_average}/10</span>
          </div>
          <div style={{ margin: '0 0 8px 0' }}>
            <span style={{ color: '#00eaff', fontWeight: 700 }}>Release Date:</span>
            <span style={{ color: '#fff', fontWeight: 400, marginLeft: 8 }}>{formatDate(movie.release_date || movie.first_air_date)}</span>
          </div>
          {type === 'movie' && (
            <div style={{ margin: '0 0 8px 0' }}>
              <span style={{ color: '#00eaff', fontWeight: 700 }}>Runtime:</span>
              <span style={{ color: '#fff', fontWeight: 400, marginLeft: 8 }}>{movie.runtime} minutes</span>
            </div>
          )}
          {type === 'tv' && (
            <div style={{ margin: '0 0 8px 0' }}>
              <span style={{ color: '#00eaff', fontWeight: 700 }}>Seasons:</span>
              <span style={{ color: '#fff', fontWeight: 400, marginLeft: 8 }}>{movie.number_of_seasons}</span>
            </div>
          )}
          <div style={{ margin: '0 0 8px 0' }}>
            <span style={{ color: '#00eaff', fontWeight: 700 }}>Genre:</span>
            <span style={{ color: '#fff', fontWeight: 400, marginLeft: 8 }}>{movie.genres?.map(genre => genre.name).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Right Side - Movie Image */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Image';
          }}
        />
      </div>
    </div>
  );
}

export default MovieDetail;
