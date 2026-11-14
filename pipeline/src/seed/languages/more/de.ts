import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "de", iso639_3: "deu", scriptId: "latn",
  name: { fr: "Allemand", en: "German", ar: "الألمانية" }, endonym: "Deutsch", speakersM: 135,
  variants: one("de-DE", "DE", "Allemagne", "Germany", "ألمانيا"),
  intro: {
    fr: "L'allemand s'écrit de façon régulière avec l'alphabet latin, trois voyelles à tréma (ä, ö, ü) et le ß. Tous les noms communs prennent une majuscule.",
    en: "German is spelled regularly with the Latin alphabet, three umlaut vowels (ä, ö, ü) and ß. Every noun is capitalised.",
    ar: "تُكتب الألمانية بانتظام بالأبجدية اللاتينية مع ثلاثة صوائت بنقطتين والحرف ß. وتبدأ كل الأسماء بحرف كبير.",
  },
  rows: table(`
a|a|v||a|Apfel|apfəl|pomme|apple|تفاحة
b|b|c||b|Baum|baum|arbre|tree|شجرة
c|c|c||k||||||Rare seul ; ch se prononce comme un souffle (ich, Bach).|Rare on its own; ch is a breathy sound (ich, Bach).
d|d|c||d|Dach|dax|toit|roof|سقف
e|e|v||e|See|zeː|lac|lake|بحيرة|Se réduit souvent à un e muet en fin de mot.|Often reduced to a schwa at the end of a word.
f|f|c||f|Fisch|fɪʃ|poisson|fish|سمكة
g|g|c||ɡ|Garten|ɡaʁtən|jardin|garden|حديقة
h|h|c||h|Haus|haus|maison|house|بيت|Muet après une voyelle, qu'il allonge.|Silent after a vowel, which it lengthens.
i|i|v||i|Igel|iːɡəl|hérisson|hedgehog|قنفذ
j|j|c||j|ja|jaː|oui|yes|نعم
k|k|c||k|Katze|kat͡sə|chat|cat|قطة
l|l|c||l|Licht|lɪçt|lumière|light|ضوء
m|m|c||m|Mond|moːnt|lune|moon|قمر
n|n|c||n|Nacht|naxt|nuit|night|ليل
o|o|v||o|Ohr|oːɐ|oreille|ear|أذن
p|p|c||p|Papier|papiːɐ|papier|paper|ورق
q|q|c||k|Quelle|kvɛlə|source|spring|نبع|Toujours suivi de u, prononcé kv.|Always followed by u, read kv.
r|r|c||ʁ|Rose|ʁoːzə|rose|rose|وردة
s|s|c||z|Sonne|zɔnə|soleil|sun|شمس|Se prononce ch devant p et t en début de mot (Stein).|Sounds like sh before p and t at the start of a word (Stein).
t|t|c||t|Tag|taːk|jour|day|يوم
u|u|v||u|Uhr|uːɐ|horloge|clock|ساعة
v|v|c||f|Vogel|foːɡəl|oiseau|bird|طائر
w|w|c||v|Wasser|vasɐ|eau|water|ماء
x|x|c||k s
y|y|v||y
z|z|c||t͡s|Zeit|t͡sait|temps|time|وقت
ä|a-diaeresis|v||ɛ|Mädchen|mɛːtçən|fille|girl|فتاة
ö|o-diaeresis|v||ø|schön|ʃøːn|beau|beautiful|جميل
ü|u-diaeresis|v||y|Tür|tyːɐ|porte|door|باب
ß|sharp-s|c||s|Straße|ʃtʁaːsə|rue|street|شارع|Un s dur, qui suit une voyelle longue.|A hard s, after a long vowel.
`),
});
