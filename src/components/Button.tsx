import React from "react";
import { useA2UIContext } from "../renderer/A2UIContext";

interface ButtonProps {
  id: string;
  label: string;
  event: string;
  variant?: "primary" | "secondary";
  buttonType?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  id,
  label,
  event,
  variant = "primary",
  buttonType = "button",
}) => {
  const { triggerEvent } = useA2UIContext();

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
    // Only fire the event if the button is not a form submit button
    if (buttonType !== "submit") {
      triggerEvent(event, id);
    }
  };

  return (
    <button
      id={id}
      type={buttonType}
      className={`${baseClasses} ${colorClasses}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
