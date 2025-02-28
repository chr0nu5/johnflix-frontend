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
import Seasons from "./pages/seasons.js";
import Genre from "./pages/genre.js";
import Tag from "./pages/tag.js";
import Galleries from "./pages/galleries.js";
import Gallery from "./pages/photos.js";
import Search from "./pages/search.js";

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
  const { pathname } = useLocation();

  useKeyboardListener();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="page" timeout={500}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/genres" element={<Genres />} />
          <Route path="/genre/:hash" element={<Genre />} />

          <Route path="/tags" element={<Tags />} />
          <Route path="/tag/:hash" element={<Tag />} />

          <Route path="/content/:hash" element={<Content />} />
          <Route path="/seasons/:hash" element={<Seasons />} />

          <Route path="/play/:hash/:type" element={<Player />} />

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/galleries" element={<Galleries />} />
          <Route path="/gallery/:hash" element={<Gallery />} />

          <Route path="/search" element={<Search />} />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Blank />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
