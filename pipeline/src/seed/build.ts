/**
 * npm run seed : écrit le contenu de départ dans content/.
 * Ce contenu est un brouillon (confidence « draft ») : il sera remplacé, entrée par entrée,
 * par les données importées et croisées par la chaîne de production (TS-004 à TS-009).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Phoneme } from "@tongo/model";
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

const LANGUAGES = [fr, en, es, ru, ar, ja];

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
