import React, { useState } from "react";
import { Colors, Fonts, Spacing, Radii, Shadows } from "../theme";

/**
 * PUBLIC_INTERFACE
 * NewTodoInput
 * Controlled input with submit button to add a new todo.
 */
export const NewTodoInput: React.FC<{
  onAdd: (title: string) => void;
}> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: Spacing.sm,
        width: "100%",
        alignItems: "center",
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New todo title"
        style={{
          flex: 1,
          padding: `${Spacing.sm + 2}px ${Spacing.md}px`,
          fontFamily: Fonts.family,
          fontSize: Fonts.size.lg,
          borderRadius: Radii.md,
          border: `1px solid ${Colors.divider}`,
          outline: "none",
          boxShadow: Shadows.sm,
        }}
      />
      <button
        type="submit"
        style={{
          padding: `${Spacing.sm + 2}px ${Spacing.lg}px`,
          fontFamily: Fonts.family,
          fontWeight: 600,
          color: "#fff",
          background: Colors.primary,
          border: "none",
          borderRadius: Radii.md,
          cursor: "pointer",
          boxShadow: Shadows.md,
        }}
      >
        Add
      </button>
    </form>
  );
};
