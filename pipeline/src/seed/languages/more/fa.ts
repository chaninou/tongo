import type { Grapheme } from "@tongo/model";
import { table } from "../../table.ts";
import { define, one } from "./define.ts";

const ZWJ = "‍";
const dual = (char: string) => ({ isolated: char, initial: char + ZWJ, medial: ZWJ + char + ZWJ, final: ZWJ + char });
/** Lettres propres au persan, ajoutées à l'écriture arabe. */
const NEW: Grapheme[] = [
  { id: "pe", char: "پ", name: "pe", latin: "p", kind: "consonant", group: "letters", forms: dual("پ") },
  { id: "che", char: "چ", name: "che", latin: "č", kind: "consonant", group: "letters", forms: dual("چ") },
  { id: "zhe", char: "ژ", name: "že", latin: "ž", kind: "consonant", group: "letters", forms: { isolated: "ژ", final: ZWJ + "ژ" } },
  { id: "keheh", char: "ک", name: "kâf", latin: "k", kind: "consonant", group: "letters", forms: dual("ک") },
  { id: "gaf", char: "گ", name: "gâf", latin: "g", kind: "consonant", group: "letters", forms: dual("گ") },
  { id: "farsi-yeh", char: "ی", name: "ye", latin: "y / i", kind: "consonant", group: "letters", forms: dual("ی") },
];

export default define({
  id: "fa", iso639_3: "pes", scriptId: "arab",
  name: { fr: "Persan", en: "Persian", ar: "الفارسية" }, endonym: "فارسی", speakersM: 80,
  variants: one("fa-IR", "IR", "Iran", "Iran", "إيران"),
  intro: {
    fr: "Le persan s'écrit avec l'alphabet arabe, complété de quatre lettres (پ چ ژ گ). Plusieurs lettres arabes s'y prononcent de la même façon : ث س ص valent toutes s, et ذ ز ض ظ valent z.",
    en: "Persian is written with the Arabic alphabet plus four letters (پ چ ژ گ). Several Arabic letters sound alike in it: ث س ص are all s, and ذ ز ض ظ are all z.",
    ar: "تُكتب الفارسية بالحروف العربية مع أربعة حروف إضافية (پ چ ژ گ). وتُنطق عدة حروف عربية فيها بالطريقة نفسها.",
  },
  phonemes: [["ɢ", "g-uvular", "consonant", "occlusive uvulaire sonore", "voiced uvular plosive"]],
  graphemes: NEW,
  rows: table(`
ا|alif|v|â|ɒ|آب|ɒb|eau|water|ماء
آ|alif-madda|v|â|ɒ|آسمان|ɒsemɒn|ciel|sky|سماء
ب|ba|c|b|b|باران|bɒɾɒn|pluie|rain|مطر
پ|pe|c|p|p|پدر|pedæɾ|père|father|أب
ت|ta|c|t|t|توت|tut|mûre|mulberry|توت
ث|tha|c|s|s|||||Se prononce s en persan.|Pronounced s in Persian.
ج|jim|c|j|d͡ʒ|جنگل|d͡ʒænɡæl|forêt|forest|غابة
چ|che|c|č|t͡ʃ|چای|t͡ʃɒj|thé|tea|شاي
ح|ha|c|h|h|||||Se prononce comme un h simple.|Pronounced as a plain h.
خ|kha|c|x|χ|خانه|χɒne|maison|house|بيت
د|dal|c|d|d|دست|dæst|main|hand|يد
ذ|dhal|c|z|z|||||Se prononce z en persan.|Pronounced z in Persian.
ر|ra|c|r|ɾ|روز|ɾuz|jour|day|يوم
ز|zay|c|z|z|زمین|zæmin|terre|earth|أرض
ژ|zhe|c|ž|ʒ|ژاله|ʒɒle|rosée|dew|ندى
س|sin|c|s|s|سیب|sib|pomme|apple|تفاحة
ش|shin|c|š|ʃ|شب|ʃæb|nuit|night|ليل
ص|sad|c|s|s|صبح|sobh|matin|morning|صباح
ض|dad|c|z|z
ط|tah|c|t|t
ظ|zah|c|z|z
ع|ayn|c|ʿ|ʔ|||||Coup de glotte, souvent à peine audible.|A glottal stop, often barely heard.
غ|ghayn|c|gh|ɢ
ف|fa|c|f|f|فیل|fil|éléphant|elephant|فيل
ق|qaf|c|q|ɢ|قند|ɢænd|sucre en morceaux|sugar cube|قند|Se prononce comme غ en persan.|Pronounced like غ in Persian.
ک|keheh|c|k|k|کتاب|ketɒb|livre|book|كتاب|Forme persane du kâf, sans petit trait intérieur.|The Persian form of kâf.
گ|gaf|c|g|ɡ|گل|ɡol|fleur|flower|زهرة
ل|lam|c|l|l|لب|læb|lèvre|lip|شفة
م|mim|c|m|m|ماه|mɒh|lune, mois|moon, month|قمر، شهر
ن|nun|c|n|n|نان|nɒn|pain|bread|خبز
و|waw|c|v|v|||||Sert aussi à écrire u et o.|Also writes u and o.
ه|heh|c|h|h|||||En fin de mot, note souvent la voyelle e.|At the end of a word it often writes the vowel e.
ی|farsi-yeh|c|y|j|||||Sert aussi à écrire i.|Also writes i.
ء|hamza|x|ʾ|ʔ
أ|alif-hamza-above|c|ʾ|ʔ
ؤ|waw-hamza|c|ʾ|ʔ
ئ|ya-hamza|c|ʾ|ʔ
ة|ta-marbuta|c|e|e|||||Seulement dans quelques mots d'origine arabe.|Only in a few words of Arabic origin.
`),
});
