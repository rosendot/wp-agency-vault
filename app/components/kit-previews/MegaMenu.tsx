"use client";

import { useState } from "react";

export interface MegaMenuProps {
  panelBg: string;
  panelBorder: string;
  navBg: string;
  navTextColor: string;
  accentColor: string;
  columnHeadingColor: string;
  linkColor: string;
  descColor: string;
}

const defaultProps: MegaMenuProps = {
  panelBg: "var(--color-white)",
  panelBorder: "var(--color-border)",
  navBg: "var(--color-dark)",
  navTextColor: "var(--color-white)",
  accentColor: "var(--color-primary)",
  columnHeadingColor: "var(--color-dark)",
  linkColor: "var(--color-text)",
  descColor: "var(--color-text-light)",
};

interface MenuColumn {
  title: string;
  links: { text: string; desc?: string }[];
}

interface MenuItem {
  label: string;
  columns?: MenuColumn[];
}

const menuItems: MenuItem[] = [
  {
    label: "Menu",
    columns: [
      {
        title: "Food",
        links: [
          { text: "Appetizers" },
          { text: "Entrees" },
          { text: "Desserts" },
          { text: "Kids Menu" },
        ],
      },
      {
        title: "Drinks",
        links: [
          { text: "Cocktails" },
          { text: "Wine List" },
          { text: "Beer" },
          { text: "Non-Alcoholic" },
        ],
      },
      {
        title: "Specials",
        links: [
          { text: "Daily Specials" },
          { text: "Happy Hour", desc: "Mon-Fri, 4-6pm" },
          { text: "Weekend Brunch", desc: "Sat-Sun, 10am-2pm" },
        ],
      },
    ],
  },
  {
    label: "About",
    columns: [
      {
        title: "Our Story",
        links: [
          { text: "History" },
          { text: "Our Team" },
          { text: "Press" },
        ],
      },
      {
        title: "Visit",
        links: [
          { text: "Location & Hours" },
          { text: "Parking" },
          { text: "Private Events" },
        ],
      },
    ],
  },
  { label: "Gallery" },
  { label: "Contact" },
];

export default function MegaMenu(props: Partial<MegaMenuProps>) {
  const v = { ...defaultProps, ...props };
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ padding: "var(--space-16) var(--space-6)" }}>
      {/* Standard section header */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-4xl)",
          fontWeight: 700,
          color: "var(--color-dark)",
          margin: "0 0 var(--space-2)",
          lineHeight: "var(--leading-snug)",
        }}>
          Mega Menu
        </h2>
        <p style={{ fontSize: "var(--text-xl)", color: "var(--color-text-light)", margin: 0 }}>
          Hover the nav tabs to see dropdown panels
        </p>
      </div>

      {/* The nav bar IS the kit */}
      <nav style={{ position: "relative", zIndex: 1000 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: v.navBg,
            padding: "0 var(--space-8)",
            height: 64,
            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          }}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: v.navTextColor, textDecoration: "none" }}
          >
            Restaurant Name
          </a>

          <ul style={{ display: "flex", alignItems: "center", height: "100%", gap: 0, listStyle: "none", margin: 0, padding: 0 }}>
            {menuItems.map((item, i) => {
              const isOpen = openIndex === i;
              const hasPanel = !!item.columns;

              return (
                <li
                  key={i}
                  style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
                  onMouseEnter={() => hasPanel && setOpenIndex(i)}
                  onMouseLeave={() => hasPanel && setOpenIndex(null)}
                >
                  <button
                    onClick={(e) => {
                      if (!hasPanel) return;
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : i);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-1)",
                      height: "100%",
                      padding: "0 var(--space-5)",
                      color: isOpen ? v.accentColor : v.navTextColor,
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      textDecoration: "none",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                    {hasPanel && (
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          transition: "transform 0.2s",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        &#9662;
                      </span>
                    )}
                  </button>

                  {hasPanel && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        width: "100vw",
                        maxWidth: "var(--max-w-md)",
                        background: v.panelBg,
                        borderTop: `3px solid ${v.accentColor}`,
                        borderBottom: `1px solid ${v.panelBorder}`,
                        boxShadow: "var(--shadow-lg)",
                        opacity: isOpen ? 1 : 0,
                        visibility: isOpen ? "visible" as const : "hidden" as const,
                        transform: isOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-4px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s",
                        padding: "var(--space-10) 0",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${item.columns!.length}, 1fr)`,
                          gap: "var(--space-10)",
                          maxWidth: "var(--max-w-xl)",
                          margin: "0 auto",
                          padding: "0 var(--space-8)",
                        }}
                      >
                        {item.columns!.map((col, ci) => (
                          <div key={ci}>
                            <h3
                              style={{
                                fontSize: "var(--text-xs)",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "var(--tracking-normal)",
                                color: v.columnHeadingColor,
                                marginBottom: "var(--space-4)",
                                paddingBottom: "var(--space-2)",
                                borderBottom: `2px solid ${v.accentColor}`,
                              }}
                            >
                              {col.title}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                              {col.links.map((link, li) => (
                                <li key={li}>
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    style={{ display: "block", padding: "var(--space-1) 0", color: v.linkColor, textDecoration: "none", fontSize: "var(--text-sm)" }}
                                  >
                                    {link.text}
                                    {link.desc && (
                                      <span style={{ display: "block", fontSize: "var(--text-xs)", color: v.descColor, marginTop: "var(--space-1)" }}>
                                        {link.desc}
                                      </span>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              display: "inline-block",
              padding: "var(--space-2) var(--space-5)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-tight)",
              border: `2px solid ${v.navTextColor}`,
              color: v.navTextColor,
              textDecoration: "none",
              borderRadius: "var(--radius-md)",
              marginLeft: "var(--space-4)",
            }}
          >
            Order Online
          </a>
        </div>
      </nav>

      {/* Spacer below nav so dropdowns have room */}
      <div style={{ padding: "var(--space-16) var(--space-8)", textAlign: "center", color: "var(--color-text-light)" }}>
        <p style={{ margin: 0 }}>Page content appears below the navigation</p>
      </div>
    </div>
  );
}
