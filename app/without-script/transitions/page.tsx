"use client";

import { useState, useTransition, useDeferredValue, memo } from "react";

// Heavy computation to simulate expensive render
function slowFilter(items: string[], query: string): string[] {
  // Artificially slow down filtering
  const start = performance.now();
  while (performance.now() - start < 2) {
    // Block for 2ms per item to simulate heavy work
  }
  
  if (!query) return items;
  return items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}

// Generate large list of items
const allItems = Array.from({ length: 1000 }, (_, i) => {
  const categories = ["Product", "Service", "Feature", "Component", "Module"];
  const adjectives = ["Amazing", "Premium", "Essential", "Advanced", "Basic"];
  const category = categories[i % categories.length];
  const adjective = adjectives[Math.floor(i / categories.length) % adjectives.length];
  return `${adjective} ${category} ${i + 1}`;
});

// Memoized list component
const FilteredList = memo(function FilteredList({ 
  query, 
  isStale 
}: { 
  query: string; 
  isStale: boolean;
}) {
  const filtered = slowFilter(allItems, query);
  
  return (
    <div
      style={{
        opacity: isStale ? 0.5 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <p style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
        Showing {filtered.length} of {allItems.length} items
        {isStale && " (updating...)"}
      </p>
      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          background: "rgba(0,0,0,0.2)",
          borderRadius: 8,
          padding: "0.5rem",
        }}
      >
        {filtered.slice(0, 50).map((item, i) => (
          <div
            key={i}
            style={{
              padding: "0.5rem 0.75rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {item}
          </div>
        ))}
        {filtered.length > 50 && (
          <div
            style={{
              padding: "0.75rem",
              textAlign: "center",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            + {filtered.length - 50} more items...
          </div>
        )}
      </div>
    </div>
  );
});

export default function TransitionsPage() {
  // Demo 1: useTransition
  const [query1, setQuery1] = useState("");
  const [isPending, startTransition] = useTransition();
  const [transitionQuery, setTransitionQuery] = useState("");

  // Demo 2: useDeferredValue
  const [query2, setQuery2] = useState("");
  const deferredQuery = useDeferredValue(query2);
  const isStale = query2 !== deferredQuery;

  return (
    <div>
      <h1>React 19 Transitions</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Transitions let you mark state updates as non-urgent, keeping the UI 
        responsive while expensive updates happen in the background.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>🎯</span>
          How They Work
        </h3>
        <pre>{`// useTransition - for actions you control
const [isPending, startTransition] = useTransition();

function handleChange(e) {
  const value = e.target.value;
  setInputValue(value); // Urgent: update input immediately
  
  startTransition(() => {
    setFilterQuery(value); // Non-urgent: can be interrupted
  });
}

// useDeferredValue - for values from elsewhere
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;

// Use deferredQuery for expensive renders
<ExpensiveList query={deferredQuery} />`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Demo 1: useTransition
        </h3>
        <p className="card-description">
          Type to filter 1,000 items. The input stays responsive while filtering 
          happens in a transition.
        </p>

        <input
          type="text"
          value={query1}
          onChange={(e) => {
            const value = e.target.value;
            setQuery1(value); // Immediate
            startTransition(() => {
              setTransitionQuery(value); // Deferred
            });
          }}
          placeholder="Search items..."
          style={{ width: "100%", maxWidth: 400, marginBottom: "1rem" }}
        />

        {isPending && (
          <div style={{ marginBottom: "0.75rem" }}>
            <span className="status-badge status-pending">⏳ Filtering...</span>
          </div>
        )}

        <FilteredList query={transitionQuery} isStale={isPending} />
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Demo 2: useDeferredValue
        </h3>
        <p className="card-description">
          Same filtering, but using <code>useDeferredValue</code> instead. 
          The list updates with a stale indicator.
        </p>

        <input
          type="text"
          value={query2}
          onChange={(e) => setQuery2(e.target.value)}
          placeholder="Search items..."
          style={{ width: "100%", maxWidth: 400, marginBottom: "1rem" }}
        />

        {isStale && (
          <div style={{ marginBottom: "0.75rem" }}>
            <span className="status-badge status-pending">⏳ Updating...</span>
          </div>
        )}

        <FilteredList query={deferredQuery} isStale={isStale} />
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>⚖️</span>
          When to Use Which?
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="demo-box">
            <h4 style={{ margin: "0 0 0.5rem", color: "#00d9ff" }}>useTransition</h4>
            <ul style={{ margin: 0, padding: "0 0 0 1rem", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              <li>When you control the state update</li>
              <li>Need <code>isPending</code> boolean</li>
              <li>Wrapping state setters</li>
              <li>Navigation/tab switching</li>
            </ul>
          </div>
          <div className="demo-box">
            <h4 style={{ margin: "0 0 0.5rem", color: "#00ff7f" }}>useDeferredValue</h4>
            <ul style={{ margin: 0, padding: "0 0 0 1rem", lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
              <li>When value comes from props/context</li>
              <li>Simpler API</li>
              <li>Debouncing expensive renders</li>
              <li>No control over update timing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>✨</span>
          Key Benefits
        </h3>
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

