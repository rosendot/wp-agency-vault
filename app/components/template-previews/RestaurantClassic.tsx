"use client";

import { useState } from "react";

export interface RestaurantClassicProps {
  // Template variables (content)
  business_name: string;
  tagline: string;
  address_line_1: string;
  address_line_2: string;
  phone: string;
  email: string;
  hours_weekday: string;
  hours_weekend: string;
  google_maps_embed: string;
  hero_title: string;
  hero_text: string;
  // Palette colors (injected from palette)
  color_primary: string;
  color_primary_dark: string;
  color_secondary: string;
  color_dark: string;
  color_cream: string;
  color_text: string;
  color_text_light: string;
  color_border: string;
  color_white: string;
  // Palette fonts (injected from palette)
  font_heading: string;
  font_body: string;
}

const defaultProps: RestaurantClassicProps = {
  business_name: "Restaurant Name",
  tagline: "Authentic Kitchen",
  address_line_1: "123 Main Street",
  address_line_2: "City, ST 00000",
  phone: "(555) 000-0000",
  email: "hello@example.com",
  hours_weekday: "Mon-Fri: 11am - 10pm",
  hours_weekend: "Sat-Sun: 10am - 11pm",
  google_maps_embed: "",
  hero_title: "Your City's Home for Authentic Cuisine",
  hero_text: "Bold flavors and family tradition — every dish is crafted with recipes passed down through generations.",
  color_primary: "#b42318",
  color_primary_dark: "#8c1a11",
  color_secondary: "#d4a017",
  color_dark: "#1a1208",
  color_cream: "#faf6f0",
  color_text: "#2c2416",
  color_text_light: "#6b5e4f",
  color_border: "#e0d6c8",
  color_white: "#ffffff",
  font_heading: "Georgia, 'Times New Roman', serif",
  font_body: "'Inter', -apple-system, sans-serif",
};

const dishes = [
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
  { name: "Item Name", desc: "Short description of the dish", price: "$ 0.00" },
];

const galleryItems = Array.from({ length: 8 }, (_, i) => `Photo ${i + 1}`);

