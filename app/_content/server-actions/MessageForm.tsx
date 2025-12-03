"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addMessage, clearAllMessages } from "../../_actions/messageActions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "⏳ Sending..." : "Send Message"}
    </button>
  );
}

function ClearButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-secondary" disabled={pending}>
      {pending ? "⏳ Clearing..." : "Clear All"}
    </button>
  );
}

export default function MessageForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await addMessage(formData);
    if (result.success) formRef.current?.reset();
  }

  async function handleClear() {
    await clearAllMessages();
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <form ref={formRef} action={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <input type="text" name="message" placeholder="Type a message..." style={{ flex: 1 }} autoComplete="off" />
        <SubmitButton />
      </form>
      <form action={handleClear}>
        <ClearButton />
      </form>
    </div>
  );
}

