import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./styles/main.css";

import Blank from "./pages/blank.js";
import Login from "./pages/login.js";

import Home from "./pages/home.js";

import Movies from "./pages/movies.js";
import Genres from "./pages/genres.js";
import Tags from "./pages/tags.js";
import Content from "./pages/content.js";

import Watchlist from "./pages/watchlist.js";

import Player from "./pages/player.js";

const useKeyboardListener = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (input === "hidden") {
          localStorage.setItem("hidden", "true");
          window.location.reload();
        } else if (input === "normal") {
          localStorage.setItem("hidden", "false");
          window.location.reload();
        }
        setInput("");
      } else {
        setInput((prev) => prev + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);
};

function App() {
  const location = useLocation();

  useKeyboardListener();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="page" timeout={500}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />

          <Route path="/movies" element={<Movies />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/content/:hash" element={<Content />} />

          <Route path="/play/:hash/:type" element={<Player />} />

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Blank />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
