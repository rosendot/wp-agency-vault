import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const templatesDir = path.join(process.cwd(), "templates");
  const previewPath = path.join(templatesDir, slug, "preview.html");

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
    // href="style.css" -> href="/api/template-file/{slug}/style.css"
    html = html.replace(
      /href="((?!http|\/)[^"]+\.css)"/g,
      (_, filePath) => `href="/api/template-file/${slug}/${filePath}"`
    );

    // Inject variable listener script before </body>
    const listenerScript = `
<script>
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'update-variables') {
    var vars = e.data.variables;
    var root = document.documentElement;
    for (var key in vars) {
      root.style.setProperty('--theme-' + key.replace(/_/g, '-'), String(vars[key]));
      // Update text content via data-var attributes
      var els = document.querySelectorAll('[data-var="' + key.replace(/_/g, '-') + '"]');
      for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = String(vars[key]).replace(/\\n/g, '<br>');
      }
    }
  }
});
</script>`;

    html = html.replace("</body>", listenerScript + "\n</body>");

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
