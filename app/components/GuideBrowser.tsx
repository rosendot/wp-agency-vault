"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideSummary } from "../lib/data";

export default function GuideBrowser({ guides }: { guides: GuideSummary[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = guides.filter((g) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-1">Guides</h2>
        <p className="text-sm text-[var(--muted)]">
          Step-by-step reference docs. Click any guide to read it in full.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 text-left hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
          >
            <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
              {guide.title}
            </h3>
            {guide.description && (
              <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                {guide.description}
              </p>
            )}
            <div className="mt-3 pt-3 border-t border-[var(--card-border)] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded">
                {guide.slug}.md
              </span>
              <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--muted)]">
          <p className="text-lg mb-1">No guides found</p>
          <p className="text-sm">Try a different search</p>
        </div>
      )}
    </div>
  );
}
