import Script from "next/script";
import Navigation from "../components/Navigation";

export default function WithScriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Custom Script - demonstrates Next.js Script component */}
      <Script
        id="custom-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log('🔵 Custom Script Loaded - With Script Layout');
            window.__SCRIPT_LAYOUT__ = true;
            window.__SCRIPT_LOADED_AT__ = new Date().toISOString();
          `,
        }}
      />
      
      <div className="app-layout">
        <Navigation />
        <main className="main-content with-script-bg">
          <div className="layout-indicator with-script">
            <span className="indicator-icon">📜</span>
            <span className="indicator-text">With Script Layout</span>
          </div>
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
