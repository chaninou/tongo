import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "he", iso639_3: "heb", scriptId: "hebr",
  name: { fr: "Hébreu", en: "Hebrew", ar: "العبرية" }, endonym: "עברית", speakersM: 9,
  variants: one("he-IL", "IL", "Israël", "Israel", "إسرائيل"),
  intro: {
    fr: "L'hébreu s'écrit de droite à gauche avec un abjad de 22 lettres, dont cinq ont une forme spéciale en fin de mot. Les voyelles sont le plus souvent omises ; elles peuvent être notées par des points (niqqud) dans les livres pour enfants.",
    en: "Hebrew is written right to left in a 22-letter abjad, five of which have a special word-final form. Vowels are usually left out; they can be shown with dots (niqqud) in children's books.",
    ar: "تُكتب العبرية من اليمين إلى اليسار بأبجد من 22 حرفًا، لخمسة منها شكل خاص في آخر الكلمة. تُحذف الصوائت غالبًا.",
  },
  script: {
    name: { fr: "Hébreu", en: "Hebrew", ar: "العبرية" }, endonym: "אלפבית עברי", type: "abjad", direction: "rtl",
    intro: {
      fr: "Un abjad carré, issu de l'araméen. Les lettres ne se lient pas entre elles, mais כ מ נ פ צ changent de forme en fin de mot.",
      en: "A square abjad derived from Aramaic. Letters do not join, but כ מ נ פ צ change shape at the end of a word.",
      ar: "أبجد مربع مشتق من الآرامية. لا تتصل الحروف، لكن خمسة منها يتغير شكلها في آخر الكلمة.",
    },
    sample: "א ב ש ת", font: "Noto Sans Hebrew",
    groups: [
      { id: "letters", name: { fr: "Lettres", en: "Letters", ar: "الحروف" } },
      { id: "final", name: { fr: "Formes finales", en: "Final forms", ar: "الأشكال النهائية" } },
    ],
  },
  rows: table(`
# letters
א|alef|c|ʾ|ʔ|אבא|ʔaba|papa|dad|أب|Souvent muet ; porte une voyelle.|Often silent; carries a vowel.
ב|bet|c|b|b|בית|bajit|maison|house|بيت|Se prononce v sans point (בֿ).|Pronounced v without its dot.
ג|gimel|c|g|ɡ|גמל|ɡamal|chameau|camel|جمل
ד|dalet|c|d|d|דג|daɡ|poisson|fish|سمكة
ה|he|c|h|h|הר|haʁ|montagne|mountain|جبل
ו|vav|c|v|v|ורד|veʁed|rose|rose|وردة|Sert aussi à écrire o et u.|Also used to write o and u.
ז|zayin|c|z|z|זהב|zahav|or|gold|ذهب
ח|het|c|ḥ|χ|חלב|χalav|lait|milk|حليب
ט|tet|c|ṭ|t|טלפון|telefon|téléphone|telephone|هاتف
י|yod|c|y|j|יד|jad|main|hand|يد|Sert aussi à écrire i.|Also used to write i.
כ|kaf|c|k|k|כלב|kelev|chien|dog|كلب|Se prononce kh (χ) sans point.|Pronounced kh without its dot.
ל|lamed|c|l|l|לחם|leχem|pain|bread|خبز
מ|mem|c|m|m|מים|majim|eau|water|ماء
נ|nun|c|n|n|נר|neʁ|bougie|candle|شمعة
ס|samekh|c|s|s|ספר|sefeʁ|livre|book|كتاب
ע|ayin|c|ʿ|ʔ|עין|ʔajin|œil|eye|عين|Souvent muet en hébreu moderne.|Often silent in modern Hebrew.
פ|pe|c|p|p|פה|pe|bouche|mouth|فم|Se prononce f sans point.|Pronounced f without its dot.
צ|tsadi|c|ts|t͡s|צב|t͡sav|tortue|turtle|سلحفاة
ק|qof|c|q|k|קפה|kafe|café|coffee|قهوة
ר|resh|c|r|ʁ|רגל|ʁeɡel|jambe|leg|ساق
ש|shin|c|sh|ʃ|שמש|ʃemeʃ|soleil|sun|شمس|Se prononce s avec un point à gauche (שׂ).|Pronounced s with a dot on the left.
ת|tav|c|t|t|תפוח|tapuaχ|pomme|apple|تفاحة
# final
ך|kaf-final|c|kh|χ|מלך|meleχ|roi|king|ملك|Forme de כ en fin de mot.|Word-final form of כ.
ם|mem-final|c|m|m|שלום|ʃalom|paix, bonjour|peace, hello|سلام|Forme de מ en fin de mot.|Word-final form of מ.
ן|nun-final|c|n|n|גן|ɡan|jardin|garden|حديقة|Forme de נ en fin de mot.|Word-final form of נ.
ף|pe-final|c|f|f|אף|ʔaf|nez|nose|أنف|Forme de פ en fin de mot.|Word-final form of פ.
ץ|tsadi-final|c|ts|t͡s|עץ|ʔet͡s|arbre|tree|شجرة|Forme de צ en fin de mot.|Word-final form of צ.
`),
});
