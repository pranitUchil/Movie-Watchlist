// components/MovieCard.js
import React, { use, useEffect, useState } from 'react';
import MovieModal from './MovieModal';
import NotFoundImage from '../assets/img/image-not-found.jpg';

const MovieCard = ({ movie, onAddToWatchlist, isInWatchlist, onRemoveFromWatchlist, showRemove = false }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    if (!isInWatchlist) {
      onAddToWatchlist(movie);
    }
  };

  useEffect(() => {
    // Add overflow hidden/scroll to body when modal opens/closes
    if(showModal)
      document.body.style.overflow = 'hidden';
    else
      document.body.style.overflow = 'scroll';

  }, [showModal]);

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster" onClick={() => setShowModal(true)}>
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : NotFoundImage} 
            alt={movie.Title}
            onError={(e) => {
              e.target.src = NotFoundImage;
            }}
          />
        </div>
        
        <div className="movie-info">
          <h3 className="movie-title">{movie.Title}</h3>
          <p className="movie-year">{movie.Year}</p>
          
          <div className="movie-actions">
            {showRemove ? (
              <button 
                onClick={() => onRemoveFromWatchlist(movie.imdbID)}
                className="remove-btn"
              >
                Remove
              </button>
            ) : (
              <button 
                onClick={handleAddClick}
                disabled={isInWatchlist}
                className={isInWatchlist ? 'added-btn' : 'add-btn'}
              >
                {isInWatchlist ? '✓ Added' : '+ Add to Watchlist'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <MovieModal 
          movie={movie} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default MovieCard;
