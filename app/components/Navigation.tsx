"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const testPages = [
  { href: "/with-script", label: "With Script Home", group: "with-script" },
  { href: "/without-script", label: "Without Script Home", group: "without-script" },
  { href: "/with-script/use-hook", label: "React 19 use() Hook", group: "with-script" },
  { href: "/with-script/use-action-state", label: "useActionState", group: "with-script" },
  { href: "/with-script/use-optimistic", label: "useOptimistic", group: "with-script" },
  { href: "/with-script/server-actions", label: "Server Actions", group: "with-script" },
  { href: "/without-script/suspense", label: "Suspense Boundaries", group: "without-script" },
  { href: "/without-script/streaming", label: "Streaming SSR", group: "without-script" },
  { href: "/without-script/form-status", label: "useFormStatus", group: "without-script" },
  { href: "/without-script/transitions", label: "Transitions", group: "without-script" },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="nav-container">
      <div className="nav-header">
        <h2>Next.js 16 + React 19.2</h2>
        <p className="nav-subtitle">Feature Test Suite</p>
      </div>
      
      <div className="nav-section">
        <h3 className="nav-section-title">
          <span className="badge badge-script">📜</span>
          With Script Layout
        </h3>
        <ul className="nav-list">
          {testPages
            .filter(p => p.group === "with-script")
            .map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className={`nav-link ${pathname === page.href ? "active" : ""}`}
                >
                  {page.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      
      <div className="nav-section">
        <h3 className="nav-section-title">
          <span className="badge badge-no-script">⚡</span>
          Without Script Layout
        </h3>
        <ul className="nav-list">
          {testPages
            .filter(p => p.group === "without-script")
            .map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className={`nav-link ${pathname === page.href ? "active" : ""}`}
                >
                  {page.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
