import { promises as fs } from "fs";
import path from "path";
import Dashboard from "./components/Dashboard";

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

async function getKits(): Promise<KitData[]> {
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

async function getPalettes(): Promise<PaletteData[]> {
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

async function getTemplates(): Promise<TemplateData[]> {
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

export default async function Home() {
  const kits = await getKits();
  const palettes = await getPalettes();
  const templates = await getTemplates();

  return (
    <main className="min-h-screen">
      <Dashboard kits={kits} palettes={palettes} templates={templates} />
    </main>
  );
}
