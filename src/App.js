import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Blank from "./pages/blank.js";
import Login from "./pages/login.js";

import Home from "./pages/home.js";
import Player from "./pages/player.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/play/:hash" element={<Player />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
