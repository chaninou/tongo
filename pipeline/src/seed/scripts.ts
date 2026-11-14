/**
 * Écritures du contenu de départ. Brouillon (confidence « draft ») tant que l'import CLDR
 * (TS-004) n'a pas confirmé la liste des caractères.
 */
import type { Grapheme, Script } from "@tongo/model";

const ZWJ = "‍";
const draft = { confidence: "draft" as const, sources: [] };

/* ───────────── Latin ───────────── */
const LATIN_VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);
const latinBase: Grapheme[] = "abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({
  id: c,
  char: c,
  upper: c.toUpperCase(),
  kind: LATIN_VOWELS.has(c) ? "vowel" : "consonant",
  group: "base",
}));
const latinExtra: [id: string, char: string, kind: "vowel" | "consonant"][] = [
  ["a-grave", "à", "vowel"], ["a-circumflex", "â", "vowel"], ["a-acute", "á", "vowel"],
  ["c-cedilla", "ç", "consonant"],
  ["e-acute", "é", "vowel"], ["e-grave", "è", "vowel"], ["e-circumflex", "ê", "vowel"], ["e-diaeresis", "ë", "vowel"],
  ["i-circumflex", "î", "vowel"], ["i-diaeresis", "ï", "vowel"], ["i-acute", "í", "vowel"],
  ["n-tilde", "ñ", "consonant"],
  ["o-circumflex", "ô", "vowel"], ["o-acute", "ó", "vowel"], ["oe", "œ", "vowel"],
  ["u-grave", "ù", "vowel"], ["u-circumflex", "û", "vowel"], ["u-diaeresis", "ü", "vowel"], ["u-acute", "ú", "vowel"],
  ["y-diaeresis", "ÿ", "vowel"],
];
const latin: Script = {
  id: "latn",
  name: { fr: "Latin", en: "Latin", ar: "اللاتينية" },
  endonym: "Latina",
  type: "alphabet",
  direction: "ltr",
  cased: true,
  intro: {
    fr: "L'écriture la plus utilisée au monde. Chaque lettre note une consonne ou une voyelle, mais la même lettre se prononce différemment d'une langue à l'autre.",
    en: "The most widely used script in the world. Each letter stands for a consonant or a vowel, but the same letter sounds different from one language to another.",
    ar: "أكثر أنظمة الكتابة انتشارًا في العالم. يمثل كل حرف صامتًا أو صائتًا، لكن الحرف نفسه يُنطق بشكل مختلف من لغة إلى أخرى.",
  },
  sample: "a ç ñ é",
  font: "Noto Sans",
  groups: [
    { id: "base", name: { fr: "Lettres de base", en: "Basic letters", ar: "الحروف الأساسية" } },
    { id: "accents", name: { fr: "Lettres accentuées", en: "Accented letters", ar: "الحروف ذات العلامات" } },
  ],
  graphemes: [
    ...latinBase,
    ...latinExtra.map(([id, char, kind]) => ({ id, char, upper: char.toUpperCase(), kind, group: "accents" })),
  ],
  ...draft,
};

/* ───────────── Cyrillique ───────────── */
// [id, minuscule, nature, translittération]
const CYR: [string, string, Grapheme["kind"], string][] = [
  ["a", "а", "vowel", "a"], ["be", "б", "consonant", "b"], ["ve", "в", "consonant", "v"], ["ge", "г", "consonant", "g"],
  ["de", "д", "consonant", "d"], ["ye", "е", "vowel", "e"], ["yo", "ё", "vowel", "ë"], ["zhe", "ж", "consonant", "ž"],
  ["ze", "з", "consonant", "z"], ["i", "и", "vowel", "i"], ["i-short", "й", "consonant", "j"], ["ka", "к", "consonant", "k"],
  ["el", "л", "consonant", "l"], ["em", "м", "consonant", "m"], ["en", "н", "consonant", "n"], ["o", "о", "vowel", "o"],
  ["pe", "п", "consonant", "p"], ["er", "р", "consonant", "r"], ["es", "с", "consonant", "s"], ["te", "т", "consonant", "t"],
  ["u", "у", "vowel", "u"], ["ef", "ф", "consonant", "f"], ["kha", "х", "consonant", "h"], ["tse", "ц", "consonant", "c"],
  ["che", "ч", "consonant", "č"], ["sha", "ш", "consonant", "š"], ["shcha", "щ", "consonant", "šč"],
  ["hard-sign", "ъ", "sign", "ʺ"], ["yery", "ы", "vowel", "y"], ["soft-sign", "ь", "sign", "ʹ"],
  ["e", "э", "vowel", "è"], ["yu", "ю", "vowel", "ju"], ["ya", "я", "vowel", "ja"],
];
const cyrillic: Script = {
  id: "cyrl",
  name: { fr: "Cyrillique", en: "Cyrillic", ar: "السيريلية" },
  endonym: "Кириллица",
  type: "alphabet",
  direction: "ltr",
  cased: true,
  intro: {
    fr: "Créé au IXᵉ siècle à partir du grec, il sert à écrire le russe, l'ukrainien, le serbe ou le kazakh. Certaines lettres ressemblent au latin mais se prononcent autrement : р se dit r, н se dit n.",
    en: "Created in the 9th century from Greek, it is used for Russian, Ukrainian, Serbian and Kazakh. Some letters look Latin but sound different: р is r, н is n.",
    ar: "أُنشئت في القرن التاسع انطلاقًا من اليونانية، وتُكتب بها الروسية والأوكرانية والصربية والكازاخية. بعض حروفها تشبه اللاتينية لكنها تُنطق بشكل آخر.",
  },
  sample: "а б ж ы",
  font: "Noto Sans",
  groups: [
    { id: "vowels", name: { fr: "Voyelles", en: "Vowels", ar: "الصوائت" } },
    { id: "consonants", name: { fr: "Consonnes", en: "Consonants", ar: "الصوامت" } },
    { id: "signs", name: { fr: "Signes", en: "Signs", ar: "علامات" } },
  ],
  graphemes: CYR.map(([id, char, kind, latin]) => ({
    id, char, upper: char.toUpperCase(), kind, latin,
    group: kind === "vowel" ? "vowels" : kind === "sign" ? "signs" : "consonants",
  })),
  ...draft,
};

