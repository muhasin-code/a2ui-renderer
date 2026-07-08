// src/chat/types.ts
import type { A2UIPayload } from "../types/a2ui";

export type Message = {
  id: string;
  sender: "user" | "agent";
  text?: string;                      // plain text (always for user; optional for agent)
  payload?: A2UIPayload;              // only for agent messages that render A2UI
};
