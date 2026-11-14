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
  ga: "ɡ a", gi: "ɡ i", gu: "ɡ ɯ", ge: "ɡ e", go: "ɡ o",
  za: "z a", ji: "d͡ʑ i", zu: "z ɯ", ze: "z e", zo: "z o",
  da: "d a", di: "d͡ʑ i", du: "z ɯ", de: "d e", do: "d o",
  ba: "b a", bi: "b i", bu: "b ɯ", be: "b e", bo: "b o",
  pa: "p a", pi: "p i", pu: "p ɯ", pe: "p e", po: "p o",
  "small-a": "a", "small-i": "i", "small-u": "ɯ", "small-e": "e", "small-o": "o",
  "small-ya": "j a", "small-yu": "j ɯ", "small-yo": "j o", "small-wa": "ɰ a", "small-tsu": "",
  wi: "i", we: "e", iteration: "", "iteration-voiced": "",
};
/** Propres aux katakana. */
const KATA_SOUNDS: Record<string, string> = { vu: "b ɯ", "small-ka": "k a", "small-ke": "k e" };

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
  di: { note: ["Se prononce comme じ (ji). Rare.", "Pronounced like じ (ji). Rare.", "يُنطق مثل じ (ji). نادر."] },
  du: { note: ["Se prononce comme ず (zu). Rare.", "Pronounced like ず (zu). Rare.", "يُنطق مثل ず (zu). نادر."] },
  "small-ya": { note: ["S'accole à un kana en i pour former une seule syllabe : き + ゃ = きゃ (kya).", "Joins a kana ending in i to make one syllable: き + ゃ = きゃ (kya).", "يلتصق بكانا تنتهي بـ i لتكوين مقطع واحد."] },
  "small-yu": { note: ["S'accole à un kana en i : し + ゅ = しゅ (shu).", "Joins a kana ending in i: し + ゅ = しゅ (shu).", "يلتصق بكانا تنتهي بـ i."] },
  "small-yo": { note: ["S'accole à un kana en i : ち + ょ = ちょ (cho).", "Joins a kana ending in i: ち + ょ = ちょ (cho).", "يلتصق بكانا تنتهي بـ i."] },
  "small-tsu": { note: ["Ne se prononce pas seul : il double la consonne qui suit (きって, kitte).", "Not pronounced on its own: it doubles the next consonant (きって, kitte).", "لا يُنطق وحده بل يضاعف الصامت التالي."] },
  "small-a": { note: ["Sert surtout à noter des sons étrangers : ファ (fa).", "Mostly used for foreign sounds: ファ (fa).", "يُستعمل خاصة لكتابة الأصوات الأجنبية."] },
  wi: { note: ["Kana ancien, remplacé par い.", "Archaic kana, replaced by い.", "كانا قديمة حلت محلها い."] },
  we: { note: ["Kana ancien, remplacé par え.", "Archaic kana, replaced by え.", "كانا قديمة حلت محلها え."] },
  iteration: { note: ["Répète le kana précédent : こゝろ = こころ.", "Repeats the previous kana: こゝろ = こころ.", "يكرر الكانا السابقة."] },
  "iteration-voiced": { note: ["Répète le kana précédent en le voisant : いすゞ = いすず.", "Repeats the previous kana, voiced: いすゞ = いすず.", "يكرر الكانا السابقة مجهورة."] },
  vu: { note: ["Note le v des mots étrangers, prononcé le plus souvent b.", "Spells the v of foreign words, usually pronounced b.", "يكتب صوت v في الكلمات الأجنبية ويُنطق غالبًا b."] },
  "small-ka": { note: ["Se lit ka ou ga dans les noms de lieux et les compteurs : 三ヵ月.", "Read ka or ga in place names and counters: 三ヵ月.", "يُقرأ ka أو ga في أسماء الأماكن والعدادات."] },
  "small-ke": { note: ["Se lit ka, ga ou ke : 霞ヶ関 (Kasumigaseki).", "Read ka, ga or ke: 霞ヶ関 (Kasumigaseki).", "يُقرأ ka أو ga أو ke."] },
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
  ga: [["がっこう", "ɡakkoː", "école", "school", "مدرسة", "gakkō"]],
  ji: [["じかん", "d͡ʑikaɴ", "temps, heure", "time", "وقت", "jikan"]],
  da: [["だいがく", "daiɡakɯ", "université", "university", "جامعة", "daigaku"]],
  ba: [["ばら", "baɾa", "rose", "rose", "وردة", "bara"]],
  pa: [["ぱん", "paɴ", "pain", "bread", "خبز", "pan"]],
  "small-tsu": [["きって", "kitte", "timbre", "stamp", "طابع بريدي", "kitte"]],
  "small-ya": [["きゃく", "kʲakɯ", "client", "guest", "ضيف", "kyaku"]],
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
  pa: [["パン", "paɴ", "pain", "bread", "خبز", "pan"]],
  ba: [["バス", "basɯ", "bus", "bus", "حافلة", "basu"]],
  "small-a": [["ファン", "ɸaɴ", "fan, admirateur", "fan", "معجب", "fan"]],
  vu: [["ヴァイオリン", "baioɾiɴ", "violon", "violin", "كمان", "vaiorin"]],
};

function kanaLetters(script: "hira" | "kana", ex: Record<string, LetterOpts["ex"]>) {
  const sounds = script === "kana" ? { ...SOUNDS, ...KATA_SOUNDS } : SOUNDS;
  return Object.entries(sounds).map(([id, sound]) => L(`${script}:${id}`, sound, { ...NOTES[id], ex: ex[id] ?? [] }));
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
