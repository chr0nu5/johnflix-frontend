import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Home from "./pages/home.js";
import Blank from "./pages/blank.js";

import Login from "./pages/login.js";
import Hidden from "./pages/hidden.js";
import Movies from "./pages/movies.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />

      <Route path="/hidden" element={<Hidden />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
