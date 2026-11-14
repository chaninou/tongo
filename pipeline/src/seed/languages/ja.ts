import type { LetterOpts } from "../helpers.ts";
import { L, lang } from "../helpers.ts";

/** Prononciation des kana de base (identique en hiragana et katakana). */
const SOUNDS: Record<string, string> = {
  a: "a", i: "i", u: "ɯ", e: "e", o: "o",
  ka: "k a", ki: "k i", ku: "k ɯ", ke: "k e", ko: "k o",
  sa: "s a", shi: "ɕ i", su: "s ɯ", se: "s e", so: "s o",
  ta: "t a", chi: "t͡ɕ i", tsu: "t͡s ɯ", te: "t e", to: "t o",
  na: "n a", ni: "ɲ i", nu: "n ɯ", ne: "n e", no: "n o",
  ha: "h a", hi: "ç i", fu: "ɸ ɯ", he: "h e", ho: "h o",
  ma: "m a", mi: "m i", mu: "m ɯ", me: "m e", mo: "m o",
  ya: "j a", yu: "j ɯ", yo: "j o",
  ra: "ɾ a", ri: "ɾ i", ru: "ɾ ɯ", re: "ɾ e", ro: "ɾ o",
  wa: "ɰ a", wo: "o", n: "ɴ",
};

const NOTES: Record<string, LetterOpts> = {
  u: { like: { fr: "ou, lèvres non arrondies", en: "oo in food, lips unrounded" } },
  shi: { like: { fr: "chi", en: "she" } },
  chi: { like: { fr: "tchi", en: "chee" } },
  tsu: { like: { fr: "tsou", en: "ts in cats + oo" } },
  fu: { like: { fr: "un f soufflé entre les lèvres, sans les dents", en: "an f blown between the lips, no teeth" } },
  ra: { like: { fr: "entre r, l et d, d'un seul coup de langue", en: "between r, l and d, a single tap" } },
  wo: { note: ["Se prononce o. Ne sert presque qu'à marquer le complément d'objet.", "Pronounced o. Almost only used to mark the object.", "يُنطق o، ويُستعمل غالبًا لتحديد المفعول به."] },
  n: { note: ["Seul kana qui note une consonne sans voyelle. Sa prononciation s'adapte à la consonne suivante.", "The only kana for a consonant without a vowel. It adapts to the next consonant.", "الكانا الوحيدة التي تمثل صامتًا بلا صائت."] },
  ha: { alt: [["w a", "particule de thème は", "topic particle は"]] },
};

