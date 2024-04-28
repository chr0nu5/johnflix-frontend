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

export default function Home() {
  const api = Api();
  const storage = Storage();

  const [randomItems, setRandomItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    const random = await api.getRandom(token, "movies", 0);
    setRandomItems(random);

    const latest = await api.getLatest(token, "movies", 0);
    setLatestItems(latest);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      {randomItems.length > 0 && <Display items={randomItems} hidden={0} />}
      {latestItems.length > 0 && (
        <Slider items={latestItems} title={"Recently Released"} spaceTop={32} />
      )}
    </Holder>
  );
}
