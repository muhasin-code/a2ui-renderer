import type { A2UIPayload } from "../../types/a2ui";

export const contactFormPayload: A2UIPayload = {
  root: {
    type: "card",
    id: "contact-card",
    title: "Contact Support",
    children: [
      {
        type: "text",
        id: "contact-intro",
        content: "Fill out the form and we'll get back to you.",
        variant: "body",
      },
      {
        type: "form",
        id: "contact-form",
        submitEvent: "send-message",
        children: [
          {
            type: "text-field",
            id: "name",
            label: "Your Name",
            value: "",
            placeholder: "Jane Doe",
          },
          {
            type: "text-field",
            id: "email",
            label: "Email",
            value: "",
            fieldType: "email",
            placeholder: "jane@example.com",
          },
          {
            type: "text-field",
            id: "message",
            label: "Message",
            value: "",
            fieldType: "text",
            placeholder: "How can we help?",
          },
          {
            type: "button",
            id: "send-msg-btn",
            label: "Send Message",
            event: "send-message",    // still allowed, but will be ignored
            variant: "primary",
            buttonType: "submit",     // <-- this tells the button to stay quiet
          },
        ],
      },
    ],
  },
};
