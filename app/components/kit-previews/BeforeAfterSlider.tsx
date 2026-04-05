"use client";

import { useState, useRef, useCallback } from "react";

export interface BeforeAfterSliderProps {
  startPosition: number;
  sectionTitle: string;
}

const defaults: BeforeAfterSliderProps = {
  startPosition: 50,
  sectionTitle: "Before & After",
};

export default function BeforeAfterSlider(props: Partial<BeforeAfterSliderProps>) {
  const v = { ...defaults, ...props };
  const startPct = typeof v.startPosition === "string" ? Number(v.startPosition) : v.startPosition;
  const [position, setPosition] = useState(startPct);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

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
          Drag the divider to compare before and after
        </p>
      </div>

      <div style={{ maxWidth: "var(--max-w-sm)", margin: "0 auto" }}>
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-lg)",
            cursor: "ew-resize",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* After image (bottom) */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "linear-gradient(135deg, #c4b5a0, #d4c5b0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--text-2xl)",
              color: "var(--color-text-light)",
              fontFamily: "var(--font-heading)",
            }}
          >
            After
          </div>

          {/* Before image (clipped) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${position}%`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: containerRef.current ? containerRef.current.offsetWidth : "100vw",
                height: "100%",
                background: "linear-gradient(135deg, #8a7a68, #a89880)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--text-2xl)",
                color: "var(--color-cream)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Before
            </div>

            {/* Before label */}
            <span
              style={{
                position: "absolute",
                top: "var(--space-4)",
                left: "var(--space-4)",
                background: "rgba(0,0,0,0.55)",
                color: "var(--color-white)",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-tight)",
              }}
            >
              Before
            </span>
          </div>

          {/* After label */}
          <span
            style={{
              position: "absolute",
              top: "var(--space-4)",
              right: "var(--space-4)",
              background: "rgba(0,0,0,0.55)",
              color: "var(--color-white)",
              padding: "var(--space-1) var(--space-3)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-tight)",
              zIndex: 1,
            }}
          >
            After
          </span>

          {/* Divider */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${position}%`,
              width: 3,
              background: "var(--color-white)",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          />

          {/* Handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${position}%`,
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              background: "var(--color-white)",
              borderRadius: "var(--radius-full)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            <span style={{ display: "flex", gap: 6, color: "var(--color-dark)", fontSize: "var(--text-sm)", fontWeight: 700 }}>
              &#8249; &#8250;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
