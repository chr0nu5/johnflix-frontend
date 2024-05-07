import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Display from "../components/display";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

export default function Content() {
  const api = Api();
  const storage = Storage();
  const { hash } = useParams();

  const [items, setItems] = useState({ medias: [] });

  const getData = async () => {
    const token = storage.getItem("token");
    const _items = await api.getContent(token, hash);
    setItems(_items);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    <Holder>
      {items.medias.length > 0 && (
        <Display
          items={items.medias}
          hidden={0}
          title={items.title}
          isList={true}
          gallery={false}
        />
      )}
    </Holder>
  );
}
