"use client";

export interface HeroSectionProps {
  minHeight: string;
  overlayColor: string;
  fallbackBg: string;
  maxWidth: string;
}

const defaultProps: HeroSectionProps = {
  minHeight: "90vh",
  overlayColor: "rgba(26, 18, 8, 0.6)",
  fallbackBg: "#1a1208",
  maxWidth: "750px",
};

export default function HeroSection(props: Partial<HeroSectionProps>) {
  const v = { ...defaultProps, ...props };

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      {/* Standard section header */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-4xl)",
          fontWeight: 700,
          color: "var(--color-dark)",
          margin: "0 0 var(--space-2)",
          lineHeight: "var(--leading-snug)",
        }}>
          Hero Section
        </h2>
        <p style={{ fontSize: "var(--text-xl)", color: "var(--color-text-light)", margin: 0 }}>
          Full-width hero with overlay, text, and CTA buttons
        </p>
      </div>

      {/* Hero preview */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: v.minHeight,
          background: `linear-gradient(${v.overlayColor}, ${v.overlayColor}), linear-gradient(135deg, #8B6914 0%, #5a3e0a 50%, #3d2a06 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--color-white)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: v.maxWidth,
            padding: "var(--space-8)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-sm)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
              marginBottom: "var(--space-4)",
              fontWeight: 600,
              color: "var(--color-secondary)",
            }}
          >
            Welcome to
          </p>
          <h1
            style={{
              fontSize: "var(--text-5xl)",
              lineHeight: "var(--leading-tight)",
              marginBottom: "var(--space-5)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Your City&rsquo;s Home for
            <br />
            Authentic Cuisine
          </h1>
          <p
            style={{
              fontSize: "var(--text-xl)",
              lineHeight: "var(--leading-loose)",
              opacity: "var(--opacity-soft)",
              marginBottom: "var(--space-10)",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Bold flavors and family tradition &mdash; every dish is crafted with
            recipes passed down through generations. Made fresh, served with love.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "inline-block",
                padding: "var(--space-3) var(--space-8)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-normal)",
                textDecoration: "none",
                borderRadius: "var(--radius-md)",
                background: "var(--color-primary)",
                color: "var(--color-white)",
                border: "2px solid var(--color-primary)",
                cursor: "pointer",
              }}
            >
              View Menu
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "inline-block",
                padding: "var(--space-3) var(--space-8)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-normal)",
                textDecoration: "none",
                borderRadius: "var(--radius-md)",
                background: "transparent",
                color: "var(--color-white)",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
              }}
            >
              Our Story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
