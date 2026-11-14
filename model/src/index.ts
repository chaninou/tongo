/**
 * Modèle de données de Tongo (TS-001) et schéma de validation du contenu publié (TS-003).
 *
 * Une seule définition, partagée par la chaîne de production (pipeline/) et par l'appli (app/) :
 * le contenu de content/ est validé avec ces schémas à chaque build.
 *
 * Principes :
 * - la prononciation est portée par le couple variante régionale × graphème (D22) ;
 * - l'IPA est le pivot interne : chaque prononciation pointe vers des phonèmes (TS-002) ;
 * - chaque donnée factuelle garde ses sources et un niveau de confiance (D20, D21) ;
 * - ajouter une langue = ajouter un fichier JSON, sans toucher à l'appli.
 */
import { z } from "zod";

/** Langues d'interface au lancement (D19). */
export const UI_LOCALES = ["fr", "en", "ar"] as const;
export const UiLocale = z.enum(UI_LOCALES);
export type UiLocale = z.infer<typeof UiLocale>;

/** Texte traduit dans les langues d'interface. Le français et l'anglais sont obligatoires. */
export const Localized = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
  ar: z.string().min(1).optional(),
});
export type Localized = z.infer<typeof Localized>;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "identifiant en minuscules, chiffres et tirets");

/* ───────────── Sources et confiance ───────────── */

/** Référence à une source déclarée dans content/sources.json. */
export const SourceRef = z.object({
  source: slug,
  /** Précision facultative : page, entrée, URL exacte. */
  locator: z.string().optional(),
});
export type SourceRef = z.infer<typeof SourceRef>;

/**
 * Niveau de confiance, issu du croisement automatique des sources (TS-009) :
 * - high : au moins deux sources indépendantes concordent ;
 * - medium : une seule source fiable ;
 * - low : les sources divergent ;
 * - draft : brouillon pas encore croisé (aucune source confirmée).
 */
export const CONFIDENCE_LEVELS = ["high", "medium", "low", "draft"] as const;
export const Confidence = z.enum(CONFIDENCE_LEVELS);
export type Confidence = z.infer<typeof Confidence>;

export const Provenance = z.object({
  confidence: Confidence,
  sources: z.array(SourceRef).default([]),
});

export const Source = z.object({
  id: slug,
  name: z.string(),
  url: z.url(),
  license: z.string(),
  /** Type de donnée apportée, pour la page Sources (US-022). */
  provides: Localized,
});
export type Source = z.infer<typeof Source>;

/* ───────────── Phonèmes (pivot IPA) ───────────── */

/** Transcription phonémique, sans barres obliques : « ʃ », « t͡s », « aː ». */
export const Ipa = z.string().min(1).regex(/^[^/\[\]\s]+$/, "IPA sans / ni [ ] ni espace");

export const PHONEME_KINDS = ["consonant", "vowel", "diphthong", "tone"] as const;

export const Phoneme = z.object({
  ipa: Ipa,
  /** Identifiant d'URL stable (les symboles IPA ne sont pas tous lisibles dans une URL). */
  id: slug,
  kind: z.enum(PHONEME_KINDS),
  /** Description articulatoire courte : « fricative post-alvéolaire sourde ». */
  name: Localized,
  audio: z.string().optional(),
  ...Provenance.shape,
});
export type Phoneme = z.infer<typeof Phoneme>;

/* ───────────── Écritures ───────────── */

export const SCRIPT_TYPES = ["alphabet", "abjad", "abugida", "syllabary", "featural"] as const;
export const ScriptType = z.enum(SCRIPT_TYPES);
export type ScriptType = z.infer<typeof ScriptType>;

export const GRAPHEME_KINDS = ["consonant", "vowel", "vowel-sign", "syllable", "diacritic", "sign"] as const;

/** Formes contextuelles (arabe, persan) : isolée, initiale, médiane, finale (US-011). */
export const Forms = z.object({
  isolated: z.string(),
  initial: z.string().optional(),
  medial: z.string().optional(),
  final: z.string().optional(),
});

