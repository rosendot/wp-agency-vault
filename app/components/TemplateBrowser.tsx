"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";
import Link from "next/link";
import type { PaletteData, TemplateData } from "../lib/data";
import RestaurantClassic from "./template-previews/RestaurantClassic";

// Registry of template slugs → React preview components
const TEMPLATE_PREVIEWS: Record<string, ComponentType<Record<string, string | number>>> = {
  "restaurant-classic": RestaurantClassic,
};

function TemplateThumbnail({ template, palette }: { template: TemplateData; palette?: PaletteData }) {
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

  const Preview = TEMPLATE_PREVIEWS[template.slug];
  if (!Preview) {
    return (
      <div className="aspect-video bg-[var(--background)] border-b border-[var(--card-border)] flex items-center justify-center text-[var(--muted)] text-sm">
        No preview
      </div>
    );
  }

  // Merge template variables + palette colors/fonts into one props object
  const vars: Record<string, string | number> = Object.fromEntries(
    Object.entries(template.variables).map(([key, v]) => [key, v.default])
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

export default function TemplateBrowser({
  templates,
  palettes,
}: {
  templates: TemplateData[];
  palettes: PaletteData[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = templates.filter((t) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[var(--card-border)] min-h-[calc(100vh-57px)] p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
          Categories
        </p>
        {["all", ...Array.from(new Set(templates.map((t) => t.category)))].map(
          (cat) => {
            const count =
              cat === "all"
                ? templates.length
                : templates.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSearchQuery(cat === "all" ? "" : cat)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  (cat === "all" && searchQuery === "") ||
                  searchQuery === cat
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                }`}
              >
                <span>{cat === "all" ? "📄" : "🍽️"}</span>
                <span className="flex-1 capitalize">{cat === "all" ? "All Templates" : cat}</span>
                <span
                  className={`text-xs ${
                    (cat === "all" && searchQuery === "") || searchQuery === cat
                      ? "text-white/70"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          }
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search templates by name, tag, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((template) => {
            const palette = palettes.find((p) => p.slug === template.default_palette);
            return (
              <Link
                key={template.slug}
                href={`/templates/${template.slug}`}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden text-left hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
              >
                <TemplateThumbnail template={template} palette={palette} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {template.name}
                    </h3>
                    <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded capitalize">
                      {template.category}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed line-clamp-2">
                    {template.description}
                  </p>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-[var(--muted)]">
                      {template.pages.length} pages
                    </span>
                    <span className="text-[var(--card-border)]">·</span>
                    <span className="text-xs text-[var(--muted)]">
                      {template.kits_used.length} kits
                    </span>
                    <span className="text-[var(--card-border)]">·</span>
                    <span className="text-xs text-[var(--muted)]">
                      v{template.version}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--card-border)]">
                    {template.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {template.tags.length > 6 && (
                      <span className="text-[10px] text-[var(--muted)]">
                        +{template.tags.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            <p className="text-lg mb-1">No templates found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
