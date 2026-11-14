/**
 * TS-004 : import des caractères de chaque langue depuis Unicode CLDR (« exemplar characters »).
 *
 * npm run import:cldr
 *   télécharge l'archive CLDR (mise en cache dans pipeline/.cache, hors dépôt), extrait pour chaque
 *   langue les caractères principaux et auxiliaires, ne garde que ceux des écritures couvertes, et
 *   écrit pipeline/data/cldr.json (versionné : c'est la trace de la source utilisée).
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const CLDR_VERSION = "48.2";
const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = resolve(HERE, "../../.cache");
const ZIP = join(CACHE, `cldr-common-${CLDR_VERSION}.zip`);
export const CLDR_DATA = resolve(HERE, "../../data/cldr.json");

/** Langues Tongo → fichier CLDR et écritures Unicode à conserver. */
const LANGS: Record<string, { file: string; scripts: string[] }> = {
  fr: { file: "fr", scripts: ["Latin"] },
  en: { file: "en", scripts: ["Latin"] },
  es: { file: "es", scripts: ["Latin"] },
  ru: { file: "ru", scripts: ["Cyrillic"] },
  ar: { file: "ar", scripts: ["Arabic"] },
  ja: { file: "ja", scripts: ["Hiragana", "Katakana"] },
};

export interface CldrLanguage {
  main: string[];
  auxiliary: string[];
}
export interface CldrData {
  version: string;
  source: string;
  languages: Record<string, CldrLanguage>;
}

/** Analyse la syntaxe UnicodeSet simple des exemplars : [a b c{ch} d-f ‍]. */
export function parseExemplars(set: string): string[] {
  let body = set.trim().replace(/^\[/, "").replace(/\]$/, "");
  body = body.replace(/\\u([0-9a-fA-F]{4})/g, (_, h: string) => String.fromCodePoint(parseInt(h, 16)));
  const out: string[] = [];
  body = body.replace(/\{([^}]*)\}/g, (_, seq: string) => (out.push(seq.normalize("NFC")), " "));
  const seg = new Intl.Segmenter("und", { granularity: "grapheme" });
  // Découpage par espaces d'abord : un liant (ZWJ) isolé ne doit pas fusionner avec l'espace voisin.
  const units = body.split(/\s+/).filter(Boolean).flatMap((tok) => [...seg.segment(tok)].map((s) => s.segment));
  for (let i = 0; i < units.length; i++) {
    const u = units[i]!;
    if (units[i + 1] === "-" && units[i + 2]) {
      const a = u.codePointAt(0)!, b = units[i + 2]!.codePointAt(0)!;
      for (let cp = a; cp <= b; cp++) out.push(String.fromCodePoint(cp));
      i += 2;
    } else if (u !== "\\") out.push(u.normalize("NFC"));
  }
  return [...new Set(out)];
}

function extract(xml: string, type?: "auxiliary"): string[] {
  const tag = type ? `<exemplarCharacters type="${type}">` : "<exemplarCharacters>";
  const i = xml.indexOf(tag);
  if (i < 0) return [];
  return parseExemplars(xml.slice(i + tag.length, xml.indexOf("</exemplarCharacters>", i)));
}

const inScripts = (scripts: string[]) => {
  const re = new RegExp(`^(?:${scripts.map((s) => `\\p{Script=${s}}`).join("|")})`, "u");
  return (c: string) => re.test(c);
};

export async function importCldr(): Promise<CldrData> {
  await mkdir(CACHE, { recursive: true });
  if (!existsSync(ZIP)) {
    const url = `https://unicode.org/Public/cldr/${CLDR_VERSION}/cldr-common-${CLDR_VERSION}.zip`;
    console.log(`Téléchargement de ${url}…`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`CLDR : HTTP ${res.status}`);
    await writeFile(ZIP, Buffer.from(await res.arrayBuffer()));
  }
  const languages: Record<string, CldrLanguage> = {};
  for (const [id, { file, scripts }] of Object.entries(LANGS)) {
    const xml = execFileSync("unzip", ["-p", ZIP, `common/main/${file}.xml`], { encoding: "utf8", maxBuffer: 1 << 26 });
    const keep = inScripts(scripts);
    languages[id] = { main: extract(xml).filter(keep), auxiliary: extract(xml, "auxiliary").filter(keep) };
  }
  return { version: CLDR_VERSION, source: `common/main/*.xml (CLDR ${CLDR_VERSION})`, languages };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const data = await importCldr();
  await mkdir(dirname(CLDR_DATA), { recursive: true });
  await writeFile(CLDR_DATA, JSON.stringify(data, null, 2) + "\n");
  for (const [id, l] of Object.entries(data.languages)) console.log(`${id} : ${l.main.length} principaux, ${l.auxiliary.length} auxiliaires`);
}
