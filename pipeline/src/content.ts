/** Lecture et validation du dossier content/ (TS-003). */
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { z } from "zod";
import { Language, Phoneme, Script, Source, crossCheck, type Content } from "@tongo/model";

/**
 * Dossier content/ : variable TONGO_CONTENT_DIR, sinon le premier dossier content/ trouvé en
 * remontant depuis le répertoire courant (fonctionne depuis la racine, pipeline/ ou app/,
 * y compris une fois le code regroupé par Vite au build).
 */
function findContentDir(): string {
  if (process.env.TONGO_CONTENT_DIR) return resolve(process.env.TONGO_CONTENT_DIR);
  let dir = process.cwd();
  for (;;) {
    const candidate = join(dir, "content");
    if (existsSync(join(candidate, "sources.json")) || existsSync(join(dir, "model"))) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return resolve("content");
    dir = parent;
  }
}

export const CONTENT_DIR = findContentDir();

async function readJson(path: string): Promise<unknown> {
  return JSON.parse(await readFile(path, "utf8"));
}

async function jsonFiles(dir: string): Promise<string[]> {
  return (await readdir(dir)).filter((f) => f.endsWith(".json")).sort().map((f) => join(dir, f));
}

export interface LoadResult {
  content: Content;
  errors: string[];
}

/** Charge tout le contenu, valide chaque fichier puis les références croisées. */
export async function loadContent(dir = CONTENT_DIR): Promise<LoadResult> {
  const errors: string[] = [];
  const parse = <T>(schema: z.ZodType<T>, data: unknown, file: string): T | undefined => {
    const r = schema.safeParse(data);
    if (r.success) return r.data;
    for (const issue of r.error.issues) errors.push(`${file} › ${issue.path.join(".") || "(racine)"} : ${issue.message}`);
    return undefined;
  };
  const many = async <T>(schema: z.ZodType<T>, sub: string): Promise<T[]> => {
    const out: T[] = [];
    for (const f of await jsonFiles(join(dir, sub))) {
      const v = parse(schema, await readJson(f), `${sub}/${f.split("/").pop()}`);
      if (v) {
        const id = (v as { id: string }).id;
        if (!f.endsWith(`/${id}.json`)) errors.push(`${sub}/${f.split("/").pop()} : le nom du fichier doit être ${id}.json`);
        out.push(v);
      }
    }
    return out;
  };
  const content: Content = {
    scripts: await many(Script, "scripts"),
    languages: await many(Language, "languages"),
    phonemes: parse(z.array(Phoneme), await readJson(join(dir, "phonemes.json")), "phonemes.json") ?? [],
    sources: parse(z.array(Source), await readJson(join(dir, "sources.json")), "sources.json") ?? [],
  };
  if (errors.length === 0) errors.push(...crossCheck(content));
  return { content, errors };
}
