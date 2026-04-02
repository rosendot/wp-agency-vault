"use client";

import { useState } from "react";

export interface FaqTwoColumnProps {
  sectionTitle: string;
  sectionSubtitle: string;
}

const defaults: FaqTwoColumnProps = {
  sectionTitle: "Frequently Asked Questions",
  sectionSubtitle: "Click a question to see the answer",
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
      <div style={{ maxWidth: "var(--max-w-lg)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--space-10)", alignItems: "start" }}>
          {/* Questions */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "var(--space-4) var(--space-5)",
                  background: activeIndex === i ? "rgba(0,0,0,0.02)" : "none",
                  border: "none",
                  borderLeft: `3px solid ${activeIndex === i ? "var(--color-primary)" : "transparent"}`,
                  borderBottom: i < faqs.length - 1 ? "1px solid var(--color-border)" : "none",
                  textAlign: "left",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-lg)",
                  fontWeight: activeIndex === i ? 600 : 500,
                  color: activeIndex === i ? "var(--color-primary)" : "var(--color-text)",
                  cursor: "pointer",
                }}
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Answer */}
          <div style={{ background: "var(--color-cream)", borderRadius: "var(--radius-xl)", padding: "var(--space-8)", border: "1px solid var(--color-border)", minHeight: 200 }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--color-dark)", margin: "0 0 var(--space-4)" }}>
              {faqs[activeIndex].q}
            </h3>
            <p style={{ fontSize: "var(--text-lg)", lineHeight: "var(--leading-loose)", color: "var(--color-text-light)", margin: 0 }}>
              {faqs[activeIndex].a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
