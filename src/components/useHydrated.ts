import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False while prerendering and during hydration, true from the next render on. */
export default function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
