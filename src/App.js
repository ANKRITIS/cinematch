import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const baseUrl = genre
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        const res = await fetch(baseUrl);
        const data = await res.json();
        console.log("API response:", data);
        if (data.results && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          console.warn("No movie results returned:", data);
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [API_KEY, genre]);

  return (
    <div className="App">
      <h1>CineMatch 🎬</h1>
      <p>Popular Movies:</p>

      <div className="mood-picker">
        <button onClick={() => setGenre("18")}>😢 Sad</button>
        <button onClick={() => setGenre("53")}>😎 Bored</button>
        <button onClick={() => setGenre("10749")}>❤️ Date Night</button>
        <button onClick={() => setGenre("878")}>🤯 Overthinking</button>
        <button onClick={() => setGenre("35")}>🤡 Silly</button>
      </div>



      {/* Genre Dropdown */}
      <select onChange={(e) =>  setGenre(e.target.value)}>
        <option value="">-- Select Genre --</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="10749">Romance</option>
        <option value="27">Horror</option>
        <option value="16">Animation</option>
        <option value="878">Sci-Fi</option>
      </select>

      {/* Movie Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: '10px', width: '200px' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <h4>{movie.title}</h4>
            <p>⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
