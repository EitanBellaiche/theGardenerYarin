import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = <App pathname={window.location.pathname} />;

// Content routes arrive prerendered (scripts/prerender.mjs); 404.html does not.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
