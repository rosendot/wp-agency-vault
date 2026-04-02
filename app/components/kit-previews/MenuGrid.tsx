"use client";

import { useState } from "react";

export interface MenuGridProps {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: number;
}

const defaults: MenuGridProps = {
  sectionTitle: "Our Menu",
  sectionSubtitle: "Tap a category to filter",
  columns: 3,
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
      <div style={{ maxWidth: "var(--max-w-xl)", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "center", marginBottom: "var(--space-10)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                padding: "var(--space-2) var(--space-5)",
                border: `2px solid ${activeTab === tab ? "var(--color-primary)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-full)",
                background: activeTab === tab ? "var(--color-primary)" : "transparent",
                color: activeTab === tab ? "var(--color-white)" : "var(--color-text)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "var(--space-6)" }}>
          {filtered.map((item, i) => (
            <div key={i} style={{ background: "var(--color-white)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
              <div style={{ aspectRatio: "4/3", background: "var(--color-cream)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-light)", fontSize: "var(--text-sm)" }}>
                Photo
              </div>
              <div style={{ padding: "var(--space-5)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-dark)", margin: "0 0 var(--space-2)" }}>{item.name}</h3>
                <p style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--color-text-light)", margin: "0 0 var(--space-3)" }}>{item.desc}</p>
                <span style={{ display: "inline-block", fontSize: "var(--text-sm)", fontWeight: 700, padding: "var(--space-1) var(--space-3)", background: "var(--color-primary)", color: "var(--color-white)", borderRadius: "var(--radius-full)" }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
