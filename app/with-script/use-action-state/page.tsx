"use client";

import { useActionState } from "react";
import { submitFormAction, type FormState } from "./actions";

const initialState: FormState = {
  message: "",
  status: "idle",
};

export default function UseActionStatePage() {
  const [state, formAction, isPending] = useActionState(submitFormAction, initialState);

  return (
    <div>
      <h1>React 19 useActionState</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        The <code>useActionState</code> hook manages form state with Server Actions, 
        providing loading states and progressive enhancement.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>🎯</span>
          How It Works
        </h3>
        <pre>{`// React 19's useActionState hook
import { useActionState } from 'react';

function Form() {
  const [state, formAction, isPending] = useActionState(
    serverAction,
    initialState
  );
  
  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Live Demo
        </h3>
        <p className="card-description">
          Submit the form to see <code>useActionState</code> in action with a Server Action.
        </p>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              style={{ width: "100%", maxWidth: 400 }}
              disabled={isPending}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              style={{ width: "100%", maxWidth: 400 }}
              disabled={isPending}
            />
          </div>

          <div>
            <button type="submit" className="btn-primary" disabled={isPending}>
              {isPending ? "⏳ Submitting..." : "Submit Form"}
            </button>
          </div>

          {state.status !== "idle" && (
            <div
              className={`demo-box`}
              style={{
                borderColor:
                  state.status === "success"
                    ? "rgba(0, 255, 127, 0.3)"
                    : "rgba(255, 82, 82, 0.3)",
              }}
            >
              <span
                className={`status-badge ${
                  state.status === "success" ? "status-success" : "status-error"
                }`}
              >
                {state.status === "success" ? "✓ Success" : "✗ Error"}
              </span>
              <p style={{ margin: "0.75rem 0 0", color: "rgba(255,255,255,0.8)" }}>
                {state.message}
              </p>
            </div>
          )}
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>✨</span>
          Key Features
        </h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li><code>isPending</code> - Built-in loading state for the action</li>
          <li><code>formAction</code> - Passes form data to your Server Action</li>
          <li><code>state</code> - Previous action result for showing messages</li>
          <li>Works with progressive enhancement (no JS required)</li>
          <li>Automatically revalidates after action completes</li>
        </ul>
      </div>
    </div>
  );
}

