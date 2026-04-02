"use client";

import { useState } from "react";

export interface FaqTwoColumnProps {
  sectionTitle: string;
  sectionSubtitle: string;
  color_primary: string;
  color_dark: string;
  color_cream: string;
  color_text: string;
  color_text_light: string;
  color_border: string;
  font_heading: string;
  font_body: string;
}

const defaults: FaqTwoColumnProps = {
  sectionTitle: "Frequently Asked Questions",
  sectionSubtitle: "Click a question to see the answer",
  color_primary: "#b42318",
  color_dark: "#1a1208",
  color_cream: "#faf6f0",
  color_text: "#2c2416",
  color_text_light: "#6b5e4f",
  color_border: "#e0d6c8",
  font_heading: "Georgia, 'Times New Roman', serif",
  font_body: "'Inter', -apple-system, sans-serif",
};

const faqs = [
  { q: "What are your hours?", a: "We are open Monday through Friday from 11am to 10pm, and Saturday through Sunday from 10am to 11pm. We are closed on major holidays." },
  { q: "Do you take reservations?", a: "Yes! You can call us directly or book online through our website. Walk-ins are always welcome, but we recommend reservations for parties of 6 or more." },
  { q: "Do you offer catering?", a: "We offer catering for events of all sizes. Contact us for a custom menu and pricing. We typically need at least one week's notice for large orders." },
  { q: "Is there parking available?", a: "Yes, we have a free parking lot behind the building with 30 spaces available. Street parking is also available on Main Street and Oak Avenue." },
  { q: "Do you accommodate dietary restrictions?", a: "Absolutely. We offer vegetarian, vegan, and gluten-free options on our menu. Please let your server know about any allergies and we will do our best to accommodate you." },
  { q: "Do you have a private dining room?", a: "Yes, our private dining room seats up to 24 guests. It includes a dedicated server, customizable menu, and AV equipment for presentations. Contact us to reserve." },
];

export default function FaqTwoColumn(props: Partial<FaqTwoColumnProps>) {
  const v = { ...defaults, ...props };
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem", fontFamily: v.font_body }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: v.font_heading, fontSize: "2.5rem", fontWeight: 700, color: v.color_dark, margin: "0 0 0.5rem" }}>{v.sectionTitle}</h2>
        <p style={{ fontSize: "1.1rem", color: v.color_text_light, margin: 0 }}>{v.sectionSubtitle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2.5rem", alignItems: "start" }}>
        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                display: "block",
                width: "100%",
                padding: "1rem 1.25rem",
                background: activeIndex === i ? "rgba(0,0,0,0.02)" : "none",
                border: "none",
                borderLeft: `3px solid ${activeIndex === i ? v.color_primary : "transparent"}`,
                borderBottom: i < faqs.length - 1 ? `1px solid ${v.color_border}` : "none",
                textAlign: "left",
                fontFamily: v.font_body,
                fontSize: "1rem",
                fontWeight: activeIndex === i ? 600 : 500,
                color: activeIndex === i ? v.color_primary : v.color_text,
                cursor: "pointer",
              }}
            >
              {faq.q}
            </button>
          ))}
        </div>

        {/* Answer */}
        <div style={{ background: v.color_cream, borderRadius: 12, padding: "2rem", border: `1px solid ${v.color_border}`, minHeight: 200 }}>
          <h3 style={{ fontFamily: v.font_heading, fontSize: "1.25rem", fontWeight: 700, color: v.color_dark, margin: "0 0 1rem" }}>
            {faqs[activeIndex].q}
          </h3>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: v.color_text_light, margin: 0 }}>
            {faqs[activeIndex].a}
          </p>
        </div>
      </div>
    </div>
  );
}
