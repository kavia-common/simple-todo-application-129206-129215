import React from "react";
import { Colors, Fonts, Spacing, Shadows } from "../theme";

/**
 * PUBLIC_INTERFACE
 * Header
 * Renders the header with application title.
 */
export const Header: React.FC = () => {
  return (
    <header
      style={{
        background: Colors.background,
        padding: `${Spacing.lg}px ${Spacing.lg}px ${Spacing.md}px`,
        borderBottom: `1px solid ${Colors.divider}`,
        boxShadow: Shadows.sm,
      }}
    >
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: Spacing.md,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: Fonts.family,
            color: Colors.primary,
            fontSize: 28,
            letterSpacing: 0.3,
          }}
        >
          Simple Todo
        </h1>
        <div
          aria-hidden
          style={{
            width: 56,
            height: 6,
            borderRadius: 999,
            background:
              `linear-gradient(90deg, ${Colors.primary}, ${Colors.accent})`,
          }}
        />
      </div>
    </header>
  );
};
