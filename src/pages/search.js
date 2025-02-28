import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

import Api from "../libs/api";

import Menu from "../components/menu";
import Pagination from "../components/pagination/pagination";

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchFields = styled.div`
  padding: 24px;
  position: fixed;
  right: 64px;
  top: 0px;
  width: 50%;
  z-index: 90;
  text-align: right;
`;

export default function Search() {
  const api = Api();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const [search, setSearch] = useState(null);

  const [data, setData] = useState({
    results: {
      movies: [],
      info: {
        name: "Tell me what you wanna watch :)",
        cover: "/img/searching.jpg",
      },
    },
  });

  const getData = async () => {
    const data = await api.search(search);
    setData(data);
  };

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  useEffect(() => {
    if (search && search.length > 3) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Holder>
      <Menu />
      <SearchFields>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={() => getData}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getData();
            }
          }}
          addonBefore={<SearchOutlined />}
          autoFocus
          placeholder="Movie title, genre, actor or anything :)"
        />
      </SearchFields>
      <Pagination width={width} height={height} data={data} />
    </Holder>
  );
}
