import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import IsAutherizedProvider from "./context/IsAuthorizedProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <IsAutherizedProvider>
        <App />
      </IsAutherizedProvider>
    </BrowserRouter>
  </StrictMode>
);
