"use client";

export interface MenuListProps {
  sectionTitle: string;
  sectionSubtitle: string;
}

const defaults: MenuListProps = {
  sectionTitle: "Our Menu",
  sectionSubtitle: "Fresh ingredients, bold flavors",
};

const categories = [
  {
    name: "Appetizers",
    items: [
      { name: "Loaded Nachos", price: "$12.99", desc: "Tortilla chips, queso, jalapeños, pico de gallo", hasPhoto: true },
      { name: "Crispy Calamari", price: "$11.49", desc: "Lightly fried, served with marinara and lemon aioli", hasPhoto: false },
      { name: "Bruschetta", price: "$9.99", desc: "Toasted bread, fresh tomatoes, basil, balsamic glaze", hasPhoto: true },
      { name: "Soup of the Day", price: "$7.99", desc: "Ask your server for today's selection", hasPhoto: false },
    ],
  },
  {
    name: "Entrees",
    items: [
      { name: "Grilled Salmon", price: "$24.99", desc: "Atlantic salmon, herb butter, seasonal vegetables, rice pilaf", hasPhoto: true },
      { name: "Ribeye Steak", price: "$32.99", desc: "12oz USDA Choice, garlic mashed potatoes, asparagus", hasPhoto: false },
      { name: "Chicken Parmesan", price: "$18.99", desc: "Breaded chicken breast, marinara, mozzarella, spaghetti", hasPhoto: true },
      { name: "Veggie Bowl", price: "$15.99", desc: "Quinoa, roasted vegetables, avocado, tahini dressing", hasPhoto: false },
    ],
  },
];

export default function MenuList(props: Partial<MenuListProps>) {
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
      <div style={{ maxWidth: "var(--max-w-md)", margin: "0 auto" }}>
        {categories.map((cat) => (
          <div key={cat.name} style={{ marginBottom: "var(--space-10)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-3xl)", fontWeight: 600, color: "var(--color-primary)", margin: "0 0 var(--space-1)" }}>
              {cat.name}
            </h3>
            <span style={{ display: "block", width: 60, height: 3, background: "var(--color-secondary)", borderRadius: "var(--radius-sm)", marginBottom: "var(--space-4)" }} />

            {cat.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)", padding: "var(--space-3) 0", borderBottom: i < cat.items.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                {item.hasPhoto && (
                  <div style={{ width: 60, height: 60, borderRadius: "var(--radius-lg)", background: "var(--color-cream)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-light)", fontSize: "var(--text-xs)" }}>
                    Photo
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-dark)", whiteSpace: "nowrap", flexShrink: 0 }}>{item.name}</span>
                    <span style={{ flex: 1, borderBottom: "2px dotted var(--color-border)", minWidth: "2rem", position: "relative", top: -4 }} />
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-primary)", whiteSpace: "nowrap", flexShrink: 0 }}>{item.price}</span>
                  </div>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-light)", margin: "var(--space-1) 0 0", lineHeight: "var(--leading-relaxed)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
