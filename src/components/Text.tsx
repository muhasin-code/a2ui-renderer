import React from "react";

interface TextProps {
  id: string;
  content: string;
  variant?: "heading" | "body" | "caption";
}

const Text: React.FC<TextProps> = ({ id, content, variant = "body" }) => {
  const baseClasses = "text-gray-900";
  let classes = "";

  switch (variant) {
    case "heading":
      classes = "text-2xl font-bold";
      break;
    case "body":
      classes = "text-base";
      break;
    case "caption":
      classes = "text-sm text-gray-500";
      break;
  }

  return (
    <p id={id} className={`${baseClasses} ${classes}`}>
      {content}
    </p>
  );
};

export default Text;
