"use client";

import { useState } from "react";

export interface InfiniteCarouselProps {
  slidesPerView: number;
  transitionSpeed: string;
  dotColorActive: string;
  arrowBg: string;
  arrowHoverBg: string;
}

const defaultProps: InfiniteCarouselProps = {
  slidesPerView: 4,
  transitionSpeed: "0.5s",
  dotColorActive: "#b42318",
  arrowBg: "#ffffff",
  arrowHoverBg: "#1a1a1a",
};

const dishes = [
  { name: "Dish Name One", desc: "A short description of this dish", price: "$12.99" },
  { name: "Dish Name Two", desc: "A short description of this dish", price: "$10.99" },
  { name: "Dish Name Three", desc: "A short description of this dish", price: "$14.99" },
  { name: "Dish Name Four", desc: "A short description of this dish", price: "$11.99" },
  { name: "Dish Name Five", desc: "A short description of this dish", price: "$9.99" },
  { name: "Dish Name Six", desc: "A short description of this dish", price: "$13.99" },
  { name: "Dish Name Seven", desc: "A short description of this dish", price: "$15.99" },
  { name: "Dish Name Eight", desc: "A short description of this dish", price: "$11.49" },
];

const galleryItems = [
  "Gallery photo 1",
  "Gallery photo 2",
  "Gallery photo 3",
  "Gallery photo 4",
  "Gallery photo 5",
  "Gallery photo 6",
];

function Carousel({
  items,
  slidesPerView,
  transitionSpeed,
  dotColorActive,
  arrowBg,
  arrowHoverBg,
  renderSlide,
}: {
  items: unknown[];
  slidesPerView: number;
  transitionSpeed: string;
  dotColorActive: string;
  arrowBg: string;
  arrowHoverBg: string;
  renderSlide: (item: unknown, index: number) => React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState<"prev" | "next" | null>(null);
  const totalPages = Math.ceil(items.length / slidesPerView);

  const goNext = () => setCurrentIndex((i) => (i + 1) % totalPages);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + totalPages) % totalPages);

  const offset = (100 / slidesPerView) * currentIndex * slidesPerView;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", overflow: "hidden", position: "relative", padding: "0 2.5rem" }}>
      <div
        style={{
          display: "flex",
          transition: `transform ${transitionSpeed} ease`,
          transform: `translateX(-${offset}%)`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              flex: `0 0 ${100 / slidesPerView}%`,
              padding: "0 1rem",
            }}
          >
            {renderSlide(item, i)}
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        onMouseEnter={() => setHoveredArrow("prev")}
        onMouseLeave={() => setHoveredArrow(null)}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          background: hoveredArrow === "prev" ? arrowHoverBg : arrowBg,
          color: hoveredArrow === "prev" ? "#fff" : "#1a1a1a",
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
          transition: `background ${transitionSpeed}`,
        }}
        aria-label="Previous"
      >
        &#8249;
      </button>
      <button
        onClick={goNext}
        onMouseEnter={() => setHoveredArrow("next")}
        onMouseLeave={() => setHoveredArrow(null)}
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          background: hoveredArrow === "next" ? arrowHoverBg : arrowBg,
          color: hoveredArrow === "next" ? "#fff" : "#1a1a1a",
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
          transition: `background ${transitionSpeed}`,
        }}
        aria-label="Next"
      >
        &#8250;
      </button>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i === currentIndex ? dotColorActive : "#d0d0d0",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: `background ${transitionSpeed}`,
            }}
            aria-label={`Go to slide group ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function InfiniteCarousel(props: Partial<InfiniteCarouselProps>) {
  const vars = { ...defaultProps, ...props };
  const perView = typeof vars.slidesPerView === "string" ? Number(vars.slidesPerView) : vars.slidesPerView;

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#faf6f0", padding: "3rem 1rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem", color: "#1a1208" }}>
        Fan Favorites
      </h2>
      <p style={{ textAlign: "center", color: "#888", marginBottom: "2rem", fontSize: "0.95rem" }}>
        Our most popular dishes, loved by the community
      </p>

      <Carousel
        items={dishes}
        slidesPerView={perView}
        transitionSpeed={vars.transitionSpeed}
        dotColorActive={vars.dotColorActive}
        arrowBg={vars.arrowBg}
        arrowHoverBg={vars.arrowHoverBg}
        renderSlide={(item) => {
          const dish = item as (typeof dishes)[0];
          return (
            <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ width: "100%", height: 180, background: "#d4c5b0", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a7e6e", fontSize: "0.85rem", fontStyle: "italic" }}>
                Photo placeholder
              </div>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1a1208", marginBottom: "0.25rem" }}>{dish.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "0.5rem" }}>{dish.desc}</p>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: vars.dotColorActive }}>{dish.price}</span>
              </div>
            </div>
          );
        }}
      />

      <hr style={{ border: "none", borderTop: "1px solid #e0d8cc", margin: "3rem auto", maxWidth: 1200 }} />

      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem", color: "#1a1208" }}>
        Gallery
      </h2>
      <p style={{ textAlign: "center", color: "#888", marginBottom: "2rem", fontSize: "0.95rem" }}>
        A look inside our kitchen and dining room
      </p>

      <Carousel
        items={galleryItems}
        slidesPerView={Math.max(perView - 1, 1)}
        transitionSpeed={vars.transitionSpeed}
        dotColorActive={vars.dotColorActive}
        arrowBg={vars.arrowBg}
        arrowHoverBg={vars.arrowHoverBg}
        renderSlide={(item) => (
          <div style={{ borderRadius: 12, overflow: "hidden", height: 220, background: "#d4c5b0", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a7e6e", fontStyle: "italic", fontSize: "0.85rem" }}>
            {item as string}
          </div>
        )}
      />
    </div>
  );
}
