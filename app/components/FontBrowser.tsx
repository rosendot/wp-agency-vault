"use client";

import { useState } from "react";
import type { FontData } from "../lib/data";

const TYPE_LABELS: Record<string, string> = {
  all: "All Fonts",
  serif: "Serif",
  "sans-serif": "Sans-Serif",
  "slab-serif": "Slab Serif",
  display: "Display",
};

const TYPE_ICONS: Record<string, string> = {
  all: "Aa",
  serif: "Rm",
  "sans-serif": "Sf",
  "slab-serif": "Sl",
  display: "Dp",
};

const sampleText = "The quick brown fox jumps over the lazy dog";
const sampleHeading = "Almost before we knew it, we had left the ground.";

export default function FontBrowser({ fonts }: { fonts: FontData[] }) {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewSize, setPreviewSize] = useState(32);

  const types = ["all", ...Array.from(new Set(fonts.map((f) => f.type)))];

  const filtered = fonts.filter((f) => {
    const matchesType = activeType === "all" || f.type === activeType;
    const matchesSearch =
      searchQuery === "" ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.vibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.pairs_with.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  // Build Google Fonts URL for all fonts that need loading
  const googleFonts = fonts
    .filter((f) => f.source === "google" && f.url)
    .map((f) => {
      const family = f.name.replace(/ /g, "+");
      const weights = f.weight.replace(/;/g, ",");
      return `family=${family}:wght@${weights}`;
    })
    .join("&");
  const googleFontsUrl = googleFonts
    ? `https://fonts.googleapis.com/css2?${googleFonts}&display=swap`
    : null;

  return (
    <div className="flex">
      {/* Load Google Fonts */}
      {googleFontsUrl && (
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link rel="stylesheet" href={googleFontsUrl} />
      )}

      {/* Sidebar */}
      <aside className="w-56 border-r border-[var(--card-border)] min-h-[calc(100vh-57px)] p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
          Type
        </p>
        {types.map((type) => {
          const count = type === "all" ? fonts.length : fonts.filter((f) => f.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                activeType === type
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              <span className="w-6 text-center font-mono text-xs font-bold">{TYPE_ICONS[type] || "Fn"}</span>
              <span className="flex-1">{TYPE_LABELS[type] || type}</span>
              <span className={`text-xs ${activeType === type ? "text-white/70" : "text-[var(--muted)]"}`}>
                {count}
              </span>
            </button>
          );
        })}

        {/* Size slider */}
        <div className="mt-6 pt-4 border-t border-[var(--card-border)]">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-3 px-2">
            Preview Size
          </p>
          <div className="px-2">
            <input
              type="range"
              min={16}
              max={64}
              value={previewSize}
              onChange={(e) => setPreviewSize(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <p className="text-xs text-[var(--muted)] text-center mt-1">{previewSize}px</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search fonts by name, vibe, or pairing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Font list */}
        <div className="flex flex-col gap-4">
          {filtered.map((font) => (
            <div
              key={font.name}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] text-lg">{font.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded capitalize">
                      {font.type}
                    </span>
                    <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded">
                      {font.source}
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {font.weight.split(";").length} weight{font.weight.split(";").length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--muted)] italic">{font.vibe}</p>
                </div>
              </div>

              {/* Preview */}
              <div className="mb-4 p-4 bg-[var(--background)] rounded-lg">
                <p
                  style={{ fontFamily: font.value, fontSize: previewSize, lineHeight: 1.3 }}
                  className="text-[var(--foreground)] mb-2"
                >
                  {sampleHeading}
                </p>
                <p
                  style={{ fontFamily: font.value, fontSize: Math.max(14, previewSize * 0.5), lineHeight: 1.6 }}
                  className="text-[var(--muted)]"
                >
                  {sampleText}
                </p>
              </div>

              {/* Details */}
              <div className="flex items-center gap-6 text-xs">
                {/* Pairs with */}
                <div className="flex items-center gap-2">
                  <span className="text-[var(--muted)]">Pairs with:</span>
                  <div className="flex gap-1.5">
                    {font.pairs_with.map((pair) => (
                      <span key={pair} className="text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full">
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Used in palettes */}
                {font.used_in.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--muted)]">Used in:</span>
                    <div className="flex gap-1.5">
                      {font.used_in.map((palette) => (
                        <span key={palette} className="text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                          {palette}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CSS value */}
                <span className="text-[var(--muted)] font-mono ml-auto">
                  {font.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            <p className="text-lg mb-1">No fonts found</p>
            <p className="text-sm">Try a different search or type</p>
          </div>
        )}
      </div>
    </div>
  );
}
