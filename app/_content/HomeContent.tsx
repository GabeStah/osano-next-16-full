"use client";

import { useEffect, useState } from "react";

export default function HomeContent() {
  const [scriptInfo, setScriptInfo] = useState<{
    loaded: boolean;
    loadedAt: string | null;
  }>({ loaded: false, loadedAt: null });

  useEffect(() => {
    const checkScript = () => {
      if (typeof window !== "undefined") {
        setScriptInfo({
          loaded: !!(window as any).__SCRIPT_LAYOUT__,
          loadedAt: (window as any).__SCRIPT_LOADED_AT__ || null,
        });
      }
    };
    
    checkScript();
    const timer = setTimeout(checkScript, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Test Suite Home</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Welcome to the Next.js 16 + React 19.2 feature test suite. 
        Use the layout toggle above to switch between script and no-script layouts.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>📜</span>
          Script Detection
        </h3>
        <div className="demo-box">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span
              className={`status-badge ${scriptInfo.loaded ? "status-success" : "status-pending"}`}
            >
              {scriptInfo.loaded ? "✓ Script Layout Active" : "⚡ No Script Layout"}
            </span>
          </div>
          {scriptInfo.loadedAt ? (
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", margin: 0 }}>
              Script loaded at: <code>{scriptInfo.loadedAt}</code>
            </p>
          ) : (
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", margin: 0 }}>
              <code>window.__SCRIPT_LAYOUT__</code> is not set (no custom script loaded)
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Available Tests
        </h3>
        <p className="card-description">
          Explore React 19.2 and Next.js 16 features using the navigation sidebar:
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li><strong>use() Hook</strong> - React 19's promise-based data fetching</li>
          <li><strong>useActionState</strong> - Form state with Server Actions</li>
          <li><strong>useOptimistic</strong> - Instant optimistic UI updates</li>
          <li><strong>Server Actions</strong> - Direct server function calls</li>
          <li><strong>Suspense</strong> - Streaming with fallback UI</li>
          <li><strong>Streaming SSR</strong> - Progressive page rendering</li>
          <li><strong>useFormStatus</strong> - Form submission state</li>
          <li><strong>Transitions</strong> - Concurrent rendering features</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>💡</span>
          Next.js DevTools
        </h3>
        <p className="card-description">
          Click the floating button to open Next.js DevTools.
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>Server vs Client Component rendering</li>
          <li>Hydration performance</li>
          <li>Route transitions</li>
          <li>Script loading behavior</li>
        </ul>
      </div>
    </div>
  );
}