/* ───────────── Arabe ───────────── */
// [id, lettre, nom, translittération, se lie à la lettre suivante]
const AR: [string, string, string, string, boolean][] = [
  ["alif", "ا", "alif", "ā", false], ["ba", "ب", "bāʾ", "b", true], ["ta", "ت", "tāʾ", "t", true],
  ["tha", "ث", "thāʾ", "th", true], ["jim", "ج", "jīm", "j", true], ["ha", "ح", "ḥāʾ", "ḥ", true],
  ["kha", "خ", "khāʾ", "kh", true], ["dal", "د", "dāl", "d", false], ["dhal", "ذ", "dhāl", "dh", false],
  ["ra", "ر", "rāʾ", "r", false], ["zay", "ز", "zāy", "z", false], ["sin", "س", "sīn", "s", true],
  ["shin", "ش", "shīn", "sh", true], ["sad", "ص", "ṣād", "ṣ", true], ["dad", "ض", "ḍād", "ḍ", true],
  ["tah", "ط", "ṭāʾ", "ṭ", true], ["zah", "ظ", "ẓāʾ", "ẓ", true], ["ayn", "ع", "ʿayn", "ʿ", true],
  ["ghayn", "غ", "ghayn", "gh", true], ["fa", "ف", "fāʾ", "f", true], ["qaf", "ق", "qāf", "q", true],
  ["kaf", "ك", "kāf", "k", true], ["lam", "ل", "lām", "l", true], ["mim", "م", "mīm", "m", true],
  ["nun", "ن", "nūn", "n", true], ["heh", "ه", "hāʾ", "h", true], ["waw", "و", "wāw", "w / ū", false],
  ["ya", "ي", "yāʾ", "y / ī", true],
];
const arabic: Script = {
  id: "arab",
  name: { fr: "Arabe", en: "Arabic", ar: "العربية" },
  endonym: "الأبجدية العربية",
  type: "abjad",
  direction: "rtl",
  intro: {
    fr: "Un abjad : on écrit surtout les consonnes, les voyelles brèves sont le plus souvent omises. L'écriture va de droite à gauche et les lettres se lient : chacune change de forme selon sa place dans le mot.",
    en: "An abjad: mostly consonants are written and short vowels are usually left out. It runs right to left and letters join up, each changing shape with its position in the word.",
    ar: "أبجدية تُكتب فيها الصوامت أساسًا وتُحذف الحركات القصيرة غالبًا. تُكتب من اليمين إلى اليسار وتتصل الحروف، فيتغير شكل كل حرف حسب موضعه في الكلمة.",
  },
  sample: "ا ب ش ع",
  font: "Noto Sans Arabic",
  groups: [{ id: "letters", name: { fr: "Lettres", en: "Letters", ar: "الحروف" } }],
  graphemes: AR.map(([id, char, name, latin, joins]) => ({
    id, char, name, latin, kind: "consonant" as const, group: "letters",
    forms: joins
      ? { isolated: char, initial: char + ZWJ, medial: ZWJ + char + ZWJ, final: ZWJ + char }
      : { isolated: char, final: ZWJ + char },
  })),
  ...draft,
};

