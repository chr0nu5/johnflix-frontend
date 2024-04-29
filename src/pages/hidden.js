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

export default function Hidden() {
  const api = Api();
  const storage = Storage();

  const [randomItems, setRandomItems] = useState([]);
  const [watchingItems, setWatchingItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    const random = await api.getRandom(token, "movies", 1);
    setRandomItems(random);

    const watching = await api.getWatching(token, 1);
    setWatchingItems(watching.movies);

    const latest = await api.getLatest(token, "movies", 1);
    setLatestItems(latest);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      {randomItems.length > 0 && <Display items={randomItems} hidden={1} />}
      {watchingItems.length > 0 && (
        <Slider
          items={watchingItems}
          title={"Continue Watching"}
          spaceTop={32}
        />
      )}
      {latestItems.length > 0 && (
        <Slider items={latestItems} title={"Recently Released"} spaceTop={32} />
      )}
    </Holder>
  );
}
