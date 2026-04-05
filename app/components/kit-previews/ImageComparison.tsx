"use client";

export interface ImageComparisonProps {
  columns: number;
  gap: string;
  sectionTitle: string;
}

const defaults: ImageComparisonProps = {
  columns: 2,
  gap: "2rem",
  sectionTitle: "Compare",
};

const pairs = [
  { leftColor: "#a89880", rightColor: "#c4b5a0", leftLabel: "Before", rightLabel: "After", caption: "Kitchen renovation — full remodel" },
  { leftColor: "#8a7a68", rightColor: "#b8a892", leftLabel: "Before", rightLabel: "After", caption: "Bathroom refresh — tile and vanity" },
  { leftColor: "#9a8a78", rightColor: "#d0c0aa", leftLabel: "Option A", rightLabel: "Option B", caption: "Exterior paint — warm vs cool" },
  { leftColor: "#b0a090", rightColor: "#c8b89e", leftLabel: "Standard", rightLabel: "Premium", caption: "Countertop finish comparison" },
];

export default function ImageComparison(props: Partial<ImageComparisonProps>) {
  const v = { ...defaults, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-4xl)",
          fontWeight: 700,
          color: "var(--color-dark)",
          margin: "0 0 var(--space-2)",
          lineHeight: "var(--leading-snug)",
        }}>
          {v.sectionTitle}
        </h2>
        <p style={{ fontSize: "var(--text-xl)", color: "var(--color-text-light)", margin: 0 }}>
          Side-by-side image pairs with labels
        </p>
      </div>

      <div style={{ maxWidth: "var(--max-w-xl)", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: v.gap,
          }}
        >
          {pairs.map((pair, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {/* Left side */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background: pair.leftColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-light)",
                  }}
                >
                  {pair.leftLabel}
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "var(--space-3)",
                    left: "var(--space-3)",
                    background: "rgba(0,0,0,0.6)",
                    color: "var(--color-white)",
                    padding: "var(--space-1) var(--space-2)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {pair.leftLabel}
                </span>
              </div>

              {/* Right side */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background: pair.rightColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-light)",
                  }}
                >
                  {pair.rightLabel}
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "var(--space-3)",
                    left: "var(--space-3)",
                    background: "rgba(0,0,0,0.6)",
                    color: "var(--color-white)",
                    padding: "var(--space-1) var(--space-2)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {pair.rightLabel}
                </span>
              </div>

              {/* Caption */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  padding: "var(--space-3) var(--space-4)",
                  textAlign: "center",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  color: "var(--color-text-light)",
                  background: "var(--color-cream)",
                }}
              >
                {pair.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
