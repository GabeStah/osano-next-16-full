"use client";

import { useFormStatus } from "react-dom";
import { useState, useTransition } from "react";

// Simulated async form submission
async function submitForm(formData: FormData): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const email = formData.get("email") as string;
  const subscribe = formData.get("subscribe") === "on";
  
  return {
    success: true,
    message: `Successfully submitted for ${email}${subscribe ? " with newsletter subscription" : ""}!`,
  };
}

// Submit button that reads form status
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <div>
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? (
          <>
            <span className="loading" style={{ marginRight: "0.5rem" }}>⏳</span>
            Submitting...
          </>
        ) : (
          "Submit Form"
        )}
      </button>
      
      {pending && (
        <div style={{ marginTop: "1rem" }}>
          <span className="status-badge status-pending">Form is pending...</span>
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
            Method: <code>{method}</code>
          </p>
        </div>
      )}
    </div>
  );
}

// Input that disables during submission
function FormInput({ name, type = "text", placeholder, required = false }: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  const { pending } = useFormStatus();
  
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      disabled={pending}
      style={{
        width: "100%",
        maxWidth: 400,
        opacity: pending ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}
    />
  );
}

// Checkbox that shows pending state
function FormCheckbox({ name, label }: { name: string; label: string }) {
  const { pending } = useFormStatus();
  
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.6 : 1,
      }}
    >
      <input type="checkbox" name={name} disabled={pending} />
      <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>{label}</span>
    </label>
  );
}

export default function FormStatusPage() {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    const response = await submitForm(formData);
    setResult(response);
  }

  return (
    <div>
      <h1>React 19 useFormStatus</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        The <code>useFormStatus</code> hook lets child components access the 
        pending state of their parent form, enabling smart UI updates.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>🎯</span>
          How It Works
        </h3>
        <pre>{`// useFormStatus MUST be used in a child component
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  // Reads status from parent <form>
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Usage
<form action={serverAction}>
  <input name="email" />
  <SubmitButton /> {/* Automatically knows form state */}
</form>`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Live Demo
        </h3>
        <p className="card-description">
          Submit the form to see how child components automatically react to the form's pending state.
        </p>

        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Email Address
            </label>
            <FormInput name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Full Name
            </label>
            <FormInput name="name" placeholder="John Doe" required />
          </div>

          <FormCheckbox name="subscribe" label="Subscribe to newsletter" />

          <SubmitButton />

          {result && (
            <div className="demo-box" style={{ borderColor: "rgba(0, 255, 127, 0.3)" }}>
              <span className="status-badge status-success">✓ Submitted</span>
              <p style={{ margin: "0.75rem 0 0", color: "rgba(255,255,255,0.8)" }}>
                {result.message}
              </p>
            </div>
          )}
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>📋</span>
          useFormStatus Returns
        </h3>
        <div className="demo-box">
          <ul style={{ margin: 0, padding: "0 0 0 1.25rem", lineHeight: 2 }}>
            <li><code>pending</code> - boolean, true while form is submitting</li>
            <li><code>data</code> - FormData being submitted (or null)</li>
            <li><code>method</code> - HTTP method (usually "post")</li>
            <li><code>action</code> - The form's action function/URL</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>✨</span>
          Key Benefits
        </h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>No prop drilling - child components access form state directly</li>
          <li>Automatic pending state from React's form handling</li>
          <li>Works with Server Actions and client actions</li>
          <li>Progressive enhancement friendly</li>
          <li>Access to form data during submission</li>
        </ul>
      </div>
    </div>
  );
}

