import { useState } from 'react';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MovieCard from "./Components/MovieCard/MovieCard";
import MovieList from "./Components/MovieList/MovieList";
import './App.css';

const App = () => {

  return (
    <>
    <Header />
      <MovieList />
      <Footer />
    </>
  )
}

export default App
