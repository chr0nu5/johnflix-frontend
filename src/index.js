import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E50914",
          colorInfo: "#E50914",
          fontSize: 14,
          sizeStep: 4,
          wireframe: false,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
);

reportWebVitals();
