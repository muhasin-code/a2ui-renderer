import type { A2UIPayload } from "../../types/a2ui";

export const statusCardPayload: A2UIPayload = {
  root: {
    type: "card",
    id: "status-card",
    title: "Order Status",
    children: [
      {
        type: "text",
        id: "status-info",
        content: "Your order #12345 has been shipped.",
        variant: "body",
      },
      {
        type: "container",
        id: "action-row",
        direction: "row",
        children: [
          {
            type: "button",
            id: "track-btn",
            label: "Track Package",
            event: "track-order",
            variant: "primary",
          },
          {
            type: "button",
            id: "cancel-btn",
            label: "Cancel Order",
            event: "cancel-order",
            variant: "secondary",
          },
        ],
      },
    ],
  },
};
