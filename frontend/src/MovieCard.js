import React from 'react';
import { Link } from 'react-router-dom';

function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

function MovieCard({ movie }) {
  console.log('MovieCard props:', movie);
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x300/cccccc/666666?text=No+Image';
  };

  const detailLink = `/movie/${movie.id}${movie.type ? `?type=${movie.type}` : ''}`;
  console.log('MovieCard link:', detailLink, movie);
  return (
    <div className="movie-card">
      <Link to={detailLink}>
        <img
          src={movie.img ? movie.img : `https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          onError={handleImageError}
        />
        <h3>{movie.title}</h3>
        <p>{formatDate(movie.release_date || movie.first_air_date)}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
