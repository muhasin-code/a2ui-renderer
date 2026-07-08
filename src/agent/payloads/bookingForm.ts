import type { A2UIPayload } from "../../types/a2ui";

export const bookingFormPayload: A2UIPayload = {
  root: {
    type: "card",
    id: "booking-card",
    title: "Book a Flight",
    children: [
      {
        type: "text",
        id: "booking-intro",
        content: "Please fill in your travel details.",
        variant: "body",
      },
      {
        type: "form",
        id: "booking-form",
        submitEvent: "book-flight",
        children: [
          {
            type: "text-field",
            id: "from",
            label: "From",
            value: "",
            placeholder: "Origin city",
          },
          {
            type: "text-field",
            id: "to",
            label: "To",
            value: "",
            placeholder: "Destination city",
          },
          {
            type: "text-field",
            id: "date",
            label: "Date",
            value: "",
            fieldType: "text",
            placeholder: "YYYY-MM-DD",
          },
          {
            type: "button",
            id: "book-btn",
            label: "Search Flights",
            event: "book-flight",
            variant: "primary",
          },
        ],
      },
    ],
  },
};
