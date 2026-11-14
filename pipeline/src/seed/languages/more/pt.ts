import { table } from "../../table.ts";
import { define, v } from "./define.ts";

export default define({
  id: "pt", iso639_3: "por", scriptId: "latn",
  name: { fr: "Portugais", en: "Portuguese", ar: "البرتغالية" }, endonym: "português", speakersM: 260,
  variants: [v("pt-BR", "BR", "Brésil", "Brazil", "البرازيل", true), v("pt-PT", "PT", "Portugal", "Portugal", "البرتغال")],
  intro: {
    fr: "Le portugais s'écrit en alphabet latin avec des accents et le tilde, qui marque les voyelles nasales (ã, õ). Le Brésil et le Portugal prononcent assez différemment, surtout le r, le s final et les voyelles non accentuées.",
    en: "Portuguese uses the Latin alphabet with accents and the tilde, which marks nasal vowels (ã, õ). Brazil and Portugal sound quite different, especially r, final s and unstressed vowels.",
    ar: "تُكتب البرتغالية بالأبجدية اللاتينية مع علامات منها التيلدا التي تدل على الصوائت الأنفية. يختلف النطق بين البرازيل والبرتغال خاصة في r وs الأخيرة.",
  },
  phonemes: [
    ["ɐ", "turned-a", "vowel", "voyelle centrale pré-ouverte", "near-open central vowel"],
    ["ɐ̃", "turned-a-nasal", "vowel", "voyelle nasale (ã portugais)", "nasal near-open central vowel"],
    ["õ", "o-nasal", "vowel", "voyelle nasale (õ portugais)", "nasal close-mid back vowel"],
  ],
  extra: {
    r: { variants: { "pt-PT": "ʁ" }, alt: [["ɾ", "entre deux voyelles ou après une consonne", "between vowels or after a consonant"]] },
    t: { alt: [["t͡ʃ", "devant i au Brésil", "before i in Brazil"]], ex: [["tia", "t͡ʃia", "tante", "aunt", "عمة"]] },
    d: { alt: [["d͡ʒ", "devant i au Brésil", "before i in Brazil"]], ex: [["dia", "d͡ʒia", "jour", "day", "يوم"]] },
    s: { alt: [["z", "entre deux voyelles", "between vowels"], ["ʃ", "en fin de syllabe au Portugal", "syllable-final in Portugal"]], ex: [["sol", "sɔw", "soleil", "sun", "شمس"]] },
    l: { alt: [["w", "en fin de syllabe au Brésil", "syllable-final in Brazil"]], ex: [["lua", "lua", "lune", "moon", "قمر"]] },
  },
  rows: table(`
a|a|v||a|casa|kaza|maison|house|بيت
b|b|c||b|boca|boka|bouche|mouth|فم
c|c|c||k|casa|kaza|maison|house|بيت|Se prononce s devant e et i.|Pronounced s before e and i.
d|d|c||d
e|e|v||e|mesa|meza|table|table|طاولة|Ouvert (è) ou fermé (é) selon le mot.|Open or closed depending on the word.
f|f|c||f|faca|faka|couteau|knife|سكين
g|g|c||ɡ|gato|ɡatu|chat|cat|قطة|Se prononce j devant e et i.|Pronounced like s in measure before e and i.
h|h|c||-|homem|ɔmẽj|homme|man|رجل|Toujours muet.|Always silent.
i|i|v||i|ilha|iʎa|île|island|جزيرة
j|j|c||ʒ|janela|ʒanɛla|fenêtre|window|نافذة
k|k|c||k
l|l|c||l
m|m|c||m|mão|mɐ̃w|main|hand|يد
n|n|c||n|noite|nojt͡ʃi|nuit|night|ليل
o|o|v||o|ovo|ovu|œuf|egg|بيضة|Se prononce souvent ou en fin de mot.|Often sounds like oo at the end of a word.
p|p|c||p|pão|pɐ̃w|pain|bread|خبز
q|q|c||k|queijo|kejʒu|fromage|cheese|جبن
r|r|c||h|rua|hua|rue|street|شارع|Au Brésil, un r en début de mot sonne comme un h aspiré.|In Brazil, a word-initial r sounds like an h.
s|s|c||s
t|t|c||t
u|u|v||u|uva|uva|raisin|grape|عنب
v|v|c||v|vaca|vaka|vache|cow|بقرة
w|w|c||w
x|x|c||ʃ|xícara|ʃikaɾa|tasse|cup|فنجان|Peut aussi se lire ks, z ou s.|Can also be read ks, z or s.
y|y|v||i
z|z|c||z|zero|zɛɾu|zéro|zero|صفر
á|a-acute|v||a|água|aɡwa|eau|water|ماء
à|a-grave|v||a
â|a-circumflex|v||ɐ|câmara|kɐmaɾa|chambre|chamber|غرفة
ã|a-tilde|v||ɐ̃|maçã|masɐ̃|pomme|apple|تفاحة
ç|c-cedilla|c||s|coração|koɾasɐ̃w|cœur|heart|قلب
é|e-acute|v||ɛ|café|kafɛ|café|coffee|قهوة
ê|e-circumflex|v||e|você|vose|vous, toi|you|أنت
í|i-acute|v||i
ó|o-acute|v||ɔ|avó|avɔ|grand-mère|grandmother|جدة
ò|o-grave|v||ɔ|||||Très rare, dans quelques contractions anciennes.|Very rare, in a few old contractions.
ô|o-circumflex|v||o|avô|avo|grand-père|grandfather|جد
õ|o-tilde|v||õ|limões|limõjs|citrons|lemons|ليمون
ú|u-acute|v||u
`),
});
