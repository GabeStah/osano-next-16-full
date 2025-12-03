"use client";

import { useOptimistic, useState, useTransition } from "react";

type Todo = { id: number; text: string; completed: boolean; pending?: boolean };

async function toggleTodoServer(id: number, completed: boolean): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.1) throw new Error("Network error");
  return completed;
}

async function addTodoServer(text: string): Promise<Todo> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { id: Date.now(), text, completed: false };
}

const initialTodos: Todo[] = [
  { id: 1, text: "Learn React 19 features", completed: true },
  { id: 2, text: "Try useOptimistic hook", completed: false },
  { id: 3, text: "Build something awesome", completed: false },
];

export default function UseOptimisticContent() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isPending, startTransition] = useTransition();
  const [newTodo, setNewTodo] = useState("");

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], update: { type: "toggle"; id: number } | { type: "add"; todo: Todo }) => {
      if (update.type === "toggle") {
        return state.map((todo) => todo.id === update.id ? { ...todo, completed: !todo.completed, pending: true } : todo);
      }
      if (update.type === "add") {
        return [...state, { ...update.todo, pending: true }];
      }
      return state;
    }
  );

  const handleToggle = async (id: number, currentCompleted: boolean) => {
    startTransition(async () => {
      addOptimisticTodo({ type: "toggle", id });
      try {
        await toggleTodoServer(id, !currentCompleted);
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
      } catch (error) {
        console.error("Failed to toggle todo:", error);
      }
    });
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const tempTodo: Todo = { id: Date.now(), text: newTodo, completed: false, pending: true };
    startTransition(async () => {
      addOptimisticTodo({ type: "add", todo: tempTodo });
      setNewTodo("");
      try {
        const savedTodo = await addTodoServer(newTodo);
        setTodos((prev) => [...prev, savedTodo]);
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    });
  };

  return (
    <div>
      <h1>React 19 useOptimistic</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        The <code>useOptimistic</code> hook provides instant UI feedback while async 
        operations complete, automatically reverting on failure.
      </p>

      <div className="card">
        <h3 className="card-title"><span>🎯</span> How It Works</h3>
        <pre>{`// React 19's useOptimistic hook
const [optimisticData, addOptimistic] = useOptimistic(
  data,
  (currentState, optimisticValue) => {
    return [...currentState, optimisticValue];
  }
);

startTransition(async () => {
  addOptimistic(newItem);
  await saveToServer(newItem);
  setData(prev => [...prev, newItem]);
});`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title"><span>🧪</span> Live Demo - Optimistic Todo List</h3>
        <p className="card-description">Toggle todos or add new ones. Notice the instant feedback!</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo..." style={{ flex: 1 }} onKeyDown={(e) => e.key === "Enter" && handleAddTodo()} />
          <button className="btn-primary" onClick={handleAddTodo} disabled={!newTodo.trim()}>Add Todo</button>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {optimisticTodos.map((todo) => (
            <li key={todo.id} onClick={() => handleToggle(todo.id, todo.completed)} style={{ padding: "0.75rem 1rem", background: todo.pending ? "rgba(255, 193, 7, 0.1)" : "rgba(255, 255, 255, 0.05)", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.75rem", opacity: todo.pending ? 0.7 : 1 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid", borderColor: todo.completed ? "#00ff7f" : "rgba(255,255,255,0.3)", background: todo.completed ? "#00ff7f" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#000" }}>{todo.completed && "✓"}</span>
              <span style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)", flex: 1 }}>{todo.text}</span>
              {todo.pending && <span className="status-badge status-pending">Syncing...</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title"><span>✨</span> Key Benefits</h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>Instant UI feedback - no waiting for server response</li>
          <li>Automatic rollback on error</li>
          <li>Works seamlessly with <code>useTransition</code></li>
          <li>Maintains data integrity with the server</li>
          <li>Great for likes, toggles, and real-time interactions</li>
        </ul>
      </div>
    </div>
  );
}

