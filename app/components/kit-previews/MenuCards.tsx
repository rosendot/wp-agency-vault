"use client";

export interface MenuCardsProps {
  section_title: string;
  section_subtitle: string;
  color_primary: string;
  color_secondary: string;
  color_dark: string;
  color_cream: string;
  color_text: string;
  color_text_light: string;
  color_border: string;
  font_heading: string;
  font_body: string;
}

const defaults: MenuCardsProps = {
  section_title: "Featured Dishes",
  section_subtitle: "Chef's favorites, crafted with care",
  color_primary: "#b42318",
  color_secondary: "#d4a017",
  color_dark: "#1a1208",
  color_cream: "#faf6f0",
  color_text: "#2c2416",
  color_text_light: "#6b5e4f",
  color_border: "#e0d6c8",
  font_heading: "Georgia, 'Times New Roman', serif",
  font_body: "'Inter', -apple-system, sans-serif",
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
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem", fontFamily: v.font_body }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: v.font_heading, fontSize: "2.5rem", fontWeight: 700, color: v.color_dark, margin: "0 0 0.5rem", lineHeight: 1.2 }}>{v.section_title}</h2>
        <p style={{ fontSize: "1.125rem", color: v.color_text_light, margin: 0 }}>{v.section_subtitle}</p>
      </div>

      {dishes.map((dish, i) => {
        const isAlt = i % 2 === 1;
        return (
          <div key={i} style={{ marginBottom: i < dishes.length - 1 ? "3rem" : 0, borderRadius: 8, overflow: "hidden", background: v.color_cream, border: `1px solid ${v.color_border}` }}>
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
                ...(isAlt ? { top: "1.25rem" } : { bottom: "1.25rem" }),
                left: "1.5rem",
                right: "1.5rem",
                fontFamily: v.font_heading,
                fontSize: "2rem",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                zIndex: 1,
              }}>
                {dish.name}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem" }}>
              <p style={{ fontSize: "1rem", lineHeight: 1.7, color: v.color_text, margin: "0 0 1.25rem" }}>{dish.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <span style={{ fontFamily: v.font_heading, fontSize: "1.5rem", fontWeight: 700, color: v.color_primary }}>{dish.price}</span>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "inline-block",
                    padding: "0.625rem 1.5rem",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#fff",
                    background: v.color_primary,
                    border: "none",
                    borderRadius: 4,
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
  );
}
