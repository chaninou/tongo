/** Construction d'un module de langue à partir d'une table compacte (voir table.ts). */
import type { Grapheme, Language, Localized, Script, Variant } from "@tongo/model";
import type { LanguageModule } from "../../build.ts";
import { DRAFT, type LetterOpts } from "../../helpers.ts";
import { SCRIPTS } from "../../scripts.ts";
import { graphemesOf, lettersOf, type PhonemeRow, type Row } from "../../table.ts";

export interface LanguageSpec {
  id: string;
  iso639_3: string;
  name: Localized;
  endonym: string;
  variants: Variant[];
  speakersM: number;
  intro: Localized;
  /** Écriture utilisée ; `script` la crée si elle n'existe pas encore. */
  scriptId: string;
  script?: Omit<Script, "graphemes" | "confidence" | "sources" | "id" | "cased" | "groups"> & {
    cased?: boolean;
    groups?: Script["groups"];
  };
  rows: Row[];
  extra?: Record<string, LetterOpts>;
  phonemes?: PhonemeRow[];
  /** Pour l'arabe : graphèmes ajoutés avec leurs formes. */
  graphemes?: Grapheme[];
}

/** Réutilise l'identifiant d'un caractère déjà présent dans l'écriture (ex. « ç » → c-cedilla). */
function resolveIds(scriptId: string, rows: Row[]): Row[] {
  const existing = SCRIPTS.find((s) => s.id === scriptId);
  if (!existing) return rows;
  return rows.map((r) => {
    const same = existing.graphemes.find((g) => g.char === r.char);
    return same ? { ...r, id: same.id } : r;
  });
}

export function define(spec: LanguageSpec): LanguageModule {
  const rows = resolveIds(spec.scriptId, spec.rows);
  const language: Language = {
    id: spec.id, iso639_3: spec.iso639_3, name: spec.name, endonym: spec.endonym, scripts: [spec.scriptId],
    variants: spec.variants, speakersM: spec.speakersM, intro: spec.intro,
    letters: lettersOf(spec.scriptId, rows, spec.extra), ...DRAFT,
  };
  const graphemes = spec.graphemes ?? graphemesOf(rows).map((g) => {
    if (!spec.script?.cased) return g;
    const up = g.char.toUpperCase();
    return up !== g.char && [...up].length === 1 ? { ...g, upper: up } : g;
  });
  if (spec.script) {
    const script: Script = {
      id: spec.scriptId, cased: false, groups: [], ...spec.script, graphemes, ...DRAFT,
    };
    return { language, scripts: [script], phonemes: spec.phonemes };
  }
  return { language, extend: [{ script: spec.scriptId, graphemes: graphemes.map((g) => ({ ...g, group: g.group ?? "accents" })) }], phonemes: spec.phonemes };
}

const v = (id: string, region: string | undefined, fr: string, en: string, ar: string, isDefault = false): Variant => ({
  id, ...(region ? { region } : {}), name: { fr, en, ar }, default: isDefault,
});
export const one = (id: string, region: string, fr: string, en: string, ar: string) => [v(id, region, fr, en, ar, true)];
export { v };

