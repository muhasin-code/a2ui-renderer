// src/chat/MessageBubble.tsx (full updated file)
import React from "react";
import type { Message } from "./types";
import A2UIRenderer from "../renderer/A2UIRenderer";
import ErrorBoundary from "../components/ErrorBoundary";

interface MessageBubbleProps {
  message: Message;
  onEvent?: (eventName: string, componentId: string, data?: Record<string, any>) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onEvent }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900 border border-gray-200"
        }`}
      >
        <div className="text-xs font-semibold mb-1 opacity-70">
          {isUser ? "You" : "Agent"}
        </div>

        {message.text && !message.payload && (
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        )}
        {message.payload && (
          <div className="mt-1">
            <ErrorBoundary>
              <A2UIRenderer component={message.payload.root} onEvent={onEvent} />
            </ErrorBoundary>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
