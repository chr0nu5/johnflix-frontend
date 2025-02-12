import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Blank from "./pages/blank.js";
import Login from "./pages/login.js";

import Home from "./pages/home.js";

import Movies from "./pages/movies.js";
import Genres from "./pages/genres.js";
import Tags from "./pages/tags.js";
import Content from "./pages/content.js";

import Player from "./pages/player.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movies" element={<Movies />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/content/:hash" element={<Content />} />

      <Route path="/play/:hash" element={<Player />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
