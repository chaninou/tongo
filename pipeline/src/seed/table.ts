/**
 * Format compact pour décrire une langue : une ligne par lettre, champs séparés par « | ».
 *
 *   caractère | id | nature | translittération | son | mot | IPA du mot | sens FR | sens EN | sens AR | note FR | note EN
 *
 * - nature : c (consonne), v (voyelle), vs (signe vocalique), s (syllabe), d (diacritique), x (signe) ;
 * - son : phonèmes séparés par des espaces, « - » pour une lettre muette ;
 * - les champs vides sont ignorés. Une même table sert à créer les graphèmes de l'écriture
 *   et les entrées de la langue.
 */
import type { Grapheme, LetterEntry } from "@tongo/model";
import { DRAFT, L } from "./helpers.ts";

const KINDS: Record<string, Grapheme["kind"]> = { c: "consonant", v: "vowel", vs: "vowel-sign", s: "syllable", d: "diacritic", x: "sign" };

export interface Row {
  char: string; id: string; kind: Grapheme["kind"]; latin?: string; sound: string; group?: string;
  ex?: [string, string, string, string, string?]; note?: [string, string];
}

/** Analyse une table ; une ligne « # groupe » change le groupe des lignes suivantes. */
export function table(text: string): Row[] {
  const rows: Row[] = [];
  let group: string | undefined;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#")) { group = line.slice(1).trim() || undefined; continue; }
    const f = line.split("|").map((x) => x.trim());
    const [char, id, kind, latin, sound, w, wIpa, wFr, wEn, wAr, nFr, nEn] = f;
    if (!char || !id || !kind || !KINDS[kind]) throw new Error(`Ligne invalide : ${line}`);
    rows.push({
      char: char.normalize("NFC"), id, kind: KINDS[kind], latin: latin || undefined,
      sound: sound === "-" ? "" : (sound ?? ""), group,
      ex: w && wFr && wEn ? [w, wIpa ?? "", wFr, wEn, wAr || undefined] : undefined,
      note: nFr && nEn ? [nFr, nEn] : undefined,
    });
  }
  return rows;
}

/** Graphèmes d'écriture issus d'une table (pour une écriture nouvelle). */
export function graphemesOf(rows: Row[]): Grapheme[] {
  return rows.map((r) => ({ id: r.id, char: r.char, kind: r.kind, ...(r.latin ? { latin: r.latin } : {}), ...(r.group ? { group: r.group } : {}) }));
}

/** Entrées de langue issues d'une table. `extra` complète une lettre (variantes, alternatives, comparaisons). */
export function lettersOf(script: string, rows: Row[], extra: Record<string, Parameters<typeof L>[2]> = {}): LetterEntry[] {
  return rows.map((r) => {
    const e = extra[r.id] ?? {};
    return L(`${script}:${r.id}`, r.sound, {
      ...e,
      ...(r.note && !e.note ? { note: r.note } : {}),
      ex: e.ex ?? (r.ex ? [[r.ex[0], r.ex[1], r.ex[2], r.ex[3], r.ex[4]]] : []),
    });
  });
}

/** Phonèmes déclarés par une langue : [IPA, id, nature, description FR, description EN]. */
export type PhonemeRow = [string, string, "consonant" | "vowel" | "diphthong" | "tone", string, string];

export { DRAFT };
