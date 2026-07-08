// src/validation/validatePayload.ts
import type { A2UIComponent, A2UIPayload } from "../types/a2ui";

const VALID_TYPES = new Set(["container", "card", "text", "button", "text-field", "form"]);
const COMPOSABLE_TYPES = new Set(["container", "card", "form"]);

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate a single A2UI component node recursively.
 */
function validateComponent(node: any, path: string): string[] {
  const errors: string[] = [];

  if (!node || typeof node !== "object") {
    errors.push(`${path}: not an object`);
    return errors;
  }

  // Must have type
  if (!node.type || !VALID_TYPES.has(node.type)) {
    errors.push(`${path}: missing or invalid type (got "${node.type}")`);
    return errors; // can't check further without a valid type
  }

  // Must have id
  if (typeof node.id !== "string" || node.id === "") {
    errors.push(`${path}: missing or empty id`);
  }

  // Composable types must have children array (if they use children at all)
  if (COMPOSABLE_TYPES.has(node.type)) {
    if (node.children !== undefined) {
      if (!Array.isArray(node.children)) {
        errors.push(`${path}: children must be an array`);
      } else {
        node.children.forEach((child: any, index: number) => {
          errors.push(...validateComponent(child, `${path}.children[${index}]`));
        });
      }
    }
  } else {
    // Leaf components must NOT have children
    if (node.children !== undefined) {
      errors.push(`${path}: leaf component (${node.type}) should not have children`);
    }
  }

  // Optional: check for required type-specific fields (we could add more but keep it lightweight)
  if (node.type === "text" && typeof node.content !== "string") {
    errors.push(`${path}: text component missing content`);
  }
  if (node.type === "button" && typeof node.label !== "string") {
    errors.push(`${path}: button missing label`);
  }
  if (node.type === "text-field" && typeof node.label !== "string") {
    errors.push(`${path}: text-field missing label`);
  }

  return errors;
}

/**
 * Validate an entire A2UIPayload.
 * Returns { valid: boolean, errors: string[] }
 */
export function validateA2UIPayload(payload: any): ValidationResult {
  const errors: string[] = [];

  if (!payload || typeof payload !== "object") {
    errors.push("Payload is not an object");
    return { valid: false, errors };
  }

  if (!payload.root) {
    errors.push("Payload missing root");
    return { valid: false, errors };
  }

  errors.push(...validateComponent(payload.root, "root"));

  return { valid: errors.length === 0, errors };
}