export const Grapheme = z.object({
  /** Identifiant stable dans l'écriture, utilisé dans les URL : « a », « sha », « ka ». */
  id: slug,
  /** Le caractère tel qu'il s'écrit (peut combiner plusieurs points de code). */
  char: z.string().min(1),
  /** Majuscule, pour les écritures bicamérales. */
  upper: z.string().optional(),
  kind: z.enum(GRAPHEME_KINDS),
  /** Nom de la lettre : « alif », « bê », « ka ». */
  name: z.string().optional(),
  /** Translittération latine courante. */
  latin: z.string().optional(),
  forms: Forms.optional(),
  /** Groupe d'affichage dans le tableau : « voyelles », « consonnes », ligne du gojūon… */
  group: z.string().optional(),
  /** Équivalent dans une écriture sœur (hiragana ↔ katakana, US-013) : « kana:ka ». */
  counterpart: z.string().regex(/^[a-z]+:[a-z0-9-]+$/).optional(),
  /** Décomposition en éléments, pour hangeul et abugidas (US-012) : ids de graphèmes. */
  parts: z.array(slug).optional(),
});
export type Grapheme = z.infer<typeof Grapheme>;

export const Script = z.object({
  /** Code ISO 15924 en minuscules : latn, cyrl, arab, hira… */
  id: z.string().regex(/^[a-z]{4}$/),
  name: Localized,
  /** Nom de l'écriture dans l'écriture elle-même. */
  endonym: z.string().optional(),
  type: ScriptType,
  direction: z.enum(["ltr", "rtl"]),
  /** Écriture bicamérale (majuscules / minuscules). */
  cased: z.boolean().default(false),
  /** Présentation courte (US-006). */
  intro: Localized,
  /** Exemple court affiché sur la carte de l'écriture. */
  sample: z.string(),
  /** Famille de police Noto à charger. */
  font: z.string(),
  groups: z.array(z.object({ id: z.string(), name: Localized })).default([]),
  graphemes: z.array(Grapheme).min(1),
  ...Provenance.shape,
});
export type Script = z.infer<typeof Script>;

/* ───────────── Langues ───────────── */

/** Code de variante régionale BCP 47 : « fr-FR », « pt-BR », « ar » (arabe standard moderne). */
const VariantId = z.string().regex(/^[a-z]{2,3}(?:-[A-Z]{2}|-\d{3})?$/);

export const Variant = z.object({
  id: VariantId,
  /** Code pays ISO 3166-1, absent pour une norme supranationale (arabe standard moderne). */
  region: z.string().regex(/^[A-Z]{2}$/).optional(),
  name: Localized,
  /** La variante par défaut : la plus parlée (D22). */
  default: z.boolean().default(false),
});
export type Variant = z.infer<typeof Variant>;

/** Transcription d'un mot ou d'une expression : les espaces séparent les mots. */
export const IpaText = z.string().min(1).regex(/^[^/\[\]]+$/, "IPA sans / ni [ ]");

export const ExampleWord = z.object({
  word: z.string().min(1),
  /** Transcription du mot entier. */
  ipa: IpaText.optional(),
  /** Translittération latine, pour les écritures non latines. */
  latin: z.string().optional(),
  meaning: Localized,
  audio: z.string().optional(),
  /** Variante concernée quand le mot n'est valable que pour une variante. */
  variant: VariantId.optional(),
  ...Provenance.shape,
});
export type ExampleWord = z.infer<typeof ExampleWord>;

/**
 * Prononciation d'un graphème : une liste de phonèmes (ex. « x » = /k/ + /s/).
 * Une liste vide signifie que la lettre est muette (le h français).
 */
export const Sound = z.array(Ipa);

