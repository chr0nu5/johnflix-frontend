import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Display from "../components/display";
import Slider from "../components/slider";
import Wrapper from "../components/wrapper";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

export default function Home() {
  const api = Api();
  const storage = Storage();

  const [randomItems, setRandomItems] = useState([]);
  const [watchingMovies, setWatchingMovies] = useState([]);
  const [watchingEpisodes, setWatchingEpisodes] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    const random = await api.getRandom(token, "movies", 0);
    setRandomItems(random);

    const watching = await api.getWatching(token, 0);
    setWatchingMovies(watching.movies);
    setWatchingEpisodes(watching.episodes);

    const latest = await api.getLatest(token, "movies", 0);
    setLatestItems(latest);
  };

  const isLoggedIn = async () => {
    const token = storage.getItem("token");
    console.log(token);
    if (token) {
      const user = await api.getProfile(token);
      if (!user.username) {
        window.location = "/login";
      }
    }
  };

  useEffect(() => {
    isLoggedIn();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Holder>
        {randomItems && randomItems.length > 0 && (
          <Display items={randomItems} hidden={0} />
        )}
        {latestItems && latestItems.length > 0 && (
          <Slider
            items={latestItems}
            title={"Recently Released"}
            spaceTop={32}
          />
        )}
        {watchingMovies && watchingMovies.length > 0 && (
          <Slider
            items={watchingMovies}
            title={"Continue Watching (Movies)"}
            spaceTop={32}
          />
        )}
        {watchingEpisodes && watchingEpisodes.length > 0 && (
          <Slider
            items={watchingEpisodes}
            title={"Continue Watching (Episodes)"}
            spaceTop={32}
          />
        )}
      </Holder>
    </Wrapper>
  );
}
