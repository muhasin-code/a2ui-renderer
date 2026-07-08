import React from "react";
import { useA2UIContext } from "../renderer/A2UIContext";

interface TextFieldProps {
  id: string;
  label: string;
  value: string;          // this is the initial/static value (ignored if context provides state)
  fieldType?: "text" | "email" | "password" | "number";
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value: initialValue,
  fieldType = "text",
  placeholder,
}) => {
  const { formState, setFormValue } = useA2UIContext();
  // Use context value if present, otherwise fall back to prop value
  const currentValue = formState[id] !== undefined ? formState[id] : initialValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(id, e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={fieldType}
        value={currentValue}
        placeholder={placeholder}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default TextField;
