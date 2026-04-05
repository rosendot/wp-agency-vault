"use client";

import { useState } from "react";
import Link from "next/link";
import type { PaletteData } from "../lib/data";

export default function PaletteBrowser({ palettes }: { palettes: PaletteData[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = palettes.filter((p) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search palettes by name or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {/* Palette grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((palette) => (
          <Link
            key={palette.slug}
            href={`/palettes/${palette.slug}`}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 text-left hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
          >
            {/* Color swatches */}
            <div className="flex gap-1.5 mb-4">
              {Object.values(palette.colors).map((color, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 rounded-md first:rounded-l-lg last:rounded-r-lg border border-[var(--card-border)]"
                  style={{ background: color.value }}
                  title={color.label}
                />
              ))}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1">
              {palette.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed line-clamp-2">
              {palette.description}
            </p>

            {/* Font preview */}
            <div className="flex gap-3 mb-3 text-xs text-[var(--muted)]">
              {Object.entries(palette.fonts).map(([key, font]) => (
                <span key={key} style={{ fontFamily: font.value }}>
                  {font.label}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--card-border)]">
              {palette.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--muted)]">
          <p className="text-lg mb-1">No palettes found</p>
          <p className="text-sm">Try a different search</p>
        </div>
      )}
    </div>
  );
}
