import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
