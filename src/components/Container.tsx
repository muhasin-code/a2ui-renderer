import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import A2UIRenderer from "../renderer/A2UIRenderer";

interface ContainerProps {
  id: string;
  children: A2UIComponent[];
  direction?: "row" | "column";
}

const Container: React.FC<ContainerProps> = ({ id, children, direction = "column" }) => {
  const flexDirection = direction === "row" ? "flex-row" : "flex-col";

  return (
    <div
      id={id}
      className={`flex ${flexDirection} gap-4 p-4`}
    >
      {children.map((child) => (
        <A2UIRenderer key={child.id} component={child} />
      ))}
    </div>
  );
};

export default Container;
