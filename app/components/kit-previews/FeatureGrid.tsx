"use client";

export interface FeatureGridProps {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: number;
}

const defaults: FeatureGridProps = {
  sectionTitle: "Why Choose Us",
  sectionSubtitle: "Everything you need, nothing you don't",
  columns: 3,
};

const features = [
  {
    icon: "⚡",
    title: "Fast by default",
    body: "Built on a modern stack with performance baked in from day one.",
  },
  {
    icon: "🛡️",
    title: "Secure & reliable",
    body: "Automated backups, daily uptime checks, and a hardened plugin stack.",
  },
  {
    icon: "🎨",
    title: "Custom design",
    body: "No cookie-cutter themes. Built to match your brand, not someone else's.",
  },
  {
    icon: "📱",
    title: "Mobile-first",
    body: "Every layout is tested on real devices before it ships.",
  },
  {
    icon: "🔍",
    title: "SEO-ready",
    body: "Schema markup, fast Core Web Vitals, and clean semantic HTML.",
  },
  {
    icon: "🤝",
    title: "We handle ops",
    body: "Updates, security patches, and monitoring — so you can focus on your business.",
  },
];

export default function FeatureGrid(props: Partial<FeatureGridProps>) {
  const v = { ...defaults, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;
  const visible = features.slice(0, Math.max(cols, 3));

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "var(--space-12)",
          maxWidth: 640,
          margin: "0 auto var(--space-12)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-4xl)",
            fontWeight: 700,
            color: "var(--color-dark)",
            margin: "0 0 var(--space-3)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {v.sectionTitle}
        </h2>
        <p
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-text-light)",
            margin: 0,
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          {v.sectionSubtitle}
        </p>
      </div>

      <div style={{ maxWidth: "var(--max-w-xl)", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "var(--space-6)",
          }}
        >
          {visible.map((f, i) => (
            <div
              key={i}
              style={{
                padding: "var(--space-8)",
                borderRadius: "var(--radius-lg)",
                background: "var(--color-white)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-primary)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-2xl)",
                  marginBottom: "var(--space-5)",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 600,
                  color: "var(--color-dark)",
                  margin: "0 0 var(--space-2)",
                  lineHeight: "var(--leading-snug)",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-light)",
                  lineHeight: "var(--leading-relaxed)",
                  margin: 0,
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
