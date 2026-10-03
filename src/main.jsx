import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

if (window.location.hash.startsWith("#/")) {
  const legacyPath = window.location.hash.slice(1);

  if (legacyPath.startsWith("/") && !legacyPath.startsWith("//")) {
    window.history.replaceState(window.history.state, "", legacyPath);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);