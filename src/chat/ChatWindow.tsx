// src/chat/ChatWindow.tsx (full updated file)
import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Message } from "./types";
import MessageBubble from "./MessageBubble";
import { mockAgent } from "../agent/mockAgent";
import { validateA2UIPayload } from "../validation/validatePayload";
import type { A2UIPayload } from "../types/a2ui";

let msgIdCounter = 0;
function generateId() {
  return `msg-${Date.now()}-${++msgIdCounter}`;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [agentThinking, setAgentThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = useCallback((msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: generateId() }]);
  }, []);

  const handleSend = async () => {
    const userText = input.trim();
    if (!userText || agentThinking) return;

    addMessage({ sender: "user", text: userText });
    setInput("");
    setAgentThinking(true);

    try {
      const payload: A2UIPayload | null = await mockAgent(userText);
      if (payload) {
        // Validate payload before rendering
        const validation = validateA2UIPayload(payload);
        if (!validation.valid) {
          addMessage({
            sender: "agent",
            text: `⚠️ Received an invalid A2UI payload:\n${validation.errors.join("\n")}`,
          });
        } else {
          addMessage({ sender: "agent", payload });
        }
      } else {
        addMessage({
          sender: "agent",
          text: "I'm not sure how to help with that. Try asking for a booking form or an order status card.",
        });
      }
    } catch (err) {
      addMessage({
        sender: "agent",
        text: "Sorry, something went wrong.",
      });
    } finally {
      setAgentThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleA2UIEvent = useCallback(
    (eventName: string, componentId: string, data?: Record<string, any>) => {
      const dataStr = data ? JSON.stringify(data, null, 1) : "no data";
      addMessage({
        sender: "agent",
        text: `ℹ️ Event **${eventName}** from ${componentId}\n\`\`\`\n${dataStr}\n\`\`\``,
      });
    },
    [addMessage]
  );

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h2 className="font-semibold text-gray-700">A2UI Chat Demo</h2>
        <p className="text-xs text-gray-500">Try “book a flight” or “show status”</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center text-sm">Send a message to start.</p>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onEvent={handleA2UIEvent} />
        ))}
        {agentThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4 w-40 animate-pulse space-y-2">
              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={agentThinking}
          />
          <button
            onClick={handleSend}
            disabled={agentThinking || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
