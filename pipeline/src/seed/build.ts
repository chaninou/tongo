/**
 * npm run seed : écrit le contenu de départ dans content/.
 * Ce contenu est un brouillon (confidence « draft ») : il sera remplacé, entrée par entrée,
 * par les données importées et croisées par la chaîne de production (TS-004 à TS-009).
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Language, Phoneme } from "@tongo/model";
import { CLDR_DATA, type CldrData } from "../import/cldr.ts";
import { AUDIO_META } from "../import/audio.ts";
import { CONTENT_DIR } from "../content.ts";
import { PHONEMES } from "./phonemes.ts";
import { SCRIPTS } from "./scripts.ts";
import { SOURCES } from "./sources.ts";
import type { Grapheme, Script } from "@tongo/model";
import type { PhonemeRow } from "./table.ts";
import ar from "./languages/ar.ts";
import en from "./languages/en.ts";
import es from "./languages/es.ts";
import fr from "./languages/fr.ts";
import ja from "./languages/ja.ts";
import ru from "./languages/ru.ts";
import { MORE } from "./languages/more.ts";

/** Ce qu'apporte un module de langue : la langue, et éventuellement une écriture, des lettres, des phonèmes. */
export interface LanguageModule {
  language: Language;
  scripts?: Script[];
  extend?: { script: string; graphemes: Grapheme[] }[];
  phonemes?: PhonemeRow[];
}

/**
 * Les caractères importés de CLDR (npm run import:cldr) sont joints à chaque langue, avec la source.
 * Ils ne changent pas la confiance des prononciations : CLDR ne dit rien des sons.
 */
const cldr: CldrData | undefined = existsSync(CLDR_DATA) ? JSON.parse(await readFile(CLDR_DATA, "utf8")) : undefined;
const withCldr = (l: Language): Language => {
  const c = cldr?.languages[l.id];
  if (!c || !cldr) return l;
  const source = { source: "cldr", locator: `CLDR ${cldr.version}, common/main/${l.id}.xml` };
  return { ...l, characters: { ...c, source }, sources: [...l.sources, source] };
};

const modules: LanguageModule[] = [...[fr, en, es, ru, ar, ja].map((language) => ({ language })), ...MORE];
const LANGUAGES = modules.map((m) => withCldr(m.language));

const scripts = new Map<string, Script>(SCRIPTS.map((s) => [s.id, structuredClone(s)]));
for (const m of modules) for (const s of m.scripts ?? []) {
  if (scripts.has(s.id)) throw new Error(`Écriture ${s.id} déclarée deux fois`);
  scripts.set(s.id, s);
}
for (const m of modules) for (const { script, graphemes } of m.extend ?? []) {
  const s = scripts.get(script);
  if (!s) throw new Error(`Écriture ${script} inconnue (${m.language.id})`);
  for (const g of graphemes) {
    const same = s.graphemes.find((x) => x.id === g.id);
    if (same && same.char !== g.char) throw new Error(`${script}:${g.id} : « ${same.char} » ≠ « ${g.char} » (${m.language.id})`);
    if (!same) {
      const clash = s.graphemes.find((x) => x.char === g.char);
      if (clash) throw new Error(`${script} : « ${g.char} » existe déjà sous l'id ${clash.id} (${m.language.id})`);
      s.graphemes.push(g);
    }
  }
}
const ALL_SCRIPTS = [...scripts.values()];

const json = (v: unknown) => JSON.stringify(v, null, 2) + "\n";

await mkdir(join(CONTENT_DIR, "scripts"), { recursive: true });
await mkdir(join(CONTENT_DIR, "languages"), { recursive: true });

const phonemeRows = new Map<string, PhonemeRow>();
for (const row of [...PHONEMES, ...modules.flatMap((m) => m.phonemes ?? [])]) {
  const prev = phonemeRows.get(row[0]);
  if (prev && prev[1] !== row[1]) throw new Error(`Phonème /${row[0]}/ : identifiants ${prev[1]} et ${row[1]}`);
  phonemeRows.set(row[0], row);
}
/** Attribution des enregistrements importés de Wikimedia Commons (npm run import:audio). */
const audio: Record<string, Phoneme["audio"]> = existsSync(AUDIO_META) ? JSON.parse(await readFile(AUDIO_META, "utf8")) : {};
const phonemes: Phoneme[] = [...phonemeRows.values()].map(([ipa, id, kind, fr, en]) => ({
  ipa, id, kind, name: { fr, en }, confidence: "draft",
  ...(audio[id] ? { audio: audio[id], sources: [{ source: "wikimedia-commons", locator: audio[id]!.url }] } : { sources: [] }),
}));
await writeFile(join(CONTENT_DIR, "phonemes.json"), json(phonemes));
await writeFile(join(CONTENT_DIR, "sources.json"), json(SOURCES));
for (const s of ALL_SCRIPTS) await writeFile(join(CONTENT_DIR, "scripts", `${s.id}.json`), json(s));
for (const l of LANGUAGES) await writeFile(join(CONTENT_DIR, "languages", `${l.id}.json`), json(l));
console.log(`Écrit : ${ALL_SCRIPTS.length} écritures, ${LANGUAGES.length} langues, ${phonemes.length} phonèmes.`);
