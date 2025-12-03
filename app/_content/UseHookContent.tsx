"use client";

import { Suspense, use, useState } from "react";

function createPromise<T>(data: T, delay: number = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

const promiseCache = new Map<string, Promise<any>>();

function getOrCreatePromise<T>(key: string, factory: () => Promise<T>): Promise<T> {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, factory());
  }
  return promiseCache.get(key)!;
}

function UserProfile({ userId }: { userId: string }) {
  const userPromise = getOrCreatePromise(`user-${userId}`, () =>
    createPromise(
      {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        role: "Developer",
        joined: new Date().toLocaleDateString(),
      },
      1500
    )
  );

  const user = use(userPromise);

  return (
    <div className="demo-box">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00d9ff, #00ff88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {user.name[0]}
        </div>
        <div>
          <h4 style={{ margin: 0, color: "#fff" }}>{user.name}</h4>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
            {user.email}
          </p>
        </div>
      </div>
      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
          Role: <span style={{ color: "#00d9ff" }}>{user.role}</span> · Joined: {user.joined}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="demo-box loading">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        <div>
          <div style={{ width: 120, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.1)", marginBottom: 8 }} />
          <div style={{ width: 180, height: 12, borderRadius: 4, background: "rgba(255,255,255,0.1)" }} />
        </div>
      </div>
    </div>
  );
}

export default function UseHookContent() {
  const [userId, setUserId] = useState("1");
  const [key, setKey] = useState(0);

  const refreshUser = (newId: string) => {
    promiseCache.delete(`user-${newId}`);
    setUserId(newId);
    setKey((k) => k + 1);
  };

  return (
    <div>
      <h1>React 19 use() Hook</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        The <code>use()</code> hook lets you read promises directly in render, 
        integrating with Suspense for loading states.
      </p>

      <div className="card">
        <h3 className="card-title"><span>🎯</span> How It Works</h3>
        <pre>{`// React 19's use() hook
import { use, Suspense } from 'react';

function UserProfile({ userId }) {
  // Directly read a promise in render!
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}

// Wrap with Suspense for loading state
<Suspense fallback={<Loading />}>
  <UserProfile userId="1" />
</Suspense>`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title"><span>🧪</span> Live Demo</h3>
        <p className="card-description">
          Click a user to fetch their profile. The <code>use()</code> hook suspends until data loads.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {["1", "2", "3"].map((id) => (
            <button
              key={id}
              className={userId === id ? "btn-primary" : "btn-secondary"}
              onClick={() => refreshUser(id)}
            >
              User {id}
            </button>
          ))}
        </div>
        <Suspense key={key} fallback={<LoadingSkeleton />}>
          <UserProfile userId={userId} />
        </Suspense>
      </div>

      <div className="card">
        <h3 className="card-title"><span>✨</span> Key Benefits</h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>No need for <code>useEffect</code> + <code>useState</code> for data fetching</li>
          <li>Works with any promise - not just fetch</li>
          <li>Integrates naturally with Suspense boundaries</li>
          <li>Can read Context values (replaces <code>useContext</code>)</li>
          <li>Works in both client and server components</li>
        </ul>
      </div>
    </div>
  );
}

