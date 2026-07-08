import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import A2UIRenderer from "../renderer/A2UIRenderer";

interface FormProps {
  id: string;
  children: A2UIComponent[];
  submitEvent?: string;
  onSubmit?: (eventName: string, componentId: string, formData: Record<string, any>) => void;
}

const Form: React.FC<FormProps> = ({ id, children, submitEvent = "submit", onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log; full data collection comes in Milestone 3
    if (onSubmit) {
      onSubmit(submitEvent, id, {});
    } else {
      console.log(`Form submitted: event=${submitEvent}, id=${id}`);
    }
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      {children.map((child) => (
        <A2UIRenderer key={child.id} component={child} />
      ))}
    </form>
  );
};

export default Form;
