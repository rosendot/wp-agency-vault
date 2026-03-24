import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const MIME_TYPES: Record<string, string> = {
  ".css": "text/css",
  ".js": "application/javascript",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const filePath = path.join(process.cwd(), "..", "kits", ...segments);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || "text/plain";

    return new NextResponse(content, {
      headers: { "Content-Type": `${contentType}; charset=utf-8` },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
