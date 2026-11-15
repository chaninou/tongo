/**
 * Texte mixte (TS-018) : une phrase d'interface qui cite des caractères d'une autre écriture
 * (« Forme de כ en fin de mot ») est découpée en segments. Chaque segment étranger reçoit une
 * balise lang, pour que le lecteur d'écran change de voix et que la bonne police s'applique.
 * Les transcriptions entre barres obliques (/θ/) sont balisées comme IPA (und-fonipa).
 */
import type { UiLocale } from "../i18n/ui";

const SCRIPTS: [RegExp, string][] = [
  [/\p{Script=Arabic}/u, "ar"], [/\p{Script=Hebrew}/u, "he"], [/\p{Script=Cyrillic}/u, "ru"],
  [/\p{Script=Greek}/u, "el"], [/\p{Script=Georgian}/u, "ka"], [/\p{Script=Devanagari}/u, "hi"],
  [/\p{Script=Bengali}/u, "bn"], [/\p{Script=Tamil}/u, "ta"], [/\p{Script=Thai}/u, "th"],
  [/\p{Script=Hangul}/u, "ko"], [/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー]/u, "ja"],
];
const UI_TAG: Record<UiLocale, string | undefined> = { fr: undefined, en: undefined, ar: "ar" };

export interface Run { text: string; lang?: string }

const tagOf = (ch: string): string | undefined => SCRIPTS.find(([re]) => re.test(ch))?.[1];

export function runs(text: string, locale: UiLocale): Run[] {
  const out: Run[] = [];
  const push = (t: string, lang?: string) => {
    const last = out.at(-1);
    if (last && last.lang === lang) last.text += t;
    else out.push(lang ? { text: t, lang } : { text: t });
  };
  for (const part of text.split(/(\/[^/\s][^/]*\/)/u)) {
    if (/^\/[^/\s][^/]*\/$/u.test(part)) { push(part, "und-fonipa"); continue; }
    let lang: string | undefined;
    for (const ch of part) {
      const tag = tagOf(ch);
      // les espaces, chiffres et ponctuations restent dans le segment en cours
      if (tag) lang = tag === UI_TAG[locale] ? undefined : tag;
      else if (/\p{L}/u.test(ch)) lang = undefined;
      push(ch, lang);
    }
  }
  // un segment étranger ne garde pas d'espaces ou de ponctuation à sa fin
  return out.flatMap((r) => {
    const m = r.lang && r.lang !== "und-fonipa" ? /^(.*?)([\s\p{P}]*)$/su.exec(r.text) : null;
    return m && m[2] ? [{ ...r, text: m[1]! }, { text: m[2] }] : [r];
  }).reduce<Run[]>((acc, r) => {
    const last = acc.at(-1);
    if (last && last.lang === r.lang) last.text += r.text; else acc.push({ ...r });
    return acc;
  }, []);
}
