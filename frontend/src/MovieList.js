import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const recommendedMovies = [
  { id: 1, title: 'Inception', release_date: '2010-07-16', poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: 2, title: 'Interstellar', release_date: '2014-11-07', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: 3, title: 'The Dark Knight', release_date: '2008-07-18', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: 4, title: 'Avengers: Endgame', release_date: '2019-04-24', poster_path: '/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg' },
  { id: 5, title: 'Parasite', release_date: '2019-05-30', poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
  { id: 6, title: 'La La Land', release_date: '2016-12-09', poster_path: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg' },
  { id: 7, title: 'Joker', release_date: '2019-10-04', poster_path: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
  { id: 8, title: '1917', release_date: '2019-12-25', poster_path: '/iZf0KyrE25z1sage4SYFLCCrMi9.jpg' },
  { id: 9, title: 'Ford v Ferrari', release_date: '2019-11-13', poster_path: '/6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg' },
  { id: 10, title: 'Knives Out', release_date: '2019-11-27', poster_path: '/pThyQovXQrw2m0s9x82twj48Jq4.jpg' },
  { id: 11, title: 'Frozen II', release_date: '2019-11-20', poster_path: '/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg' },
  { id: 12, title: 'Toy Story 4', release_date: '2019-06-19', poster_path: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg' },
  { id: 13, title: 'Spider-Man: Far from Home', release_date: '2019-06-28', poster_path: '/rjbNpRMoVvqHmhmksbokcyCr7wn.jpg' },
  { id: 14, title: 'Once Upon a Time in Hollywood', release_date: '2019-07-25', poster_path: '/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg' },
  { id: 15, title: 'The Irishman', release_date: '2019-11-01', poster_path: '/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg' },
  { id: 16, title: 'Marriage Story', release_date: '2019-11-06', poster_path: '/pZekG6xabTmZxjmYw10wN84Hp8d.jpg' },
  { id: 17, title: 'Jojo Rabbit', release_date: '2019-10-18', poster_path: '/7GsM4mtM0worCtIVeiQt28HieeN.jpg' },
  { id: 18, title: 'Star Wars: The Rise of Skywalker', release_date: '2019-12-18', poster_path: '/db32LaOibwEliAmSL2jjDF6oDdj.jpg' },
  { id: 19, title: 'Doctor Sleep', release_date: '2019-10-30', poster_path: '/p69QzIBbN06aTYqRRiCOY1emNBh.jpg' },
  { id: 20, title: 'The Lion King', release_date: '2019-07-12', poster_path: '/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg' },
];

function MovieList({ darkMode }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setSearched(true);
      const response = await axios.get(`/.netlify/functions/search?query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {searched ? (
        <div className="movie-list" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      ) : (
        <>
          <div className="home-bg-area">
            <div className="movie-list" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
              {recommendedMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            <p className="info-text">
              Recommended for you! Try searching for your favorite movie above.
            </p>
          </div>
          <div className="quote-block">
            “I’ve always loved movies. I wanted to tell stories, take people on an adventure.”<br />
            <span>— Tom Cruise</span>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieList;
