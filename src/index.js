// index.js
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./components/app";

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
   <App/>
  </React.StrictMode>,
  root
);

reportWebVitals();
