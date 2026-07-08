import React from "react";

interface ButtonProps {
  id: string;
  label: string;
  event: string;
  variant?: "primary" | "secondary";
  onClick?: (eventName: string, componentId: string) => void; // will be wired in Milestone 3
}

const Button: React.FC<ButtonProps> = ({
  id,
  label,
  event,
  variant = "primary",
  onClick,
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  let colorClasses = "";

  switch (variant) {
    case "primary":
      colorClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
      break;
    case "secondary":
      colorClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500";
      break;
  }

  const handleClick = () => {
    if (onClick) {
      onClick(event, id);
    } else {
      console.log(`Button clicked: event=${event}, id=${id}`);
    }
  };

  return (
    <button
      id={id}
      className={`${baseClasses} ${colorClasses}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
