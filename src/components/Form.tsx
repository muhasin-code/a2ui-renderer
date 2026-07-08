import React from "react";
import type { A2UIComponent } from "../types/a2ui";
import A2UINode from "../renderer/A2UINode";
import { useA2UIContext } from "../renderer/A2UIContext";

interface FormProps {
  id: string;
  children: A2UIComponent[];
  submitEvent?: string;
}

const Form: React.FC<FormProps> = ({ id, children, submitEvent = "submit" }) => {
  const { formState, triggerEvent } = useA2UIContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Collect form data: only the fields that appear in the children (this is a simple approach)
    // We can just pass the entire formState, which includes all fields in the whole tree.
    // That's fine for a demo.
    triggerEvent(submitEvent, id, { ...formState });
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      {children.map((child) => (
        <A2UINode key={child.id} component={child} />
      ))}
    </form>
  );
};

export default Form;
