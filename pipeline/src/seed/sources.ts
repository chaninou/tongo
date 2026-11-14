import type { Source } from "@tongo/model";

/** Sources ouvertes prévues (section 9 du besoin). Licences à confirmer à l'import (TS-016). */
export const SOURCES: Source[] = [
  { id: "cldr", name: "Unicode CLDR", url: "https://cldr.unicode.org/", license: "Unicode License v3",
    provides: { fr: "Caractères utilisés par chaque langue", en: "Characters used by each language", ar: "الحروف المستعملة في كل لغة" } },
  { id: "phoible", name: "PHOIBLE", url: "https://phoible.org/", license: "CC BY-SA 3.0",
    provides: { fr: "Inventaires de phonèmes", en: "Phoneme inventories", ar: "قوائم الصوتيمات" } },
  { id: "wiktionary", name: "Wiktionnaire / Wiktionary (via kaikki.org)", url: "https://kaikki.org/", license: "CC BY-SA 4.0",
    provides: { fr: "Mots d'exemple, transcriptions IPA", en: "Example words, IPA transcriptions", ar: "كلمات أمثلة ونسخ صوتية" } },
  { id: "epitran", name: "Epitran", url: "https://github.com/dmort27/epitran", license: "MIT",
    provides: { fr: "Règles graphème → phonème", en: "Grapheme-to-phoneme rules", ar: "قواعد تحويل الحرف إلى صوت" } },
  { id: "iso639-3", name: "ISO 639-3 (SIL)", url: "https://iso639-3.sil.org/", license: "SIL terms of use",
    provides: { fr: "Codes des langues", en: "Language codes", ar: "رموز اللغات" } },
  { id: "glottolog", name: "Glottolog", url: "https://glottolog.org/", license: "CC BY 4.0",
    provides: { fr: "Classification des langues", en: "Language classification", ar: "تصنيف اللغات" } },
  { id: "wikimedia-commons", name: "Wikimedia Commons", url: "https://commons.wikimedia.org/", license: "CC BY / CC BY-SA / domaine public",
    provides: { fr: "Enregistrements des sons de l'IPA", en: "IPA sound recordings", ar: "تسجيلات أصوات الأبجدية الصوتية الدولية" } },
  { id: "lingua-libre", name: "Lingua Libre", url: "https://lingualibre.org/", license: "CC BY-SA 4.0",
    provides: { fr: "Enregistrements de mots", en: "Word recordings", ar: "تسجيلات الكلمات" } },
];
