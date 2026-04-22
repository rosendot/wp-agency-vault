"use client";

export interface FeatureAlternatingProps {
  sectionTitle: string;
  sectionSubtitle: string;
}

const defaults: FeatureAlternatingProps = {
  sectionTitle: "Built for the way you actually work",
  sectionSubtitle: "Each feature, explained in detail",
};

const rows = [
  {
    eyebrow: "Performance",
    title: "Fast on the first visit",
    body:
      "Every page is statically generated and served from the edge. No spinners, no layout shifts — just content that appears when you click.",
    bullets: [
      "Core Web Vitals in the green",
      "Edge caching included",
      "Optimized images out of the box",
    ],
    cta: "See the benchmarks",
    visualLabel: "Performance",
  },
  {
    eyebrow: "Design",
    title: "Your brand, not a template",
    body:
      "Custom typography, custom colors, custom layouts. We start from your brand and build out — no off-the-shelf themes, no cookie-cutter look.",
    bullets: [
      "Bespoke layouts per page",
      "Your type, your color system",
      "Mobile-first, always",
    ],
    cta: "View our work",
    visualLabel: "Design",
  },
  {
    eyebrow: "Ops",
    title: "We handle the boring parts",
    body:
      "Updates, backups, uptime monitoring, security patches. You ship your business, we keep the site running.",
    bullets: [
      "24/7 uptime monitoring",
      "Daily automated backups",
      "Security patches the same day",
    ],
    cta: "See what's included",
    visualLabel: "Ops",
  },
];

export default function FeatureAlternating(props: Partial<FeatureAlternatingProps>) {
  const v = { ...defaults, ...props };

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      <div
        style={{
          textAlign: "center",
          maxWidth: 640,
          margin: "0 auto var(--space-16)",
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

      <div
        style={{
          maxWidth: "var(--max-w-xl)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-16)",
        }}
      >
        {rows.map((row, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-16)",
                alignItems: "center",
              }}
            >
              <div style={{ order: reverse ? 2 : 1 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    letterSpacing: "var(--tracking-normal)",
                    textTransform: "uppercase",
                    color: "var(--color-primary)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {row.eyebrow}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--text-3xl)",
                    fontWeight: 700,
                    color: "var(--color-dark)",
                    margin: "0 0 var(--space-4)",
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  {row.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--color-text-light)",
                    lineHeight: "var(--leading-loose)",
                    margin: "0 0 var(--space-5)",
                  }}
                >
                  {row.body}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--space-5)" }}>
                  {row.bullets.map((bullet, b) => (
                    <li
                      key={b}
                      style={{
                        fontSize: "var(--text-base)",
                        lineHeight: "var(--leading-relaxed)",
                        padding: "var(--space-1) 0 var(--space-1) var(--space-6)",
                        position: "relative",
                        color: "var(--color-text)",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          fontWeight: 700,
                          color: "var(--color-primary)",
                        }}
                      >
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                  }}
                >
                  {row.cta} <span aria-hidden="true">→</span>
                </span>
              </div>

              <div
                style={{
                  order: reverse ? 1 : 2,
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: 600,
                }}
              >
                {row.visualLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
