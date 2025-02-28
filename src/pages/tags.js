import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";

import Display from "../components/display/display";
import Menu from "../components/menu";

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Tags() {
  const api = Api();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  const [tags, setTags] = useState([]);

  const getData = async (url = null) => {
    // If no URL is provided, get the first page of tags
    const data = url ? await api.getPage(url) : await api.getTags();

    if (data.results) {
      // Accumulate the tags
      setTags((prevTags) => [...prevTags, data]);

      // Continue fetching the next page if it exists
      if (data.next) {
        getData(data.next);
      }
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
      {tags.map((page, index) => (
        <Display
          key={index}
          movies={page.results}
          width={width}
          height={height}
          linkTo={"tag"}
        />
      ))}
    </Holder>
  );
}
