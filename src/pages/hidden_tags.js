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

export default function HiddenTags() {
  const api = Api();
  const storage = Storage();

  const [items, setItems] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    const _items = await api.getTags(token, 1);
    setItems(_items);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      {items.length > 0 && (
        <Display items={items} hidden={1} title={"Tags"} isList={true} />
      )}
    </Holder>
  );
}
