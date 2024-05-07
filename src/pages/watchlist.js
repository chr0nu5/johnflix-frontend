import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Display from "../components/display";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

export default function Watchlist() {
  const api = Api();
  const storage = Storage();

  const [items, setItems] = useState({ items: [] });

  const getData = async () => {
    const token = storage.getItem("token");
    const _items = await api.getWatchlist(token, 0);
    setItems(_items);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      {items.items.length > 0 && (
        <Display
          items={items.items}
          hidden={0}
          title={"Watchlist"}
          isList={true}
        />
      )}
    </Holder>
  );
}
