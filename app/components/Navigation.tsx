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

      <div className="nav-footer">
        <a 
          href="https://github.com/GabeStah/osano-next-16-full" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </nav>
  );
}