export const Pronunciation = z.object({
  /** Prononciation principale, celle de la variante par défaut. */
  sound: Sound,
  /** Écarts propres à une variante : { "pt-PT": ["ʃ"] }. */
  variants: z.record(VariantId, Sound).optional(),
  /** Autres prononciations selon le contexte, illustrées par des exemples. */
  alternates: z.array(z.object({ sound: Sound, context: Localized })).optional(),
  /** Remarque courte : lettre muette, ton, longueur… */
  note: Localized.optional(),
  /** Comparaison « comme le ch de chat », par langue d'interface (US-010). */
  like: z.partialRecord(UiLocale, z.string()).optional(),
  ...Provenance.shape,
});
export type Pronunciation = z.infer<typeof Pronunciation>;

/** Un graphème tel qu'il est utilisé dans une langue. */
export const LetterEntry = z.object({
  /** Référence au graphème : « latn:c-cedilla ». */
  grapheme: z.string().regex(/^[a-z]{4}:[a-z0-9-]+$/),
  pronunciation: Pronunciation,
  examples: z.array(ExampleWord).max(3).default([]),
});
export type LetterEntry = z.infer<typeof LetterEntry>;

export const Language = z.object({
  /** Code ISO 639-1 quand il existe, sinon ISO 639-3. */
  id: z.string().regex(/^[a-z]{2,3}$/),
  iso639_3: z.string().regex(/^[a-z]{3}$/),
  name: Localized,
  /** Nom de la langue dans la langue elle-même. */
  endonym: z.string(),
  scripts: z.array(z.string().regex(/^[a-z]{4}$/)).min(1),
  variants: z.array(Variant).min(1),
  /** Ordre de grandeur des locuteurs (L1 + L2), en millions. */
  speakersM: z.number().positive().optional(),
  intro: Localized.optional(),
  /**
   * Caractères de la langue selon une source de référence (CLDR, TS-004) : principaux et
   * auxiliaires (mots d'emprunt, noms propres). Sert à repérer les lettres manquantes.
   */
  characters: z
    .object({ main: z.array(z.string().min(1)), auxiliary: z.array(z.string().min(1)), source: SourceRef })
    .optional(),
  letters: z.array(LetterEntry).min(1),
  ...Provenance.shape,
});
export type Language = z.infer<typeof Language>;

/* ───────────── Contrôles transverses ───────────── */

export interface Content {
  scripts: Script[];
  languages: Language[];
  phonemes: Phoneme[];
  sources: Source[];
}

/**
 * Vérifie les références croisées que Zod ne peut pas voir fichier par fichier :
 * graphèmes, phonèmes, sources, variantes et écritures référencés doivent exister.
 * Renvoie la liste des erreurs (vide si tout va bien).
 */
