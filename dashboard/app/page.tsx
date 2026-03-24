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

export interface ThemeData {
  name: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  style: string;
  layout: string;
  version: string;
  pages: string[];
  kits_used: string[];
  files: Record<string, string[]>;
  kit_files: Record<string, string[]>;
  variables: Record<string, KitVariable>;
  fileContents: Record<string, string>;
}

async function getKits(): Promise<KitData[]> {
  const kitsDir = path.join(process.cwd(), "..", "kits");
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

async function getThemes(): Promise<ThemeData[]> {
  const themesDir = path.join(process.cwd(), "..", "themes");
  let folders: string[];
  try {
    folders = await fs.readdir(themesDir);
  } catch {
    return [];
  }
  const themes: ThemeData[] = [];

  for (const folder of folders) {
    const themeJsonPath = path.join(themesDir, folder, "theme.json");
    try {
      const raw = await fs.readFile(themeJsonPath, "utf-8");
      const theme = JSON.parse(raw) as ThemeData;

      const fileContents: Record<string, string> = {};
      for (const [, files] of Object.entries(theme.files)) {
        for (const file of files) {
          const filePath = path.join(themesDir, folder, file);
          try {
            const content = await fs.readFile(filePath, "utf-8");
            fileContents[file] = content;
          } catch {
            fileContents[file] = "// File not found";
          }
        }
      }
      theme.fileContents = fileContents;

      themes.push(theme);
    } catch {
      // skip folders without theme.json
    }
  }

  return themes;
}

export default async function Home() {
  const kits = await getKits();
  const themes = await getThemes();

  return (
    <main className="min-h-screen">
      <Dashboard kits={kits} themes={themes} />
    </main>
  );
}
