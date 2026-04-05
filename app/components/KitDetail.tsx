"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import type { KitData } from "../lib/data";
import HeroSection from "./kit-previews/HeroSection";
import InfiniteCarousel from "./kit-previews/InfiniteCarousel";
import GoogleMapEmbed from "./kit-previews/GoogleMapEmbed";
import FaqAccordion from "./kit-previews/FaqAccordion";
import MegaMenu from "./kit-previews/MegaMenu";
import MenuList from "./kit-previews/MenuList";
import MenuGrid from "./kit-previews/MenuGrid";
import MenuCards from "./kit-previews/MenuCards";
import GridGallery from "./kit-previews/GridGallery";
import FaqTwoColumn from "./kit-previews/FaqTwoColumn";
import FaqCards from "./kit-previews/FaqCards";
import FaqTabbed from "./kit-previews/FaqTabbed";
import { designTokens } from "./kit-previews/shared";

// Registry of kit slugs → React preview components
const KIT_PREVIEWS: Record<string, ComponentType<Record<string, string | number>>> = {
  "hero-section": HeroSection,
  "infinite-carousel": InfiniteCarousel,
  "google-map-embed": GoogleMapEmbed,
  "faq-accordion": FaqAccordion,
  "faq-two-column": FaqTwoColumn,
  "faq-cards": FaqCards,
  "faq-tabbed": FaqTabbed,
  "mega-menu": MegaMenu,
  "menu-list": MenuList,
  "menu-grid": MenuGrid,
  "menu-cards": MenuCards,
  "grid-gallery": GridGallery,
};

const LANG_COLORS: Record<string, string> = {
  js: "text-yellow-400 border-yellow-400/30",
  css: "text-blue-400 border-blue-400/30",
  php: "text-purple-400 border-purple-400/30",
};

export default function KitDetail({
  kit,
}: {
  kit: KitData;
}) {
  const allFiles = Object.entries(kit.files).flatMap(([lang, files]) =>
    files.map((f) => ({ name: f, lang }))
  );
  const [activeFile, setActiveFile] = useState(allFiles[0]?.name || "");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [variables, setVariables] = useState<Record<string, string | number>>(
    Object.fromEntries(
      Object.entries(kit.variables).map(([key, v]) => [key, v.default])
    )
  );

  const handleVariableChange = (key: string, value: string | number) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-57px)]">
      {/* Top bar */}
      <div className="border-b border-[var(--card-border)] px-6 py-3 flex items-center gap-4">
        <Link
          href="/kits"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5"
        >
          <span>←</span> Back to kits
        </Link>
        <span className="text-[var(--card-border)]">|</span>
        <h2 className="font-semibold">{kit.name}</h2>
        <span className="text-xs text-[var(--muted)] bg-[var(--card-bg)] px-2 py-0.5 rounded">
          {kit.category}
        </span>
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === "preview"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:bg-[var(--card-bg)]"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeTab === "code"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:bg-[var(--card-bg)]"
            }`}
          >
            Code
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left: Preview or Code viewer */}
        <div className="flex-1 border-r border-[var(--card-border)]">
          {activeTab === "preview" ? (
            <div
              className="h-[calc(100vh-180px)] overflow-auto"
              style={{
                background: "var(--color-white)",
                color: "var(--color-text)",
                fontFamily: "var(--font-body)",
                ...designTokens,
              } as React.CSSProperties}
            >
              {(() => {
                const PreviewComponent = KIT_PREVIEWS[kit.slug];
                if (!PreviewComponent) {
                  return (
                    <div className="flex items-center justify-center h-full text-[var(--muted)]" style={{ background: "var(--background)" }}>
                      <p>No preview component for this kit. Add one to <code className="text-xs bg-[var(--card-bg)] px-1.5 py-0.5 rounded">kit-previews/</code></p>
                    </div>
                  );
                }
                return <PreviewComponent {...variables} />;
              })()}
            </div>
          ) : (
            <>
              {/* File tabs */}
              <div className="flex border-b border-[var(--card-border)] px-4">
                {allFiles.map(({ name, lang }) => (
                  <button
                    key={name}
                    onClick={() => setActiveFile(name)}
                    className={`px-4 py-2.5 text-sm font-mono transition-colors border-b-2 ${
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
              <div className="p-4 overflow-auto max-h-[calc(100vh-180px)]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-[var(--foreground)]">
                    {kit.fileContents[activeFile] || "// No content available"}
                  </code>
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Right: Kit info & variables */}
        <div className="w-80 p-5 overflow-auto max-h-[calc(100vh-180px)]">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
              Description
            </h3>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">
              {kit.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {kit.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Variants */}
          {Object.keys(kit.variants).length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Variants
              </h3>
              <div className="flex flex-col gap-1.5">
                {Object.entries(kit.variants).map(([key, variant]) => (
                  <div
                    key={key}
                    className="text-sm bg-[var(--card-bg)] border border-[var(--card-border)] px-3 py-2 rounded-lg"
                  >
                    <span className="text-[var(--foreground)]">
                      {variant.label}
                    </span>
                    <span className="text-[var(--muted)] text-xs ml-2 font-mono">
                      .{variant.class}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variables */}
          {Object.keys(kit.variables).length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
                Customizable Variables
              </h3>
              <div className="flex flex-col gap-3">
                {Object.entries(kit.variables).map(([key, variable]) => (
                  <div key={key}>
                    <label className="text-xs text-[var(--muted)] block mb-1">
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
                          className="w-8 h-8 rounded border border-[var(--card-border)] cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={variables[key]}
                          onChange={(e) =>
                            handleVariableChange(key, e.target.value)
                          }
                          className="flex-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded px-2 py-1.5 text-xs font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                    ) : variable.type === "number" ? (
                      <input
                        type="number"
                        value={variables[key]}
                        onChange={(e) =>
                          handleVariableChange(key, Number(e.target.value))
                        }
                        className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded px-2 py-1.5 text-xs font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={variables[key]}
                        onChange={(e) =>
                          handleVariableChange(key, e.target.value)
                        }
                        className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded px-2 py-1.5 text-xs font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {kit.dependencies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Dependencies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {kit.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}

          {kit.dependencies.length === 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Dependencies
              </h3>
              <p className="text-xs text-[var(--muted)]">
                None — standalone kit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
