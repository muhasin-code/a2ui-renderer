// src/renderer/A2UINode.tsx
import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import registry from "./registry";

interface A2UINodeProps {
  component: A2UIComponent;
}

/**
 * Renders a single A2UI component node. Assumes it's already inside
 * an A2UIContext provider (the root renderer sets that up).
 */
const A2UINode: React.FC<A2UINodeProps> = ({ component }) => {
  const Component = registry[component.type];
  if (!Component) {
    return (
      <div className="p-2 border border-red-300 bg-red-50 text-red-700 rounded">
        Unknown component type: <code>{component.type}</code>
      </div>
    );
  }
  return <Component {...(component as any)} />;
};

export default A2UINode;
