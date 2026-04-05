"use client";

import { useState } from "react";
import Link from "next/link";
import type { KitData } from "../lib/data";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Kits",
  section: "Sections",
  interactive: "Interactive",
  navigation: "Navigation",
  data: "Data & Admin",
};

const CATEGORY_ICONS: Record<string, string> = {
  all: "📦",
  section: "🧱",
  interactive: "⚡",
  navigation: "🧭",
  data: "🗄️",
};

export default function KitBrowser({ kits }: { kits: KitData[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...Array.from(new Set(kits.map((k) => k.category)))];

  const filtered = kits.filter((kit) => {
    const matchesCategory =
      activeCategory === "all" || kit.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      kit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kit.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const fileCount = (kit: KitData) =>
    Object.values(kit.files).reduce((sum, arr) => sum + arr.length, 0);

  const langBadges = (kit: KitData) =>
    Object.keys(kit.files).map((lang) => lang.toUpperCase());

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[var(--card-border)] min-h-[calc(100vh-57px)] p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
          Categories
        </p>
        {categories.map((cat) => {
          const count =
            cat === "all"
              ? kits.length
              : kits.filter((k) => k.category === cat).length;
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
              <span>{CATEGORY_ICONS[cat] || "📁"}</span>
              <span className="flex-1">
                {CATEGORY_LABELS[cat] || cat}
              </span>
              <span
                className={`text-xs ${
                  activeCategory === cat ? "text-white/70" : "text-[var(--muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search kits by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Kit grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((kit) => (
            <Link
              key={kit.slug}
              href={`/kits/${kit.slug}`}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 text-left hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {kit.name}
                </h3>
                <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded">
                  {CATEGORY_LABELS[kit.category] || kit.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                {kit.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {langBadges(kit).map((lang) => (
                    <span
                      key={lang}
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        lang === "JS"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : lang === "CSS"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[var(--muted)]">
                  {fileCount(kit)} {fileCount(kit) === 1 ? "file" : "files"} ·{" "}
                  {Object.keys(kit.variables).length} vars
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[var(--card-border)]">
                {kit.tags.map((tag) => (
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
            <p className="text-lg mb-1">No kits found</p>
            <p className="text-sm">
              Try a different search or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
