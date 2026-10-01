import { renderToString } from "react-dom/server";
import App from "./App";
import { SERVICE_PAGES } from "./siteData";

/** Indexable routes; each is written into dist/<route>/index.html at build time. */
export const ROUTES = [
  "/",
  ...Object.values(SERVICE_PAGES).map((page) => page.path),
  "/accessibility/",
];

/** The route's initial (default-state) markup, which the browser then hydrates. */
export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}
