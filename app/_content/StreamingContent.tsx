import { Suspense } from "react";

async function fetchHeroData() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { title: "Welcome to Streaming SSR", subtitle: "Watch the page progressively render as data loads" };
}

async function fetchStatsData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { label: "Users", value: "10,234", change: "+12%" },
    { label: "Revenue", value: "$54,321", change: "+8%" },
    { label: "Orders", value: "1,423", change: "+23%" },
    { label: "Conversion", value: "3.2%", change: "+0.5%" },
  ];
}

async function fetchRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { id: 1, user: "Alice", action: "Created a new project", time: "2 min ago" },
    { id: 2, user: "Bob", action: "Updated settings", time: "5 min ago" },
    { id: 3, user: "Charlie", action: "Deployed to production", time: "12 min ago" },
  ];
}

async function fetchRecommendations() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [
    { id: 1, title: "Optimize Performance", priority: "high" },
    { id: 2, title: "Enable Analytics", priority: "medium" },
    { id: 3, title: "Set up Monitoring", priority: "low" },
  ];
}

async function HeroSection() {
  const data = await fetchHeroData();
  return (
    <div style={{ padding: "2rem", background: "linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 255, 136, 0.1))", borderRadius: 12, textAlign: "center", marginBottom: "1.5rem" }}>
      <h2 style={{ margin: 0, fontSize: "1.8rem" }}>{data.title}</h2>
      <p style={{ margin: "0.5rem 0 0", color: "rgba(255,255,255,0.7)" }}>{data.subtitle}</p>
    </div>
  );
}

async function StatsSection() {
  const stats = await fetchStatsData();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
      {stats.map((stat) => (
        <div key={stat.label} style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 8, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "#00d9ff" }}>{stat.value}</p>
          <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>{stat.label}</p>
          <span style={{ fontSize: "0.75rem", color: "#00ff7f", background: "rgba(0, 255, 127, 0.1)", padding: "0.15rem 0.5rem", borderRadius: 20 }}>{stat.change}</span>
        </div>
      ))}
    </div>
  );
}

async function ActivitySection() {
  const activities = await fetchRecentActivity();
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
      <h4 style={{ margin: "0 0 1rem", color: "#fff" }}>Recent Activity</h4>
      {activities.map((activity) => (
        <div key={activity.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00d9ff, #00ff88)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 600, color: "#000" }}>{activity.user[0]}</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}><strong>{activity.user}</strong> {activity.action}</p>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

async function RecommendationsSection() {
  const recommendations = await fetchRecommendations();
  const priorityColors = { high: "#ff5252", medium: "#ffc107", low: "#00ff7f" };
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
      <h4 style={{ margin: "0 0 1rem", color: "#fff" }}>Recommendations</h4>
      {recommendations.map((rec) => (
        <div key={rec.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", marginBottom: "0.5rem", background: "rgba(0,0,0,0.2)", borderRadius: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: priorityColors[rec.priority as keyof typeof priorityColors] }} />
          <span style={{ color: "rgba(255,255,255,0.8)" }}>{rec.title}</span>
          <span style={{ marginLeft: "auto", fontSize: "0.7rem", textTransform: "uppercase", color: priorityColors[rec.priority as keyof typeof priorityColors] }}>{rec.priority}</span>
        </div>
      ))}
    </div>
  );
}

function SkeletonBox({ height = 100 }: { height?: number }) {
  return <div className="loading" style={{ height, background: "rgba(255,255,255,0.05)", borderRadius: 8, marginBottom: "1.5rem" }} />;
}

function StatsSkeleton() {
  return (
    <div className="loading" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
      {[1, 2, 3, 4].map((i) => <div key={i} style={{ height: 80, background: "rgba(255,255,255,0.05)", borderRadius: 8 }} />)}
    </div>
  );
}

export default function StreamingContent() {
  return (
    <div>
      <h1>Streaming SSR</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "2rem" }}>
        Next.js streams HTML from the server as components become ready. Refresh to see progressive loading!
      </p>

      <div className="card">
        <h3 className="card-title"><span>🎯</span> How It Works</h3>
        <pre>{`export default async function Dashboard() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection /> {/* Loads in 200ms */}
      </Suspense>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection /> {/* Loads in 1s */}
      </Suspense>
    </>
  );
}`}</pre>
      </div>

      <div className="card">
        <h3 className="card-title"><span>🧪</span> Live Demo - Dashboard Streaming</h3>
        <p className="card-description">4 sections with different load times. Watch them appear progressively!</p>
        <div style={{ marginTop: "1rem" }}>
          <Suspense fallback={<SkeletonBox height={120} />}><HeroSection /></Suspense>
          <Suspense fallback={<StatsSkeleton />}><StatsSection /></Suspense>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Suspense fallback={<SkeletonBox height={200} />}><ActivitySection /></Suspense>
            <Suspense fallback={<SkeletonBox height={200} />}><RecommendationsSection /></Suspense>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><span>✨</span> Key Benefits</h3>
        <ul style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8 }}>
          <li><strong>Faster TTFB</strong> - First byte sent immediately</li>
          <li><strong>Progressive rendering</strong> - Content appears as ready</li>
          <li><strong>Better LCP</strong> - Critical content loads first</li>
          <li><strong>No waterfalls</strong> - Parallel data fetching</li>
          <li><strong>SEO friendly</strong> - Full HTML eventually delivered</li>
        </ul>
      </div>
    </div>
  );
}

