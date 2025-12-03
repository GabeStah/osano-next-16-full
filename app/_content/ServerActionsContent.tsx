import { Suspense } from "react";
import { getMessages } from "../_actions/messageActions";
import MessageForm from "./server-actions/MessageForm";
import MessageList from "./server-actions/MessageList";

export default async function ServerActionsContent() {
  const messages = await getMessages();

  return (
    <div>
      <h1>Next.js Server Actions</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Server Actions allow you to call server-side functions directly from client 
        components, with automatic form handling and data revalidation.
      </p>

      <div className="card">
        <h3 className="card-title"><span>🎯</span> How It Works</h3>
        <pre>{`// actions.ts
"use server";

import { revalidatePath } from 'next/cache';

export async function addMessage(formData: FormData) {
  const text = formData.get("message");
  await db.messages.create({ text });
  
  revalidatePath('/messages');
  return { success: true };
}

// Component can call directly
<form action={addMessage}>
  <input name="message" />
  <button type="submit">Send</button>
</form>`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title"><span>🧪</span> Live Demo - Message Board</h3>
        <p className="card-description">
          Add and delete messages using Server Actions. The page automatically revalidates.
        </p>
        <MessageForm />
        <Suspense fallback={<div className="demo-box loading"><p>Loading messages...</p></div>}>
          <MessageList messages={messages} />
        </Suspense>
      </div>

      <div className="card">
        <h3 className="card-title"><span>🔬</span> Server Component Info</h3>
        <div className="demo-box">
          <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
            This page is a <strong>Server Component</strong>. Data fetched at: <code>{new Date().toISOString()}</code>
          </p>
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
            Message count: <code>{messages.length}</code>
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><span>✨</span> Key Features</h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>Direct server function calls - no API routes needed</li>
          <li>Automatic form data parsing with FormData</li>
          <li><code>revalidatePath</code> / <code>revalidateTag</code> for cache control</li>
          <li>Works with <code>useActionState</code> for pending states</li>
          <li>Progressive enhancement - works without JavaScript</li>
        </ul>
      </div>
    </div>
  );
}

