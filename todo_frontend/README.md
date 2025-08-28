# Remotion Todo Frontend

This container implements a Todo UI as a Remotion composition. It’s designed to be minimalistic and light-themed, with a header, input for new todos, a list view supporting edit/delete/toggle, and filter controls.

## Quick Start

Install
```bash
npm i
```

Run Remotion Studio (preview)
```bash
npm run dev
```

Render the Todo video
```bash
# Renders the TodoApp composition with defaults:
npx remotion render src/index.ts TodoApp out/todo.mp4
```

## Compositions

- TodoApp (main)
  - id: `TodoApp`
  - default props:
    - title: "Simple Todo"
    - primaryColor: "#1976D2"
    - secondaryColor: "#424242"
    - accentColor: "#FF4081"
    - initialFilter: "all"
- HelloWorld (template/reference)
- OnlyLogo (template/reference)

## REST API Integration

The UI uses a simple REST service layer in `src/services/api.ts`:

- GET `${VITE_API_BASE_URL}/todos?completed=true|false` (or `/todos` without param)
- POST `${VITE_API_BASE_URL}/todos`  body: `{ "title": "..." }`
- PATCH `${VITE_API_BASE_URL}/todos/:id` body: `{ "title"?, "completed"? }`
- DELETE `${VITE_API_BASE_URL}/todos/:id`

Environment variable (must be provided by orchestrator via `.env`):
- `VITE_API_BASE_URL` — Example: `https://api.example.com`
  - If not set, the app falls back to `/api` assuming a reverse proxy in dev.

We do not read `.env` directly. Supply env via the runtime’s mechanism. For Vite/Remotion Studio, `import.meta.env.VITE_API_BASE_URL` will be used automatically.

## Project Structure

- `src/compositions/TodoApp.tsx` — Main Remotion composition.
- `src/components/*` — Header, NewTodoInput, Filters, TodoList, TodoItem.
- `src/services/api.ts` — REST functions; no hard-coded URLs.
- `src/types/todo.ts` — Shared types and helpers.
- `src/theme.ts` — Colors, spacing, radii, fonts, shadows.

## Figma and Preview Assets

Place Figma and preview files in the `assets/` folder at the workspace root:
- `assets/figma/` — Put `.fig`, `.figma`, `.pdf`, or export notes.
- `assets/previews/` — Put `todo_preview.png` or `todo_preview.mp4`.

These directories are not created by default; create them if needed and drop in your assets. The project is structured so future agents can copy files into these folders without code changes.

## Notes

- UI is accessible and keyboard-friendly for edits.
- Minimal animations are used to keep the focus on content.
- If the backend is unavailable, the UI will show a non-fatal error message banner.

## Commands

Upgrade Remotion
```bash
npx remotion upgrade
```

Lint
```bash
npm run lint
```

Docs: https://www.remotion.dev/docs/the-fundamentals

Issues: https://github.com/remotion-dev/remotion/issues/new

License: For certain entities a company license may be needed. See https://github.com/remotion-dev/remotion/blob/main/LICENSE.md
