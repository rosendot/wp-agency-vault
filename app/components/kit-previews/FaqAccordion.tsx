"use client";

import { useState } from "react";

export interface FaqAccordionProps {
  borderColor: string;
  iconColor: string;
  questionColor: string;
  answerColor: string;
  transitionSpeed: string;
}

const defaultProps: FaqAccordionProps = {
  borderColor: "var(--color-border)",
  iconColor: "var(--color-primary)",
  questionColor: "var(--color-dark)",
  answerColor: "var(--color-text-light)",
  transitionSpeed: "0.3s",
};

const faqs = [
  { q: "What are your hours?", a: "We are open Monday through Friday from 11am to 10pm, and Saturday through Sunday from 10am to 11pm. We are closed on major holidays." },
  { q: "Do you take reservations?", a: "Yes! You can call us directly or book online through our website. Walk-ins are always welcome, but we recommend reservations for parties of 6 or more." },
  { q: "Do you offer catering?", a: "We offer catering for events of all sizes — from office lunches to weddings. Contact us for a custom menu and pricing. We typically need at least one week's notice for large orders." },
  { q: "Is there parking available?", a: "Yes, we have a free parking lot behind the building with 30 spaces available. Street parking is also available on Main Street and Oak Avenue." },
  { q: "Do you accommodate dietary restrictions?", a: "Absolutely. We offer vegetarian, vegan, and gluten-free options on our menu. Please let your server know about any allergies and we will do our best to accommodate you." },
];

export default function FaqAccordion(props: Partial<FaqAccordionProps>) {
  const v = { ...defaultProps, ...props };
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          Frequently Asked Questions
        </h2>
        <p style={{
          fontSize: "var(--text-xl)",
          color: "var(--color-text-light)",
          margin: 0,
        }}>
          Everything you need to know before your visit
        </p>
      </div>

      {/* Kit-specific content */}
      <div style={{ maxWidth: "var(--max-w-sm)", margin: "0 auto" }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${v.borderColor}`, ...(i === 0 ? { borderTop: `1px solid ${v.borderColor}` } : {}) }}>
              <button
                onClick={() => toggle(i)}
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
                  color: v.questionColor,
                  lineHeight: "var(--leading-normal)",
                  gap: "var(--space-4)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {faq.q}
                <span
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {/* Horizontal bar */}
                  <span style={{
                    position: "absolute",
                    width: 14,
                    height: 2,
                    background: v.iconColor,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }} />
                  {/* Vertical bar — rotates when open */}
                  <span style={{
                    position: "absolute",
                    width: 2,
                    height: 14,
                    background: v.iconColor,
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${isOpen ? "90deg" : "0deg"})`,
                    transition: `transform ${v.transitionSpeed} ease`,
                  }} />
                </span>
              </button>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? 300 : 0,
                  transition: `max-height ${v.transitionSpeed} ease`,
                }}
              >
                <div style={{ padding: "0 0 var(--space-5)", fontSize: "var(--text-base)", lineHeight: "var(--leading-loose)", color: v.answerColor, fontFamily: "var(--font-body)" }}>
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
