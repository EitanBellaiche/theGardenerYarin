import { StrictMode } from "react";
import LandingPageYarin from "./LandingPageYarin.tsx";

/** Shared by the browser entry (main.tsx) and the prerender entry (entry-server.tsx). */
export default function App({ pathname }: { pathname: string }) {
  return (
    <StrictMode>
      <LandingPageYarin pathname={pathname} />
    </StrictMode>
  );
}
