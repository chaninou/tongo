import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "sw", iso639_3: "swa", scriptId: "latn",
  name: { fr: "Swahili", en: "Swahili", ar: "السواحيلية" }, endonym: "Kiswahili", speakersM: 80,
  variants: one("sw-TZ", "TZ", "Tanzanie", "Tanzania", "تنزانيا"),
  intro: {
    fr: "Langue de communication de l'Afrique de l'Est, le swahili s'écrit en alphabet latin de façon très régulière. Les cinq voyelles se prononcent toujours pareil, et quelques sons s'écrivent avec deux lettres (ch, sh, ng', ny).",
    en: "The lingua franca of East Africa, Swahili is written in the Latin alphabet very regularly. Its five vowels always sound the same, and a few sounds use two letters (ch, sh, ng', ny).",
    ar: "السواحيلية لغة التواصل في شرق إفريقيا، تُكتب بالأبجدية اللاتينية بانتظام كبير. صوائتها الخمسة ثابتة النطق، وبعض الأصوات تُكتب بحرفين.",
  },
  phonemes: [
    ["ɓ", "b-implosive", "consonant", "occlusive bilabiale implosive", "bilabial implosive"],
    ["ɗ", "d-implosive", "consonant", "occlusive alvéolaire implosive", "alveolar implosive"],
    ["ɠ", "g-implosive", "consonant", "occlusive vélaire implosive", "velar implosive"],
    ["ʄ", "j-implosive", "consonant", "occlusive palatale implosive", "palatal implosive"],
  ],
  rows: table(`
a|a|v||a|asante|asante|merci|thank you|شكرًا
b|b|c||ɓ|baba|ɓaɓa|père|father|أب
ch|ch|c||t͡ʃ|chai|t͡ʃai|thé|tea|شاي|Deux lettres pour un seul son.|Two letters for one sound.
d|d|c||ɗ|dada|ɗaɗa|sœur|sister|أخت
e|e|v||ɛ|embe|ɛmɓɛ|mangue|mango|مانجو
f|f|c||f|fimbo|fimɓɔ|bâton|stick|عصا
g|g|c||ɠ|gari|ɠaɾi|voiture|car|سيارة
h|h|c||h|habari|haɓaɾi|nouvelles|news|أخبار
i|i|v||i|iko|ikɔ|il y a|there is|يوجد
j|j|c||ʄ|jua|ʄua|soleil|sun|شمس
k|k|c||k|kitabu|kitaɓu|livre|book|كتاب
l|l|c||l|limau|limau|citron|lemon|ليمون
m|m|c||m|maji|maʄi|eau|water|ماء
n|n|c||n|nyumba|ɲumɓa|maison|house|بيت|Dans ny, se prononce gn.|In ny it sounds like ny in canyon.
o|o|v||ɔ|ondoa|ɔndɔa|enlever|remove|يزيل
p|p|c||p|paka|paka|chat|cat|قطة
r|r|c||ɾ|rafiki|ɾafiki|ami|friend|صديق
s|s|c||s|simba|simɓa|lion|lion|أسد
t|t|c||t|tano|tanɔ|cinq|five|خمسة
u|u|v||u|ua|ua|fleur|flower|زهرة
v|v|c||v|viatu|viatu|chaussures|shoes|أحذية
w|w|c||w|watoto|watɔtɔ|enfants|children|أطفال
y|y|c||j|yai|jai|œuf|egg|بيضة
z|z|c||z|zawadi|zawaɗi|cadeau|gift|هدية
`),
});
