// ============================================================
// A2UI Component Type Definitions
// ============================================================

/**
 * Base fields shared by every A2UI component.
 * We don't export this — it's only used inside this file.
 */
interface BaseComponent {
  /** Unique identifier for the component. Used as React key and for state binding. */
  id: string;
}

// ------------------------------------------------------------
// Leaf components (no children)
// ------------------------------------------------------------

export interface Container extends BaseComponent {
  type: "container";
  /** Child components to lay out inside the container. */
  children: A2UIComponent[];
  /** Optional layout direction. Defaults to 'column' if omitted. */
  direction?: "row" | "column";
}

export interface Card extends BaseComponent {
  type: "card";
  /** Optional title displayed at the top of the card. */
  title?: string;
  /** Child components rendered inside the card body. */
  children: A2UIComponent[];
}

export interface Text extends BaseComponent {
  type: "text";
  /** The text content to display. */
  content: string;
  /** Visual style variant. */
  variant?: "heading" | "body" | "caption";
}

export interface Button extends BaseComponent {
  type: "button";
  /** Label shown on the button. */
  label: string;
  /** Name of the event to trigger when clicked (e.g., "submit", "cancel"). */
  event: string;
  /** Optional visual variant. */
  variant?: "primary" | "secondary";
}

export interface TextField extends BaseComponent {
  type: "text-field";
  /** Label displayed above or inside the field. */
  label: string;
  /** The current value of the field (for controlled components). */
  value: string;
  /** HTML input type: text, email, password, etc. */
  fieldType?: "text" | "email" | "password" | "number";
  /** Placeholder text when the field is empty. */
  placeholder?: string;
}

export interface Form extends BaseComponent {
  type: "form";
  /** Child components (usually text-fields and a submit button). */
  children: A2UIComponent[];
  /** The event name fired when the form is submitted. */
  submitEvent?: string;
}

// ------------------------------------------------------------
// Discriminated union — the core component type
// ------------------------------------------------------------

/**
 * A2UIComponent is a union of all possible UI nodes.
 * The `type` property acts as the discriminant.
 */
export type A2UIComponent =
  | Container
  | Card
  | Text
  | Button
  | TextField
  | Form;

// ------------------------------------------------------------
// Top‑level payload
// ------------------------------------------------------------

/**
 * The full A2UI payload received from the agent.
 * It always contains a single root component that may have deeply nested children.
 */
export interface A2UIPayload {
  root: A2UIComponent;
}
