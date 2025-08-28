export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type NewTodo = {
  title: string;
};

export type UpdateTodo = Partial<Pick<Todo, "title" | "completed">>;

export type TodoFilter = "all" | "active" | "completed";

/**
 * PUBLIC_INTERFACE
 * filterTodos
 * Client-side filter utility in case the backend does not support filtering.
 */
export function filterTodos(list: Todo[], filter: TodoFilter): Todo[] {
  if (filter === "all") return list;
  if (filter === "active") return list.filter((t) => !t.completed);
  return list.filter((t) => t.completed);
}
