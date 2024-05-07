import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Home from "./pages/home.js";
import Blank from "./pages/blank.js";

import Login from "./pages/login.js";
import Hidden from "./pages/hidden.js";
import Movies from "./pages/movies.js";
import Watchlist from "./pages/watchlist.js";
import Content from "./pages/content.js";
import MoviesGenres from "./pages/movies_genres.js";
import MoviesTags from "./pages/movies_tags.js";
import HiddenGenres from "./pages/hidden_genres.js";
import HiddenTags from "./pages/hidden_tags.js";
import Genre from "./pages/genre.js";
import Tag from "./pages/tag.js";
import Media from "./pages/media.js";
import Season from "./pages/season.js";
import Photos from "./pages/photos.js";
import Photo from "./pages/photo.js";
import Search from "./pages/search.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/genres" element={<MoviesGenres />} />
      <Route path="/movies/tags" element={<MoviesTags />} />
      <Route path="/content/:hash" element={<Content />} />
      <Route path="/media/:hash" element={<Media />} />
      <Route path="/season/:hash" element={<Season />} />

      <Route path="/hidden" element={<Hidden />} />
      <Route path="/hidden/genres" element={<HiddenGenres />} />
      <Route path="/hidden/tags" element={<HiddenTags />} />

      <Route path="/genre/:hash" element={<Genre />} />
      <Route path="/tag/:hash" element={<Tag />} />

      <Route path="/watchlist" element={<Watchlist />} />

      <Route path="/photos" element={<Photos />} />
      <Route path="/photo/:hash" element={<Photo />} />

      <Route path="/search" element={<Search />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
