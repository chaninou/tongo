/**
 * Accès au contenu publié, au moment du build. Le contenu est validé une seule fois :
 * s'il est invalide, le build échoue avec la liste des erreurs.
 */
import type { Content, Grapheme, Language, LetterEntry, Phoneme, Script } from "@tongo/model";
import { loadContent } from "@tongo/pipeline/content";

let cache: Promise<Content> | undefined;

export function content(): Promise<Content> {
  cache ??= loadContent().then(({ content, errors }) => {
    if (errors.length) throw new Error(`Contenu invalide :\n - ${errors.join("\n - ")}`);
    return content;
  });
  return cache;
}

/** Usage d'un graphème dans une langue. */
export interface Usage {
  language: Language;
  entry: LetterEntry;
}

export interface Index {
  c: Content;
  script: (id: string) => Script | undefined;
  grapheme: (ref: string) => { script: Script; grapheme: Grapheme } | undefined;
  /** Langues qui utilisent un graphème, dans l'ordre des langues. */
  usages: (ref: string) => Usage[];
  languagesOfScript: (scriptId: string) => Language[];
  phoneme: (ipa: string) => Phoneme | undefined;
  /** Graphèmes qui se prononcent avec ce phonème (prononciation principale, variantes, alternatives). */
  spellings: (ipa: string) => (Usage & { script: Script; grapheme: Grapheme; variants: string[] })[];
}

let indexCache: Promise<Index> | undefined;

export function index(): Promise<Index> {
  indexCache ??= content().then((c) => {
    const scripts = new Map(c.scripts.map((s) => [s.id, s]));
    const graphemes = new Map<string, { script: Script; grapheme: Grapheme }>();
    for (const s of c.scripts) for (const g of s.graphemes) graphemes.set(`${s.id}:${g.id}`, { script: s, grapheme: g });
    const usages = new Map<string, Usage[]>();
    for (const language of c.languages)
      for (const entry of language.letters) {
        const list = usages.get(entry.grapheme) ?? [];
        list.push({ language, entry });
        usages.set(entry.grapheme, list);
      }
    const phonemes = new Map(c.phonemes.map((p) => [p.ipa, p]));
    return {
      c,
      script: (id) => scripts.get(id),
      grapheme: (ref) => graphemes.get(ref),
      usages: (ref) => usages.get(ref) ?? [],
      languagesOfScript: (id) => c.languages.filter((l) => l.scripts.includes(id)),
      phoneme: (ipa) => phonemes.get(ipa),
      spellings: (ipa) => {
        const out: ReturnType<Index["spellings"]> = [];
        for (const language of c.languages)
          for (const entry of language.letters) {
            const p = entry.pronunciation;
            const variants: string[] = [];
            if (p.sound.includes(ipa)) variants.push("*");
            for (const [v, s] of Object.entries(p.variants ?? {})) if (s.includes(ipa)) variants.push(v);
            if (p.alternates?.some((a) => a.sound.includes(ipa))) variants.push("alt");
            const g = graphemes.get(entry.grapheme);
            if (variants.length && g) out.push({ language, entry, variants, ...g });
          }
        return out;
      },
    };
  });
  return indexCache;
}

/** Identifiant d'URL d'un graphème : « latn:c-cedilla » → ["latn", "c-cedilla"]. */
export function splitRef(ref: string): [string, string] {
  const [s, g] = ref.split(":");
  return [s!, g!];
}
