"use client";

import { useState } from "react";
import type { KitData, ThemeData } from "../page";
import KitBrowser from "./KitBrowser";
import ThemeBrowser from "./ThemeBrowser";

export default function Dashboard({
  kits,
  themes,
}: {
  kits: KitData[];
  themes: ThemeData[];
}) {
  const [activeTab, setActiveTab] = useState<"kits" | "themes">("themes");

  return (
    <>
      <header className="border-b border-[var(--card-border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <h1 className="text-lg font-semibold tracking-tight">
              WP Agency Vault
            </h1>
          </div>

          <nav className="flex gap-1 bg-[var(--card-bg)] rounded-lg p-1">
            <button
              onClick={() => setActiveTab("themes")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "themes"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Themes
              <span
                className={`ml-1.5 text-xs ${
                  activeTab === "themes" ? "text-white/70" : "text-[var(--muted)]"
                }`}
              >
                {themes.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("kits")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "kits"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Kits
              <span
                className={`ml-1.5 text-xs ${
                  activeTab === "kits" ? "text-white/70" : "text-[var(--muted)]"
                }`}
              >
                {kits.length}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {activeTab === "kits" ? (
        <KitBrowser kits={kits} />
      ) : (
        <ThemeBrowser themes={themes} />
      )}
    </>
  );
}
