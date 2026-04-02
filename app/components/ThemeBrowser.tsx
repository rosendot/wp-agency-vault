"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";
import type { ThemeData } from "../page";
import ThemeDetail from "./ThemeDetail";
import RestaurantClassic from "./theme-previews/RestaurantClassic";

// Same registry as ThemeDetail — used for card thumbnails
const THEME_PREVIEWS: Record<string, ComponentType<Record<string, string | number>>> = {
  "restaurant-classic": RestaurantClassic,
};

function ThemeThumbnail({ theme }: { theme: ThemeData }) {
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

  const Preview = THEME_PREVIEWS[theme.slug];
  if (!Preview) {
    return (
      <div className="aspect-video bg-[var(--background)] border-b border-[var(--card-border)] flex items-center justify-center text-[var(--muted)] text-sm">
        No preview
      </div>
    );
  }

  const vars = Object.fromEntries(
    Object.entries(theme.variables).map(([key, v]) => [key, v.default])
  );

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

const STYLE_LABELS: Record<string, string> = {
  warm: "Warm",
  modern: "Modern",
  bold: "Bold",
  minimal: "Minimal",
};

export default function ThemeBrowser({ themes }: { themes: ThemeData[] }) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = themes.filter((theme) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      theme.name.toLowerCase().includes(q) ||
      theme.category.toLowerCase().includes(q) ||
      theme.tags.some((t) => t.toLowerCase().includes(q)) ||
      theme.style.toLowerCase().includes(q)
    );
  });

  if (selectedTheme) {
    return (
      <ThemeDetail theme={selectedTheme} onBack={() => setSelectedTheme(null)} />
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[var(--card-border)] min-h-[calc(100vh-57px)] p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
          Categories
        </p>
        {["all", ...Array.from(new Set(themes.map((t) => t.category)))].map(
          (cat) => {
            const count =
              cat === "all"
                ? themes.length
                : themes.filter((t) => t.category === cat).length;
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
                <span>{cat === "all" ? "🎨" : "🍽️"}</span>
                <span className="flex-1 capitalize">{cat === "all" ? "All Themes" : cat}</span>
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

        <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
            Styles
          </p>
          {Array.from(new Set(themes.map((t) => t.style))).map((style) => (
            <button
              key={style}
              onClick={() => setSearchQuery(style)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors w-full ${
                searchQuery === style
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              <span className="flex-1">{STYLE_LABELS[style] || style}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search themes by name, tag, category, or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((theme) => (
            <button
              key={theme.slug}
              onClick={() => setSelectedTheme(theme)}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden text-left hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
            >
              <ThemeThumbnail theme={theme} />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {theme.name}
                  </h3>
                  <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded capitalize">
                    {theme.style}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed line-clamp-2">
                  {theme.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-[var(--muted)]">
                    {theme.pages.length} pages
                  </span>
                  <span className="text-[var(--card-border)]">·</span>
                  <span className="text-xs text-[var(--muted)]">
                    {theme.kits_used.length} kits
                  </span>
                  <span className="text-[var(--card-border)]">·</span>
                  <span className="text-xs text-[var(--muted)]">
                    v{theme.version}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--card-border)]">
                  {theme.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {theme.tags.length > 6 && (
                    <span className="text-[10px] text-[var(--muted)]">
                      +{theme.tags.length - 6}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            <p className="text-lg mb-1">No themes found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
