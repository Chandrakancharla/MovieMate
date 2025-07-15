import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

function MovieList({ selectedGenre, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedGenre) {
      setLoading(true);
      setError('');
      setSearched(false);
      axios
        .get(`/api/search?genre=${selectedGenre.id}`)
        .then((response) => {
          setMovies(response.data.results || []);
          setSearched(true);
        })
        .catch((err) => {
          setError('Failed to fetch movies for this category.');
          setMovies([]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      setLoading(true);
      setError('');
      setSearched(true);
      axios
        .get(`/api/search?query=${searchQuery.trim()}`)
        .then((response) => {
          setMovies(response.data.results || []);
        })
        .catch((err) => {
          setError('Failed to fetch movies. Please try again.');
          setMovies([]);
        })
        .finally(() => setLoading(false));
    }
  }, [searchQuery]);

  console.log('MovieList selectedGenre:', selectedGenre);

  // Hardcoded list of good web series (valid TMDB IDs and poster paths)
  const hardcodedSeries = [
    {
      id: 1399,
      name: 'Game of Thrones',
      title: 'Game of Thrones',
      poster_path: '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
      first_air_date: '2011-04-17',
      overview: 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night\'s Watch, is all that stands between the realms of men and icy horrors beyond.',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/1399-game-of-thrones'
    },
    {
      id: 66732,
      name: 'Stranger Things',
      title: 'Stranger Things',
      poster_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
      first_air_date: '2016-07-15',
      overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/66732-stranger-things'
    },
    // New series start here
    {
      id: 1396,
      name: 'Breaking Bad',
      title: 'Breaking Bad',
      poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      first_air_date: '2008-01-20',
      overview: 'Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family\'s financial future at any cost as he enters the dangerous world of drugs and crime.',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/1396-breaking-bad'
    },
    {
      id: 71446,
      name: 'Money Heist',
      title: 'Money Heist',
      poster_path: '/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      first_air_date: '2017-05-02',
      overview: 'To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/71446-la-casa-de-papel'
    },
    {
      id: 44217,
      name: 'Vikings',
      title: 'Vikings',
      poster_path: '/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
      first_air_date: '2013-03-03',
      overview: 'The adventures of Ragnar Lothbrok, the greatest hero of his age. The series tells the saga of Ragnar\'s band of Viking brothers and his family, as he rises to become King of the Viking tribes.'
    },
    {
      id: 63174,
      name: 'Lucifer',
      title: 'Lucifer',
      poster_path: '/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg',
      first_air_date: '2016-01-25',
      overview: 'Lucifer Morningstar, the Devil, resigns from his throne in hell to run a nightclub in Los Angeles and becomes a consultant to the LAPD.'
    },
    {
      id: 119051,
      name: 'Wednesday',
      title: 'Wednesday',
      poster_path: '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
      first_air_date: '2022-11-23',
      overview: 'Wednesday Addams is sent to Nevermore Academy, where she attempts to master her psychic ability, thwart a monstrous killing spree, and solve the supernatural mystery that embroiled her parents.'
    },
    {
      id: 1668,
      name: 'Friends',
      title: 'Friends',
      poster_path: '/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
      first_air_date: '1994-09-22',
      overview: 'Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.'
    },
    {
      id: 93693,
      name: 'Alice in Borderland',
      title: 'Alice in Borderland',
      poster_path: '/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg',
      first_air_date: '2020-12-10',
      overview: 'An aimless gamer and his two friends find themselves in a parallel Tokyo, where they\'re forced to compete in a series of sadistic games to survive.'
    },
    {
      id: 84958,
      name: 'Loki',
      title: 'Loki',
      poster_path: '/voHUmluYmKyleFkTu3lOXQG702u.jpg',
      first_air_date: '2021-06-09',
      overview: 'After stealing the Tesseract during the events of “Avengers: Endgame,” an alternate version of Loki is brought to the mysterious Time Variance Authority.'
    },
    {
      id: 60574,
      name: 'Peaky Blinders',
      title: 'Peaky Blinders',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
      first_air_date: '2013-09-12',
      overview: 'A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby, who means to move up in the world.'
    },
    {
      id: 99966,
      name: 'All of Us Are Dead',
      title: 'All of Us Are Dead',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg',
      first_air_date: '2022-01-28',
      overview: 'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out — or turn into one of the rabid infected.'
    },
    {
      id: 94997,
      name: 'House of the Dragon',
      title: 'House of the Dragon',
      poster_path: '/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      first_air_date: '2022-08-21',
      overview: 'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne.'
    },
    {
      id: 60735,
      name: 'The Flash',
      title: 'The Flash',
      poster_path: '/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg',
      first_air_date: '2014-10-07',
      overview: 'After being struck by lightning, Barry Allen wakes up from his coma to discover he\'s been given the power of super speed, becoming the Flash, fighting crime in Central City.'
    },
    {
      id: 1418,
      name: 'The Big Bang Theory',
      title: 'The Big Bang Theory',
      poster_path: '/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg',
      first_air_date: '2007-09-24',
      overview: 'The sitcom is centered on five characters living in Pasadena, California: roommates Leonard Hofstadter and Sheldon Cooper; Penny, a waitress and aspiring actress who lives across the hall; and Leonard and Sheldon\'s equally geeky and socially awkward friends and co-workers, mechanical engineer Howard Wolowitz and astrophysicist Raj Koothrappali.'
    },
    {
      id: 129552,
      name: 'The Night Agent',
      title: 'The Night Agent',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/4c5yUNcaff4W4aPrkXE6zr7papX.jpg',
      first_air_date: '2023-03-23',
      overview: 'While monitoring an emergency line, an FBI agent answers a call that plunges him into a deadly conspiracy involving a mole at the White House.'
    },
    {
      id: 1402,
      name: 'The Walking Dead',
      title: 'The Walking Dead',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/ng3cMtxYKt1OSQYqFlnKWnVsqNO.jpg',
      first_air_date: '2010-10-31',
      overview: 'Sheriff\'s deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.'
    },
    {
      id: 65494,
      name: 'The Crown',
      title: 'The Crown',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/1DDE0Z2Y805rqfkEjPbZsMLyPwa.jpg',
      first_air_date: '2016-11-04',
      overview: 'The gripping, decades-spanning inside story of Her Majesty Queen Elizabeth II and the Prime Ministers who shaped Britain\'s post-war destiny.'
    },
    {
      id: 18165,
      name: 'The Vampire Diaries',
      title: 'The Vampire Diaries',
      poster_path: '/kLEha9zVVv8acGFKTX4gjvSR2Q0.jpg',
      first_air_date: '2009-09-10',
      overview: 'The story of two vampire brothers obsessed with the same girl, who are battling to control the fate of an entire town.'
    },
    {
      id: 71912,
      name: 'The Witcher',
      title: 'The Witcher',
      poster_path: '/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
      first_air_date: '2019-12-20',
      overview: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.'
    }
  ];

  const hardcodedAnime = [
    {
      id: 37854,
      name: 'One Piece',
      title: 'One Piece',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 12971,
      name: 'Dragon Ball Z',
      title: 'Dragon Ball Z',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/6VKOfL6ihwTiB5Vibq6QTfzhxA6.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 31910,
      name: 'Naruto Shippuden',
      title: 'Naruto Shippuden',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/71mASgFgSiPl9QUexVH8BubU0lD.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 30984,
      name: 'Bleach',
      title: 'Bleach',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 1429,
      name: 'Attack on Titan',
      title: 'Attack on Titan',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 13916,
      name: 'Death Note',
      title: 'Death Note',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg',
      first_air_date: '2006-10-04',
      overview: 'Light Yagami is an ace student with great prospects—and he’s bored out of his mind. But all that changes when he finds the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and Light has vowed to use the power of the Death Note to rid the world of evil. But will Light succeed in his noble goal, or will the Death Note turn him into the very thing he fights against?',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/13916-death-note'
    },
    {
      id: 85937,
      name: 'Demon Slayer: Kimetsu no Yaiba',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/wrCVHdkBlBWdJUZPvnJWcBRuhSY.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 65930,
      name: 'My Hero Academia',
      title: 'My Hero Academia',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/ivOLM47yJt90P19RH1NvJrAJz9F.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 31911,
      name: 'Fullmetal Alchemist: Brotherhood',
      title: 'Fullmetal Alchemist: Brotherhood',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
    },
    {
      id: 46298,
      name: 'Hunter x Hunter',
      title: 'Hunter x Hunter',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/ucpgmUR1h5Te1BYegKItoPjOeF7.jpg',
      first_air_date: '2011-10-02',
      overview: 'To fulfill his dreams of becoming a legendary Hunter like his dad, a young boy must pass a rigorous examination and find his missing father.',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/46298-hunter-x-hunter'
    },
    {
      id: 240411,
      name: 'Dan Da Dan',
      title: 'Dan Da Dan',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/6qfZAOEUFIrbUH3JvePclx1nXzz.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/240411'
    },
    {
      id: 46261,
      name: 'Fairy Tail',
      title: 'Fairy Tail',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/iuRJ2QRRNMIu2VdEIuLIaJvt1PZ.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/46261-fairy-tail'
    },
    {
      id: 73223,
      name: 'Black Clover',
      title: 'Black Clover',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/73223-black-clover'
    },
    {
      id: 45782,
      name: 'Sword Art Online',
      title: 'Sword Art Online',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/9m8bFIXPg26taNrFSXGwEORVACD.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/45782'
    },
    {
      id: 95479,
      name: 'Jujutsu Kaisen',
      title: 'Jujutsu Kaisen',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/uyyMrkDgjnpGFM9dnJEYlUya7O0.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/95479'
    },
    {
      id: 60863,
      name: 'Haikyuu!!',
      title: 'Haikyuu!!',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/8WEr48swcqe89Zsy5sdrGCASlIg.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/60863-haikyuu'
    },
    {
      id: 131041,
      name: 'Blue Lock',
      title: 'Blue Lock',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/sTDTy73OYmKY51EK94Mc6AxogzR.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/131041'
    },
    {
      id: 88803,
      name: 'Vinland Saga',
      title: 'Vinland Saga',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/rNVcMGzDZal17mgdPLIu4dcrdi0.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/88803'
    },
    {
      id: 232230,
      name: 'Lord of Mysteries ',
      title: 'Lord of Mysteries',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/c8fHePq3yTn3WvZd4hupkHwsjm5.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/232230'
    },
    {
      id: 127532,
      name: 'Solo Leveling',
      title: 'Solo Leveling',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/iv4TtuwMzh619b5E3ID4UDX7UG4.jpg',
      first_air_date: '',
      overview: '',
      type: 'tv',
      tmdb_link: 'https://www.themoviedb.org/tv/127532'
    },
  ];

  let displayMovies = movies;
  if (selectedGenre && selectedGenre.id === 'series') {
    displayMovies = hardcodedSeries;
  } else if (selectedGenre && selectedGenre.id === 'anime') {
    displayMovies = hardcodedAnime;
  }

  return (
    <div>
      {selectedGenre && (
        <h2 style={{ color: '#fff', margin: '32px 0 24px 0', textAlign: 'center' }}>
          {selectedGenre.name.toLowerCase().includes('series') ? 'Series' : `${selectedGenre.name} Movies`}
        </h2>
      )}
      {searchQuery && (
        <h2 style={{ color: '#fff', margin: '32px 0 24px 0', textAlign: 'center' }}>Search Results for "{searchQuery}"</h2>
      )}
      {loading && <p style={{ textAlign: 'center', color: '#fff', margin: '32px 0' }}>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {(searched || selectedGenre || searchQuery) ? (
        <div className="movie-list" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
          {selectedGenre && selectedGenre.name && selectedGenre.name.toLowerCase().includes('series')
            ? hardcodedSeries.map((series) => {
                let type = 'tv';
                console.log('Rendering hardcoded series card', series.id, 'type:', type, series);
                return <MovieCard key={series.id} movie={{ ...series, type, title: series.name }} />;
              })
            : displayMovies.map((movie) => {
                let type = movie.type || (selectedGenre && selectedGenre.id === 'anime' ? 'tv' : 'movie');
                let poster_path = movie.poster_path;
                // If poster_path is a full URL, pass it as 'img' prop instead
                if (poster_path && poster_path.startsWith('http')) {
                  return <MovieCard key={movie.id} movie={{ ...movie, type, poster_path: '', img: poster_path, title: movie.name || movie.title }} />;
                }
                return <MovieCard key={movie.id} movie={{ ...movie, type, title: movie.name || movie.title }} />;
              })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#fff', margin: '32px 0' }}>
          <p>Use the search bar in the navbar to find movies or select a category from the dropdown.</p>
        </div>
      )}
    </div>
  );
}

export default MovieList;
