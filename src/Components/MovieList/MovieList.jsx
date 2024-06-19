import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css'
import React, { useState, useEffect } from "react";
import Modal from '../Modal/Modal';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [genres, setGenres] = useState([]);
  const [sortType, setSortType] = useState("popularity.desc");
  const getGenreNames = (genreIds) => {
    return genreIds.map(id => genres.find(genre => genre.id === id).name).join(', ');
  };

  useEffect(() => {
    async function fetchMovie() {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortType}&page=${pageNumber}&adult=false`;
    let searchUrl = `https://api.themoviedb.org/3/search=${searchTerm}/movie?api_key=${apiKey}`;

      const response = await fetch(
        url
      );

      const data = await response.json();
      
      if (pageNumber === 1) {
        setMovies(data.results);
      }

      else {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
      
      console.log("fetch movies", data.results)
    }

    fetchMovie();
  }, [pageNumber, sortType]);

  useEffect(() => {
    const fetchGenres = async () => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setGenres(data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    fetchGenres();
  }, []);


  async function search() {
    const apiKey = import.meta.env.VITE_API_KEY;
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=1&query=${searchTerm}`;

        const response = await fetch(
            searchUrl
        );

        const data = await response.json();
        setMovies(data.results);
        console.log("search clicked", data.results)
  }

  async function load(){
    setPageNumber(pageNumber => pageNumber + 1);
  }

  const sortMovies = (movies, type) => {
    switch (type) {
      case "alphabetic":
        return [...movies].sort((a, b) =>
          a.original_title.localeCompare(b.original_title)
        );
      case "release_date":
        return [...movies].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "rating":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      default:
        return movies;
    }
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    console.log("in sort")
  };


  return (
    <>

<div class="wrapper-box">
    <div class="container-box">
        <div class="centered-container">
            <label for="movie-select">Choose a criteria:</label>
            <select id="movie-select" value={sortType} onChange={handleSortChange} class="moviesDropdown">
                <option value="popularity.desc">Default</option>
                <option value="original_title.desc">Alphabetic</option>
                <option value="release_date.desc">Release Date</option>
                <option value="vote_average.desc">Rating</option>
            </select>
        </div>
    </div>

    <div class="search-container">
        <input
            type="text"
            placeholder="Search Movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="search-input"
        />
        <button onClick={() => search()}>Search</button>
    </div>
</div>

    <div className="movie-list">
        {movies?.map((movie) => (
            <div className="movie-item" key={movie.id}>
                <MovieCard
                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    name={movie.original_title}
                    rating={movie.vote_average}
                    onClick={() => setSelectedMovie(movie)}
                />
            </div>    
        ))}
    </div>

    <div class="load-button">
            <button onClick={load}>Load More</button>
    </div>

      {selectedMovie && (
        <Modal
          show={selectedMovie !== null}
          onClose={() => setSelectedMovie(null)}
        >
          <h2>{selectedMovie.original_title}</h2>
          <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
          />
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>Overview: {selectedMovie.overview}</p>
          <h5>Genres: {getGenreNames(selectedMovie.genre_ids)}</h5>

        </Modal>
      )}


    </>

    
  );
}

export default MovieList;