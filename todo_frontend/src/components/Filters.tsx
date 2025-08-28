import React from "react";
import { TodoFilter } from "../types/todo";
import { Colors, Fonts, Spacing } from "../theme";

/**
 * PUBLIC_INTERFACE
 * Filters
 * Simple segmented control for choosing todo filter.
 */
export const Filters: React.FC<{
  value: TodoFilter;
  onChange: (value: TodoFilter) => void;
}> = ({ value, onChange }) => {
  const options: TodoFilter[] = ["all", "active", "completed"];
  return (
    <div
      role="tablist"
      aria-label="Todo filter"
      style={{
        display: "inline-flex",
        background: "#fff",
        border: `1px solid ${Colors.divider}`,
        borderRadius: 999,
        padding: 2,
        gap: 4,
      }}
    >
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt)}
            style={{
              padding: `${Spacing.xs + 2}px ${Spacing.md}px`,
              fontFamily: Fonts.family,
              fontSize: Fonts.size.md,
              color: selected ? "#fff" : Colors.textSecondary,
              background: selected ? Colors.secondary : "transparent",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            {opt[0].toUpperCase() + opt.slice(1)}
          </button>
        );
      })}
    </div>
  );
};
