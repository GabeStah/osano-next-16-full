"use client";

import { useEffect, useState } from "react";

export default function WithScriptHome() {
  const [scriptInfo, setScriptInfo] = useState<{
    loaded: boolean;
    loadedAt: string | null;
  }>({ loaded: false, loadedAt: null });

  useEffect(() => {
    // Check if our custom script has loaded
    const checkScript = () => {
      if (typeof window !== "undefined") {
        setScriptInfo({
          loaded: !!(window as any).__SCRIPT_LAYOUT__,
          loadedAt: (window as any).__SCRIPT_LOADED_AT__ || null,
        });
      }
    };
    
    checkScript();
    // Re-check after a short delay in case script loads after hydration
    const timer = setTimeout(checkScript, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>With Script Layout</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        This layout includes a custom Next.js Script component that runs analytics code.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>📜</span>
          Script Status
        </h3>
        <div className="demo-box">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span
              className={`status-badge ${scriptInfo.loaded ? "status-success" : "status-pending"}`}
            >
              {scriptInfo.loaded ? "✓ Script Loaded" : "⏳ Loading..."}
            </span>
          </div>
          {scriptInfo.loadedAt && (
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", margin: 0 }}>
              Loaded at: <code>{scriptInfo.loadedAt}</code>
            </p>
          )}
          <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "0.75rem" }}>
            Check the browser console to see the script's log message.
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Available Tests
        </h3>
        <p className="card-description">
          Use the navigation sidebar to explore React 19.2 and Next.js 16 features:
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li><strong>use() Hook</strong> - React 19's new promise-based data fetching</li>
          <li><strong>useActionState</strong> - Form state management with Server Actions</li>
          <li><strong>useOptimistic</strong> - Optimistic UI updates</li>
          <li><strong>Server Actions</strong> - Direct server function calls</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>💡</span>
          Next.js DevTools
        </h3>
        <p className="card-description">
          Press <code>Shift + D</code> to open Next.js DevTools (when available) to inspect:
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>Server Component vs Client Component rendering</li>
          <li>Hydration performance</li>
          <li>Route transitions</li>
          <li>Script loading behavior</li>
        </ul>
      </div>
    </div>
  );
}

