import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Home from "./pages/home.js";
import Blank from "./pages/blank.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
