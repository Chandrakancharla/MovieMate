import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import './App.css';

const GENRES = [
  { name: 'Action', id: 28 },
  { name: 'Comedy', id: 35 },
  { name: 'Drama', id: 18 },
  { name: 'Thriller', id: 53 },
  { name: 'Horror', id: 27 },
  { name: 'Sci-Fi', id: 878 },
  { name: 'Romance', id: 10749 },
  { name: 'Fantasy', id: 14 },
  { name: 'Adventure', id: 12 },
  { name: 'Animation', id: 16 },
];

function Navbar({ onSelectGenre, onSearch }) {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.navbar-categories-wrapper') && !event.target.closest('.navbar-search-wrapper')) {
      setDropdown(false);
    }
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleGenreSelect = (genre) => {
    setDropdown(false);
    onSelectGenre(genre);
    setMobileMenuOpen(false);
  };

  const handleSeriesClick = () => {
    navigate('/series');
    setMobileMenuOpen(false);
  };

  const handleAnimeClick = () => {
    navigate('/anime');
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setDropdown(false);
      setMobileSearchOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Responsive rendering
  // const isMobile = window.innerWidth <= 700; // This line is now redundant as isMobile is a state variable

  return (
    <nav className="navbar">
      <div className="navbar-mobile-wrapper">
        <span
          className="navbar-title"
          style={{ cursor: 'pointer', fontFamily: 'Pacifico, Caveat, cursive, Montserrat, Arial, sans-serif' }}
          onClick={() => navigate('/')}
        >
          MovieMate
        </span>
        {isMobile && (
          <>
            <button
              className="navbar-icon-btn navbar-search-icon"
              aria-label="Open search"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <span style={{ fontSize: '1.6rem', color: '#fff' }}>&#128269;</span>
            </button>
            <div style={{ flex: 1 }} />
            <button
              className="navbar-icon-btn navbar-hamburger"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ marginLeft: 'auto' }}
            >
              <span style={{ fontSize: '2rem', color: '#fff' }}>&#9776;</span>
            </button>
          </>
        )}
      </div>
      {/* Desktop nav */}
      {!isMobile && (
        <div className="navbar-right">
          <Link to="/" className="navbar-btn">Home</Link>
          <div className="navbar-categories-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
            <button className="navbar-btn navbar-categories-btn" onClick={toggleDropdown}>
              Categories
            </button>
            {dropdown && (
              <div className="navbar-dropdown">
                {GENRES.map((genre) => (
                  <button
                    key={genre.id}
                    className="navbar-dropdown-item"
                    onClick={() => handleGenreSelect(genre)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="navbar-btn" onClick={handleSeriesClick}>Series</button>
          <button className="navbar-btn" onClick={handleAnimeClick}>Anime</button>
          <form className="navbar-search-wrapper" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search movies..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <button type="submit" className="navbar-search-btn">Search</button>
          </form>
        </div>
      )}
      {/* Mobile hamburger menu */}
      {isMobile && mobileMenuOpen && (
        <div className="mobile-side-menu">
          <button className="mobile-menu-item" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>Home</button>
          <button className="mobile-menu-item" onClick={() => setDropdown(!dropdown)}>Categories</button>
          {dropdown && (
            <div className="mobile-dropdown">
              {GENRES.map((genre) => (
                <button
                  key={genre.id}
                  className="mobile-dropdown-item"
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
          <button className="mobile-menu-item" onClick={handleSeriesClick}>Series</button>
          <button className="mobile-menu-item" onClick={handleAnimeClick}>Anime</button>
        </div>
      )}
      {/* Mobile search bar */}
      {isMobile && mobileSearchOpen && (
        <form className="mobile-search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search movies..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            autoFocus
          />
          <button type="submit" className="navbar-search-btn">Search</button>
        </form>
      )}
    </nav>
  );
}

function FeaturedMoviesRow() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const movies = [
    {
      title: "Avengers: Infinity War",
      img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      id: 299536,
    },
    {
      title: "Mission: Impossible - Fallout",
      img: "https://image.tmdb.org/t/p/w500/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
      id: 353081,
    },
    {
      title: "John Wick: Chapter 3 - Parabellum",
      img: "https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",
      id: 458156,
    },
    {
      title: "Fight Club",
      img: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
      id: 550,
    },
    {
      title: "Men in Black",
      img: "https://image.tmdb.org/t/p/w500/uLOmOF5IzWoyrgIF5MfUnh5pa1X.jpg",
      id: 607, // correct TMDB ID for Men in Black
    },
    {
      title: "Interstellar",
      img: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      id: 157336, // TMDB ID for Interstellar
    },
    {
      title: "Inception",
      img: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
      id: 27205, // TMDB ID for Inception
    },
    {
      title: "Spider-Man: Far From Home",
      img: "https://image.tmdb.org/t/p/w500/rjbNpRMoVvqHmhmksbokcyCr7wn.jpg",
      id: 429617, // TMDB ID for Spider-Man: Far From Home
    },
    {
      title: "The Incredibles",
      img: "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
      id: 9806, // TMDB ID for The Incredibles
    },
    {
      title: "One Piece Film: Red",
      img: "https://image.tmdb.org/t/p/w500/ogDXuVkO92GcETZfSofXXemw7gb.jpg",
      id: 900667, // correct TMDB ID for One Piece Film: Red
    },
  ];

  // Update arrow visibility
  const updateArrows = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1); // -1 for rounding
    }
  };

  React.useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateArrows);
      window.addEventListener('resize', updateArrows);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', updateArrows);
        window.removeEventListener('resize', updateArrows);
      }
    };
  }, []);

  // Restore scroll position on mount
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('featuredMoviesScroll');
    let attempts = 0;
    const refAtMount = scrollRef.current; // Capture the ref at effect mount

    function restoreScroll() {
      if (refAtMount && refAtMount.querySelector('.movie-poster-card')) {
        if (savedScroll) {
          refAtMount.scrollLeft = parseInt(savedScroll, 10);
        }
      } else if (attempts < 10) {
        attempts++;
        requestAnimationFrame(restoreScroll);
      }
    }
    restoreScroll();
    return () => {
      if (refAtMount) {
        sessionStorage.setItem('featuredMoviesScroll', refAtMount.scrollLeft);
      }
    };
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Dynamically calculate the width of the first card (including margin)
      const firstCard = current.querySelector('.movie-poster-card');
      let scrollAmount = 350;
      if (firstCard) {
        const style = window.getComputedStyle(firstCard);
        const marginRight = parseInt(style.marginRight) || 0;
        scrollAmount = firstCard.offsetWidth + marginRight;
      }
      if (direction === 'left') {
        if (current.scrollLeft <= scrollAmount) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="scroll-row-wrapper">
      {showLeft && (
        <button className="scroll-arrow left" onClick={() => scroll('left')} aria-label="Scroll left">
          &#60;
        </button>
      )}
      <section className="featured-movies-row scrollable" ref={scrollRef}>
        {movies.map((movie, idx) => (
          <Link to={`/movie/${movie.id}`} key={idx} style={{ textDecoration: 'none' }}>
            <div className="movie-poster-card">
              <img src={movie.img} alt={movie.title} />
            </div>
          </Link>
        ))}
      </section>
      {showRight && (
        <button className="scroll-arrow right" onClick={() => scroll('right')} aria-label="Scroll right">
          &#62;
        </button>
      )}
    </div>
  );
}

