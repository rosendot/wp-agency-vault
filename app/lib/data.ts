import { promises as fs } from "fs";
import path from "path";

// ─── Counts (lightweight — no file content reads) ────────────────────────────

async function countJsonFiles(dir: string, filename: string): Promise<number> {
  try {
    const folders = await fs.readdir(dir);
    let count = 0;
    for (const folder of folders) {
      try {
        await fs.access(path.join(dir, folder, filename));
        count++;
      } catch {
        // no json file in this folder
      }
    }
    return count;
  } catch {
    return 0;
  }
}

async function countMarkdownFiles(dir: string): Promise<number> {
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

export async function getCounts(): Promise<Record<string, number>> {
  const cwd = process.cwd();
  const [websites, kits, palettes, fonts, guides] = await Promise.all([
    countJsonFiles(path.join(cwd, "websites"), "website.json"),
    countJsonFiles(path.join(cwd, "kits"), "kit.json"),
    countJsonFiles(path.join(cwd, "palettes"), "palette.json"),
    fs.readFile(path.join(cwd, "fonts", "fonts.json"), "utf-8")
      .then((raw) => (JSON.parse(raw) as unknown[]).length)
      .catch(() => 0),
    countMarkdownFiles(path.join(cwd, "guides")),
  ]);
  return { websites, kits, palettes, fonts, guides };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FontData {
  name: string;
  value: string;
  type: string;
  source: string;
  url?: string;
  weight: string;
  pairs_with: string[];
  vibe: string;
  used_in: string[];
}

export interface KitVariable {
  label: string;
  type: string;
  default: string | number;
}

export interface KitData {
  name: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  files: Record<string, string[]>;
  variables: Record<string, KitVariable>;
  variants: Record<string, { label: string; class: string }>;
  dependencies: string[];
  fileContents: Record<string, string>;
}

export interface PaletteColor {
  label: string;
  value: string;
}

export interface PaletteFont {
  label: string;
  value: string;
}

export interface PaletteData {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  colors: Record<string, PaletteColor>;
  fonts: Record<string, PaletteFont>;
}

export interface WebsiteData {
  name: string;
  slug: string;
  status: "mock" | "in-progress" | "live" | "archived";
  category: string;
  description: string;
  url: string | null;
  preview: string | null;
  client: string | null;
  launched: string | null;
}

// ─── Data fetchers ───────────────────────────────────────────────────────────

export async function getFonts(): Promise<FontData[]> {
  const fontsPath = path.join(process.cwd(), "fonts", "fonts.json");
  try {
    const raw = await fs.readFile(fontsPath, "utf-8");
    return JSON.parse(raw) as FontData[];
  } catch {
    return [];
  }
}

export async function getKits(): Promise<KitData[]> {
  const kitsDir = path.join(process.cwd(), "kits");
  const folders = await fs.readdir(kitsDir);
  const kits: KitData[] = [];

  for (const folder of folders) {
    const kitJsonPath = path.join(kitsDir, folder, "kit.json");
    try {
      const raw = await fs.readFile(kitJsonPath, "utf-8");
      const kit = JSON.parse(raw) as KitData;

      const fileContents: Record<string, string> = {};
      for (const [, files] of Object.entries(kit.files)) {
        for (const file of files) {
          const filePath = path.join(kitsDir, folder, file);
          try {
            const content = await fs.readFile(filePath, "utf-8");
            fileContents[file] = content;
          } catch {
            fileContents[file] = "// File not found";
          }
        }
      }
      kit.fileContents = fileContents;

      kits.push(kit);
    } catch {
      // skip folders without kit.json
    }
  }

  return kits;
}

export async function getKit(slug: string): Promise<KitData | null> {
  const kitsDir = path.join(process.cwd(), "kits");
  const kitJsonPath = path.join(kitsDir, slug, "kit.json");
  try {
    const raw = await fs.readFile(kitJsonPath, "utf-8");
    const kit = JSON.parse(raw) as KitData;

    const fileContents: Record<string, string> = {};
    for (const [, files] of Object.entries(kit.files)) {
      for (const file of files) {
        const filePath = path.join(kitsDir, slug, file);
        try {
          const content = await fs.readFile(filePath, "utf-8");
          fileContents[file] = content;
        } catch {
          fileContents[file] = "// File not found";
        }
      }
    }
    kit.fileContents = fileContents;

    return kit;
  } catch {
    return null;
  }
}

export async function getPalettes(): Promise<PaletteData[]> {
  const palettesDir = path.join(process.cwd(), "palettes");
  let folders: string[];
  try {
    folders = await fs.readdir(palettesDir);
  } catch {
    return [];
  }
  const palettes: PaletteData[] = [];

  for (const folder of folders) {
    const paletteJsonPath = path.join(palettesDir, folder, "palette.json");
    try {
      const raw = await fs.readFile(paletteJsonPath, "utf-8");
      const palette = JSON.parse(raw) as PaletteData;
      palettes.push(palette);
    } catch {
      // skip folders without palette.json
    }
  }

  return palettes;
}

export async function getPalette(slug: string): Promise<PaletteData | null> {
  const paletteJsonPath = path.join(process.cwd(), "palettes", slug, "palette.json");
  try {
    const raw = await fs.readFile(paletteJsonPath, "utf-8");
    return JSON.parse(raw) as PaletteData;
  } catch {
    return null;
  }
}

// ─── Websites ────────────────────────────────────────────────────────────────

export async function getWebsites(): Promise<WebsiteData[]> {
  const dir = path.join(process.cwd(), "websites");
  let folders: string[];
  try {
    folders = await fs.readdir(dir);
  } catch {
    return [];
  }
  const websites: WebsiteData[] = [];
  for (const folder of folders) {
    try {
      const raw = await fs.readFile(path.join(dir, folder, "website.json"), "utf-8");
      websites.push(JSON.parse(raw) as WebsiteData);
    } catch {
      // skip folders without website.json
    }
  }
  return websites;
}

export async function getWebsite(slug: string): Promise<WebsiteData | null> {
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;
  const filePath = path.join(process.cwd(), "websites", slug, "website.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as WebsiteData;
  } catch {
    return null;
  }
}

// ─── Guides ──────────────────────────────────────────────────────────────────

export interface GuideSummary {
  slug: string;
  title: string;
  description: string;
}

export interface GuideData extends GuideSummary {
  content: string;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseGuideMeta(content: string, slug: string): { title: string; description: string } {
  const lines = content.split(/\r?\n/);
  let title = titleFromSlug(slug);
  let description = "";

  const h1 = lines.find((line) => line.startsWith("# "));
  if (h1) title = h1.replace(/^#\s+/, "").trim();

  const h1Index = h1 ? lines.indexOf(h1) : -1;
  for (let i = h1Index + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith("#")) break;
    description = line.replace(/[*_`]/g, "");
    break;
  }

  return { title, description };
}

export async function getGuides(): Promise<GuideSummary[]> {
  const guidesDir = path.join(process.cwd(), "guides");
  let files: string[];
  try {
    files = await fs.readdir(guidesDir);
  } catch {
    return [];
  }

  const guides: GuideSummary[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = slugFromFilename(file);
    try {
      const content = await fs.readFile(path.join(guidesDir, file), "utf-8");
      const { title, description } = parseGuideMeta(content, slug);
      guides.push({ slug, title, description });
    } catch {
      // skip unreadable files
    }
  }

  return guides.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getGuide(slug: string): Promise<GuideData | null> {
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;
  const filePath = path.join(process.cwd(), "guides", `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const { title, description } = parseGuideMeta(content, slug);
    return { slug, title, description, content };
  } catch {
    return null;
  }
}

