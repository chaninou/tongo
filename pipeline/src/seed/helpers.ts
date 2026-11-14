/** Aides pour écrire le contenu de départ de façon compacte. */
import type { ExampleWord, Language, LetterEntry, Localized } from "@tongo/model";

export const DRAFT = { confidence: "draft" as const, sources: [] };

/** Exemple : [mot, IPA, sens FR, sens EN, sens AR?, translittération?] */
export type Ex = [word: string, ipa: string, fr: string, en: string, ar?: string, latin?: string];

export interface LetterOpts {
  /** Écarts par variante : { "en-GB": "ɑ" } (sons séparés par des espaces). */
  variants?: Record<string, string>;
  alt?: [sound: string, fr: string, en: string][];
  note?: [fr: string, en: string, ar?: string];
  like?: { fr?: string; en?: string; ar?: string };
  ex?: Ex[];
}

const loc = (fr: string, en: string, ar?: string): Localized => (ar ? { fr, en, ar } : { fr, en });
const snd = (s: string) => s.split(" ").filter(Boolean);

export function ex([word, ipa, fr, en, ar, latin]: Ex): ExampleWord {
  return { word, ipa, meaning: loc(fr, en, ar), ...(latin ? { latin } : {}), ...DRAFT };
}

/** Une entrée : graphème (« latn:a »), son principal (« k s »), options. */
export function L(grapheme: string, sound: string, o: LetterOpts = {}): LetterEntry {
  return {
    grapheme,
    pronunciation: {
      sound: snd(sound),
      ...(o.variants ? { variants: Object.fromEntries(Object.entries(o.variants).map(([v, s]) => [v, snd(s)])) } : {}),
      ...(o.alt ? { alternates: o.alt.map(([s, fr, en]) => ({ sound: snd(s), context: loc(fr, en) })) } : {}),
      ...(o.note ? { note: loc(...o.note) } : {}),
      ...(o.like ? { like: o.like } : {}),
      ...DRAFT,
    },
    examples: (o.ex ?? []).map(ex),
  };
}

/** Raccourci pour une langue écrite dans une seule écriture : préfixe automatique. */
export function letters(script: string, rows: [id: string, sound: string, o?: LetterOpts][]): LetterEntry[] {
  return rows.map(([id, sound, o]) => L(`${script}:${id}`, sound, o));
}

export type LanguageSeed = Omit<Language, "confidence" | "sources">;
export const lang = (l: LanguageSeed): Language => ({ ...l, ...DRAFT });
