/**
 * TS-018 : audit d'accessibilité des pages générées (app/dist), lancé après le build.
 *
 *   - <html> porte lang et dir ;
 *   - chaque bouton et chaque lien a un nom accessible (texte visible ou aria-label) ;
 *   - chaque image a un attribut alt ;
 *   - les identifiants sont uniques dans la page ;
 *   - tout texte dans une écriture autre que celle de la langue d'interface est balisé par lang
 *     (lecteurs d'écran et choix de police corrects).
 *
 * node scripts/audit.mjs [dossier]   (défaut : dist)
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { ELEMENT_NODE, TEXT_NODE, parse } from "ultrahtml";

const ROOT = process.argv[2] ?? new URL("../dist", import.meta.url).pathname;

/** Écriture attendue pour chaque sous-étiquette de langue (premier sous-tag BCP 47). */
const SCRIPT_OF = {
  fr: "Latin", en: "Latin", es: "Latin", pt: "Latin", de: "Latin", tr: "Latin", vi: "Latin", sw: "Latin",
  ar: "Arabic", fa: "Arabic", ru: "Cyrillic", el: "Greek", ka: "Georgian", he: "Hebrew", hi: "Devanagari",
  bn: "Bengali", ta: "Tamil", th: "Thai", ko: "Hangul", ja: "Japanese",
};
const CHECKED = ["Arabic", "Cyrillic", "Greek", "Georgian", "Hebrew", "Devanagari", "Bengali", "Tamil", "Thai", "Hangul", "Hiragana", "Katakana", "Han"];
const RE = Object.fromEntries(CHECKED.map((s) => [s, new RegExp(`\\p{Script=${s}}`, "u")]));

/** L'écriture d'une étiquette : sous-tag explicite (ar-Latn, und-Grek, und-fonipa…) ou langue. */
function scriptsAllowed(lang) {
  const tags = lang.toLowerCase().split("-");
  if (tags.includes("fonipa")) return ["Greek"]; // l'IPA emprunte β θ χ au grec
  const explicit = { latn: "Latin", arab: "Arabic", cyrl: "Cyrillic", grek: "Greek", geor: "Georgian", hebr: "Hebrew", deva: "Devanagari", beng: "Bengali", taml: "Tamil", thai: "Thai", hang: "Hangul", kore: "Hangul", hira: "Hiragana", kana: "Katakana", jpan: "Japanese" };
  const s = tags.map((t) => explicit[t]).find(Boolean) ?? SCRIPT_OF[tags[0]];
  if (s === "Japanese") return ["Hiragana", "Katakana", "Han"];
  if (s === "Hangul") return ["Hangul", "Han"];
  return s ? [s] : [];
}

function* pages(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* pages(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

const text = (n) => (n.type === TEXT_NODE ? n.value : n.type === ELEMENT_NODE && n.attributes["aria-hidden"] === "true" ? "" : (n.children ?? []).map(text).join(""));
const named = (n) => Boolean(n.attributes["aria-label"]?.trim() || n.attributes["aria-labelledby"] || text(n).trim() || (n.children ?? []).some((c) => c.name === "img" && c.attributes.alt));

const problems = [];
let count = 0;
for (const file of pages(ROOT)) {
  count++;
  const where = relative(ROOT, file);
  const html = readFileSync(file, "utf8");
  if (/^\s*<!DOCTYPE html>\s*<title>Redirecting/i.test(html) || /http-equiv="refresh"/i.test(html.slice(0, 600))) continue;
  const ids = new Set();
  const report = (msg) => { problems.push(`${where} : ${msg}`); };
  const visit = (n, lang) => {
    if (n.type === TEXT_NODE) {
      const allowed = scriptsAllowed(lang);
      for (const s of CHECKED) if (!allowed.includes(s) && RE[s].test(n.value)) report(`texte ${s} sans lang adapté (lang=${lang}) : « ${n.value.trim().slice(0, 30)} »`);
      return;
    }
    if (n.type !== ELEMENT_NODE && n.type !== 0) return;
    const a = n.attributes ?? {};
    if (n.name === "script" || n.name === "style" || n.name === "template") return;
    if (n.name === "html" && (!a.lang || !a.dir)) report("<html> sans lang ou dir");
    if (a.id) { if (ids.has(a.id)) report(`id en double : ${a.id}`); ids.add(a.id); }
    if (n.name === "button" && !named(n)) report("bouton sans nom accessible");
    if (n.name === "a" && a.href !== undefined && !named(n)) report(`lien sans nom accessible (${a.href})`);
    if (n.name === "img" && a.alt === undefined) report(`image sans alt (${a.src})`);
    if (n.name === "title" || n.name === "head") return; // le titre suit la langue de la page
    const next = a.lang ?? lang;
    for (const c of n.children ?? []) visit(c, next);
  };
  visit(parse(html), "");
}

console.log(`${count} pages auditées.`);
if (problems.length) {
  console.error(`${problems.length}${""} problème(s) :\n - ${problems.join("\n - ")}`);
  process.exit(1);
}
console.log("Aucun problème d'accessibilité détecté.");
