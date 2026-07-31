import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GameStateProvider from "./provider/GameStateProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </BrowserRouter>
  </StrictMode>,
);
