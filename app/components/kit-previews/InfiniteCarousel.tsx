"use client";

import { useState } from "react";

export interface InfiniteCarouselProps {
  slidesPerView: number;
  transitionSpeed: string;
  arrowBg: string;
  arrowHoverBg: string;
}

const defaultProps: InfiniteCarouselProps = {
  slidesPerView: 4,
  transitionSpeed: "0.5s",
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
  arrowBg,
  arrowHoverBg,
  renderSlide,
}: {
  items: unknown[];
  slidesPerView: number;
  transitionSpeed: string;
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
    <div style={{ maxWidth: "var(--max-w-xl)", margin: "0 auto", overflow: "hidden", position: "relative", padding: "0 var(--space-10)" }}>
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
              padding: "0 var(--space-4)",
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
          color: hoveredArrow === "prev" ? "var(--color-white)" : "var(--color-dark)",
          border: "1px solid var(--color-border)",
          width: 40,
          height: 40,
          borderRadius: "var(--radius-full)",
          fontSize: "var(--text-3xl)",
          lineHeight: "var(--leading-tight)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          boxShadow: "var(--shadow-sm)",
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
          color: hoveredArrow === "next" ? "var(--color-white)" : "var(--color-dark)",
          border: "1px solid var(--color-border)",
          width: 40,
          height: 40,
          borderRadius: "var(--radius-full)",
          fontSize: "var(--text-3xl)",
          lineHeight: "var(--leading-tight)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          boxShadow: "var(--shadow-sm)",
          transition: `background ${transitionSpeed}`,
        }}
        aria-label="Next"
      >
        &#8250;
      </button>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-2)", marginTop: "var(--space-8)" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: "var(--radius-full)",
              background: i === currentIndex ? "var(--color-primary)" : "var(--color-border)",
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
  const v = { ...defaultProps, ...props };
  const perView = typeof v.slidesPerView === "string" ? Number(v.slidesPerView) : v.slidesPerView;

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
          Fan Favorites
        </h2>
        <p style={{
          fontSize: "var(--text-xl)",
          color: "var(--color-text-light)",
          margin: 0,
        }}>
          Our most popular dishes, loved by the community
        </p>
      </div>

      {/* Kit-specific content */}
      <div style={{ maxWidth: "var(--max-w-xl)", margin: "0 auto" }}>
        <Carousel
          items={dishes}
          slidesPerView={perView}
          transitionSpeed={v.transitionSpeed}
          arrowBg={v.arrowBg}
          arrowHoverBg={v.arrowHoverBg}
          renderSlide={(item) => {
            const dish = item as (typeof dishes)[0];
            return (
              <div style={{ background: "var(--color-white)", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ width: "100%", height: 180, background: "var(--color-cream)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-light)", fontSize: "var(--text-sm)" }}>
                  Photo placeholder
                </div>
                <div style={{ padding: "var(--space-4)" }}>
                  <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--color-dark)", marginBottom: "var(--space-1)", fontFamily: "var(--font-heading)" }}>{dish.name}</h3>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-light)", marginBottom: "var(--space-2)", fontFamily: "var(--font-body)" }}>{dish.desc}</p>
                  <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-primary)" }}>{dish.price}</span>
                </div>
              </div>
            );
          }}
        />

        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "var(--space-12) auto" }} />

        {/* Gallery sub-section header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-4xl)",
            fontWeight: 700,
            color: "var(--color-dark)",
            margin: "0 0 var(--space-2)",
            lineHeight: "var(--leading-snug)",
          }}>
            Gallery
          </h2>
          <p style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-text-light)",
            margin: 0,
          }}>
            A look inside our kitchen and dining room
          </p>
        </div>

        <Carousel
          items={galleryItems}
          slidesPerView={Math.max(perView - 1, 1)}
          transitionSpeed={v.transitionSpeed}
          arrowBg={v.arrowBg}
          arrowHoverBg={v.arrowHoverBg}
          renderSlide={(item) => (
            <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", height: 220, background: "var(--color-cream)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-light)", fontSize: "var(--text-sm)" }}>
              {item as string}
            </div>
          )}
        />
      </div>
    </div>
  );
}
