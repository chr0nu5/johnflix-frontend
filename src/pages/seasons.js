import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Api from "../libs/api";

import Display from "../components/display/display";
import Menu from "../components/menu";

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Seasons() {
  const api = Api();
  const { hash } = useParams();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  const [seasons, setSeasons] = useState([]);

  const getData = async () => {
    const data = await api.getSeasons(hash);
    if (data.results) {
      const seasonData = await Promise.all(
        data.results.map(async (season, index) => {
          const _data = await api.getEpisodes(season.hash);
          return {
            season: `Season ${index + 1}`,
            episodes: _data.results,
          };
        })
      );
      setSeasons(seasonData);
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
      {seasons.map((season, index) => (
        <Display
          key={index}
          movies={season.episodes}
          width={width}
          height={height}
          title={season.season}
        />
      ))}
    </Holder>
  );
}
