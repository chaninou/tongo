// Copie les audios générés par la chaîne (content/audio, hors dépôt) dans public/ avant le build.
import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const from = resolve(import.meta.dirname, "../../content/audio");
const to = resolve(import.meta.dirname, "../public/audio");
rmSync(to, { recursive: true, force: true });
if (existsSync(from)) cpSync(from, to, { recursive: true });
else console.warn("content/audio absent : lancer « npm run import:audio -w pipeline » pour avoir le son.");
