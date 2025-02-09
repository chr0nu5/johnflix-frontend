import { Routes, Route } from "react-router-dom";
import React from "react";

import "./styles/main.css";

import Blank from "./pages/blank.js";
import Login from "./pages/login.js";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Blank />} />
    </Routes>
  );
}

export default App;
