// components/Watchlist.js
import React from 'react';
import MovieCard from './MovieCard';

const Watchlist = ({watchlist,setWatchlist}) => {

  const removeFromWatchlist = (imdbID) => {
    let list = watchlist.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(list));
    setWatchlist(list);
  };

  if (watchlist.length === 0) {
    return (
      <div className="watchlist">
        <h2>My Watchlist</h2>
        <div className="empty-watchlist">
          <p>Your watchlist is empty. Start by searching and adding some movies!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist">
      <h2>My Watchlist ({watchlist.length} movies)</h2>
      <div className="movies-grid">
        {watchlist.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onRemoveFromWatchlist={removeFromWatchlist}
            showRemove={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
