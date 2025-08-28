import React, { useState } from "react";
import { Todo } from "../types/todo";
import { Colors, Fonts, Spacing, Radii } from "../theme";

/**
 * PUBLIC_INTERFACE
 * TodoItem
 * Renders a single todo with edit, complete toggle, and delete.
 */
export const TodoItem: React.FC<{
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const confirmEdit = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    } else {
      setTitle(todo.title);
    }
    setEditing(false);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: Spacing.md,
        padding: `${Spacing.sm + 2}px ${Spacing.md}px`,
        border: `1px solid ${Colors.divider}`,
        borderRadius: Radii.md,
        background: "#fff",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
      />
      {isEditing ? (
        <input
          autoFocus
          value={title}
          onBlur={confirmEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmEdit();
            if (e.key === "Escape") {
              setTitle(todo.title);
              setEditing(false);
            }
          }}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            border: `1px solid ${Colors.divider}`,
            borderRadius: Radii.sm,
            padding: `${Spacing.xs + 1}px ${Spacing.sm}px`,
            fontFamily: Fonts.family,
            fontSize: Fonts.size.lg,
          }}
        />
      ) : (
        <button
          onClick={() => setEditing(true)}
          title="Edit todo"
          style={{
            textAlign: "left",
            background: "transparent",
            border: "none",
            padding: 0,
            margin: 0,
            fontFamily: Fonts.family,
            fontSize: Fonts.size.lg,
            color: todo.completed ? Colors.textSecondary : Colors.textPrimary,
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: "text",
          }}
        >
          {todo.title}
        </button>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        title="Delete todo"
        style={{
          color: "#fff",
          background: Colors.accent,
          border: "none",
          borderRadius: Radii.sm,
          padding: `${Spacing.xs}px ${Spacing.sm}px`,
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};
