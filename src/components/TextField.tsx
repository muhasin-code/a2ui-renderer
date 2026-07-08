import React from "react";

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  fieldType?: "text" | "email" | "password" | "number";
  placeholder?: string;
  onChange?: (id: string, newValue: string) => void; // will be wired in Milestone 3
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value,
  fieldType = "text",
  placeholder,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(id, e.target.value);
    } else {
      console.log(`TextField ${id} changed to: ${e.target.value}`);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={fieldType}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default TextField;
