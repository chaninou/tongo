import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "tr", iso639_3: "tur", scriptId: "latn",
  name: { fr: "Turc", en: "Turkish", ar: "التركية" }, endonym: "Türkçe", speakersM: 90,
  variants: one("tr-TR", "TR", "Turquie", "Turkey", "تركيا"),
  intro: {
    fr: "Depuis 1928, le turc s'écrit en alphabet latin, de façon presque parfaitement phonétique : une lettre, un son. Attention au i sans point (ı) et au ğ, qui allonge la voyelle précédente.",
    en: "Since 1928 Turkish has been written in the Latin alphabet, almost perfectly phonetically: one letter, one sound. Watch out for dotless ı and for ğ, which lengthens the previous vowel.",
    ar: "تُكتب التركية منذ 1928 بالأبجدية اللاتينية بشكل صوتي تقريبًا: حرف واحد لصوت واحد. انتبه إلى ı بلا نقطة وإلى ğ الذي يمد الصائت السابق.",
  },
  rows: table(`
a|a|v||a|ana|ana|mère|mother|أم
b|b|c||b|balık|balɯk|poisson|fish|سمكة
c|c|c||d͡ʒ|cami|d͡ʒami|mosquée|mosque|مسجد|Se prononce dj.|Pronounced like j in jam.
ç|c-cedilla|c||t͡ʃ|çay|t͡ʃaj|thé|tea|شاي
d|d|c||d|deniz|deniz|mer|sea|بحر
e|e|v||e|ev|ev|maison|house|بيت
f|f|c||f
g|g|c||ɡ|göz|ɡøz|œil|eye|عين
ğ|g-breve|c||-|dağ|daː|montagne|mountain|جبل|Ne se prononce pas : il allonge la voyelle qui précède.|Not pronounced: it lengthens the previous vowel.
h|h|c||h|hava|hava|air, temps|air, weather|هواء
ı|dotless-i|v||ɯ|ılık|ɯlɯk|tiède|lukewarm|فاتر|Un i prononcé sans étirer les lèvres. Sa majuscule est I.|An i said without spreading the lips. Its capital is I.
i|i|v||i|iki|iki|deux|two|اثنان|Sa majuscule garde le point : İ.|Its capital keeps the dot: İ.
j|j|c||ʒ|jeton|ʒeton|jeton|token|قطعة نقدية
k|k|c||k|kedi|kedi|chat|cat|قطة
l|l|c||l
m|m|c||m|masa|masa|table|table|طاولة
n|n|c||n
o|o|v||o|okul|okul|école|school|مدرسة
ö|o-diaeresis|v||ø|ödev|ødev|devoir|homework|واجب
p|p|c||p
r|r|c||ɾ
s|s|c||s|su|su|eau|water|ماء
ş|s-cedilla|c||ʃ|şeker|ʃeceɾ|sucre|sugar|سكر
t|t|c||t
u|u|v||u|uçak|ut͡ʃak|avion|plane|طائرة
ü|u-diaeresis|v||y|üzüm|yzym|raisin|grape|عنب
v|v|c||v
y|y|c||j|yol|jol|route|road|طريق
z|z|c||z
`),
});
