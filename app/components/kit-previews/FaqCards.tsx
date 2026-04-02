"use client";

export interface FaqCardsProps {
  sectionTitle: string;
  sectionSubtitle: string;
  columns: number;
  color_primary: string;
  color_dark: string;
  color_cream: string;
  color_text: string;
  color_text_light: string;
  color_border: string;
  font_heading: string;
  font_body: string;
}

const defaults: FaqCardsProps = {
  sectionTitle: "Frequently Asked Questions",
  sectionSubtitle: "Quick answers to common questions",
  columns: 3,
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
  { q: "What are your hours?", a: "Mon–Fri 11am–10pm, Sat–Sun 10am–11pm. Closed major holidays." },
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
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem", fontFamily: v.font_body }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: v.font_heading, fontSize: "2.5rem", fontWeight: 700, color: v.color_dark, margin: "0 0 0.5rem" }}>{v.sectionTitle}</h2>
        <p style={{ fontSize: "1.1rem", color: v.color_text_light, margin: 0 }}>{v.sectionSubtitle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1.5rem" }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: v.color_cream, border: `1px solid ${v.color_border}`, borderRadius: 12, padding: "1.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: v.color_primary, color: "#fff", fontFamily: v.font_heading, fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
              Q
            </div>
            <h3 style={{ fontFamily: v.font_heading, fontSize: "1.1rem", fontWeight: 600, color: v.color_dark, margin: "0 0 0.75rem", lineHeight: 1.4 }}>{faq.q}</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: v.color_text_light, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
