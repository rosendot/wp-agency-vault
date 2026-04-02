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
  panelBg: "#ffffff",
  panelBorder: "#e0d6c8",
  navBg: "#1a1208",
  navTextColor: "#ffffff",
  accentColor: "#b42318",
  columnHeadingColor: "#1a1208",
  linkColor: "#2c2416",
  descColor: "#6b5e4f",
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
          { text: "Happy Hour", desc: "Mon–Fri, 4–6pm" },
          { text: "Weekend Brunch", desc: "Sat–Sun, 10am–2pm" },
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
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <nav style={{ position: "relative", zIndex: 1000 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: v.navBg,
            padding: "0 2rem",
            height: 64,
          }}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ fontSize: "1.25rem", fontWeight: 700, color: v.navTextColor, textDecoration: "none" }}
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
                      gap: "0.35rem",
                      height: "100%",
                      padding: "0 1.25rem",
                      color: isOpen ? v.accentColor : v.navTextColor,
                      fontSize: "0.9rem",
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
                          fontSize: "0.6rem",
                          transition: "transform 0.2s",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        ▾
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
                        maxWidth: 900,
                        background: v.panelBg,
                        borderTop: `3px solid ${v.accentColor}`,
                        borderBottom: `1px solid ${v.panelBorder}`,
                        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                        opacity: isOpen ? 1 : 0,
                        visibility: isOpen ? "visible" as const : "hidden" as const,
                        transform: isOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-4px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease, visibility 0.25s",
                        padding: "2.5rem 0",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${item.columns!.length}, 1fr)`,
                          gap: "2.5rem",
                          maxWidth: 1200,
                          margin: "0 auto",
                          padding: "0 2rem",
                        }}
                      >
                        {item.columns!.map((col, ci) => (
                          <div key={ci}>
                            <h3
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                color: v.columnHeadingColor,
                                marginBottom: "1rem",
                                paddingBottom: "0.5rem",
                                borderBottom: `2px solid ${v.accentColor}`,
                              }}
                            >
                              {col.title}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                              {col.links.map((link, li) => (
                                <li key={li}>
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    style={{ display: "block", padding: "0.4rem 0", color: v.linkColor, textDecoration: "none", fontSize: "0.9rem" }}
                                  >
                                    {link.text}
                                    {link.desc && (
                                      <span style={{ display: "block", fontSize: "0.8rem", color: v.descColor, marginTop: "0.1rem" }}>
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
              padding: "0.5rem 1.25rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              border: `2px solid ${v.navTextColor}`,
              color: v.navTextColor,
              textDecoration: "none",
              borderRadius: 4,
              marginLeft: "1rem",
            }}
          >
            Order Online
          </a>
        </div>
      </nav>

      <div style={{ padding: "4rem 2rem", textAlign: "center", background: "#faf6f0", color: "#6b5e4f" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", color: "#1a1208", marginBottom: "1rem" }}>
          Hover the nav tabs above
        </h1>
        <p>Menu and About have multi-column dropdown panels. Gallery and Contact are regular links.</p>
      </div>
    </div>
  );
}