export function crossCheck(c: Content): string[] {
  const errors: string[] = [];
  const scriptIds = new Set(c.scripts.map((s) => s.id));
  const graphemeIds = new Set(c.scripts.flatMap((s) => s.graphemes.map((g) => `${s.id}:${g.id}`)));
  const phonemeIpa = new Set(c.phonemes.map((p) => p.ipa));
  const sourceIds = new Set(c.sources.map((s) => s.id));

  const dup = <T>(items: T[], key: (t: T) => string, what: string) => {
    const seen = new Set<string>();
    for (const it of items) {
      const k = key(it);
      if (seen.has(k)) errors.push(`${what} en double : ${k}`);
      seen.add(k);
    }
  };
  dup(c.scripts, (s) => s.id, "écriture");
  dup(c.languages, (l) => l.id, "langue");
  dup(c.phonemes, (p) => p.ipa, "phonème");
  dup(c.phonemes, (p) => p.id, "identifiant de phonème");
  dup(c.sources, (s) => s.id, "source");

  const checkSources = (refs: SourceRef[], where: string) => {
    for (const r of refs) if (!sourceIds.has(r.source)) errors.push(`${where} : source inconnue « ${r.source} »`);
  };
  const checkSound = (sound: string[], where: string) => {
    for (const ipa of sound) if (!phonemeIpa.has(ipa)) errors.push(`${where} : phonème /${ipa}/ absent de phonemes.json`);
  };

  for (const s of c.scripts) {
    checkSources(s.sources, `écriture ${s.id}`);
    dup(s.graphemes, (g) => g.id, `graphème de ${s.id}`);
    const groups = new Set(s.groups.map((g) => g.id));
    for (const g of s.graphemes) {
      if (g.group && !groups.has(g.group)) errors.push(`${s.id}:${g.id} : groupe « ${g.group} » non déclaré`);
      if (g.counterpart) {
        const [cs, cg] = g.counterpart.split(":");
        if (!graphemeIds.has(`${cs}:${cg}`)) errors.push(`${s.id}:${g.id} : équivalent ${g.counterpart} introuvable`);
      }
      for (const p of g.parts ?? []) {
        if (!graphemeIds.has(`${s.id}:${p}`)) errors.push(`${s.id}:${g.id} : composant ${p} introuvable`);
      }
    }
  }
  for (const p of c.phonemes) checkSources(p.sources, `phonème /${p.ipa}/`);

  for (const l of c.languages) {
    const where = `langue ${l.id}`;
    checkSources(l.sources, where);
    if (l.characters) checkSources([l.characters.source], `${where}, caractères`);
    for (const sc of l.scripts) if (!scriptIds.has(sc)) errors.push(`${where} : écriture ${sc} inconnue`);
    const defaults = l.variants.filter((v) => v.default).length;
    if (defaults !== 1) errors.push(`${where} : ${defaults} variantes par défaut (exactement 1 attendue)`);
    const variantIds = new Set(l.variants.map((v) => v.id));
    dup(l.letters, (e) => e.grapheme, `${where}, graphème`);
    for (const e of l.letters) {
      const w = `${where}, ${e.grapheme}`;
      if (!graphemeIds.has(e.grapheme)) errors.push(`${w} : graphème introuvable`);
      if (!l.scripts.includes(e.grapheme.split(":")[0]!)) errors.push(`${w} : écriture non déclarée pour la langue`);
      const p = e.pronunciation;
      checkSound(p.sound, w);
      checkSources(p.sources, w);
      const defaultId = l.variants.find((v) => v.default)?.id;
      for (const [vid, snd] of Object.entries(p.variants ?? {})) {
        if (!variantIds.has(vid)) errors.push(`${w} : variante ${vid} non déclarée`);
        if (vid === defaultId) errors.push(`${w} : ${vid} est la variante par défaut, sa prononciation va dans « sound »`);
        checkSound(snd, `${w} (${vid})`);
      }
      for (const a of p.alternates ?? []) checkSound(a.sound, `${w} (alternative)`);
      for (const ex of e.examples) {
        checkSources(ex.sources, `${w}, exemple « ${ex.word} »`);
        if (ex.variant && !variantIds.has(ex.variant)) errors.push(`${w}, exemple « ${ex.word} » : variante ${ex.variant} non déclarée`);
      }
    }
  }
  return errors;
}

/** Prononciation applicable à une variante donnée (repli sur la principale). */
export function soundFor(p: Pronunciation, variant: string): string[] {
  return p.variants?.[variant] ?? p.sound;
}

/** Variante par défaut d'une langue, ou celle qui correspond à la région du navigateur (D22). */
export function pickVariant(lang: Language, browserLocales: readonly string[] = []): Variant {
  for (const loc of browserLocales) {
    const [code, region] = loc.split("-");
    if (code?.toLowerCase() !== lang.id || !region) continue;
    const v = lang.variants.find((x) => x.region === region.toUpperCase());
    if (v) return v;
  }
  return lang.variants.find((v) => v.default) ?? lang.variants[0]!;
}

/** Niveau de confiance le plus faible d'un ensemble (affichage d'une fiche agrégée). */
export function weakest(levels: Confidence[]): Confidence {
  const order: Confidence[] = ["draft", "low", "medium", "high"];
  return levels.reduce((min, l) => (order.indexOf(l) < order.indexOf(min) ? l : min), "high" as Confidence);
}
