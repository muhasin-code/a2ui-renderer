# A2UI Renderer

**A React + TypeScript + Tailwind CSS renderer for A2UI (Agent‑to‑User Interface) payloads, packaged with an interactive chatbot demo.**

---

## What This Project Demonstrates

This project was built as a take‑home assignment for an AI Developer role at C3A Labs. It implements a **recursive renderer** that consumes structured JSON payloads describing a user interface (a simplified version of Google’s A2UI concept) and turns them into live, interactive React components.

The core ideas showcased:

- **Type‑driven design** – every component shape is defined as a discriminated TypeScript union, making the renderer self‑documenting and type‑safe.
- **Registry pattern** – a simple map from component type strings to React components allows the renderer to be easily extended.
- **Recursive rendering** – composite components (`container`, `card`, `form`) recursively render their children through the same renderer.
- **Shared state via React Context** – form fields are controlled by a single state object lifted into the renderer root and exposed through context, avoiding deep prop‑drilling.
- **Mock agent integration** – a chatbot shell simulates an AI agent that returns A2UI payloads based on keyword matching, demonstrating the full loop: text input → payload delivery → interactive UI → event feedback.

---

## Setup & Running Locally

### Prerequisites

- **Node.js** version 18 or higher (comes with `npm`)
- **Git** (to clone the repo)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/muhsin-code/a2ui-renderer.git
cd a2ui-renderer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser to **http://localhost:5173** – you’ll see the chatbot interface.

### Build for Production

```bash
npm run build
npm run preview   # serves the production build locally
```

---

## Architecture Overview

### Type Contract (`src/types/a2ui.ts`)

All possible UI components are defined as a **discriminated union** on the `type` property. Supported types:

| Type          | Description                           | Can have children? |
|---------------|---------------------------------------|-------------------|
| `container`   | Flex layout wrapper (row/column)      | ✅                |
| `card`        | Bordered container with optional title | ✅                |
| `text`        | Static text (heading/body/caption)    | ❌                |
| `button`      | Clickable button with event name      | ❌                |
| `text-field`  | Controlled form input                 | ❌                |
| `form`        | Form that collects child field values  | ✅                |

The top‑level payload wrapper is:

```ts
interface A2UIPayload {
  root: A2UIComponent;
}
```

### Recursive Renderer

1. **Registry** (`src/renderer/registry.tsx`) – a `Record<string, React.FC>` that maps the string discriminant (e.g. `"text"`) to the corresponding React component.
2. **Root Renderer** (`src/renderer/A2UIRenderer.tsx`) – creates a React Context that holds:
   - `formState` – a key‑value store of all field values (keyed by component `id`)
   - `setFormValue` – updater function for a single field
   - `triggerEvent` – fires a named event (e.g. `"login"`, `"ok"`) with optional data
3. **Node Renderer** (`src/renderer/A2UINode.tsx`) – recursively renders a single component node by looking up its `type` in the registry, then passes the full node object as props. Composite components use `A2UINode` to render each child, keeping everything inside the same context.

### Component Tree

Each component (`Container`, `Card`, `Text`, etc.) is a small, presentational React component. Interactive ones (`TextField`, `Button`, `Form`) consume the shared context via the custom hook `useA2UIContext()`.

### Chatbot Shell

- **`ChatWindow`** – manages the message list, user input, and communication with the mock agent.
- **`MessageBubble`** – displays a chat message. If the message contains an A2UI payload, it renders the whole tree inside the bubble, wrapped in an error boundary.
- **`mockAgent`** – a fake async function that accepts a user string, matches keywords (`"book"`, `"status"`), and returns a pre‑defined payload (flight booking form or order status card) after a 1‑second delay.

### Data Flow

```
User types message
       │
       ▼
ChatWindow calls mockAgent(userMessage)
       │
       ▼
Agent returns A2UIPayload
       │
       ▼
Payload validated (runtime check)
       │
       ▼
New agent message added with payload
       │
       ▼
MessageBubble renders <A2UIRenderer component={payload.root} onEvent={...}>
       │
       ▼
Recursive rendering builds the interactive UI
       │
       ▼
User interacts → event fires → ChatWindow receives it → feedback message added
```

---

## Implemented Features

- ✅ Six A2UI component types fully implemented and styled with Tailwind CSS
- ✅ Recursive renderer with type‑safe component lookup
- ✅ Shared form state via React Context (controlled inputs)
- ✅ Button click and form submit event handling
- ✅ Mock agent that returns dynamic A2UI payloads based on keywords
- ✅ Chat interface with user/agent message bubbles
- ✅ Error boundary around each embedded A2UI renderer
- ✅ Runtime payload validation (catches missing fields, invalid types, leaf nodes with children)
- ✅ Responsive design (works on mobile screens, containers wrap)
- ✅ Skeleton loading state while the mock agent “thinks”
- ✅ Clean commit history showing incremental progress

---

## Bonus Features Attempted

- **Error handling** – custom `ErrorBoundary` class component with fallback UI
- **Validation** – lightweight structural validation of payloads without external libraries
- **Styling polish** – responsive layout, loading skeletons, consistent spacing and color variants

---

## Assumptions Made

- The `direction` prop on `Container` is optional and defaults to `"column"`.
- `Button` and `Text` can have a `variant` prop (`primary`/`secondary` for buttons, `heading`/`body`/`caption` for text).
- `TextField` uses standard HTML input types (`text`, `email`, `password`, `number`).
- `Form` always fires its `submitEvent` with the entire `formState` object; no field‑level validation is performed.
- The mock agent only matches a few keywords; a real agent would use NLP or a deterministic mapping.
- The chat window displays event feedback as plain text messages; a production version might use toasts or dedicated UI.

---

## Project Structure

```
src/
├── agent/
│   ├── mockAgent.ts            # keyword‑based agent
│   └── payloads/
│       ├── bookingForm.ts      # flight booking payload
│       └── statusCard.ts       # order status card payload
├── chat/
│   ├── ChatWindow.tsx          # main chat container
│   ├── MessageBubble.tsx       # single message (user or agent)
│   └── types.ts                # chat Message type
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── ErrorBoundary.tsx       # error boundary
│   ├── Form.tsx
│   ├── Text.tsx
│   └── TextField.tsx
├── renderer/
│   ├── A2UIContext.ts          # context + custom hook
│   ├── A2UINode.tsx            # single‑node renderer (no context)
│   ├── A2UIRenderer.tsx        # root renderer (provides context)
│   └── registry.tsx            # component type → React component map
├── types/
│   └── a2ui.ts                 # all A2UI TypeScript definitions
├── validation/
│   └── validatePayload.ts      # runtime payload validator
├── App.tsx                     # top‑level app (renders ChatWindow)
├── main.tsx                    # React entry point
└── index.css                   # Tailwind import
```

---

## Technologies Used

- **React 19** (via Vite template)
- **TypeScript 5**
- **Tailwind CSS 4** (with Vite plugin)
- **Vite 6** (build tool)
- No other external dependencies
