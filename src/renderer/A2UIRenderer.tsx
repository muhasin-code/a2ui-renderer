import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import registry from "./registry";

interface A2UIRendererProps {
  /** The A2UI component node to render. */
  component: A2UIComponent;
}

/**
 * Recursive renderer for A2UI component trees.
 * Looks up the component type in the registry and renders it,
 * passing through all payload props.
 */
const A2UIRenderer: React.FC<A2UIRendererProps> = ({ component }) => {
  // We are guaranteed a type discriminant by the union definition.
  const Component = registry[component.type];

  if (!Component) {
    // Graceful fallback if an unknown type sneaks in (shouldn't happen with proper types)
    return (
      <div className="p-2 border border-red-300 bg-red-50 text-red-700 rounded">
        Unknown component type: <code>{component.type}</code>
      </div>
    );
  }

  // Casting to any is safe because we know the component's expected props
  // align with the union member. We spread the component object as props.
  return <Component {...(component as any)} />;
};

export default A2UIRenderer;
