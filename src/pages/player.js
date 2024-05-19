import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Video from "../components/video";
import VideoData from "../components/video_data";
import Menu from "../components/menu";

import Wrapper from "../components/wrapper";

const Holder = styled.div`
  width: 100%;
  position: relative;
  padding-top: 72px;
`;

export default function Player() {
  const api = Api();
  const storage = Storage();
  const { hash } = useParams();

  // states
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const [media, setMedia] = useState(null);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  const getData = async (type) => {
    setLoading(true);
    const token = storage.getItem("token");
    let response = null;
    if (type === "movie") {
      response = await api.getMovie(token, hash);
    } else if (type === "episode") {
      response = await api.getEpisode(token, hash);
    }
    setMedia(response);
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let type = "movie";
    if (window.location.pathname.includes("episode")) {
      type = "episode";
    }
    getData(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    media && (
      <Wrapper loading={loading}>
        <Holder>
          <Menu hidden={0} />
          <Video media={media} width={width} height={height - 150 - 72} />
          <VideoData setLoading={setLoading} media={media} width={width} />
        </Holder>
      </Wrapper>
    )
  );
}
