"use server";

import { revalidatePath } from "next/cache";

// Simulated database
let messages: { id: number; text: string; createdAt: string }[] = [
  { id: 1, text: "Welcome to the Server Actions demo!", createdAt: new Date().toISOString() },
];

export async function getMessages() {
  // Simulate database read
  await new Promise((resolve) => setTimeout(resolve, 100));
  return messages;
}

export async function addMessage(formData: FormData) {
  const text = formData.get("message") as string;
  
  if (!text?.trim()) {
    return { error: "Message cannot be empty" };
  }
  
  // Simulate database write
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const newMessage = {
    id: Date.now(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
  
  messages = [...messages, newMessage];
  
  // Revalidate to refetch data
  revalidatePath("/with-script/server-actions");
  
  return { success: true, message: newMessage };
}

export async function deleteMessage(id: number) {
  // Simulate database delete
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  messages = messages.filter((m) => m.id !== id);
  
  revalidatePath("/with-script/server-actions");
  
  return { success: true };
}

export async function clearAllMessages() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  messages = [];
  
  revalidatePath("/with-script/server-actions");
  
  return { success: true };
}

