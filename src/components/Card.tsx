import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import A2UINode from "../renderer/A2UINode";

interface CardProps {
  id: string;
  title?: string;
  children: A2UIComponent[];
}

const Card: React.FC<CardProps> = ({ id, title, children }) => {
  return (
    <div
      id={id}
      className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
    >
      {title && (
        <h2 className="text-lg font-semibold mb-3 text-gray-800">{title}</h2>
      )}
      <div className="flex flex-col gap-3">
        {children.map((child) => (
          <A2UINode key={child.id} component={child} />
        ))}
      </div>
    </div>
  );
};

export default Card;
