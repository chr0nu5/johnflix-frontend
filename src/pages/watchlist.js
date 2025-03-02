import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";

import Display from "../components/display/display";
import Menu from "../components/menu";

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Watchlist() {
  const api = Api();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  const [movies, setMovies] = useState([]);

  const getData = async () => {
    const data = await api.getUserWatchlist();
    if (data.movies && data.movies.results) {
      setMovies(data.movies.results);
    } else {
      setMovies(data);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      <Menu />
      <Display
        title={"My watchlist"}
        movies={movies}
        width={width}
        height={height}
      />
    </Holder>
  );
}
