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

export default function Season() {
  const api = Api();
  const storage = Storage();
  const { hash } = useParams();

  const [items, setItems] = useState({ episodes: [] });

  const getData = async () => {
    const token = storage.getItem("token");
    const _items = await api.getSeason(token, hash);
    setItems(_items);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    <Wrapper>
      <Holder>
        {items.episodes.length > 0 && (
          <Display
            items={items.episodes}
            hidden={0}
            title={`${items.title}: ${items.subtitle}`}
            isList={true}
          />
        )}
      </Holder>
    </Wrapper>
  );
}
