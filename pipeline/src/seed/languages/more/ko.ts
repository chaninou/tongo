import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "ko", iso639_3: "kor", scriptId: "hang",
  name: { fr: "Coréen", en: "Korean", ar: "الكورية" }, endonym: "한국어", speakersM: 80,
  variants: one("ko-KR", "KR", "Corée du Sud", "South Korea", "كوريا الجنوبية"),
  intro: {
    fr: "Le coréen s'écrit en hangeul : 24 lettres de base qu'on assemble en blocs, un bloc par syllabe (ㅎ + ㅏ + ㄴ = 한). Les consonnes existent en trois versions : douce, aspirée et tendue (doublée).",
    en: "Korean is written in Hangul: 24 basic letters assembled into blocks, one block per syllable (ㅎ + ㅏ + ㄴ = 한). Consonants come in three versions: plain, aspirated and tense (doubled).",
    ar: "تُكتب الكورية بالهانغول: 24 حرفًا أساسيًا تُجمع في كتل، كتلة لكل مقطع. وللصوامت ثلاث صيغ: عادية ونفسية ومشددة.",
  },
  phonemes: [
    ["k͈", "k-tense", "consonant", "k tendu", "tense k"],
    ["t͈", "t-tense", "consonant", "t tendu", "tense t"],
    ["p͈", "p-tense", "consonant", "p tendu", "tense p"],
    ["s͈", "s-tense", "consonant", "s tendu", "tense s"],
    ["t͡ɕ͈", "tc-tense", "consonant", "tch tendu", "tense ch"],
    ["t͡ɕʰ", "tc-aspirated", "consonant", "tch aspiré (palatal)", "aspirated alveolo-palatal affricate"],
    ["tʰ", "t-aspirated", "consonant", "t aspiré", "aspirated t"],
    ["pʰ", "p-aspirated", "consonant", "p aspiré", "aspirated p"],
    ["kʰ", "k-aspirated", "consonant", "k aspiré", "aspirated k"],
  ],
  script: {
    name: { fr: "Hangeul", en: "Hangul", ar: "الهانغول" }, endonym: "한글", type: "featural", direction: "ltr",
    intro: {
      fr: "Créé en 1443 sous le roi Sejong pour être facile à apprendre. La forme des consonnes imite la position de la bouche, et les lettres s'empilent en blocs syllabiques.",
      en: "Created in 1443 under King Sejong to be easy to learn. Consonant shapes mimic the position of the mouth, and letters stack into syllable blocks.",
      ar: "أُنشئ عام 1443 في عهد الملك سيجونغ ليكون سهل التعلم. تحاكي أشكال الصوامت وضع الفم، وتُجمع الحروف في كتل مقطعية.",
    },
    sample: "ㄱ ㅏ 가 한", font: "Noto Sans KR",
    groups: [
      { id: "consonants", name: { fr: "Consonnes", en: "Consonants", ar: "الصوامت" } },
      { id: "tense", name: { fr: "Consonnes tendues (doubles)", en: "Tense (double) consonants", ar: "الصوامت المشددة" } },
      { id: "vowels", name: { fr: "Voyelles", en: "Vowels", ar: "الصوائت" } },
      { id: "compound", name: { fr: "Voyelles composées", en: "Compound vowels", ar: "الصوائت المركبة" } },
    ],
  },
  rows: table(`
# consonants
ㄱ|giyeok|c|g/k|k|가방|kabaŋ|sac|bag|حقيبة|Se prononce g entre deux voyelles.|Pronounced g between vowels.
ㄴ|nieun|c|n|n|나무|namu|arbre|tree|شجرة
ㄷ|digeut|c|d/t|t|다리|taɾi|jambe, pont|leg, bridge|ساق، جسر
ㄹ|rieul|c|r/l|ɾ|라면|ɾamjʌn|ramen|ramen|رامن|Se prononce l en fin de syllabe.|Pronounced l at the end of a syllable.
ㅁ|mieum|c|m|m|물|mul|eau|water|ماء
ㅂ|bieup|c|b/p|p|바다|pada|mer|sea|بحر
ㅅ|siot|c|s|s|사과|sakwa|pomme|apple|تفاحة
ㅇ|ieung|c|-/ng|-|아이|ai|enfant|child|طفل|Muet en début de syllabe ; se prononce ng à la fin.|Silent at the start of a syllable; ng at the end.
ㅈ|jieut|c|j|t͡ɕ|자전거|t͡ɕad͡ʑʌnɡʌ|vélo|bicycle|دراجة
ㅊ|chieut|c|ch|t͡ɕʰ|차|t͡ɕʰa|voiture, thé|car, tea|سيارة، شاي
ㅋ|kieuk|c|k|kʰ|코|kʰo|nez|nose|أنف
ㅌ|tieut|c|t|tʰ|토끼|tʰok͈i|lapin|rabbit|أرنب
ㅍ|pieup|c|p|pʰ|포도|pʰodo|raisin|grape|عنب
ㅎ|hieut|c|h|h|하늘|hanɯl|ciel|sky|سماء
# tense
ㄲ|ssang-giyeok|c|kk|k͈|꽃|k͈ot|fleur|flower|زهرة
ㄸ|ssang-digeut|c|tt|t͈|딸기|t͈alɡi|fraise|strawberry|فراولة
ㅃ|ssang-bieup|c|pp|p͈|빵|p͈aŋ|pain|bread|خبز
ㅆ|ssang-siot|c|ss|s͈|쌀|s͈al|riz|rice|أرز
ㅉ|ssang-jieut|c|jj|t͡ɕ͈|짜다|t͡ɕ͈ada|salé|salty|مالح
# vowels
ㅏ|a|v|a|a|아빠|ap͈a|papa|dad|بابا
ㅑ|ya|v|ya|j a|야구|jaɡu|baseball|baseball|بيسبول
ㅓ|eo|v|eo|ʌ|어머니|ʌmʌni|mère|mother|أم
ㅕ|yeo|v|yeo|j ʌ|여우|jʌu|renard|fox|ثعلب
ㅗ|o|v|o|o|오이|oi|concombre|cucumber|خيار
ㅛ|yo|v|yo|j o|요리|joɾi|cuisine|cooking|طبخ
ㅜ|u|v|u|u|우유|uju|lait|milk|حليب
ㅠ|yu|v|yu|j u
ㅡ|eu|v|eu|ɯ|그림|kɯɾim|dessin|picture|رسم
ㅣ|i|v|i|i|이|i|dent|tooth|سن
# compound
ㅐ|ae|v|ae|ɛ|개|kɛ|chien|dog|كلب
ㅒ|yae|v|yae|j ɛ
ㅔ|e|v|e|e|게|ke|crabe|crab|سلطعون
ㅖ|ye|v|ye|j e|시계|ɕiɡje|horloge|clock|ساعة
ㅘ|wa|v|wa|w a|과자|kwad͡ʑa|biscuit|snack|بسكويت
ㅙ|wae|v|wae|w ɛ
ㅚ|oe|v|oe|w e|||||Autrefois un eu fermé (ø).|Formerly a rounded front vowel (ø).
ㅝ|wo|v|wo|w ʌ
ㅞ|we|v|we|w e
ㅟ|wi|v|wi|w i|귀|kwi|oreille|ear|أذن
ㅢ|ui|v|ui|ɰ i|의사|ɰisa|médecin|doctor|طبيب
`),
});
