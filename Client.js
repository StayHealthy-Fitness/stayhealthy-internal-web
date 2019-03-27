import "@babel/polyfill";

import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import React from "react";

import App from "./components/App";

const Client = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(<Client />, document.getElementById("root"));
