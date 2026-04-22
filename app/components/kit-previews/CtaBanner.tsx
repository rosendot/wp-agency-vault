"use client";

export interface CtaBannerProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryUrl: string;
  secondaryLabel: string;
  secondaryUrl: string;
}

const defaults: CtaBannerProps = {
  title: "Ready to ship faster?",
  subtitle:
    "Get a custom site built by people who actually maintain it afterward.",
  primaryLabel: "Start a project",
  primaryUrl: "#",
  secondaryLabel: "Book a call",
  secondaryUrl: "#",
};

export default function CtaBanner(props: Partial<CtaBannerProps>) {
  const v = { ...defaults, ...props };

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-4xl)",
            fontWeight: 700,
            color: "var(--color-dark)",
            margin: "0 0 var(--space-2)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          CTA Banner
        </h2>
        <p
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-text-light)",
            margin: 0,
          }}
        >
          Final-call conversion closer
        </p>
      </div>

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "var(--space-16) var(--space-12)",
          borderRadius: "var(--radius-xl)",
          background: "var(--color-primary)",
          color: "var(--color-white)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-4xl)",
            fontWeight: 700,
            margin: "0 0 var(--space-4)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {v.title}
        </h3>
        <p
          style={{
            fontSize: "var(--text-xl)",
            lineHeight: "var(--leading-relaxed)",
            opacity: 0.9,
            margin: "0 auto var(--space-8)",
            maxWidth: 560,
          }}
        >
          {v.subtitle}
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {v.primaryLabel && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "var(--space-3) var(--space-6)",
                borderRadius: "var(--radius-lg)",
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                background: "var(--color-white)",
                color: "var(--color-primary)",
                border: "2px solid var(--color-white)",
              }}
            >
              {v.primaryLabel}
            </span>
          )}
          {v.secondaryLabel && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "var(--space-3) var(--space-6)",
                borderRadius: "var(--radius-lg)",
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                background: "transparent",
                color: "var(--color-white)",
                border: "2px solid rgba(255,255,255,0.5)",
              }}
            >
              {v.secondaryLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
