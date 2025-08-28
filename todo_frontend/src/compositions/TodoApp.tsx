import React, { useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Header } from "../components/Header";
import { NewTodoInput } from "../components/NewTodoInput";
import { Filters } from "../components/Filters";
import { TodoList } from "../components/TodoList";
import { Colors, Fonts, Spacing } from "../theme";
import { Todo, TodoFilter, filterTodos } from "../types/todo";
import { createTodo, deleteTodoById, listTodos, updateTodo } from "../services/api";
import { z } from "zod";

/**
 * PUBLIC_INTERFACE
 * TodoAppPropsSchema
 * Remotion props validation for configuring the composition.
 */
export const TodoAppPropsSchema = z.object({
  title: z.string().default("Simple Todo"),
  primaryColor: z.string().default("#1976D2"),
  secondaryColor: z.string().default("#424242"),
  accentColor: z.string().default("#FF4081"),
  initialFilter: z.union([z.literal("all"), z.literal("active"), z.literal("completed")]).default("all"),
});

type Props = z.infer<typeof TodoAppPropsSchema>;

/**
 * PUBLIC_INTERFACE
 * TodoApp
 * The main Todo application composition.
 * It demonstrates the UI and integrates with a REST backend through service functions.
 */
export const TodoApp: React.FC<Props> = ({
  title,
  primaryColor,
  secondaryColor,
  accentColor,
  initialFilter,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Allow theme override via props
  const themed = useMemo(
    () => ({
      headerColor: primaryColor || Colors.primary,
      textColor: Colors.textPrimary,
      accent: accentColor || Colors.accent,
      secondary: secondaryColor || Colors.secondary,
    }),
    [primaryColor, secondaryColor, accentColor]
  );

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>(initialFilter);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState<string | null>(null);

  // Initial data fetch
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await listTodos(filter === "all" ? "all" : filter);
        if (!cancelled) {
          setTodos(data);
          setError(null);
        }
      } catch (err: any) {
        if (!cancelled) {
          // Not fatal for composition demo, show message but allow UI
          setError(err?.message || "Failed to load todos.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []); // load once

  const addTodo = async (title: string) => {
    try {
      const created = await createTodo({ title });
      setTodos((prev) => [created, ...prev]);
    } catch (err: any) {
      setError(err?.message || "Failed to add todo.");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      setError(err?.message || "Failed to update todo.");
    }
  };

  const editTodo = async (id: string, title: string) => {
    try {
      const updated = await updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      setError(err?.message || "Failed to edit todo.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoById(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err?.message || "Failed to delete todo.");
    }
  };

  // Basic enter/exit fade for the whole app
  const containerOpacity = interpolate(
    frame,
    [0, 15, durationInFrames - 20, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const filtered = filterTodos(todos, filter);

  return (
    <AbsoluteFill style={{ background: "#F7F9FC", opacity: containerOpacity }}>
      <Sequence from={0}>
        <div style={{ borderBottom: `4px solid ${themed.accent}` }}>
          <Header />
        </div>
      </Sequence>

      <Sequence from={8}>
        <div
          style={{
            maxWidth: 820,
            margin: "24px auto 0 auto",
            padding: `0 ${Spacing.lg}px`,
          }}
        >
          <div
            style={{
              display: "grid",
              gap: Spacing.lg,
              background: "#FFFFFF",
              padding: Spacing.lg,
              borderRadius: 12,
              border: `1px solid #EDF0F5`,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: Fonts.family,
                color: themed.headerColor,
                fontSize: 22,
                letterSpacing: 0.2,
              }}
            >
              {title}
            </h2>

            <NewTodoInput onAdd={addTodo} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: Spacing.md,
              }}
            >
              <span
                style={{
                  fontFamily: Fonts.family,
                  color: "#75809A",
                  fontSize: 13,
                }}
              >
                Filter
              </span>
              <Filters value={filter} onChange={setFilter} />
            </div>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "36px 0",
                  color: "#75809A",
                  fontFamily: Fonts.family,
                }}
              >
                Loading todos...
              </div>
            ) : (
              <TodoList
                todos={filtered}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            )}

            {errorMsg ? (
              <div
                role="alert"
                style={{
                  background: "#FFF5F5",
                  border: "1px solid #FED7D7",
                  color: "#C53030",
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontFamily: Fonts.family,
                  fontSize: 13,
                }}
              >
                {errorMsg}
              </div>
            ) : null}
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
