import React, { useState } from "react";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Api from "../libs/api";
import Storage from "../libs/storage";

export default function Watchlist({ initial, size, hash }) {
  const api = Api();
  const storage = Storage();

  const [active, setActive] = useState(initial);

  const sendWatchlist = async () => {
    const token = storage.getItem("token");
    const response = await api.saveToWatchlist(token, hash);
    setActive(response.watchlist);
  };

  return active ? (
    <HeartFilled
      style={{
        fontSize: size,
        cursor: "pointer",
      }}
      onClick={sendWatchlist}
    />
  ) : (
    <HeartOutlined
      style={{
        fontSize: size,
        cursor: "pointer",
      }}
      onClick={sendWatchlist}
    />
  );
}