function ActionMoviesRow() {
  const navigate = useNavigate();
  // Example action movies (TMDB IDs and posters)
  const actionMovies = [
    {
      title: "Mad Max: Fury Road",
      img: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
      id: 76341,
    },
    {
      title: "The Dark Knight",
      img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      id: 155,
    },
    {
      title: "Gladiator",
      img: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      id: 98,
    },
    {
      title: "The Raid",
      img: "https://www.themoviedb.org/t/p/w1280/Abnm1Ws3JH0ReCfEhLMPwPcMcGO.jpg",
      id: 94329,
    },
  ];
  const handleSeeMore = () => {
    navigate('/browse', { state: { genre: { name: 'Action', id: 28 } } });
  };
  return (
    <div className="action-movies-row-wrapper" style={{ marginTop: '40px', marginLeft: '70px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Action</h2>
        <button onClick={handleSeeMore} style={{ padding: '8px 24px', borderRadius: '20px', background: '#00eaff', color: '#181818', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', marginRight: '80px' }}>See More</button>
      </div>
      <div className="action-movies-row" style={{ display: 'flex', gap: '32px' }}>
        {actionMovies.map((movie, idx) => (
          <Link to={`/movie/${movie.id}`} key={idx} style={{ textDecoration: 'none' }}>
            <div className="movie-poster-card">
              <img src={movie.img} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AdventureMoviesRow() {
  const navigate = useNavigate();
  // Adventure movies (TMDB IDs and posters)
  const adventureMovies = [
    {
      title: "Red Notice",
      img: "https://www.themoviedb.org/t/p/w1280/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
      id: 512195,
    },
    {
      title: "Jumanji: Welcome to the Jungle",
      img: "https://www.themoviedb.org/t/p/w1280/pSgXKPU5h6U89ipF7HBYajvYt7j.jpg",
      id: 353486,
    },
    {
      title: "The Maze Runner",
      img: "https://www.themoviedb.org/t/p/w1280/ode14q7WtDugFDp78fo9lCsmay9.jpg",
      id: 198663,
    },
    {
      title: "Journey to the Center of the Earth",
      img: "https://www.themoviedb.org/t/p/w1280/kL55wY0s2H9JdwfjoWIp9plvYnl.jpg",
      id: 88751,
    },
  ];
  const handleSeeMore = () => {
    navigate('/browse', { state: { genre: { name: 'Adventure', id: 12 } } });
  };
  return (
    <div className="adventure-movies-row-wrapper" style={{ marginTop: '40px', marginLeft: '70px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Adventure</h2>
        <button onClick={handleSeeMore} style={{ padding: '8px 24px', borderRadius: '20px', background: '#00eaff', color: '#181818', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', marginRight: '80px' }}>See More</button>
      </div>
      <div className="adventure-movies-row" style={{ display: 'flex', gap: '32px' }}>
        {adventureMovies.map((movie, idx) => (
          <Link to={`/movie/${movie.id}`} key={idx} style={{ textDecoration: 'none' }}>
            <div className="movie-poster-card">
              <img src={movie.img} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SciFiMoviesRow() {
  const navigate = useNavigate();
  // Sci-Fi movies (TMDB IDs and posters)
  const sciFiMovies = [
    {
      title: "Predestination",
      img: "https://www.themoviedb.org/t/p/w1280/38Xr1JnV1ZcLQ55zmdSp6n475cZ.jpg",
      id: 206487,
    },
    {
      title: "Dune",
      img: "https://www.themoviedb.org/t/p/w1280/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      id: 438631,
    },
    {
      title: "The Matrix",
      img: "https://www.themoviedb.org/t/p/w1280/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
      id: 603,
    },
    {
      title: "Edge of Tomorrow",
      img: "https://www.themoviedb.org/t/p/w1280/nBM9MMa2WCwvMG4IJ3eiGUdbPe6.jpg",
      id: 137113,
    },
  ];
  const handleSeeMore = () => {
    navigate('/browse', { state: { genre: { name: 'Sci-Fi', id: 878 } } });
  };
  return (
    <div className="scifi-movies-row-wrapper" style={{ marginTop: '40px', marginLeft: '70px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Sci-Fi</h2>
        <button onClick={handleSeeMore} style={{ padding: '8px 24px', borderRadius: '20px', background: '#00eaff', color: '#181818', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', marginRight: '80px' }}>See More</button>
      </div>
      <div className="scifi-movies-row" style={{ display: 'flex', gap: '32px' }}>
        {sciFiMovies.map((movie, idx) => (
          <Link to={`/movie/${movie.id}`} key={idx} style={{ textDecoration: 'none' }}>
            <div className="movie-poster-card">
              <img src={movie.img} alt={movie.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SeriesMoviesRow() {
  const navigate = useNavigate();
  // Series (TV Shows) with TMDB IDs and posters
  const seriesList = [
    {
      title: "Game of Thrones",
      img: "https://www.themoviedb.org/t/p/w1280/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      id: 1399,
    },
    {
      title: "Breaking Bad",
      img: "https://www.themoviedb.org/t/p/w1280/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      id: 1396,
    },
    {
      title: "Money Heist",
      img: "https://www.themoviedb.org/t/p/w1280/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      id: 71446,
    },
    {
      title: "Stranger Things",
      img: "https://www.themoviedb.org/t/p/w1280/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      id: 66732,
    },
  ];
  const handleSeeMore = () => {
    navigate('/series');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="series-movies-row-wrapper" style={{ marginTop: '40px', marginLeft: '70px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Series</h2>
        <button onClick={handleSeeMore} style={{ padding: '8px 24px', borderRadius: '20px', background: '#00eaff', color: '#181818', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', marginRight: '80px' }}>See More</button>
      </div>
      <div className="series-movies-row" style={{ display: 'flex', gap: '32px' }}>
        {seriesList.map((series, idx) => (
          <Link to={`/movie/${series.id}?type=tv`} key={idx} style={{ textDecoration: 'none' }}>
            <div className="movie-poster-card">
              <img src={series.img} alt={series.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AnimeMoviesRow() {
  const navigate = useNavigate();
  // Anime (TV Shows) with TMDB IDs and posters
  const animeList = [
    {
      title: "One Piece",
      img: "https://www.themoviedb.org/t/p/w1280/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
      id: 37854,
    },
    {
      title: "Dragon Ball Z",
      img: "https://www.themoviedb.org/t/p/w1280/6VKOfL6ihwTiB5Vibq6QTfzhxA6.jpg",
      id: 12971,
    },
    {
      title: "Naruto Shippuden",
      img: "https://www.themoviedb.org/t/p/w1280/71mASgFgSiPl9QUexVH8BubU0lD.jpg",
      id: 31910,
    },
    {
      title: "Bleach",
      img: "https://www.themoviedb.org/t/p/w1280/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg",
      id: 30984,
    },
  ];
  const handleSeeMore = () => {
    navigate('/anime');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="anime-movies-row-wrapper" style={{ marginTop: '40px', marginLeft: '70px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Anime</h2>
        <button onClick={handleSeeMore} style={{ padding: '8px 24px', borderRadius: '20px', background: '#00eaff', color: '#181818', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', marginRight: '80px' }}>See More</button>
      </div>
      <div className="anime-movies-row" style={{ display: 'flex', gap: '32px' }}>
        {animeList.map((anime, idx) => (
          <Link to={`/movie/${anime.id}?type=tv`} key={idx} style={{ textDecoration: 'none' }}>
            <div className="movie-poster-card">
              <img src={anime.img} alt={anime.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SeriesPage() {
  // Use the MovieList component to fetch and display series
  // We'll use a custom genre object for 'Series' with id 'series'
  return (
    <div style={{ padding: '20px 0', minHeight: '100vh', background: '#181818' }}>
      <MovieList selectedGenre={{ name: 'Series', id: 'series' }} />
    </div>
  );
}

function Home() {
  return (
    <>
      <FeaturedMoviesRow />
      <ActionMoviesRow />
      <AdventureMoviesRow />
      <SciFiMoviesRow />
      <SeriesMoviesRow />
      <AnimeMoviesRow />
      <div style={{ textAlign: 'center', color: '#fff', margin: '48px 0 32px 0', fontStyle: 'italic', fontSize: '1.3rem' }}>
        <span
          style={{
            background: 'linear-gradient(90deg, #00bcd4 0%, #e0f7fa 50%, #00bcd4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            textShadow: '0 0 4px #00bcd488, 0 0 8px #e0f7fa55',
            fontWeight: 700,
            fontStyle: 'italic',
            padding: '0 8px',
            display: 'inline-block',
            letterSpacing: '0.5px',
            fontSize: '1.4rem'
          }}
        >
          “I've always loved movies. I wanted to tell stories, take people on an adventure.”
        </span>
        <br />
        <span style={{ display: 'block', marginTop: '8px', fontSize: '1rem', fontStyle: 'normal', color: '#00bcd4', textShadow: '0 0 4px #00bcd488' }}>— Tom Cruise</span>
      </div>
      <BottomInfoBar />
    </>
  );
}

function Browse({ selectedGenre, searchQuery }) {
  return <MovieList selectedGenre={selectedGenre} searchQuery={searchQuery} />;
}

function AppContent() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    navigate('/browse');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    navigate('/browse');
  };

  // Accept genre from navigation state on every location change
  React.useEffect(() => {
    if (
      location.pathname === '/browse' &&
      location.state &&
      location.state.genre
    ) {
      setSelectedGenre(location.state.genre);
      setSearchQuery("");
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar onSelectGenre={handleSelectGenre} onSearch={handleSearch} />
      <div className="main-content">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse selectedGenre={selectedGenre} searchQuery={searchQuery} />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/anime" element={<AnimePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

// Add the AnimePage component before it is used in the routes
function AnimePage() {
  return (
    <div style={{ padding: '20px 0', minHeight: '100vh', background: '#181818' }}>
      <MovieList selectedGenre={{ name: 'Anime', id: 'anime' }} />
    </div>
  );
}

function BottomInfoBar() {
  return (
    <div className="bottom-info-bar">
      <span
        className="bottom-info-text"
        style={{
          background: 'linear-gradient(90deg, #00bcd4 0%, #e0f7fa 50%, #00bcd4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          textShadow: '0 0 4px #00bcd488, 0 0 8px #e0f7fa55',
          fontWeight: 600,
          fontSize: '1.15rem',
          letterSpacing: '0.5px',
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        Recommended for you! Try searching for your favorite movie above.
      </span>
    </div>
  );
}
