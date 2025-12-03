import Navigation from "../components/Navigation";

export default function WithoutScriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content without-script-bg">
        <div className="layout-indicator without-script">
          <span className="indicator-icon">⚡</span>
          <span className="indicator-text">Without Script Layout</span>
        </div>
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}
