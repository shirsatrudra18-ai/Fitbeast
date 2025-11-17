import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ALLOWED = [".mp4", ".webm", ".ogg", ".ogv"];

function candidatesForSlug(slug: string): string[] {
  // base single slug folder
  const list = new Set<string>([slug]);

  // map combos and synonyms
  const add = (arr: string[]) => arr.forEach((s) => list.add(s));

  const s = slug;
  const has = (x: string) => s.includes(x);

  // Common synonyms
  if (has("triceps") || has("biceps")) add(["arms"]);
  if (has("abs") || has("core")) add(["abs", "core"]);
  if (has("glutes") || has("hamstrings") || has("quads") || has("calves")) add(["legs"]);
  if (has("cardio") || has("hiit")) add(["cardio", "hiit"]);
  if (has("shoulders")) add(["shoulders", "sholder"]); // Handle typo in folder name
  if (has("back")) add(["back"]);
  if (has("chest")) add(["chest"]);

  // Explicit combos
  const map: Record<string, string[]> = {
    "chest-and-triceps": ["chest", "triceps", "arms"],
    "back-and-biceps": ["back", "biceps", "arms"],
    "shoulders-and-abs": ["shoulders", "abs", "core"],
    "legs-and-glutes": ["legs", "glutes"],
    "cardio-and-core": ["cardio", "core", "abs"],
    "full-body": ["full-body", "total-body", "compound"],
    "upper-push": ["chest", "shoulders", "triceps", "arms"],
    "upper-pull": ["back", "biceps", "arms"],
    "quads-and-calves": ["quads", "calves", "legs"],
    "hamstrings-and-glutes": ["hamstrings", "glutes", "legs"],
    "ppl-combo": ["push", "pull", "legs", "full-body"],
    "hiit-and-core": ["hiit", "cardio", "core", "abs"],
    "metcon-core": ["metcon", "cardio", "core"],
    "active-recovery": ["mobility", "stretch", "recovery"],
  };
  if (map[s]) add(map[s]);

  return Array.from(list);
}

export async function GET(_req: NextRequest, context: { params: Promise<{ muscle: string }> }) {
  const { muscle } = await context.params;
  const slug = (muscle || "").toLowerCase();
  const base = path.join(process.cwd(), "WorkoutVideos");

  // Gather from multiple folders
  const folders = candidatesForSlug(slug);
  const videos: string[] = [];

  for (const folder of folders) {
    try {
      const dir = path.join(base, folder);
      const files = await fs.readdir(dir);
      for (const f of files) {
        if (ALLOWED.includes(path.extname(f).toLowerCase())) {
          videos.push(`/WorkoutVideos/${folder}/${f}`);
        }
      }
    } catch {
      // skip missing folders
    }
  }

  // de-duplicate and limit
  const unique = Array.from(new Set(videos)).sort((a, b) => a.localeCompare(b));
  return Response.json({ videos: unique });
}
