import React from "react";
import ReactDOM from "react-dom/client";
import "./resets.css";
import "./index.css";
import App from "./components/App";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const root = ReactDOM.createRoot(
  document.querySelector(".root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App allTasks={DATA}/>
  </React.StrictMode>
);