import React from "react";
import { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";
import { Fonts, Spacing, Colors } from "../theme";

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Renders a list of todos or an empty state.
 */
export const TodoList: React.FC<{
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          color: Colors.textSecondary,
          fontFamily: Fonts.family,
          padding: `${Spacing.lg}px 0`,
        }}
      >
        No todos yet. Add your first task!
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: Spacing.sm }}>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
