"use client";

import { useEffect, useState } from "react";

export default function HomeContent() {
  const [osanoLoaded, setOsanoLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOsano = () => {
      if (typeof window !== "undefined") {
        setOsanoLoaded(!!(window as any).Osano);
      }
    };
    
    // Check immediately and after delays (Osano may load async)
    checkOsano();
    const timer = setTimeout(checkOsano, 500);
    const timer2 = setTimeout(checkOsano, 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div>
      <h1>Test Suite Home</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Welcome to the Osano Next.js 16 + React 19.2 feature test suite. 
        Use the layout toggle to switch between Osano and no-Osano layouts.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>📜</span>
          Osano Script Detection
        </h3>
        <div className="demo-box">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            {osanoLoaded === null ? (
              <span className="status-badge status-pending">⏳ Checking...</span>
            ) : osanoLoaded ? (
              <span className="status-badge status-success">✓ Osano Loaded</span>
            ) : (
              <span className="status-badge status-pending">⚡ No Osano</span>
            )}
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", margin: 0 }}>
            {osanoLoaded 
              ? <><code>window.Osano</code> is available</>
              : <><code>window.Osano</code> is not set</>
            }
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🔬</span>
          How This Test Works
        </h3>
        <p className="card-description">
          This suite tests whether the Osano cookie consent script interferes with React hydration and client-side navigation.
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li><strong>With Osano layout</strong> — Loads the Osano script via <code>NEXT_PUBLIC_COOKIE_SCRIPT</code></li>
          <li><strong>Without Osano layout</strong> — No external scripts, baseline comparison</li>
          <li><strong>⚡ Client Navigation</strong> — Uses Next.js <code>&lt;Link&gt;</code>, requires React hydration</li>
          <li><strong>🔗 Full Page Navigation</strong> — Uses plain <code>&lt;a&gt;</code> tags, always works</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>👀</span>
          What to Expect
        </h3>
        <p className="card-description" style={{ marginBottom: "1rem" }}>
          If Osano interferes with hydration:
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8, marginBottom: "1rem" }}>
          <li><strong>⚡ Client Navigation links will fail</strong> — clicking does nothing (RSC fetches succeed but hydration breaks)</li>
          <li><strong>🔗 Full Page Navigation links will work</strong> — standard browser navigation bypasses React</li>
          <li><strong>Client Components may not render</strong> — interactive elements won't respond</li>
        </ul>
        <p className="card-description" style={{ marginBottom: "1rem" }}>
          Without Osano (or if Osano is compatible):
        </p>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li><strong>Both navigation types work</strong> — Client nav is faster (no full reload)</li>
          <li><strong>All interactive demos function</strong> — forms, optimistic updates, transitions</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🛠️</span>
          Testing Steps
        </h3>
        <ol style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 2, paddingLeft: "1.25rem" }}>
          <li>Start in the <strong>📜 Osano</strong> layout (check that Osano is detected above)</li>
          <li>Click any <strong>⚡ Client Navigation</strong> link in the sidebar</li>
          <li>If it fails, try the same page via <strong>🔗 Full Page Navigation</strong></li>
          <li>Switch to the <strong>⚡ No Osano</strong> layout and repeat</li>
          <li>Compare behavior — if Client Nav works without Osano but not with, the script may be the cause</li>
        </ol>
      </div>
    </div>
  );
}

