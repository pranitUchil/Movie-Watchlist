import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import Watchlist from './components/Watchlist';
import './App.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  // Load watchlist from localStorage on app start
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  return (
      <Router>
        <div className="container">
          <nav className="navbar">
            <h1>🎬 Movie Watchlist</h1>
            <div className="nav-links">
              <Link to="/">Search Movies</Link>
              <Link to="/watchlist">My Watchlist ({watchlist.length})</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<MovieSearch watchlist={watchlist} setWatchlist={setWatchlist}/>} />
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist}/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
