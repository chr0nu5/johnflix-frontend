import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";

import Display from "../components/display/display";
import Menu from "../components/menu";

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Home() {
  const api = Api();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  const [latestMovies, setLatestMovies] = useState([]);
  const [userWatchList, setUserWatchList] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const getLatestMovies = async () => {
    const data = await api.getLatestMovies();
    setLatestMovies(data.results);
  };

  const getUserWatchingList = async () => {
    const data = await api.getUserWatchinglist();
    setUserWatchList(data.results);
  };

  const getPlaylists = async () => {
    const data = await api.getPlaylists();
    setPlaylists(data.results);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  useEffect(() => {
    getLatestMovies();
    getUserWatchingList();
    getPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      <Menu />
      <Display
        movies={latestMovies}
        width={width}
        height={(height / 4) * 3}
        more={"/movies"}
        title={"Latest Releases"}
        playPreview={true}
      />
      <Display
        movies={userWatchList}
        width={width}
        height={(height / 4) * 3}
        title={"Continue Watching"}
      />
      {playlists.map((playlist, index) => {
        return (
          <Display
            key={index}
            movies={playlist.movies}
            width={width}
            height={(height / 4) * 3}
            title={playlist.name}
          />
        );
      })}
    </Holder>
  );
}
