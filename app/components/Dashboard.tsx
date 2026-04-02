"use client";

import { useState } from "react";
import type { KitData, PaletteData, TemplateData } from "../page";
import KitBrowser from "./KitBrowser";
import PaletteBrowser from "./PaletteBrowser";
import TemplateBrowser from "./TemplateBrowser";

export default function Dashboard({
  kits,
  palettes,
  templates,
}: {
  kits: KitData[];
  palettes: PaletteData[];
  templates: TemplateData[];
}) {
  const [activeTab, setActiveTab] = useState<"templates" | "kits" | "palettes">("templates");

  const tabs = [
    { key: "templates" as const, label: "Templates", count: templates.length },
    { key: "kits" as const, label: "Kits", count: kits.length },
    { key: "palettes" as const, label: "Palettes", count: palettes.length },
  ];

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
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
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
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {activeTab === "templates" && (
        <TemplateBrowser templates={templates} palettes={palettes} />
      )}
      {activeTab === "kits" && <KitBrowser kits={kits} />}
      {activeTab === "palettes" && <PaletteBrowser palettes={palettes} />}
    </>
  );
}
