"use client";

import { useState } from "react";
import Link from "next/link";
import type { WebsiteData } from "../lib/data";

const STATUS_STYLES: Record<string, string> = {
  mock: "text-[var(--muted)] bg-[var(--background)]",
  "in-progress": "text-[var(--gold)] bg-[var(--gold)]/10",
  live: "text-emerald-400 bg-emerald-400/10",
  archived: "text-[var(--muted)] bg-[var(--card-bg)]",
};

const STATUS_LABELS: Record<string, string> = {
  mock: "Mock",
  "in-progress": "In progress",
  live: "Live",
  archived: "Archived",
};

export default function WebsiteBrowser({ websites }: { websites: WebsiteData[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const statuses = ["all", ...Array.from(new Set(websites.map((w) => w.status)))];

  const filtered = websites.filter((w) => {
    const matchesStatus = activeStatus === "all" || w.status === activeStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      w.name.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q) ||
      (w.client?.toLowerCase().includes(q) ?? false);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex">
      <aside className="w-56 border-r border-[var(--card-border)] min-h-[calc(100vh-57px)] p-4 flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2 px-2">
          Status
        </p>
        {statuses.map((status) => {
          const count =
            status === "all"
              ? websites.length
              : websites.filter((w) => w.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                activeStatus === status
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              <span className="flex-1">
                {status === "all" ? "All websites" : STATUS_LABELS[status] ?? status}
              </span>
              <span
                className={`text-xs ${
                  activeStatus === status ? "text-white/70" : "text-[var(--muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </aside>

      <div className="flex-1 p-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-1">
              Websites
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Mocks, in-progress builds, and live client sites.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search websites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((w) => (
            <Link
              key={w.slug}
              href={`/websites/${w.slug}`}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-5 hover:border-[var(--accent)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {w.name}
                </h3>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    STATUS_STYLES[w.status] ?? STATUS_STYLES.mock
                  }`}
                >
                  {STATUS_LABELS[w.status] ?? w.status}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed line-clamp-3">
                {w.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--card-border)] text-xs">
                <span className="text-[var(--muted)] capitalize">{w.category}</span>
                {w.client && (
                  <span className="text-[var(--gold)]">{w.client}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            <p className="text-lg mb-1">No websites found</p>
            <p className="text-sm">Try a different search or status</p>
          </div>
        )}
      </div>
    </div>
  );
}
