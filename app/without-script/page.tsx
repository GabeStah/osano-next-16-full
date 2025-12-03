export default function WithoutScriptHome() {
  return (
    <div>
      <h1>Without Script Layout</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        This layout does not include any custom scripts - ideal for testing baseline behavior.
      </p>

      <div className="card">
        <h3 className="card-title">
          <span>⚡</span>
          Clean Environment
        </h3>
        <p className="card-description">
          This layout provides a script-free environment to compare behavior and performance
          against the "with script" layout. The global <code>window.__SCRIPT_LAYOUT__</code> 
          variable will be undefined here.
        </p>
        <div className="demo-box">
          <span className="status-badge status-success">
            ✓ No Custom Scripts
          </span>
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
          <li><strong>Suspense Boundaries</strong> - Streaming with fallback UI</li>
          <li><strong>Streaming SSR</strong> - Progressive page rendering</li>
          <li><strong>useFormStatus</strong> - Form submission state</li>
          <li><strong>Transitions</strong> - React 19 concurrent features</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title">
          <span>🔬</span>
          Server Component
        </h3>
        <p className="card-description">
          This page is a React Server Component by default - no <code>"use client"</code> 
          directive needed. The HTML is rendered on the server and sent to the client.
        </p>
        <div className="demo-box">
          <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)" }}>
            Rendered at: <code>{new Date().toISOString()}</code>
          </p>
        </div>
      </div>
    </div>
  );
}

