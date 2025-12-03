"use client";

import { useState, useTransition, useDeferredValue, memo } from "react";

function slowFilter(items: string[], query: string): string[] {
  const start = performance.now();
  while (performance.now() - start < 2) {}
  if (!query) return items;
  return items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
}

const allItems = Array.from({ length: 1000 }, (_, i) => {
  const categories = ["Product", "Service", "Feature", "Component", "Module"];
  const adjectives = ["Amazing", "Premium", "Essential", "Advanced", "Basic"];
  return `${adjectives[Math.floor(i / categories.length) % adjectives.length]} ${categories[i % categories.length]} ${i + 1}`;
});

const FilteredList = memo(function FilteredList({ query, isStale }: { query: string; isStale: boolean }) {
  const filtered = slowFilter(allItems, query);
  return (
    <div style={{ opacity: isStale ? 0.5 : 1, transition: "opacity 0.2s" }}>
      <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
        Showing {filtered.length} of {allItems.length} items{isStale && " (updating...)"}
      </p>
      <div style={{ maxHeight: 300, overflowY: "auto", background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "0.5rem" }}>
        {filtered.slice(0, 50).map((item, i) => (
          <div key={i} style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>{item}</div>
        ))}
        {filtered.length > 50 && <div style={{ padding: "0.75rem", textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>+ {filtered.length - 50} more items...</div>}
      </div>
    </div>
  );
});

export default function TransitionsContent() {
  const [query1, setQuery1] = useState("");
  const [isPending, startTransition] = useTransition();
  const [transitionQuery, setTransitionQuery] = useState("");

  const [query2, setQuery2] = useState("");
  const deferredQuery = useDeferredValue(query2);
  const isStale = query2 !== deferredQuery;

  return (
    <div>
      <h1>React 19 Transitions</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Transitions let you mark state updates as non-urgent, keeping the UI responsive.
      </p>

      <div className="card">
        <h3 className="card-title"><span>🎯</span> How They Work</h3>
        <pre>{`// useTransition
const [isPending, startTransition] = useTransition();

function handleChange(e) {
  setInputValue(e.target.value); // Urgent
  startTransition(() => {
    setFilterQuery(e.target.value); // Non-urgent
  });
}

// useDeferredValue
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title"><span>🧪</span> Demo 1: useTransition</h3>
        <p className="card-description">Type to filter 1,000 items. The input stays responsive!</p>
        <input
          type="text"
          value={query1}
          onChange={(e) => {
            const value = e.target.value;
            setQuery1(value);
            startTransition(() => { setTransitionQuery(value); });
          }}
          placeholder="Search items..."
          style={{ width: "100%", maxWidth: 400, marginBottom: "1rem" }}
        />
        {isPending && <div style={{ marginBottom: "0.75rem" }}><span className="status-badge status-pending">⏳ Filtering...</span></div>}
        <FilteredList query={transitionQuery} isStale={isPending} />
      </div>

      <div className="card">
        <h3 className="card-title"><span>🧪</span> Demo 2: useDeferredValue</h3>
        <p className="card-description">Same filtering, using <code>useDeferredValue</code> instead.</p>
        <input type="text" value={query2} onChange={(e) => setQuery2(e.target.value)} placeholder="Search items..." style={{ width: "100%", maxWidth: 400, marginBottom: "1rem" }} />
        {isStale && <div style={{ marginBottom: "0.75rem" }}><span className="status-badge status-pending">⏳ Updating...</span></div>}
        <FilteredList query={deferredQuery} isStale={isStale} />
      </div>

      <div className="card">
        <h3 className="card-title"><span>⚖️</span> When to Use Which?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="demo-box">
            <h4 style={{ margin: "0 0 0.5rem", color: "#00d9ff" }}>useTransition</h4>
            <ul style={{ margin: 0, padding: "0 0 0 1rem", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              <li>When you control the state update</li>
              <li>Need <code>isPending</code> boolean</li>
              <li>Wrapping state setters</li>
            </ul>
          </div>
          <div className="demo-box">
            <h4 style={{ margin: "0 0 0.5rem", color: "#00ff7f" }}>useDeferredValue</h4>
            <ul style={{ margin: 0, padding: "0 0 0 1rem", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              <li>Value comes from props/context</li>
              <li>Simpler API</li>
              <li>Debouncing expensive renders</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><span>✨</span> Key Benefits</h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>Keep UI responsive during expensive renders</li>
          <li>Automatic interruption of stale updates</li>
          <li>Better UX with immediate feedback on inputs</li>
          <li>No manual debouncing/throttling needed</li>
          <li>Works with React's concurrent rendering</li>
        </ul>
      </div>
    </div>
  );
}

