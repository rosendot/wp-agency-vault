"use client";

import { useState } from "react";

export interface MenuGridProps {
  section_title: string;
  section_subtitle: string;
  columns: number;
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

const defaults: MenuGridProps = {
  section_title: "Our Menu",
  section_subtitle: "Tap a category to filter",
  columns: 3,
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

const items = [
  { name: "Loaded Nachos", desc: "Tortilla chips, queso, jalapeños", price: "$12.99", cat: "appetizers" },
  { name: "Crispy Calamari", desc: "Lightly fried with marinara", price: "$11.49", cat: "appetizers" },
  { name: "Bruschetta", desc: "Toasted bread, tomatoes, basil", price: "$9.99", cat: "appetizers" },
  { name: "Grilled Salmon", desc: "Herb butter, seasonal vegetables", price: "$24.99", cat: "entrees" },
  { name: "Ribeye Steak", desc: "12oz, garlic mashed potatoes", price: "$32.99", cat: "entrees" },
  { name: "Chicken Parmesan", desc: "Marinara, mozzarella, spaghetti", price: "$18.99", cat: "entrees" },
];

const tabs = ["All", "Appetizers", "Entrees"];

export default function MenuGrid(props: Partial<MenuGridProps>) {
  const v = { ...defaults, ...props };
  const [activeTab, setActiveTab] = useState("All");
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;

  const filtered = activeTab === "All" ? items : items.filter((i) => i.cat === activeTab.toLowerCase());

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem", fontFamily: v.font_body }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: v.font_heading, fontSize: "2.25rem", fontWeight: 700, color: v.color_dark, margin: "0 0 0.5rem" }}>{v.section_title}</h2>
        <p style={{ fontSize: "1.1rem", color: v.color_text_light, margin: 0 }}>{v.section_subtitle}</p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "2.5rem" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: v.font_body,
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: "0.5rem 1.25rem",
              border: `2px solid ${activeTab === tab ? v.color_primary : v.color_border}`,
              borderRadius: 9999,
              background: activeTab === tab ? v.color_primary : "transparent",
              color: activeTab === tab ? "#fff" : v.color_text,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1.5rem" }}>
        {filtered.map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "0.75rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            <div style={{ aspectRatio: "4/3", background: v.color_cream, display: "flex", alignItems: "center", justifyContent: "center", color: v.color_text_light, fontSize: "0.85rem", fontStyle: "italic" }}>
              Photo
            </div>
            <div style={{ padding: "1.25rem" }}>
              <h3 style={{ fontFamily: v.font_heading, fontSize: "1.15rem", fontWeight: 700, color: v.color_dark, margin: "0 0 0.4rem" }}>{item.name}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: v.color_text_light, margin: "0 0 0.75rem" }}>{item.desc}</p>
              <span style={{ display: "inline-block", fontSize: "0.85rem", fontWeight: 700, padding: "0.3rem 0.75rem", background: v.color_primary, color: "#fff", borderRadius: 9999 }}>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
