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
  const [templates, sections, kits, palettes, fonts, guides] = await Promise.all([
    countJsonFiles(path.join(cwd, "templates"), "template.json"),
    countJsonFiles(path.join(cwd, "sections"), "section.json"),
    countJsonFiles(path.join(cwd, "kits"), "kit.json"),
    countJsonFiles(path.join(cwd, "palettes"), "palette.json"),
    fs.readFile(path.join(cwd, "fonts", "fonts.json"), "utf-8")
      .then((raw) => (JSON.parse(raw) as unknown[]).length)
      .catch(() => 0),
    countMarkdownFiles(path.join(cwd, "guides")),
  ]);
  return { templates, sections, kits, palettes, fonts, guides };
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

export interface SectionData {
  name: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  layout: string;
  default_palette: string;
  kits_used: string[];
  files: Record<string, string[]>;
  variables: Record<string, KitVariable>;
  fileContents: Record<string, string>;
}

export interface TemplateData {
  name: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  layout: string;
  version: string;
  pages: string[];
  default_palette: string;
  kits_used: string[];
  files: Record<string, string[]>;
  kit_files: Record<string, string[]>;
  variables: Record<string, KitVariable>;
  fileContents: Record<string, string>;
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

export async function getSections(): Promise<SectionData[]> {
  const sectionsDir = path.join(process.cwd(), "sections");
  let folders: string[];
  try {
    folders = await fs.readdir(sectionsDir);
  } catch {
    return [];
  }
  const sections: SectionData[] = [];

  for (const folder of folders) {
    const sectionJsonPath = path.join(sectionsDir, folder, "section.json");
    try {
      const raw = await fs.readFile(sectionJsonPath, "utf-8");
      const section = JSON.parse(raw) as SectionData;

      const fileContents: Record<string, string> = {};
      for (const [, files] of Object.entries(section.files)) {
        for (const file of files) {
          const filePath = path.join(sectionsDir, folder, file);
          try {
            const content = await fs.readFile(filePath, "utf-8");
            fileContents[file] = content;
          } catch {
            fileContents[file] = "// File not found";
          }
        }
      }
      section.fileContents = fileContents;

      sections.push(section);
    } catch {
      // skip folders without section.json
    }
  }

  return sections;
}

export async function getSection(slug: string): Promise<SectionData | null> {
  const sectionsDir = path.join(process.cwd(), "sections");
  const sectionJsonPath = path.join(sectionsDir, slug, "section.json");
  try {
    const raw = await fs.readFile(sectionJsonPath, "utf-8");
    const section = JSON.parse(raw) as SectionData;

    const fileContents: Record<string, string> = {};
    for (const [, files] of Object.entries(section.files)) {
      for (const file of files) {
        const filePath = path.join(sectionsDir, slug, file);
        try {
          const content = await fs.readFile(filePath, "utf-8");
          fileContents[file] = content;
        } catch {
          fileContents[file] = "// File not found";
        }
      }
    }
    section.fileContents = fileContents;

    return section;
  } catch {
    return null;
  }
}

export async function getTemplates(): Promise<TemplateData[]> {
  const templatesDir = path.join(process.cwd(), "templates");
  let folders: string[];
  try {
    folders = await fs.readdir(templatesDir);
  } catch {
    return [];
  }
  const templates: TemplateData[] = [];

  for (const folder of folders) {
    const templateJsonPath = path.join(templatesDir, folder, "template.json");
    try {
      const raw = await fs.readFile(templateJsonPath, "utf-8");
      const template = JSON.parse(raw) as TemplateData;

      const fileContents: Record<string, string> = {};
      for (const [, files] of Object.entries(template.files)) {
        for (const file of files) {
          const filePath = path.join(templatesDir, folder, file);
          try {
            const content = await fs.readFile(filePath, "utf-8");
            fileContents[file] = content;
          } catch {
            fileContents[file] = "// File not found";
          }
        }
      }
      template.fileContents = fileContents;

      templates.push(template);
    } catch {
      // skip folders without template.json
    }
  }

  return templates;
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

export async function getTemplate(slug: string): Promise<TemplateData | null> {
  const templatesDir = path.join(process.cwd(), "templates");
  const templateJsonPath = path.join(templatesDir, slug, "template.json");
  try {
    const raw = await fs.readFile(templateJsonPath, "utf-8");
    const template = JSON.parse(raw) as TemplateData;

    const fileContents: Record<string, string> = {};
    for (const [, files] of Object.entries(template.files)) {
      for (const file of files) {
        const filePath = path.join(templatesDir, slug, file);
        try {
          const content = await fs.readFile(filePath, "utf-8");
          fileContents[file] = content;
        } catch {
          fileContents[file] = "// File not found";
        }
      }
    }
    template.fileContents = fileContents;

    return template;
  } catch {
    return null;
  }
}
