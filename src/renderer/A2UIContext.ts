import { createContext, useContext } from "react";

/**
 * Context that provides form state and event handling
 * to any component inside the A2UI renderer tree.
 */
export interface A2UIContextType {
  /** Current values of all form fields, keyed by field id. */
  formState: Record<string, string>;
  /** Update the value of a specific field. */
  setFormValue: (id: string, value: string) => void;
  /** Fire a named event (e.g., button click, form submit). */
  triggerEvent: (eventName: string, componentId: string, data?: Record<string, any>) => void;
}

const A2UIContext = createContext<A2UIContextType>({
  formState: {},
  setFormValue: () => {},
  triggerEvent: () => {},
});

/** Custom hook for consuming the context (with a friendly error if used outside a provider). */
export function useA2UIContext(): A2UIContextType {
  const ctx = useContext(A2UIContext);
  if (!ctx) {
    throw new Error("useA2UIContext must be used inside an A2UIRenderer that provides a context.");
  }
  return ctx;
}

export default A2UIContext;
