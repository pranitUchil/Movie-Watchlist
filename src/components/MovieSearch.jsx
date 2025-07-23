import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieSearch = ({watchlist,setWatchlist}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const { watchlist, dispatch } = useWatchlist();

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchMovies(searchTerm);
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const searchMovies = async (query) => {
    setLoading(true);
    setError('');
    console.log(`Searching for movies: ${query}`, import.meta.env.VITE_OMDB_API_KEY);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = (movie) => {
    // dispatch({ type: 'ADD_MOVIE', payload: movie });
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      // dispatch({ type: 'ADD_MOVIE', payload: movie });
    }

    setWatchlist(watchlist);
  };

  const isInWatchlist = (imdbID) => {
    return watchlist.some(movie => movie.imdbID === imdbID);
  };

  return (
    <div className="movie-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <div className="loading">Searching movies...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddToWatchlist={addToWatchlist}
            isInWatchlist={isInWatchlist(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
