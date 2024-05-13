import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Display from "../components/display";
import Wrapper from "../components/wrapper";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

export default function Media() {
  const api = Api();
  const storage = Storage();
  const { hash } = useParams();

  const [items, setItems] = useState({ seasons: [] });

  const getData = async () => {
    const token = storage.getItem("token");
    const _items = await api.getMedia(token, hash);
    setItems(_items);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    <Wrapper>
      <Holder>
        {items.seasons.length > 0 && (
          <Display items={items.seasons} hidden={0} title={"Seasons"} />
        )}
      </Holder>
    </Wrapper>
  );
}
