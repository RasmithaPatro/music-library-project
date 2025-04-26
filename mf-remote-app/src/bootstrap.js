import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MusicApp from "./MusicApp.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MusicApp />
  </StrictMode>
);
