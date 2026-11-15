/**
 * TS-011 / TS-013 : enregistrements des phonèmes depuis Wikimedia Commons.
 *
 * npm run import:audio
 *   1. lit pipeline/data/phoneme-audio.json (phonème → fichier Commons) ;
 *   2. interroge l'API Commons : URL, auteur, licence (refuse les fichiers sans licence libre) ;
 *   3. télécharge l'original (cache pipeline/.cache/audio) et le convertit en MP3 mono au volume
 *      normalisé dans content/audio/phonemes/ (versionné, D28) ;
 *   4. écrit pipeline/data/phoneme-audio-meta.json (versionné) : attribution de chaque fichier.
 *
 * CACHE_ONLY=1 npm run import:audio : n'utilise que les fichiers déjà téléchargés.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Audio } from "@tongo/model";
import { CONTENT_DIR } from "../content.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const MAP = resolve(HERE, "../../data/phoneme-audio.json");
export const AUDIO_META = resolve(HERE, "../../data/phoneme-audio-meta.json");
const CACHE = resolve(HERE, "../../.cache/audio");
const OUT = join(CONTENT_DIR, "audio/phonemes");
/** Client générique : aucune information sur le projet ni sur la personne n'est envoyée. */
const UA = "open-content-pipeline/0.1";
const FREE = /^(CC0|CC BY(-SA)? [\d.]+|Public domain|GFDL)/i;
export const CHANGES = "converti en MP3 mono, volume normalisé (EBU R128)";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Téléchargement poli : une requête à la fois, nouvel essai après 429 en respectant Retry-After. */
async function politeFetch(url: string, tries = 5): Promise<Response> {
  for (let i = 0; ; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status !== 429 || i >= tries) return res;
    const wait = Math.min(Number(res.headers.get("retry-after")) || 5 * 2 ** i, 60);
    console.log(`  429, nouvel essai dans ${wait} s`);
    await sleep(wait * 1000);
  }
}

const strip = (html: string) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

/** Auteur lisible : champ Artist nettoyé, sinon la personne qui a versé le fichier (CC BY-SA l'exige). */
export function author(artist: string, user?: string): string {
  const a = strip(artist)
    .replace(/^No machine-readable author provided\.\s*(.+?) assumed.*$/i, "$1")
    .replace(/^Recorded by\s+(.+?)\.?$/i, "$1")
    .trim();
  const uploader = user?.replace(/~\w+wiki$/, "");
  // un robot de transfert n'est pas l'auteur : la page Commons liée fait foi
  return a || (uploader && !/bot$/i.test(uploader) ? uploader : "") || "inconnu";
}

interface Info { url: string; descriptionurl: string; user?: string; extmetadata: Record<string, { value: string }> }

async function commons(titles: string[]): Promise<Map<string, Info>> {
  const out = new Map<string, Info>();
  for (let i = 0; i < titles.length; i += 40) {
    const params = new URLSearchParams({
      action: "query", prop: "imageinfo", iiprop: "url|user|extmetadata", redirects: "1", format: "json",
      titles: titles.slice(i, i + 40).map((t) => `File:${t}`).join("|"),
    });
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`Commons : HTTP ${res.status}`);
    const data = (await res.json()) as {
      query: { pages: Record<string, { title: string; imageinfo?: Info[] }>; normalized?: { from: string; to: string }[]; redirects?: { from: string; to: string }[] };
    };
    const alias = new Map<string, string>();
    for (const x of [...(data.query.normalized ?? []), ...(data.query.redirects ?? [])]) alias.set(x.to, x.from);
    for (const page of Object.values(data.query.pages)) {
      if (!page.imageinfo?.[0]) continue;
      let name = page.title;
      while (alias.has(name)) name = alias.get(name)!;
      out.set(name.replace(/^File:/, "").replace(/_/g, " "), page.imageinfo[0]);
    }
  }
  return out;
}

export async function importAudio(): Promise<{ meta: Record<string, Audio>; missing: string[] }> {
  const map: Record<string, string> = JSON.parse(await readFile(MAP, "utf8"));
  delete map._comment;
  await mkdir(CACHE, { recursive: true });
  await mkdir(OUT, { recursive: true });
  const infos = await commons(Object.values(map));
  const meta: Record<string, Audio> = {};
  const missing: string[] = [];
  for (const [id, title] of Object.entries(map)) {
    const info = infos.get(title.replace(/_/g, " "));
    const license = info ? strip(info.extmetadata.LicenseShortName?.value ?? "") : "";
    if (!info || !FREE.test(license)) { missing.push(`${id} (${title}${info ? `, licence « ${license} »` : ", introuvable"})`); continue; }
    const ext = title.split(".").pop()!;
    const raw = join(CACHE, `${id}.${ext}`);
    if (!existsSync(raw)) {
      // CACHE_ONLY=1 : met à jour les attributions sans rien télécharger (Commons limite le débit)
      if (process.env.CACHE_ONLY) { missing.push(`${id} (absent du cache)`); continue; }
      await sleep(8000);
      const res = await politeFetch(info.url);
      if (!res.ok) { missing.push(`${id} (téléchargement HTTP ${res.status})`); continue; }
      console.log(`  ${id} ← ${title}`);
      await writeFile(raw, Buffer.from(await res.arrayBuffer()));
    }
    const mp3 = join(OUT, `${id}.mp3`);
    if (!existsSync(mp3)) {
      execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-ac", "1", "-ar", "44100",
        "-af", "loudnorm=I=-18:TP=-2:LRA=11", "-b:a", "64k", mp3]);
    }
    meta[id] = {
      src: `audio/phonemes/${id}.mp3`, title, license, url: info.descriptionurl,
      author: author(info.extmetadata.Artist?.value ?? "", info.user), changes: CHANGES,
    };
  }
  return { meta, missing };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const { meta, missing } = await importAudio();
  await writeFile(AUDIO_META, JSON.stringify(meta, null, 2) + "\n");
  console.log(`${Object.keys(meta).length} enregistrements prêts dans content/audio/phonemes.`);
  if (missing.length) console.log(`Non retenus (${missing.length}) :\n - ${missing.join("\n - ")}`);
}
