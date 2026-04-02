"use client";

export interface FaqCardsProps {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: number;
}

const defaults: FaqCardsProps = {
  sectionTitle: "Frequently Asked Questions",
  sectionSubtitle: "Quick answers to common questions",
  columns: 3,
};

const faqs = [
  { q: "What are your hours?", a: "Mon-Fri 11am-10pm, Sat-Sun 10am-11pm. Closed major holidays." },
  { q: "Do you take reservations?", a: "Yes, call us or book online. Walk-ins welcome. Reservations recommended for 6+." },
  { q: "Do you offer catering?", a: "We cater events of all sizes. Contact us for custom menus and pricing." },
  { q: "Is there parking?", a: "Free lot behind the building (30 spaces). Street parking also available." },
  { q: "Dietary restrictions?", a: "Vegetarian, vegan, and gluten-free options available. Tell your server about allergies." },
  { q: "Private events?", a: "Private dining room seats 24 with dedicated server and AV equipment." },
];

export default function FaqCards(props: Partial<FaqCardsProps>) {
  const v = { ...defaults, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;

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
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "var(--space-6)" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "var(--color-cream)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--space-8)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "var(--radius-lg)", background: "var(--color-primary)", color: "var(--color-white)", fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--space-4)" }}>
                Q
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-dark)", margin: "0 0 var(--space-3)", lineHeight: "var(--leading-normal)" }}>{faq.q}</h3>
              <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-loose)", color: "var(--color-text-light)", margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
