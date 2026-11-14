/** npm run validate : refuse le build si le contenu publié est invalide. */
import { loadContent } from "./content.ts";

const { content, errors } = await loadContent();
const letters = content.languages.reduce((n, l) => n + l.letters.length, 0);
console.log(
  `${content.languages.length} langues, ${content.scripts.length} écritures, ` +
    `${letters} graphèmes de langue, ${content.phonemes.length} phonèmes, ${content.sources.length} sources`,
);
if (errors.length) {
  console.error(`\n${errors.length} erreur(s) :`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("Contenu valide.");
