"use client";

import { useTransition } from "react";
import { deleteMessage } from "../../_actions/messageActions";

type Message = { id: number; text: string; createdAt: string };

export default function MessageList({ messages }: { messages: Message[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => { await deleteMessage(id); });
  };

  if (messages.length === 0) {
    return (
      <div className="demo-box">
        <p style={{ margin: 0, textAlign: "center", color: "rgba(255,255,255,0.5)" }}>No messages yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="demo-box" style={{ opacity: isPending ? 0.7 : 1 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {messages.map((message) => (
          <li key={message.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>{message.text}</p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{new Date(message.createdAt).toLocaleTimeString()}</p>
            </div>
            <button onClick={() => handleDelete(message.id)} disabled={isPending} style={{ background: "rgba(255, 82, 82, 0.15)", border: "none", borderRadius: 4, padding: "0.25rem 0.5rem", color: "#ff5252", fontSize: "0.8rem", cursor: "pointer" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

