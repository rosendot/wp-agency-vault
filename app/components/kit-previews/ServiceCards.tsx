"use client";

export interface ServiceCardsProps {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: number;
}

const defaults: ServiceCardsProps = {
  sectionTitle: "What we do",
  sectionSubtitle: "Pick a service, or let us build you a full package",
  columns: 3,
};

const services = [
  {
    icon: "🌐",
    title: "Website design & build",
    body:
      "Custom WordPress sites built on Bedrock. Mobile-first, fast, and built to match your brand.",
    priceLabel: "From",
    priceValue: "$2,400",
    cta: "Learn more",
  },
  {
    icon: "🛠",
    title: "Ongoing care",
    body:
      "Updates, backups, uptime monitoring, and security patches. Your site stays healthy while you run the business.",
    priceLabel: "",
    priceValue: "$399/mo",
    cta: "See what's included",
  },
  {
    icon: "📈",
    title: "SEO & content",
    body:
      "Schema markup, on-page SEO, Google Business optimization, and quarterly content refreshes.",
    priceLabel: "From",
    priceValue: "$600",
    cta: "Get a quote",
  },
];

export default function ServiceCards(props: Partial<ServiceCardsProps>) {
  const v = { ...defaults, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      <div
        style={{
          textAlign: "center",
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
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "var(--space-8)",
                borderRadius: "var(--radius-xl)",
                background: "var(--color-white)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "var(--radius-xl)",
                  background: "var(--color-primary)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-3xl)",
                  marginBottom: "var(--space-6)",
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-2xl)",
                  fontWeight: 600,
                  color: "var(--color-dark)",
                  margin: "0 0 var(--space-2)",
                  lineHeight: "var(--leading-snug)",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-light)",
                  lineHeight: "var(--leading-relaxed)",
                  margin: "0 0 var(--space-5)",
                  flexGrow: 1,
                }}
              >
                {s.body}
              </p>
              <div
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--color-text-light)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {s.priceLabel && <>{s.priceLabel} </>}
                <span
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 700,
                    color: "var(--color-dark)",
                  }}
                >
                  {s.priceValue}
                </span>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  fontSize: "var(--text-base)",
                  fontWeight: 600,
                  color: "var(--color-primary)",
                  paddingTop: "var(--space-4)",
                  marginTop: "auto",
                }}
              >
                {s.cta} <span aria-hidden="true">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
