import { Suspense } from "react";

// Simulated slow data fetching
async function getSlowData(delay: number, label: string) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return {
    label,
    data: `Data loaded after ${delay}ms`,
    timestamp: new Date().toISOString(),
  };
}

async function SlowComponent({ delay, label }: { delay: number; label: string }) {
  const result = await getSlowData(delay, label);
  
  return (
    <div
      style={{
        padding: "1rem",
        background: "rgba(0, 255, 127, 0.1)",
        border: "1px solid rgba(0, 255, 127, 0.2)",
        borderRadius: 8,
      }}
    >
      <h4 style={{ margin: "0 0 0.5rem", color: "#00ff7f" }}>{result.label}</h4>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
        {result.data}
      </p>
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
        Loaded: {result.timestamp}
      </p>
    </div>
  );
}

function LoadingFallback({ label }: { label: string }) {
  return (
    <div
      className="loading"
      style={{
        padding: "1rem",
        background: "rgba(255, 193, 7, 0.1)",
        border: "1px dashed rgba(255, 193, 7, 0.3)",
        borderRadius: 8,
      }}
    >
      <h4 style={{ margin: "0 0 0.5rem", color: "#ffc107" }}>
        ⏳ Loading {label}...
      </h4>
      <div
        style={{
          height: 16,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 4,
          width: "60%",
        }}
      />
    </div>
  );
}

export default function SuspensePage() {
  return (
    <div>
      <h1>React Suspense Boundaries</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Suspense boundaries allow components to "wait" for async data while 
        showing fallback UI. Watch each component load independently!
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>🎯</span>
          How It Works
        </h3>
        <pre>{`// Wrap async components with Suspense
import { Suspense } from 'react';

async function SlowComponent() {
  const data = await fetchSlowData(); // Takes time
  return <div>{data}</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  );
}`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🧪</span>
          Live Demo - Parallel Loading
        </h3>
        <p className="card-description">
          Each component below fetches data independently. Notice they stream in as 
          they complete, not blocking each other.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <Suspense fallback={<LoadingFallback label="Fast Data" />}>
            <SlowComponent delay={500} label="⚡ Fast Data (500ms)" />
          </Suspense>

          <Suspense fallback={<LoadingFallback label="Medium Data" />}>
            <SlowComponent delay={1500} label="🚀 Medium Data (1.5s)" />
          </Suspense>

          <Suspense fallback={<LoadingFallback label="Slow Data" />}>
            <SlowComponent delay={3000} label="🐢 Slow Data (3s)" />
          </Suspense>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🔗</span>
          Nested Suspense
        </h3>
        <p className="card-description">
          Suspense boundaries can be nested - inner boundaries resolve independently 
          of outer ones.
        </p>

        <Suspense fallback={<LoadingFallback label="Outer Container" />}>
          <div
            style={{
              padding: "1rem",
              background: "rgba(0, 217, 255, 0.05)",
              border: "1px solid rgba(0, 217, 255, 0.2)",
              borderRadius: 8,
            }}
          >
            <h4 style={{ margin: "0 0 1rem", color: "#00d9ff" }}>Outer Container</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Suspense fallback={<LoadingFallback label="Child A" />}>
                <SlowComponent delay={1000} label="📦 Child A (1s)" />
              </Suspense>
              <Suspense fallback={<LoadingFallback label="Child B" />}>
                <SlowComponent delay={2000} label="📦 Child B (2s)" />
              </Suspense>
            </div>
          </div>
        </Suspense>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>✨</span>
          Key Benefits
        </h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li>Non-blocking - fast components render immediately</li>
          <li>Progressive loading - content streams as it becomes ready</li>
          <li>Better UX - show meaningful loading states per section</li>
          <li>Parallel fetching - no request waterfalls</li>
          <li>Works with Server Components and streaming SSR</li>
        </ul>
      </div>
    </div>
  );
}

