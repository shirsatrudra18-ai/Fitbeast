import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Streams files from the local WorkoutVideos directory
export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path: segments = [] } = await context.params;
  // Prevent path traversal
  const safe = segments.filter((s) => /^[\w\-\. ]+$/.test(s));
  const base = path.join(process.cwd(), "WorkoutVideos");
  const filePath = path.join(base, ...safe);

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return new Response("Not Found", { status: 404 });

    const ext = path.extname(filePath).toLowerCase();
    const type =
      ext === ".mp4"
        ? "video/mp4"
        : ext === ".webm"
        ? "video/webm"
        : ext === ".ogg" || ext === ".ogv"
        ? "video/ogg"
        : "application/octet-stream";

    const data = await fs.readFile(filePath);
    return new Response(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=3600, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
