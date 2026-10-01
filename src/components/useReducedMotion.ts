import { useSyncExternalStore } from "react";
import useMediaQuery from "./useMediaQuery";

// Set by the accessibility menu's "stop animations" option.
const STILL_CLASS = "a11y-still";

function subscribeToRootClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/** True when the OS asks for reduced motion or the visitor turned motion off on the site. */
export default function useReducedMotion() {
  const systemReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const siteReduced = useSyncExternalStore(
    subscribeToRootClass,
    () => document.documentElement.classList.contains(STILL_CLASS),
    () => false
  );
  return systemReduced || siteReduced;
}
