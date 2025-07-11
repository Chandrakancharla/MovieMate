import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-detail">
      <button className="back-home-btn" onClick={() => navigate('/')}>← Back to Home</button>
      <h2>{movie.title}</h2>
      <div className="movie-info">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details">
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Genre:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
