"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";
import Link from "next/link";
import type { PaletteData, SectionData } from "../lib/data";

// Registry of section slugs → React preview components
const SECTION_PREVIEWS: Record<string, ComponentType<Record<string, string | number>>> = {
};

const CATEGORY_ICONS: Record<string, string> = {
  all: "📐",
  menu: "🍽️",
  hero: "🖼️",
  faq: "❓",
  gallery: "📷",
  contact: "📍",
  nav: "🧭",
};

function SectionThumbnail({ section, palette }: { section: SectionData; palette?: PaletteData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateScale = () => setScale(el.offsetWidth / 1440);
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Preview = SECTION_PREVIEWS[section.slug];
  if (!Preview) {
    return (
      <div className="aspect-video bg-[var(--background)] border-b border-[var(--card-border)] flex items-center justify-center text-[var(--muted)] text-sm">
        No preview
      </div>
    );
  }

  const vars: Record<string, string | number> = Object.fromEntries(
    Object.entries(section.variables).map(([key, v]) => [key, v.default])
  );
  if (palette) {
    for (const [key, color] of Object.entries(palette.colors)) {
      vars[`color_${key}`] = color.value;
    }
    for (const [key, font] of Object.entries(palette.fonts)) {
      vars[`font_${key}`] = font.value;
    }
  }

  return (
    <div
      ref={containerRef}
      className="aspect-video bg-[var(--background)] border-b border-[var(--card-border)] overflow-hidden relative"
    >
      {scale > 0 && (
        <div
          className="pointer-events-none absolute top-0 left-0 origin-top-left"
          style={{ width: 1440, transform: `scale(${scale})` }}
        >
          <Preview {...vars} />
        </div>
      )}
    </div>
  );
}

export default function SectionBrowser({
  sections,
  palettes,
}: {
  sections: SectionData[];
  palettes: PaletteData[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...Array.from(new Set(sections.map((s) => s.category)))];

  const filtered = sections.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[var(--card-border)] min-h-[calc(100vh-57px)] p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
          Categories
        </p>
        {categories.map((cat) => {
          const count = cat === "all" ? sections.length : sections.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                activeCategory === cat
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              <span>{CATEGORY_ICONS[cat] || "📐"}</span>
              <span className="flex-1 capitalize">{cat === "all" ? "All Sections" : cat}</span>
              <span className={`text-xs ${activeCategory === cat ? "text-white/70" : "text-[var(--muted)]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search sections by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((section) => {
            const palette = palettes.find((p) => p.slug === section.default_palette);
            return (
              <Link
                key={section.slug}
                href={`/sections/${section.slug}`}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden text-left hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
              >
                <SectionThumbnail section={section} palette={palette} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {section.name}
                    </h3>
                    <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded capitalize">
                      {section.layout}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed line-clamp-2">
                    {section.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--card-border)]">
                    {section.tags.slice(0, 6).map((tag) => (
                      <span key={tag} className="text-[10px] text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            <p className="text-lg mb-1">No sections found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
