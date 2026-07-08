import type { A2UIPayload } from "../types/a2ui";
import { bookingFormPayload } from "./payloads/bookingForm";
import { statusCardPayload } from "./payloads/statusCard";

/**
 * Mock agent that returns an A2UI payload based on simple keyword matching.
 * Simulates a 1‑second delay before resolving.
 */
export async function mockAgent(userMessage: string): Promise<A2UIPayload | null> {
  // Simulate network / processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const msg = userMessage.toLowerCase();

  if (msg.includes("book") || msg.includes("form") || msg.includes("reserve")) {
    return bookingFormPayload;
  }

  if (msg.includes("status") || msg.includes("card") || msg.includes("info")) {
    return statusCardPayload;
  }

  // Fallback: return a simple text-only message (no payload). The chat window will handle null.
  return null;
}
