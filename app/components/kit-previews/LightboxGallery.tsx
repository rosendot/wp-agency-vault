"use client";

import { useState } from "react";

export interface LightboxGalleryProps {
  columns: number;
  gap: string;
  sectionTitle: string;
}

const defaults: LightboxGalleryProps = {
  columns: 4,
  gap: "8px",
  sectionTitle: "Gallery",
};

const placeholderColors = [
  "#c4b5a0", "#b8a892", "#d4c5b0", "#a89880",
  "#c0b09a", "#baa88e", "#d0c0aa", "#a49484",
];

export default function LightboxGallery(props: Partial<LightboxGalleryProps>) {
  const v = { ...defaults, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        <p style={{ fontSize: "var(--text-xl)", color: "var(--color-text-light)", margin: 0 }}>
          Click any thumbnail to open the full-screen lightbox
        </p>
      </div>

      <div style={{ maxWidth: "var(--max-w-2xl)", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: v.gap,
          }}
        >
          {placeholderColors.map((color, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "1",
                  cursor: "pointer",
                  borderRadius: "var(--radius-lg)",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setLightboxIndex(i)}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-light)",
                    background: color,
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isHovered ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-white)",
                      fontSize: "var(--text-xl)",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    &#x26F6;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "absolute",
              top: "var(--space-6)",
              right: "var(--space-6)",
              background: "none",
              border: "none",
              color: "var(--color-white)",
              fontSize: "var(--text-3xl)",
              cursor: "pointer",
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + placeholderColors.length) % placeholderColors.length);
            }}
            style={{
              position: "absolute",
              left: "var(--space-4)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "var(--color-white)",
              fontSize: "var(--text-3xl)",
              padding: "var(--space-4) var(--space-3)",
              cursor: "pointer",
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            &#8249;
          </button>

          {/* Image placeholder */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "60vw",
              height: "60vh",
              background: placeholderColors[lightboxIndex],
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--text-4xl)",
              color: "var(--color-text-light)",
            }}
          >
            {lightboxIndex + 1}
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % placeholderColors.length);
            }}
            style={{
              position: "absolute",
              right: "var(--space-4)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "var(--color-white)",
              fontSize: "var(--text-3xl)",
              padding: "var(--space-4) var(--space-3)",
              cursor: "pointer",
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            &#8250;
          </button>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              bottom: "var(--space-6)",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "var(--text-sm)",
            }}
          >
            {lightboxIndex + 1} / {placeholderColors.length}
          </div>
        </div>
      )}
    </div>
  );
}