/** Exemples : hiragana (mots japonais) et katakana (emprunts). [mot, IPA, fr, en, ar, rōmaji] */
const HIRA_EX: Record<string, LetterOpts["ex"]> = {
  a: [["あめ", "ame", "pluie", "rain", "مطر", "ame"]],
  i: [["いぬ", "inɯ", "chien", "dog", "كلب", "inu"]],
  u: [["うみ", "ɯmi", "mer", "sea", "بحر", "umi"]],
  e: [["えき", "eki", "gare", "station", "محطة", "eki"]],
  o: [["おちゃ", "ot͡ɕa", "thé", "tea", "شاي", "ocha"]],
  ka: [["かさ", "kasa", "parapluie", "umbrella", "مظلة", "kasa"]],
  ki: [["き", "ki", "arbre", "tree", "شجرة", "ki"]],
  ku: [["くも", "kɯmo", "nuage", "cloud", "سحابة", "kumo"]],
  sa: [["さくら", "sakɯɾa", "cerisier", "cherry blossom", "زهر الكرز", "sakura"]],
  shi: [["しお", "ɕio", "sel", "salt", "ملح", "shio"]],
  su: [["すし", "sɯɕi", "sushi", "sushi", "سوشي", "sushi"]],
  ta: [["たまご", "tamaɡo", "œuf", "egg", "بيضة", "tamago"]],
  chi: [["ちず", "t͡ɕizɯ", "carte", "map", "خريطة", "chizu"]],
  tsu: [["つき", "t͡sɯki", "lune", "moon", "قمر", "tsuki"]],
  te: [["て", "te", "main", "hand", "يد", "te"]],
  na: [["なつ", "nat͡sɯ", "été", "summer", "صيف", "natsu"]],
  ni: [["にく", "ɲikɯ", "viande", "meat", "لحم", "niku"]],
  ne: [["ねこ", "neko", "chat", "cat", "قطة", "neko"]],
  ha: [["はな", "hana", "fleur", "flower", "زهرة", "hana"]],
  hi: [["ひ", "çi", "feu", "fire", "نار", "hi"]],
  fu: [["ふね", "ɸɯne", "bateau", "ship", "سفينة", "fune"]],
  ma: [["まど", "mado", "fenêtre", "window", "نافذة", "mado"]],
  mi: [["みず", "mizɯ", "eau", "water", "ماء", "mizu"]],
  ya: [["やま", "jama", "montagne", "mountain", "جبل", "yama"]],
  yu: [["ゆき", "jɯki", "neige", "snow", "ثلج", "yuki"]],
  yo: [["よる", "joɾɯ", "nuit", "night", "ليل", "yoru"]],
  ra: [["そら", "soɾa", "ciel", "sky", "سماء", "sora"]],
  ri: [["りんご", "ɾiŋɡo", "pomme", "apple", "تفاحة", "ringo"]],
  wa: [["わたし", "ɰataɕi", "je, moi", "I, me", "أنا", "watashi"]],
  n: [["ほん", "hoɴ", "livre", "book", "كتاب", "hon"]],
};
const KATA_EX: Record<string, LetterOpts["ex"]> = {
  a: [["アイス", "aisɯ", "glace", "ice cream", "مثلجات", "aisu"]],
  ka: [["カメラ", "kameɾa", "appareil photo", "camera", "كاميرا", "kamera"]],
  ko: [["コーヒー", "koːçiː", "café", "coffee", "قهوة", "kōhī"]],
  su: [["スープ", "sɯːpɯ", "soupe", "soup", "حساء", "sūpu"]],
  te: [["テレビ", "teɾebi", "télévision", "television", "تلفاز", "terebi"]],
  to: [["トマト", "tomato", "tomate", "tomato", "طماطم", "tomato"]],
  ha: [["ハンバーガー", "hambaːɡaː", "hamburger", "hamburger", "برغر", "hanbāgā"]],
  ra: [["ラジオ", "ɾad͡ʑio", "radio", "radio", "راديو", "rajio"]],
  n: [["パン", "paɴ", "pain", "bread", "خبز", "pan"]],
};

function kanaLetters(script: "hira" | "kana", ex: Record<string, LetterOpts["ex"]>) {
  return Object.entries(SOUNDS).map(([id, sound]) => L(`${script}:${id}`, sound, { ...NOTES[id], ex: ex[id] ?? [] }));
}

export default lang({
  id: "ja",
  iso639_3: "jpn",
  name: { fr: "Japonais", en: "Japanese", ar: "اليابانية" },
  endonym: "日本語",
  scripts: ["hira", "kana"],
  variants: [{ id: "ja-JP", region: "JP", name: { fr: "Japon", en: "Japan", ar: "اليابان" }, default: true }],
  speakersM: 125,
  intro: {
    fr: "Le japonais combine trois écritures. Tongo présente les deux syllabaires, hiragana et katakana, qui notent exactement les mêmes sons. Les kanji, d'origine chinoise, sont prévus pour la V2.",
    en: "Japanese combines three scripts. Tongo covers the two syllabaries, hiragana and katakana, which spell exactly the same sounds. Kanji, of Chinese origin, are planned for V2.",
    ar: "تجمع اليابانية بين ثلاث كتابات. يعرض تونغو المقطعيتين هيراغانا وكاتاكانا اللتين تمثلان الأصوات نفسها، أما الكانجي فمؤجلة إلى الإصدار الثاني.",
  },
  letters: [...kanaLetters("hira", HIRA_EX), ...kanaLetters("kana", KATA_EX)],
});
