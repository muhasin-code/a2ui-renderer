import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Message } from "./types";
import MessageBubble from "./MessageBubble";
import { mockAgent } from "../agent/mockAgent";
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = useCallback((msg: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: generateId() }]);
  }, []);

  const handleSend = async () => {
    const userText = input.trim();
    if (!userText || agentThinking) return;

    // Add user message
    addMessage({ sender: "user", text: userText });
    setInput("");
    setAgentThinking(true);

    try {
      const payload: A2UIPayload | null = await mockAgent(userText);
      if (payload) {
        // Agent responded with an interactive A2UI payload
        addMessage({ sender: "agent", payload });
      } else {
        // Agent has no matching payload, return a plain text fallback
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

  // This is the callback passed to every embedded A2UIRenderer via MessageBubble.
  // It creates a new chat message showing what event was fired.
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center text-sm">Send a message to start.</p>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onEvent={handleA2UIEvent} />
        ))}
        {agentThinking && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-500 animate-pulse">
              Agent is typing…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
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
