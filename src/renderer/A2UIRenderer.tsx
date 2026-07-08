import React, { useState, useCallback } from "react";
import type { A2UIComponent } from "../types/a2ui";
import A2UIContext from "./A2UIContext";
import A2UINode from "./A2UINode";

interface A2UIRendererProps {
  component: A2UIComponent;
  onEvent?: (eventName: string, componentId: string, data?: Record<string, any>) => void;
  initialState?: Record<string, string>;
}

/**
 * Root renderer for an A2UI tree. Creates the shared form state
 * and event context, then delegates rendering to A2UINode.
 */
const A2UIRenderer: React.FC<A2UIRendererProps> = ({
  component,
  onEvent,
  initialState,
}) => {
  const [formState, setFormState] = useState<Record<string, string>>(initialState || {});

  const setFormValue = useCallback((id: string, value: string) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const triggerEvent = useCallback(
    (eventName: string, componentId: string, data?: Record<string, any>) => {
      if (onEvent) {
        onEvent(eventName, componentId, data);
      }
      console.log(`[A2UI Event] ${eventName} from ${componentId}`, data || {});
    },
    [onEvent]
  );

  return (
    <A2UIContext.Provider value={{ formState, setFormValue, triggerEvent }}>
      <A2UINode component={component} />
    </A2UIContext.Provider>
  );
};

export default A2UIRenderer;
