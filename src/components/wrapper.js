import React, { useEffect } from "react";
import styled from "styled-components";
import { Spin } from "antd";

import Api from "../libs/api";
import Storage from "../libs/storage";

const Holder = styled.div``;

const Loading = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Wrapper({ children, loading }) {
  const api = Api();
  const storage = Storage();

  const isLoggedIn = async () => {
    const token = storage.getItem("token");
    console.log(token);
    if (token) {
      const user = await api.getProfile(token);
      if (!user.username) {
        window.location = "/login";
      }
    }
  };

  useEffect(() => {
    isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <Loading>
          <Spin size="large" />
        </Loading>
      )}
      <Holder>{children}</Holder>
    </>
  );
}
