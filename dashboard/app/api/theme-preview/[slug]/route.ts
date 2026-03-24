import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const themesDir = path.join(process.cwd(), "..", "themes");
  const previewPath = path.join(themesDir, slug, "preview.html");

  try {
    let html = await fs.readFile(previewPath, "utf-8");

    // Rewrite relative paths to kit files so they resolve from the API
    // ../../kits/ -> /api/kit-file/
    html = html.replace(
      /(?:href|src)="\.\.\/\.\.\/kits\/([^"]+)"/g,
      (match, kitPath) => {
        const attr = match.startsWith("href") ? "href" : "src";
        return `${attr}="/api/kit-file/${kitPath}"`;
      }
    );

    // Rewrite relative paths to theme files (style.css, etc.)
    // href="style.css" -> href="/api/theme-file/{slug}/style.css"
    html = html.replace(
      /href="((?!http|\/)[^"]+\.css)"/g,
      (_, filePath) => `href="/api/theme-file/${slug}/${filePath}"`
    );

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return new NextResponse("<html><body><p>Preview not available</p></body></html>", {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
  }
}
