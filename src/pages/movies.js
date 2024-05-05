import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Display from "../components/display";
import Slider from "../components/slider";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

export default function Movies() {
  const api = Api();
  const storage = Storage();

  const [randomItems, setRandomItems] = useState([]);
  const [watchingItems, setWatchingItems] = useState([]);
  const [playlistItems, setPlaylistItems] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    const random = await api.getRandom(token, "movies", 0);
    setRandomItems(random);

    const watching = await api.getWatching(token, 0);
    setWatchingItems(watching.movies);

    const playlists = await api.getPlaylists(token, 0);
    setPlaylistItems(playlists);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      {randomItems.length > 0 && <Display items={randomItems} hidden={0} />}
      {watchingItems.length > 0 && (
        <Slider
          items={watchingItems}
          title={"Continue Watching"}
          spaceTop={32}
        />
      )}
      {playlistItems.map((playlist) => {
        return (
          <Slider items={playlist.items} title={playlist.title} spaceTop={32} />
        );
      })}
    </Holder>
  );
}
