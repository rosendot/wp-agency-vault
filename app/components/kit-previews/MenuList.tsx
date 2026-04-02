"use client";

export interface MenuListProps {
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

const defaults: MenuListProps = {
  section_title: "Our Menu",
  section_subtitle: "Fresh ingredients, bold flavors",
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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 1.5rem", background: v.color_cream, color: v.color_text, fontFamily: v.font_body }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: v.font_heading, fontSize: "2.5rem", fontWeight: 700, color: v.color_dark, margin: "0 0 0.5rem" }}>{v.section_title}</h2>
        <p style={{ fontSize: "1.125rem", color: v.color_text_light, margin: 0, fontStyle: "italic" }}>{v.section_subtitle}</p>
      </div>

      {categories.map((cat) => (
        <div key={cat.name} style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontFamily: v.font_heading, fontSize: "1.75rem", fontWeight: 600, color: v.color_primary, margin: "0 0 0.25rem" }}>
            {cat.name}
          </h3>
          <span style={{ display: "block", width: 60, height: 3, background: v.color_secondary, borderRadius: 2, marginBottom: "1rem" }} />

          {cat.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.75rem 0", borderBottom: i < cat.items.length - 1 ? `1px solid ${v.color_border}` : "none" }}>
              {item.hasPhoto && (
                <div style={{ width: 60, height: 60, borderRadius: 8, background: "#d4cec4", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8279", fontSize: "0.7rem", fontStyle: "italic" }}>
                  Photo
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span style={{ fontFamily: v.font_heading, fontSize: "1.125rem", fontWeight: 600, color: v.color_dark, whiteSpace: "nowrap", flexShrink: 0 }}>{item.name}</span>
                  <span style={{ flex: 1, borderBottom: `2px dotted ${v.color_border}`, minWidth: "2rem", position: "relative", top: -4 }} />
                  <span style={{ fontFamily: v.font_heading, fontSize: "1.125rem", fontWeight: 700, color: v.color_primary, whiteSpace: "nowrap", flexShrink: 0 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: v.color_text_light, margin: "0.25rem 0 0", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
