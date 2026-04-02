"use client";

import type { PaletteData } from "../page";

export default function PaletteDetail({
  palette,
  onBack,
}: {
  palette: PaletteData;
  onBack: () => void;
}) {
  // Generate CSS custom properties output
  const cssOutput = [
    ":root {",
    ...Object.entries(palette.colors).map(
      ([key, color]) => `  --color-${key}: ${color.value};`
    ),
    ...Object.entries(palette.fonts).map(
      ([key, font]) => `  --font-${key}: ${font.value};`
    ),
    "}",
  ].join("\n");

  return (
    <div className="min-h-[calc(100vh-57px)]">
      {/* Top bar */}
      <div className="border-b border-[var(--card-border)] px-6 py-3 flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5"
        >
          <span>←</span> Back to palettes
        </button>
        <span className="text-[var(--card-border)]">|</span>
        <h2 className="font-semibold">{palette.name}</h2>
        <div className="flex gap-1 ml-2">
          {Object.values(palette.colors).slice(0, 5).map((color, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-[var(--card-border)]"
              style={{ background: color.value }}
              title={color.label}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Description */}
        <p className="text-[var(--muted)] mb-8">{palette.description}</p>

        {/* Colors */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(palette.colors).map(([key, color]) => (
              <div
                key={key}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden"
              >
                <div
                  className="h-20"
                  style={{ background: color.value }}
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-[var(--foreground)]">{color.label}</p>
                  <p className="text-xs font-mono text-[var(--muted)]">{color.value}</p>
                  <p className="text-[10px] font-mono text-[var(--muted)] mt-0.5">--color-{key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(palette.fonts).map(([key, font]) => (
              <div
                key={key}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-5"
              >
                <p className="text-xs text-[var(--muted)] mb-2">{font.label}</p>
                <p
                  className="text-2xl text-[var(--foreground)] mb-2"
                  style={{ fontFamily: font.value }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-xs font-mono text-[var(--muted)]">{font.value}</p>
                <p className="text-[10px] font-mono text-[var(--muted)] mt-0.5">--font-{key}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Preview text */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-4">Preview</h3>
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: palette.colors.cream?.value || palette.colors.white?.value || "#fff" }}
          >
            <div
              className="p-8"
              style={{ background: palette.colors.dark?.value || "#1a1208", color: palette.colors.cream?.value || "#fff" }}
            >
              <p
                className="text-sm uppercase tracking-widest mb-2"
                style={{ color: palette.colors.secondary?.value, fontFamily: palette.fonts.body?.value }}
              >
                Welcome to
              </p>
              <h2
                className="text-3xl mb-3"
                style={{ fontFamily: palette.fonts.heading?.value }}
              >
                Sample Heading
              </h2>
              <p className="opacity-80 mb-4" style={{ fontFamily: palette.fonts.body?.value }}>
                This is how body text looks with this palette applied.
              </p>
              <span
                className="inline-block px-4 py-2 rounded text-sm font-semibold text-white"
                style={{ background: palette.colors.primary?.value }}
              >
                Primary Button
              </span>
            </div>
            <div className="p-8" style={{ color: palette.colors.text?.value, fontFamily: palette.fonts.body?.value }}>
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: palette.fonts.heading?.value, color: palette.colors.primary?.value }}
              >
                Section Heading
              </h3>
              <p style={{ color: palette.colors.text_light?.value }}>
                Body text on a light background shows how readable the palette is for content-heavy sections.
              </p>
            </div>
          </div>
        </div>

        {/* CSS output */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-4">CSS Custom Properties</h3>
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4">
            <pre className="text-sm font-mono text-[var(--foreground)] leading-relaxed whitespace-pre">
              {cssOutput}
            </pre>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-3">Tags</h3>
          <div className="flex flex-wrap gap-1.5">
            {palette.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
