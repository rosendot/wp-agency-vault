"use client";

import { useState } from "react";

export interface GridGalleryProps {
  columns: number;
  rows: number;
  gap: string;
  sectionTitle: string;
}

const defaultProps: GridGalleryProps = {
  columns: 5,
  rows: 3,
  gap: "4px",
  sectionTitle: "Gallery",
};

const placeholderColors = [
  "#c4b5a0", "#b8a892", "#d4c5b0", "#a89880", "#c0b09a",
  "#baa88e", "#d0c0aa", "#a49484", "#c8b89e", "#b4a490",
  "#c0b098", "#a89078", "#d4c0a8", "#b0a08c", "#c8b8a0",
  "#b8a488", "#c4b098", "#a49080", "#d0b8a0", "#bca890",
  "#c8b4a0", "#a89488", "#d4c4b0", "#b4a094", "#c0a898",
];

export default function GridGallery(props: Partial<GridGalleryProps>) {
  const v = { ...defaultProps, ...props };
  const cols = typeof v.columns === "string" ? Number(v.columns) : v.columns;
  const rows = typeof v.rows === "string" ? Number(v.rows) : v.rows;
  const total = cols * rows;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "4rem 1rem", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {v.sectionTitle && (
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", fontWeight: 700, color: "#1a1208", margin: 0 }}>
            {v.sectionTitle}
          </h2>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: v.gap,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "1",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Placeholder image */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontStyle: "italic",
                  color: "#8a8279",
                  background: placeholderColors[i % placeholderColors.length],
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.4s ease",
                }}
              >
                {i + 1}
              </div>

              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isHovered ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.3s ease",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: "1.5rem",
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
  );
}
