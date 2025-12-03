// SERVER COMPONENT - No "use client" directive
// Both <Link> and <a> work in Server Components
// We lose "active" highlighting since usePathname() requires client

import Link from "next/link";

type NavigationProps = {
  layout: "with-script" | "without-script";
};

const testPages = [
  { slug: "", label: "Home", isClient: true },
  { slug: "use-hook", label: "use() Hook", isClient: true },
  { slug: "use-action-state", label: "useActionState", isClient: true },
  { slug: "use-optimistic", label: "useOptimistic", isClient: true },
  { slug: "server-actions", label: "Server Actions", isClient: true },
  { slug: "suspense", label: "Suspense", isClient: false },
  { slug: "streaming", label: "Streaming SSR", isClient: false },
  { slug: "form-status", label: "useFormStatus", isClient: true },
  { slug: "transitions", label: "Transitions", isClient: true },
];

export default function Navigation({ layout }: NavigationProps) {
  const otherLayout = layout === "with-script" ? "without-script" : "with-script";

  return (
    <nav className="nav-container">      {/* Layout Links */}
      <div className="layout-toggle">
        <div className="layout-links">
          <a 
            href="/with-script/" 
            className={`layout-link ${layout === "with-script" ? "active" : ""}`}
          >
            📜 Osano
          </a>
          <a 
            href="/without-script/" 
            className={`layout-link ${layout === "without-script" ? "active" : ""}`}
          >
            ⚡ No Osano
          </a>
        </div>
        <p className="toggle-hint">
          Currently: <strong>{layout === "with-script" ? "With Osano" : "Without Osano"}</strong>
        </p>
      </div>

      {/* Client-Side Navigation - Uses <Link>, requires hydration */}
      <div className="nav-section">
        <h3 className="nav-section-title">
          <span className="badge">⚡</span>
          Client Navigation
          <span className="nav-tag client-tag">Link</span>
        </h3>
        <p className="nav-hint">Uses Next.js &lt;Link&gt; - requires hydration</p>
        <ul className="nav-list">
          {testPages.map((page) => {
            const href = `/${layout}${page.slug ? `/${page.slug}` : ""}`;
            return (
              <li key={`link-${page.slug || "home"}`}>
                <Link href={href} className="nav-link">
                  <span className={`component-badge ${page.isClient ? "client" : "server"}`}>
                    {page.isClient ? "C" : "S"}
                  </span>
                  {page.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Full Page Navigation - Uses <a>, always works */}
      <div className="nav-section">
        <h3 className="nav-section-title">
          <span className="badge">🔗</span>
          Full Page Navigation
          <span className="nav-tag server-tag">&lt;a&gt;</span>
        </h3>
        <p className="nav-hint">Uses plain &lt;a&gt; tags - no hydration needed</p>
        <ul className="nav-list">
          {testPages.map((page) => {
            const href = `/${layout}${page.slug ? `/${page.slug}` : ""}/`;
            return (
              <li key={`a-${page.slug || "home"}`}>
                <a href={href} className="nav-link">
                  <span className={`component-badge ${page.isClient ? "client" : "server"}`}>
                    {page.isClient ? "C" : "S"}
                  </span>
                  {page.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="nav-legend">
        <div className="legend-item">
          <span className="component-badge client">C</span>
          <span>Client Component</span>
        </div>
        <div className="legend-item">
          <span className="component-badge server">S</span>
          <span>Server Component</span>
        </div>
      </div>
    </nav>
  );
}
