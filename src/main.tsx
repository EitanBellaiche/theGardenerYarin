import ReactDOM from "react-dom/client";
import App from "./App";
import { installWhatsappTracking } from "./analytics";
import "./index.css";

installWhatsappTracking();

const container = document.getElementById("root")!;
const app = <App pathname={window.location.pathname} />;

// Content routes arrive prerendered (scripts/prerender.mjs); 404.html does not.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
