import type { A2UIPayload } from "../types/a2ui";
import { bookingFormPayload } from "./payloads/bookingForm";
import { statusCardPayload } from "./payloads/statusCard";
import { contactFormPayload } from "./payloads/contactForm";

export async function mockAgent(userMessage: string): Promise<A2UIPayload | null> {
  // Simulate network / processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const msg = userMessage.toLowerCase();

  // Greetings / help – return null so ChatWindow shows the friendly fallback
  if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hey") ||
    msg.includes("help") ||
    msg.includes("what can you do") ||
    msg.includes("who are you")
  ) {
    return null;
  }

  // Booking intent
  if (
    msg.includes("book") ||
    msg.includes("flight") ||
    msg.includes("reserve") ||
    msg.includes("trip") ||
    msg.includes("travel")
  ) {
    return bookingFormPayload;
  }

  // Order status intent
  if (
    msg.includes("status") ||
    msg.includes("order") ||
    msg.includes("track") ||
    msg.includes("package") ||
    msg.includes("delivery")
  ) {
    return statusCardPayload;
  }

  // Contact / support intent
  if (
    msg.includes("contact") ||
    msg.includes("support") ||
    msg.includes("email") ||
    msg.includes("message") ||
    msg.includes("helpdesk")
  ) {
    return contactFormPayload;
  }

  // Everything else → null triggers fallback
  return null;
}
