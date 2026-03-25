import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const kitsDir = join(process.cwd(), "..", "kits");
  const previewPath = join(kitsDir, slug, "preview.html");

  if (!existsSync(previewPath)) {
    return new NextResponse("Preview not found", { status: 404 });
  }

  let html = readFileSync(previewPath, "utf-8");

  // Rewrite relative CSS/JS references to use the kit-file API
  html = html.replace(
    /href="([^"]+\.css)"/g,
    `href="/api/kit-file/${slug}/$1"`
  );
  html = html.replace(
    /src="([^"]+\.js)"/g,
    `src="/api/kit-file/${slug}/$1"`
  );

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
