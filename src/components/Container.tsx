import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import A2UINode from "../renderer/A2UINode";   // <-- changed

interface ContainerProps {
  id: string;
  children: A2UIComponent[];
  direction?: "row" | "column";
}

const Container: React.FC<ContainerProps> = ({ id, children, direction = "column" }) => {
  const flexDirection = direction === "row" ? "flex-row" : "flex-col";
  const wrapClass = direction === "row" ? "flex-wrap" : "";

  return (
    <div
      id={id}
      className={`flex ${flexDirection} ${wrapClass} gap-4 p-4`}
    >
      {children.map((child) => (
        <A2UINode key={child.id} component={child} />
      ))}
    </div>
  );
};

export default Container;
