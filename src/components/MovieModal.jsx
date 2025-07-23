import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.imdbID]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        {loading ? (
          <div className="loading">Loading movie details...</div>
        ) : movieDetails ? (
          <div className="movie-details">
            <div className="details-poster">
              <img src={movieDetails.Poster} alt={movieDetails.Title} />
            </div>
            <div className="details-info">
              <h2>{movieDetails.Title} ({movieDetails.Year})</h2>
              <p><strong>Genre:</strong> {movieDetails.Genre}</p>
              <p><strong>Director:</strong> {movieDetails.Director}</p>
              <p><strong>Cast:</strong> {movieDetails.Actors}</p>
              <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
              <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}/10</p>
              <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            </div>
          </div>
        ) : (
          <div className="error">Failed to load movie details</div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
