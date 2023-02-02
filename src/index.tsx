import React from "react";
import ReactDOM from "react-dom/client";
import "./resets.css";
import "./index.css";
import App from "./components/App";

const root = ReactDOM.createRoot(
  document.querySelector(".root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
