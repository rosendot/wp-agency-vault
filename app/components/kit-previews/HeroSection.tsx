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
  const vars = { ...defaultProps, ...props };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: vars.minHeight,
          background: `linear-gradient(${vars.overlayColor}, ${vars.overlayColor}), linear-gradient(135deg, #8B6914 0%, #5a3e0a 50%, #3d2a06 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: vars.maxWidth,
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "1rem",
              fontWeight: 600,
              color: "#d4a017",
            }}
          >
            Welcome to
          </p>
          <h1
            style={{
              fontSize: "4rem",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Your City&rsquo;s Home for
            <br />
            Authentic Cuisine
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.8,
              opacity: 0.85,
              marginBottom: "2.5rem",
              maxWidth: "600px",
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
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "inline-block",
                padding: "0.9rem 2rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                textDecoration: "none",
                borderRadius: "4px",
                background: "#b42318",
                color: "#fff",
                border: "2px solid #b42318",
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
                padding: "0.9rem 2rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                textDecoration: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
              }}
            >
              Our Story
            </a>
          </div>
        </div>
      </section>
      <div
        style={{
          padding: "3rem 2rem",
          textAlign: "center",
          background: "#faf6f0",
          color: "#888",
        }}
      >
        <p>Content continues below the hero...</p>
      </div>
    </div>
  );
}
