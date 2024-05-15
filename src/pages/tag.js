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

export default function Tag() {
  const api = Api();
  const storage = Storage();
  const { hash } = useParams();

  const [items, setItems] = useState({ items: [] });
  const [page, setPage] = useState(0);

  const getData = async () => {
    setLoading(true);
    const token = storage.getItem("token");
    const _items = await api.getTag(token, hash, page);
    setItems(_items);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(false);
  };

  const changePage = (page, pageSize) => {
    setPage(page);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, page]);

  return (
    <Wrapper loading={loading}>
      <Holder>
        {items.items.length > 0 && (
          <Display
            items={items.items}
            hidden={0}
            title={items.title}
            isList={true}
            totalPages={items.total_pages}
            totalItems={items.total_pages * 40}
            callback={changePage}
          />
        )}
      </Holder>
    </Wrapper>
  );
}
