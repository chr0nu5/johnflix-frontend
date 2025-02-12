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
          colorPrimary: "#222222",
          colorInfo: "#222222",
          fontSize: 12,
          sizeStep: 4,
          wireframe: false,
        },
        algorithm: theme.darkAlgorithm,
        components: {
          Slider: {
            trackBg: "#fff",
            trackHoverBg: "#fff",
            handleColor: "#fff",
            handleActiveColor: "#fff",
            dotBorderColor: "#fff",
            dotActiveBorderColor: "#fff",
          },
        },
      }}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
);

reportWebVitals();
