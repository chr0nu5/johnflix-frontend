import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";
import Storage from "../libs/storage";

import Display from "../components/display";
import Wrapper from "../components/wrapper";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

export default function MoviesTags() {
  const api = Api();
  const storage = Storage();

  const [items, setItems] = useState([]);

  const getData = async () => {
    setLoading(true);
    const token = storage.getItem("token");
    const _items = await api.getTags(token, 0);
    setItems(_items);
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper loading={loading}>
      <Holder>
        {items.length > 0 && (
          <Display items={items} hidden={0} title={"Tags"} isList={true} />
        )}
      </Holder>
    </Wrapper>
  );
}
