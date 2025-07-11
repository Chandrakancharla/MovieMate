import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import './App.css';
import { setTheme, keepTheme } from './themes';

function App() {
  const [theme, setThemeState] = useState('theme-light');

  useEffect(() => {
    keepTheme();
    setThemeState(localStorage.getItem('theme') || 'theme-light');
  }, []);

  const handleToggle = () => {
    if (theme === 'theme-dark') {
      setTheme('theme-light');
      setThemeState('theme-light');
    } else {
      setTheme('theme-dark');
      setThemeState('theme-dark');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MovieMate</h1>
          <div className="container--toggle">
            <input
              type="checkbox"
              id="toggle"
              className="toggle--checkbox"
              onChange={handleToggle}
              checked={theme === 'theme-light' ? false : true}
            />
            <label htmlFor="toggle" className="toggle--label">
              <span className="toggle--label-bg">
                <span className="toggle--light">
                  <span className="toggle--icon toggle--icon-sun" role="img" aria-label="Light">☀️</span>
                </span>
                <span className="toggle--dark">
                  <span className="toggle--icon toggle--icon-moon" role="img" aria-label="Dark">🌙</span>
                </span>
              </span>
              <span className="toggle--label-knob"></span>
            </label>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MovieList darkMode={theme === 'theme-dark'} />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
