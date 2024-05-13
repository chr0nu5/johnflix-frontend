import React, { useEffect } from "react";
import styled from "styled-components";

import Api from "../libs/api";
import Storage from "../libs/storage";

const Holder = styled.div``;

export default function Wrapper({ children }) {
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

  return <Holder>{children}</Holder>;
}