function Carousel({
  items,
  slidesPerView,
  dotColor,
  renderSlide,
}: {
  items: unknown[];
  slidesPerView: number;
  dotColor: string;
  renderSlide: (item: unknown, index: number) => React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState<"prev" | "next" | null>(null);
  const totalPages = Math.ceil(items.length / slidesPerView);
  const goNext = () => setCurrentIndex((i) => (i + 1) % totalPages);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + totalPages) % totalPages);
  const offset = (100 / slidesPerView) * currentIndex * slidesPerView;

  const arrowStyle = (hovered: boolean): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: hovered ? "#1a1a1a" : "#ffffff",
    color: hovered ? "#fff" : "#1a1a1a",
    border: "1px solid #e0e0e0",
    width: 40,
    height: 40,
    borderRadius: "50%",
    fontSize: "1.5rem",
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "background 0.3s",
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", overflow: "hidden", position: "relative", padding: "0 2.5rem" }}>
      <div style={{ display: "flex", transition: "transform 0.5s ease", transform: `translateX(-${offset}%)` }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: `0 0 ${100 / slidesPerView}%`, padding: "0 1rem" }}>
            {renderSlide(item, i)}
          </div>
        ))}
      </div>
      <button onClick={goPrev} onMouseEnter={() => setHoveredArrow("prev")} onMouseLeave={() => setHoveredArrow(null)} style={{ ...arrowStyle(hoveredArrow === "prev"), left: 0 }} aria-label="Previous">&#8249;</button>
      <button onClick={goNext} onMouseEnter={() => setHoveredArrow("next")} onMouseLeave={() => setHoveredArrow(null)} style={{ ...arrowStyle(hoveredArrow === "next"), right: 0 }} aria-label="Next">&#8250;</button>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => setCurrentIndex(i)} style={{ width: 10, height: 10, borderRadius: "50%", background: i === currentIndex ? dotColor : "#d0d0d0", border: "none", cursor: "pointer", padding: 0, transition: "background 0.3s" }} aria-label={`Go to group ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default function RestaurantClassic(props: Partial<RestaurantClassicProps>) {
  const v = { ...defaultProps, ...props };

  const font = v.font_body;
  const fontHeading = v.font_heading;

  return (
    <div style={{ fontFamily: font, color: v.color_text, lineHeight: 1.6 }}>
      {/* ===== HERO ===== */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          background: `linear-gradient(rgba(26,18,8,0.6), rgba(26,18,8,0.6)), linear-gradient(135deg, #8B6914 0%, #5a3e0a 50%, #3d2a06 100%)`,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 750, padding: "2rem" }}>
          <p style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: 3, marginBottom: "1rem", fontWeight: 600, color: v.color_secondary }}>
            Welcome to
          </p>
          <h1 style={{ fontSize: "4rem", lineHeight: 1.1, marginBottom: "1.25rem", fontFamily: fontHeading }}>
            {v.hero_title}
          </h1>
          <p style={{ fontSize: "1.15rem", lineHeight: 1.8, opacity: 0.85, marginBottom: "2.5rem", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            {v.hero_text}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ display: "inline-block", padding: "0.85rem 2.25rem", borderRadius: 4, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, background: v.color_primary, color: "#fff", border: `2px solid ${v.color_primary}`, textDecoration: "none" }}>
              Order Online
            </span>
            <span style={{ display: "inline-block", padding: "0.85rem 2.25rem", borderRadius: 4, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, background: "transparent", color: "#fff", border: "2px solid #fff", textDecoration: "none" }}>
              Our Story
            </span>
          </div>
        </div>
      </section>

      {/* ===== FAN FAVORITES ===== */}
      <section style={{ padding: "5rem 2rem", background: v.color_cream }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: fontHeading, fontSize: "2.5rem", color: v.color_dark }}>Fan Favorites</h2>
        </div>
        <Carousel
          items={dishes}
          slidesPerView={4}
          dotColor={v.color_primary}
          renderSlide={(item) => {
            const dish = item as (typeof dishes)[0];
            return (
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: 12, background: "#d4cec4", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8279", fontSize: "0.85rem", fontStyle: "italic", marginBottom: "1rem" }}>
                  Photo
                </div>
                <h3 style={{ fontFamily: fontHeading, fontSize: "1rem", color: v.color_primary, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: "0.5rem" }}>{dish.name}</h3>
                <p style={{ fontSize: "0.85rem", color: v.color_text_light, lineHeight: 1.5, marginBottom: "0.5rem" }}>{dish.desc}</p>
                <span style={{ fontWeight: 700, fontSize: "1rem", color: v.color_primary }}>{dish.price}</span>
              </div>
            );
          }}
        />
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <span style={{ display: "inline-block", padding: "0.85rem 2.25rem", borderRadius: 4, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, background: "transparent", color: v.color_dark, border: `2px solid ${v.color_dark}`, textDecoration: "none" }}>
            View Menu
          </span>
        </div>
      </section>

      {/* ===== VISIT US ===== */}
      <section style={{ padding: "5rem 2rem", background: v.color_dark, color: v.color_cream }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: fontHeading, fontSize: "2.5rem", color: v.color_secondary }}>Visit Us</h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(250,246,240,0.7)", maxWidth: 600, margin: "0.75rem auto 0" }}>
            Walk-ins welcome, or call ahead for parties of 6 or more
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", maxWidth: 1200, margin: "0 auto", alignItems: "start" }}>
          <div style={{ borderRadius: 8, overflow: "hidden", height: "100%" }}>
            {v.google_maps_embed ? (
              <iframe src={v.google_maps_embed} style={{ width: "100%", height: "100%", minHeight: 350, border: 0, display: "block" }} allowFullScreen loading="lazy" title="Google Maps" />
            ) : (
              <div style={{ width: "100%", minHeight: 350, background: "#d4cec4", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8279", fontStyle: "italic" }}>
                Google Maps Embed
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: v.color_secondary }}>Location</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.7 }}>{v.address_line_1}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.7 }}>{v.address_line_2}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: v.color_secondary }}>Hours</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.7 }}>{v.hours_weekday}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.7 }}>{v.hours_weekend}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: v.color_secondary }}>Contact</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.7 }}>{v.phone}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.7 }}>{v.email}</p>
            </div>
            <span style={{ display: "inline-block", padding: "0.85rem 2.25rem", borderRadius: 4, fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: 1, background: v.color_primary, color: "#fff", border: `2px solid ${v.color_primary}`, textDecoration: "none", alignSelf: "flex-start" }}>
              Call {v.phone}
            </span>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: fontHeading, fontSize: "2.5rem", color: v.color_dark }}>Gallery</h2>
        </div>
        <Carousel
          items={galleryItems}
          slidesPerView={3}
          dotColor={v.color_primary}
          renderSlide={(item) => (
            <div style={{ width: "100%", aspectRatio: "3/2", borderRadius: 8, background: "#d4cec4", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a8279", fontStyle: "italic", fontSize: "0.85rem" }}>
              {item as string}
            </div>
          )}
        />
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: v.color_dark, color: v.color_cream, padding: "4rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem", maxWidth: 1200, margin: "0 auto", paddingBottom: "2rem", borderBottom: "1px solid rgba(250,246,240,0.15)" }}>
          <div>
            <h4 style={{ fontFamily: fontHeading, fontSize: "1.1rem", marginBottom: "1rem", color: v.color_secondary, textTransform: "uppercase", letterSpacing: 1 }}>Contact Us</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "0.5rem" }}>{v.address_line_1}</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "0.5rem" }}>{v.address_line_2}</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "0.5rem" }}>{v.phone}</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "0.5rem" }}>{v.email}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: fontHeading, fontSize: "1.75rem", color: v.color_secondary, marginBottom: "0.25rem" }}>{v.business_name}</div>
            <p style={{ fontSize: "0.85rem", opacity: 0.5, marginBottom: "1.25rem", letterSpacing: 1 }}>{v.tagline}</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              {["FB", "IG"].map((label) => (
                <span key={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: "rgba(250,246,240,0.15)", color: v.color_cream, fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }} aria-label={label}>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: fontHeading, fontSize: "1.1rem", marginBottom: "1rem", color: v.color_secondary, textTransform: "uppercase", letterSpacing: 1 }}>Opening Hours</h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "0.5rem" }}>{v.hours_weekday}</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "0.5rem" }}>{v.hours_weekend}</p>
          </div>
        </div>
        <div style={{ textAlign: "center", paddingTop: "2rem", maxWidth: 1200, margin: "0 auto", fontSize: "0.85rem", opacity: 0.5 }}>
          <p>&copy; 2026 {v.business_name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
