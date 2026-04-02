"use client";

import { useState, type ComponentType } from "react";
import type { ThemeData } from "../page";
import RestaurantClassic from "./theme-previews/RestaurantClassic";

// Registry of theme slugs → React preview components
const THEME_PREVIEWS: Record<string, ComponentType<Record<string, string | number>>> = {
  "restaurant-classic": RestaurantClassic,
};

const LANG_COLORS: Record<string, string> = {
  js: "text-yellow-400 border-yellow-400/30",
  css: "text-blue-400 border-blue-400/30",
  php: "text-purple-400 border-purple-400/30",
};

export default function ThemeDetail({
  theme,
  onBack,
}: {
  theme: ThemeData;
  onBack: () => void;
}) {
  const [activeView, setActiveView] = useState<"preview" | "code" | "variables">(
    "preview"
  );

  const allFiles = Object.entries(theme.files).flatMap(([lang, files]) =>
    files.map((f) => ({ name: f, lang }))
  );
  const [activeFile, setActiveFile] = useState(allFiles[0]?.name || "");

  const [variables, setVariables] = useState<Record<string, string | number>>(
    Object.fromEntries(
      Object.entries(theme.variables).map(([key, v]) => [key, v.default])
    )
  );

  const handleVariableChange = (key: string, value: string | number) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-57px)]">
      {/* Top bar */}
      <div className="border-b border-[var(--card-border)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5"
          >
            <span>←</span> Back to themes
          </button>
          <span className="text-[var(--card-border)]">|</span>
          <h2 className="font-semibold">{theme.name}</h2>
          <span className="text-xs text-[var(--muted)] bg-[var(--card-bg)] px-2 py-0.5 rounded capitalize">
            {theme.category}
          </span>
          <span className="text-xs text-[var(--muted)] bg-[var(--card-bg)] px-2 py-0.5 rounded capitalize">
            {theme.style}
          </span>
        </div>

        {/* View toggle */}
        <div className="flex gap-1 bg-[var(--card-bg)] rounded-lg p-1">
          {(["preview", "code", "variables"] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                activeView === view
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Preview view */}
      {activeView === "preview" && (
        <div className="h-[calc(100vh-114px)] overflow-auto">
          {(() => {
            const PreviewComponent = THEME_PREVIEWS[theme.slug];
            if (!PreviewComponent) {
              return (
                <div className="flex items-center justify-center h-full text-[var(--muted)]">
                  <p>No preview component for this theme. Add one to <code className="text-xs bg-[var(--card-bg)] px-1.5 py-0.5 rounded">theme-previews/</code></p>
                </div>
              );
            }
            return <PreviewComponent {...variables} />;
          })()}
        </div>
      )}

      {/* Code view */}
      {activeView === "code" && (
        <div className="flex h-[calc(100vh-114px)]">
          <div className="flex-1 flex flex-col">
            {/* File tabs */}
            <div className="flex border-b border-[var(--card-border)] px-4 overflow-x-auto">
              {allFiles.map(({ name, lang }) => (
                <button
                  key={name}
                  onClick={() => setActiveFile(name)}
                  className={`px-4 py-2.5 text-sm font-mono transition-colors border-b-2 whitespace-nowrap ${
                    activeFile === name
                      ? `${LANG_COLORS[lang] || "text-[var(--foreground)]"} border-current`
                      : "text-[var(--muted)] border-transparent hover:text-[var(--foreground)]"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Code block */}
            <div className="flex-1 p-4 overflow-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code className="text-[var(--foreground)]">
                  {theme.fileContents[activeFile] || "// No content available"}
                </code>
              </pre>
            </div>
          </div>

          {/* Right sidebar: theme info */}
          <div className="w-72 border-l border-[var(--card-border)] p-5 overflow-auto">
            <div className="mb-5">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Pages
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {theme.pages.map((page) => (
                  <span
                    key={page}
                    className="text-xs text-[var(--foreground)] bg-[var(--card-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded capitalize"
                  >
                    {page}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Kits Used
              </h3>
              <div className="flex flex-col gap-1.5">
                {theme.kits_used.map((kit) => (
                  <span
                    key={kit}
                    className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded"
                  >
                    {kit}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {theme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variables view */}
      {activeView === "variables" && (
        <div className="max-w-2xl mx-auto p-8">
          <h3 className="text-lg font-semibold mb-1">Theme Variables</h3>
          <p className="text-sm text-[var(--muted)] mb-6">
            These values get swapped per client when deploying this theme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(theme.variables).map(([key, variable]) => (
              <div
                key={key}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4"
              >
                <label className="text-xs text-[var(--muted)] block mb-2">
                  {variable.label}
                </label>
                {variable.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={
                        typeof variables[key] === "string" &&
                        variables[key].toString().startsWith("#")
                          ? (variables[key] as string)
                          : "#b42318"
                      }
                      onChange={(e) =>
                        handleVariableChange(key, e.target.value)
                      }
                      className="w-10 h-10 rounded border border-[var(--card-border)] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={variables[key]}
                      onChange={(e) =>
                        handleVariableChange(key, e.target.value)
                      }
                      className="flex-1 bg-[var(--background)] border border-[var(--card-border)] rounded px-3 py-2 text-sm font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={variables[key]}
                    onChange={(e) =>
                      handleVariableChange(key, e.target.value)
                    }
                    className="w-full bg-[var(--background)] border border-[var(--card-border)] rounded px-3 py-2 text-sm font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
