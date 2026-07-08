import { useState } from "react";
import A2UIRenderer from "./renderer/A2UIRenderer";
import type { A2UIPayload } from "./types/a2ui";

// Reuse the same payload from Milestone 2
const testPayload: A2UIPayload = {
  root: {
    type: "card",
    id: "main-card",
    title: "Interactive A2UI Demo",
    children: [
      {
        type: "text",
        id: "greeting",
        content: "Fill out the form and try the buttons.",
        variant: "body",
      },
      {
        type: "container",
        id: "button-row",
        direction: "row",
        children: [
          {
            type: "button",
            id: "btn-ok",
            label: "OK",
            event: "ok",
            variant: "primary",
          },
          {
            type: "button",
            id: "btn-cancel",
            label: "Cancel",
            event: "cancel",
            variant: "secondary",
          },
        ],
      },
      {
        type: "form",
        id: "login-form",
        submitEvent: "login",
        children: [
          {
            type: "text-field",
            id: "username",
            label: "Username",
            value: "",
            placeholder: "Enter username",
          },
          {
            type: "text-field",
            id: "password",
            label: "Password",
            fieldType: "password",
            value: "",
            placeholder: "Enter password",
          },
          {
            type: "button",
            id: "submit-btn",
            label: "Log In",
            event: "login",
            variant: "primary",
          },
        ],
      },
    ],
  },
};

function App() {
  const [lastEvent, setLastEvent] = useState<{ event: string; data: any } | null>(null);

  const handleEvent = (eventName: string, componentId: string, data?: Record<string, any>) => {
    console.log(`Event: ${eventName} from ${componentId}`, data);
    setLastEvent({ event: eventName, data: data || {} });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto space-y-6">
        <A2UIRenderer component={testPayload.root} onEvent={handleEvent} />

        {/* Feedback panel */}
        {lastEvent && (
          <div className="p-4 bg-white border rounded-lg shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Last Event</h3>
            <p>
              <span className="font-mono text-sm bg-gray-200 px-1 rounded">{lastEvent.event}</span>
            </p>
            <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(lastEvent.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
