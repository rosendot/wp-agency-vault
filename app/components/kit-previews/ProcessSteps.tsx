"use client";

export interface ProcessStepsProps {
  sectionTitle: string;
  sectionSubtitle: string;
}

const defaults: ProcessStepsProps = {
  sectionTitle: "How it works",
  sectionSubtitle: "From kickoff to live site in four simple steps",
};

const steps = [
  {
    title: "Kickoff call",
    body:
      "A 30-minute conversation about your business, goals, and deadlines. No surprises later.",
  },
  {
    title: "Design & review",
    body:
      "We send a design within a week. You give feedback. We iterate until it's right.",
  },
  {
    title: "Build & launch",
    body:
      "We build on Bedrock + LocalWP, test everything, then deploy to your live domain.",
  },
  {
    title: "Ongoing care",
    body:
      "We keep the site healthy — updates, backups, uptime monitoring — for a flat monthly fee.",
  },
];

export default function ProcessSteps(props: Partial<ProcessStepsProps>) {
  const v = { ...defaults, ...props };

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

      <div
        style={{
          maxWidth: "var(--max-w-xl)",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "12%",
            right: "12%",
            height: 2,
            background: "var(--color-border)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gap: "var(--space-8)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-full)",
                  background: "var(--color-primary)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--text-xl)",
                  fontWeight: 700,
                  margin: "0 auto var(--space-5)",
                }}
              >
                {i + 1}
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
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-light)",
                  lineHeight: "var(--leading-relaxed)",
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
