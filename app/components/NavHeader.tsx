"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { key: "templates", label: "Templates" },
  { key: "sections", label: "Sections" },
  { key: "kits", label: "Kits" },
  { key: "palettes", label: "Palettes" },
  { key: "fonts", label: "Fonts" },
] as const;

export default function NavHeader({
  counts,
}: {
  counts: Record<string, number>;
}) {
  const pathname = usePathname();

  // Match /templates, /templates/foo, etc.
  const activeTab = TABS.find((t) => pathname.startsWith(`/${t.key}`))?.key || "templates";

  return (
    <header className="border-b border-[var(--card-border)] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/templates" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <h1 className="text-lg font-semibold tracking-tight">
            WP Agency Vault
          </h1>
        </Link>

        <nav className="flex gap-1 bg-[var(--card-bg)] rounded-lg p-1">
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={`/${tab.key}`}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${
                  activeTab === tab.key ? "text-white/70" : "text-[var(--muted)]"
                }`}
              >
                {counts[tab.key] ?? 0}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
