import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <script
      defer
      data-domain="soulaimanmeskini.com"
      src="https://plausible.io/js/script.js"
    ></script>
    <Router />
  </React.StrictMode>
);
