import A2UIRenderer from "./renderer/A2UIRenderer";
import type { A2UIPayload } from "./types/a2ui";

// A sample payload for visual verification
const testPayload: A2UIPayload = {
  root: {
    type: "card",
    id: "main-card",
    title: "Welcome to A2UI",
    children: [
      {
        type: "text",
        id: "greeting",
        content: "Hello, world!",
        variant: "heading",
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
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto">
        <A2UIRenderer component={testPayload.root} />
      </div>
    </div>
  );
}

export default App;
