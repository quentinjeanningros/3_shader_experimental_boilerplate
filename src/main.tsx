import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/preflight.css";
import "./style/index.css";
import ThreeScene from "./three/intex.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThreeScene className="full-screen" />
  </StrictMode>
);
