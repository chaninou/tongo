/**
 * npm run report : compare les lettres de chaque langue aux caractères de référence (CLDR).
 * - « absent de CLDR » : lettre décrite par Tongo mais inconnue de CLDR pour cette langue ;
 * - « auxiliaire » : lettre d'emprunt selon CLDR ;
 * - « manquant » : caractère principal selon CLDR que Tongo ne décrit pas encore.
 */
import { loadContent } from "./content.ts";
import { coveredIn, hangulJamo } from "./coverage.ts";

const { content, errors } = await loadContent();
if (errors.length) {
  console.error("Contenu invalide, lancer npm run validate.");
  process.exit(1);
}
const chars = new Map(content.scripts.flatMap((s) => s.graphemes.map((g) => [`${s.id}:${g.id}`, g.char] as const)));
let gaps = 0;
for (const l of content.languages) {
  if (!l.characters) { console.log(`\n${l.id} : pas de référence CLDR`); continue; }
  const main = new Set(l.characters.main);
  const aux = new Set(l.characters.auxiliary);
  const described = new Set(l.letters.map((e) => chars.get(e.grapheme)!));
  // Composants des caractères de référence (marques de ton, jamo…) : décrits à dessein.
  const components = new Set([...main, ...aux].flatMap((c) => [...(hangulJamo(c) ?? []), ...c.normalize("NFD")]));
  const notInCldr = [...described].filter((c) => !main.has(c) && !aux.has(c) && !components.has(c));
  const auxiliary = [...described].filter((c) => !main.has(c) && aux.has(c));
  const missing = [...main].filter((c) => !coveredIn(c, described as Set<string>, l.id));
  gaps += missing.length + notInCldr.length;
  console.log(`\n${l.id} (${l.characters.source.locator}) : ${described.size} lettres décrites, ${main.size} principales dans CLDR`);
  if (missing.length) console.log(`  manquant (${missing.length}) : ${missing.join(" ")}`);
  if (auxiliary.length) console.log(`  auxiliaire : ${auxiliary.join(" ")}`);
  if (notInCldr.length) console.log(`  absent de CLDR : ${notInCldr.join(" ")}`);
}
console.log(`\n${gaps} écart(s) au total.`);
