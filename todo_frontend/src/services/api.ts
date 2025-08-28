import { Todo, TodoFilter, NewTodo, UpdateTodo } from "../types/todo";

/**
 * PUBLIC_INTERFACE
 * getApiBaseUrl
 * Returns the base URL for the backend API from environment or defaults.
 */
export function getApiBaseUrl(): string {
  // Prefer Vite-style env via import.meta.env when available
  let fromVite = "";
  try {
    const anyImportMeta = import.meta as unknown as { env?: Record<string, string> };
    if (anyImportMeta && anyImportMeta.env && typeof anyImportMeta.env.VITE_API_BASE_URL === "string") {
      fromVite = anyImportMeta.env.VITE_API_BASE_URL;
    }
  } catch {
    // ignore if import.meta is not available
  }
  const base = fromVite || "/api"; // fallback to /api if not set
  return String(base);
}

/**
 * Safely retrieve globals (fetch, URL) using only globalThis to avoid no-undef.
 * Note: We intentionally avoid using the global types in annotations to satisfy ESLint no-undef.
 */
function getFetch(): any | undefined {
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  if (g && typeof g.fetch === "function") return g.fetch.bind(g);
  return undefined;
}

function getURLCtor(): any | undefined {
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  if (g && typeof g.URL === "function") return g.URL;
  return undefined;
}

/**
 * PUBLIC_INTERFACE
 * listTodos
 * Fetch a list of todos with optional filter.
 */
export async function listTodos(filter: TodoFilter = "all"): Promise<Todo[]> {
  const base = getApiBaseUrl();
  const baseUrl = `${base}/todos`;

  const URLCtor = getURLCtor();
  if (!URLCtor) {
    throw new Error("URL API is not available in this environment.");
  }
  const url = new URLCtor(baseUrl);
  if (filter !== "all") {
    url.searchParams.set("completed", String(filter === "completed"));
  }

  const f = getFetch();
  if (!f) {
    throw new Error("Fetch API is not available in this environment.");
  }
  const res = await f(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Failed to list todos: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/**
 * PUBLIC_INTERFACE
 * createTodo
 * Create a new todo.
 */
export async function createTodo(payload: NewTodo): Promise<Todo> {
  const base = getApiBaseUrl();
  const f = getFetch();
  if (!f) {
    throw new Error("Fetch API is not available in this environment.");
  }
  const res = await f(`${base}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create todo: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<Todo>;
}

/**
 * PUBLIC_INTERFACE
 * updateTodo
 * Update a todo by id.
 */
export async function updateTodo(id: string, payload: UpdateTodo): Promise<Todo> {
  const base = getApiBaseUrl();
  const f = getFetch();
  if (!f) {
    throw new Error("Fetch API is not available in this environment.");
  }
  const res = await f(`${base}/todos/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to update todo: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<Todo>;
}

/**
 * PUBLIC_INTERFACE
 * deleteTodo
 * Delete a todo by id.
 */
export async function deleteTodoById(id: string): Promise<void> {
  const base = getApiBaseUrl();
  const f = getFetch();
  if (!f) {
    throw new Error("Fetch API is not available in this environment.");
  }
  const res = await f(`${base}/todos/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete todo: ${res.status} ${res.statusText}`);
  }
}
