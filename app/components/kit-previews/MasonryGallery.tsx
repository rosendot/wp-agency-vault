"use client";

import { useState } from "react";

export interface MasonryGalleryProps {
  columns: number;
  gap: string;
  sectionTitle: string;
}

const defaults: MasonryGalleryProps = {
  columns: 4,
  gap: "12px",
  sectionTitle: "Gallery",
};

const placeholderColors = [
  "#c4b5a0", "#b8a892", "#d4c5b0", "#a89880", "#c0b09a",
  "#baa88e", "#d0c0aa", "#a49484", "#c8b89e", "#b4a490",
  "#c0b098", "#a89078",
];

// Varying heights to create masonry effect
const placeholderHeights = [
  280, 200, 320, 240, 180, 300, 220, 260, 340, 190, 270, 230,
];

export default function MasonryGallery(props: Partial<MasonryGalleryProps>) {
  const v = { ...defaults, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          Pinterest-style masonry layout with varying heights
        </p>
      </div>

      <div style={{ maxWidth: "var(--max-w-2xl)", margin: "0 auto" }}>
        <div
          style={{
            columns: cols,
            columnGap: v.gap,
          }}
        >
          {placeholderHeights.map((height, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                style={{
                  breakInside: "avoid",
                  marginBottom: v.gap,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  style={{
                    width: "100%",
                    height,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-light)",
                    background: placeholderColors[i % placeholderColors.length],
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
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
                      fontSize: "var(--text-2xl)",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "scale(1)" : "scale(0.8)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
