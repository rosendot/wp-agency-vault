"use client";

export interface MenuCardsProps {
  sectionTitle: string;
  sectionSubtitle: string;
}

const defaults: MenuCardsProps = {
  sectionTitle: "Featured Dishes",
  sectionSubtitle: "Chef's favorites, crafted with care",
};

const dishes = [
  { name: "Wood-Fired Ribeye", desc: "12oz USDA Choice ribeye, seared over oak, served with truffle mashed potatoes and grilled asparagus. Finished with a red wine reduction.", price: "$34.99", bg: "linear-gradient(135deg, #8B6914, #5a3e0a)" },
  { name: "Pan-Seared Salmon", desc: "Wild-caught Atlantic salmon with herb butter crust, roasted seasonal vegetables, and lemon dill cream sauce on a bed of rice pilaf.", price: "$28.99", bg: "linear-gradient(135deg, #386641, #283618)" },
  { name: "Braised Short Ribs", desc: "Slow-braised for 8 hours in red wine and aromatics. Fork-tender, served over creamy polenta with roasted root vegetables.", price: "$29.99", bg: "linear-gradient(135deg, #6b3a2a, #3d2216)" },
  { name: "Lobster Ravioli", desc: "House-made pasta filled with Maine lobster and mascarpone, tossed in a saffron cream sauce with fresh chives and shaved parmesan.", price: "$32.99", bg: "linear-gradient(135deg, #8c1a11, #5a100a)" },
];

export default function MenuCards(props: Partial<MenuCardsProps>) {
  const v = { ...defaults, ...props };

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
        <p style={{
          fontSize: "var(--text-xl)",
          color: "var(--color-text-light)",
          margin: 0,
        }}>
          {v.sectionSubtitle}
        </p>
      </div>

      {/* Kit-specific content */}
      <div style={{ maxWidth: "var(--max-w-sm)", margin: "0 auto" }}>
        {dishes.map((dish, i) => {
          const isAlt = i % 2 === 1;
          return (
            <div key={i} style={{ marginBottom: i < dishes.length - 1 ? "var(--space-12)" : 0, borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--color-cream)", border: "1px solid var(--color-border)" }}>
              {/* Photo with overlay */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: dish.bg }}>
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: isAlt
                    ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 40%, transparent 100%)",
                  pointerEvents: "none",
                }} />
                {/* Name overlay */}
                <span style={{
                  position: "absolute",
                  ...(isAlt ? { top: "var(--space-5)" } : { bottom: "var(--space-5)" }),
                  left: "var(--space-6)",
                  right: "var(--space-6)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-3xl)",
                  fontWeight: 700,
                  color: "var(--color-white)",
                  lineHeight: "var(--leading-snug)",
                  textShadow: "var(--shadow-sm)",
                  zIndex: 1,
                }}>
                  {dish.name}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "var(--space-6)" }}>
                <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-loose)", color: "var(--color-text)", margin: "0 0 var(--space-5)" }}>{dish.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-primary)" }}>{dish.price}</span>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      display: "inline-block",
                      padding: "var(--space-3) var(--space-6)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      color: "var(--color-white)",
                      background: "var(--color-primary)",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Order
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