/* ───────────── Kana ───────────── */
// Romanisation Hepburn, hiragana, katakana, ligne du gojūon
const KANA: [string, string, string, string][] = [
  ["a", "あ", "ア", "a"], ["i", "い", "イ", "a"], ["u", "う", "ウ", "a"], ["e", "え", "エ", "a"], ["o", "お", "オ", "a"],
  ["ka", "か", "カ", "k"], ["ki", "き", "キ", "k"], ["ku", "く", "ク", "k"], ["ke", "け", "ケ", "k"], ["ko", "こ", "コ", "k"],
  ["sa", "さ", "サ", "s"], ["shi", "し", "シ", "s"], ["su", "す", "ス", "s"], ["se", "せ", "セ", "s"], ["so", "そ", "ソ", "s"],
  ["ta", "た", "タ", "t"], ["chi", "ち", "チ", "t"], ["tsu", "つ", "ツ", "t"], ["te", "て", "テ", "t"], ["to", "と", "ト", "t"],
  ["na", "な", "ナ", "n"], ["ni", "に", "ニ", "n"], ["nu", "ぬ", "ヌ", "n"], ["ne", "ね", "ネ", "n"], ["no", "の", "ノ", "n"],
  ["ha", "は", "ハ", "h"], ["hi", "ひ", "ヒ", "h"], ["fu", "ふ", "フ", "h"], ["he", "へ", "ヘ", "h"], ["ho", "ほ", "ホ", "h"],
  ["ma", "ま", "マ", "m"], ["mi", "み", "ミ", "m"], ["mu", "む", "ム", "m"], ["me", "め", "メ", "m"], ["mo", "も", "モ", "m"],
  ["ya", "や", "ヤ", "y"], ["yu", "ゆ", "ユ", "y"], ["yo", "よ", "ヨ", "y"],
  ["ra", "ら", "ラ", "r"], ["ri", "り", "リ", "r"], ["ru", "る", "ル", "r"], ["re", "れ", "レ", "r"], ["ro", "ろ", "ロ", "r"],
  ["wa", "わ", "ワ", "w"], ["wo", "を", "ヲ", "w"], ["n", "ん", "ン", "n-final"],
];
const KANA_ROWS: [string, string][] = [
  ["a", "∅"], ["k", "k"], ["s", "s"], ["t", "t"], ["n", "n"], ["h", "h"], ["m", "m"], ["y", "y"], ["r", "r"], ["w", "w"], ["n-final", "ん"],
];
const kanaRows = KANA_ROWS.map(([id, label]) => ({
  id,
  name: id === "a"
    ? { fr: "Voyelles", en: "Vowels", ar: "الصوائت" }
    : id === "n-final"
      ? { fr: "N final", en: "Final N", ar: "النون الختامية" }
      : { fr: `Ligne ${label.toUpperCase()}`, en: `${label.toUpperCase()} row`, ar: `صف ${label.toUpperCase()}` },
}));

function kanaScript(id: "hira" | "kana"): Script {
  const isHira = id === "hira";
  const other = isHira ? "kana" : "hira";
  return {
    id,
    name: isHira ? { fr: "Hiragana", en: "Hiragana", ar: "هيراغانا" } : { fr: "Katakana", en: "Katakana", ar: "كاتاكانا" },
    endonym: isHira ? "ひらがな" : "カタカナ",
    type: "syllabary",
    direction: "ltr",
    intro: isHira
      ? {
          fr: "Un syllabaire : chaque signe note une syllabe entière (ka, shi, tsu…). Les hiragana écrivent les mots japonais et les terminaisons grammaticales.",
          en: "A syllabary: each sign stands for a whole syllable (ka, shi, tsu…). Hiragana write native Japanese words and grammatical endings.",
          ar: "مقطعية: كل رمز يمثل مقطعًا كاملًا. تُكتب بالهيراغانا الكلمات اليابانية الأصيلة واللواحق النحوية.",
        }
      : {
          fr: "Le même inventaire de syllabes que les hiragana, avec des formes plus anguleuses. Les katakana écrivent surtout les mots empruntés et les noms étrangers.",
          en: "The same set of syllables as hiragana, with sharper shapes. Katakana mostly write loanwords and foreign names.",
          ar: "المقاطع نفسها التي في الهيراغانا بأشكال أكثر زاوية. تُكتب بالكاتاكانا الكلمات الدخيلة والأسماء الأجنبية خاصة.",
        },
    sample: isHira ? "あ か し つ" : "ア カ シ ツ",
    font: "Noto Sans JP",
    groups: kanaRows,
    graphemes: KANA.map(([romaji, h, k, row]) => ({
      id: romaji,
      char: isHira ? h : k,
      latin: romaji,
      kind: romaji === "n" ? ("consonant" as const) : ("syllable" as const),
      group: row,
      counterpart: `${other}:${romaji}`,
    })),
    ...draft,
  };
}

export const SCRIPTS: Script[] = [latin, cyrillic, arabic, kanaScript("hira"), kanaScript("kana")];
