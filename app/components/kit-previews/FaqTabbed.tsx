"use client";

import { useState } from "react";

export interface FaqTabbedProps {
  sectionTitle: string;
  sectionSubtitle: string;
}

const defaults: FaqTabbedProps = {
  sectionTitle: "Frequently Asked Questions",
  sectionSubtitle: "Browse by category",
};

const categories = [
  {
    slug: "ordering",
    label: "Ordering",
    faqs: [
      { q: "How do I place an order?", a: "You can order online through our website, call us directly, or walk in and order at the counter." },
      { q: "Do you offer delivery?", a: "Yes, we deliver within a 5-mile radius. You can also order through DoorDash and UberEats." },
      { q: "Can I customize my order?", a: "Absolutely. Let us know about any modifications and we will do our best to accommodate." },
    ],
  },
  {
    slug: "dining",
    label: "Dining",
    faqs: [
      { q: "Do you take reservations?", a: "Yes, call us or book online. Walk-ins are always welcome." },
      { q: "Is there outdoor seating?", a: "Yes, we have a covered patio with 8 tables available year-round." },
      { q: "Do you accommodate large parties?", a: "We can seat parties up to 24 in our private dining room. Contact us to reserve." },
    ],
  },
  {
    slug: "menu",
    label: "Menu & Diet",
    faqs: [
      { q: "Do you have vegetarian options?", a: "Yes, we have a full vegetarian section on our menu plus vegan modifications for most dishes." },
      { q: "Are allergen details available?", a: "Yes, ask your server for our allergen guide. We can also customize dishes to avoid specific allergens." },
      { q: "Do you have a kids menu?", a: "Yes, our kids menu is available for children 12 and under with smaller portions and kid-friendly options." },
    ],
  },
];

export default function FaqTabbed(props: Partial<FaqTabbedProps>) {
  const v = { ...defaults, ...props };
  const [activeTab, setActiveTab] = useState("ordering");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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
        {/* Tabs */}
        <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "center", flexWrap: "wrap", marginBottom: "var(--space-10)" }}>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveTab(cat.slug)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                padding: "var(--space-3) var(--space-6)",
                border: `2px solid ${activeTab === cat.slug ? "var(--color-primary)" : "var(--color-border)"}`,
                borderRadius: "var(--radius-full)",
                background: activeTab === cat.slug ? "var(--color-primary)" : "transparent",
                color: activeTab === cat.slug ? "var(--color-white)" : "var(--color-text)",
                cursor: "pointer",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {categories.map((cat) => {
          if (cat.slug !== activeTab) return null;
          return (
            <div key={cat.slug}>
              {cat.faqs.map((faq, i) => {
                const key = `${cat.slug}-${i}`;
                const isOpen = openItems.has(key);
                return (
                  <div key={i} style={{ borderBottom: "1px solid var(--color-border)", ...(i === 0 ? { borderTop: "1px solid var(--color-border)" } : {}) }}>
                    <button
                      onClick={() => toggleItem(key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "var(--space-5) 0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: "var(--text-lg)",
                        fontWeight: 600,
                        color: "var(--color-dark)",
                        lineHeight: "var(--leading-normal)",
                        gap: "var(--space-4)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {faq.q}
                      <span style={{ flexShrink: 0, width: 24, height: 24, position: "relative", display: "inline-block" }}>
                        <span style={{ position: "absolute", width: 14, height: 2, background: "var(--color-primary)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                        <span style={{ position: "absolute", width: 2, height: 14, background: "var(--color-primary)", top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${isOpen ? "90deg" : "0deg"})`, transition: "transform 0.3s ease" }} />
                      </span>
                    </button>
                    <div style={{ overflow: "hidden", maxHeight: isOpen ? 300 : 0, transition: "max-height 0.3s ease" }}>
                      <div style={{ padding: "0 0 var(--space-5)", fontSize: "var(--text-base)", lineHeight: "var(--leading-loose)", color: "var(--color-text-light)" }}>
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
