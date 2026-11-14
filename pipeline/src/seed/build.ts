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
import { CONTENT_DIR } from "../content.ts";
import { PHONEMES } from "./phonemes.ts";
import { SCRIPTS } from "./scripts.ts";
import { SOURCES } from "./sources.ts";
import ar from "./languages/ar.ts";
import en from "./languages/en.ts";
import es from "./languages/es.ts";
import fr from "./languages/fr.ts";
import ja from "./languages/ja.ts";
import ru from "./languages/ru.ts";

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

const LANGUAGES = [fr, en, es, ru, ar, ja].map(withCldr);

const json = (v: unknown) => JSON.stringify(v, null, 2) + "\n";

await mkdir(join(CONTENT_DIR, "scripts"), { recursive: true });
await mkdir(join(CONTENT_DIR, "languages"), { recursive: true });

const phonemes: Phoneme[] = PHONEMES.map(([ipa, id, kind, fr, en]) => ({
  ipa, id, kind, name: { fr, en }, confidence: "draft", sources: [],
}));
await writeFile(join(CONTENT_DIR, "phonemes.json"), json(phonemes));
await writeFile(join(CONTENT_DIR, "sources.json"), json(SOURCES));
for (const s of SCRIPTS) await writeFile(join(CONTENT_DIR, "scripts", `${s.id}.json`), json(s));
for (const l of LANGUAGES) await writeFile(join(CONTENT_DIR, "languages", `${l.id}.json`), json(l));
console.log(`Écrit : ${SCRIPTS.length} écritures, ${LANGUAGES.length} langues, ${phonemes.length} phonèmes.`);
