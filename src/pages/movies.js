import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";

import Pagination from "../components/pagination/pagination";
import Menu from "../components/menu";

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Movies() {
  const api = Api();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  const [data, setData] = useState(null);

  const getData = async (url) => {
    let data = null;
    if (url) {
      data = await api.getPage(url);
    } else {
      data = await api.getMovies();
    }
    setData(data);
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
      <Pagination width={width} height={height} data={data} getPage={getData} />
    </Holder>
  );
}
