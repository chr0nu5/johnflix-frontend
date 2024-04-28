import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Home from "./pages/home.js";
import Blank from "./pages/blank.js";

import Login from "./pages/login.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
