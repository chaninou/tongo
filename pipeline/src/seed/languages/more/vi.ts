import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "vi", iso639_3: "vie", scriptId: "latn",
  name: { fr: "Vietnamien", en: "Vietnamese", ar: "الفيتنامية" }, endonym: "Tiếng Việt", speakersM: 86,
  variants: one("vi-VN", "VN", "Viêt Nam (Hanoï)", "Vietnam (Hanoi)", "فيتنام (هانوي)"),
  intro: {
    fr: "Le vietnamien s'écrit en alphabet latin (quốc ngữ). C'est une langue à tons : la même syllabe change de sens selon la mélodie, notée par cinq signes au-dessus ou au-dessous des voyelles. La prononciation décrite ici est celle de Hanoï.",
    en: "Vietnamese is written in the Latin alphabet (quốc ngữ). It is a tonal language: the same syllable changes meaning with its melody, marked by five signs above or below the vowels. The pronunciation shown is that of Hanoi.",
    ar: "تُكتب الفيتنامية بالأبجدية اللاتينية. وهي لغة نغمية: يتغير معنى المقطع بتغير لحنه، وتُكتب النغمات بخمس علامات فوق الصوائت أو تحتها.",
  },
  phonemes: [
    ["ɓ", "b-implosive", "consonant", "occlusive bilabiale implosive", "bilabial implosive"],
    ["ɗ", "d-implosive", "consonant", "occlusive alvéolaire implosive", "alveolar implosive"],
    ["ɤ", "rams-horn", "vowel", "voyelle mi-fermée postérieure non arrondie", "close-mid back unrounded vowel"],
    ["˨˩", "tone-low-falling", "tone", "ton bas descendant", "low falling tone"],
    ["˧˥", "tone-rising", "tone", "ton montant", "rising tone"],
    ["˧˩˧", "tone-dipping", "tone", "ton descendant puis montant", "dipping tone"],
    ["˧ˀ˥", "tone-broken", "tone", "ton montant brisé (coup de glotte)", "broken rising tone"],
    ["˨˩ˀ", "tone-heavy", "tone", "ton bas lourd (coup de glotte)", "heavy low tone"],
  ],
  rows: table(`
# base
a|a|v||a|ba|ɓa|trois|three|ثلاثة
ă|a-breve|v||a|ăn|an|manger|to eat|يأكل|Un a bref.|A short a.
â|a-circumflex|v||ə|ấm|əm˧˥|chaud|warm|دافئ
b|b|c||ɓ|bò|ɓɔ˨˩|vache|cow|بقرة
c|c|c||k|cá|ka˧˥|poisson|fish|سمكة
d|d|c||z|da|za|peau|skin|جلد|Se prononce z à Hanoï, y dans le Sud.|Sounds like z in Hanoi, y in the South.
đ|d-stroke|c||ɗ|đi|ɗi|aller|to go|يذهب
e|e|v||ɛ|em|ɛm|petit frère ou sœur|younger sibling|الأخ الأصغر
ê|e-circumflex|v||e|đêm|ɗem|nuit|night|ليل
g|g|c||ɣ|gà|ɣa˨˩|poulet|chicken|دجاجة
h|h|c||h|hoa|hwa|fleur|flower|زهرة
i|i|v||i
k|k|c||k
l|l|c||l
m|m|c||m|mẹ|mɛ˨˩ˀ|mère|mother|أم
n|n|c||n|nước|nɨək˧˥|eau|water|ماء
o|o|v||ɔ
ô|o-circumflex|v||o|cô|ko|tante, mademoiselle|aunt, miss|عمة
ơ|o-horn|v||ɤ|cơm|kɤm|riz cuit|cooked rice|أرز مطبوخ
p|p|c||p
q|q|c||k|||||Toujours suivi de u : qu se lit kw.|Always followed by u: qu is read kw.
r|r|c||z|||||Se prononce z à Hanoï.|Pronounced z in Hanoi.
s|s|c||s
t|t|c||t
u|u|v||u
ư|u-horn|v||ɨ|những|ɲɨŋ˧ˀ˥|des, les (pluriel)|(plural marker)|علامة الجمع
v|v|c||v
x|x|c||s|xe|sɛ|véhicule|vehicle|مركبة
y|y|v||i
# tones
̀|tone-grave|d||˨˩|bà|ɓa˨˩|grand-mère|grandmother|جدة|Ton huyền : bas et descendant.|Huyền tone: low and falling.
́|tone-acute|d||˧˥|má|ma˧˥|maman, joue|mom, cheek|أم، خد|Ton sắc : montant.|Sắc tone: rising.
̉|tone-hook|d||˧˩˧|mả|ma˧˩˧|tombe|grave|قبر|Ton hỏi : descend puis remonte.|Hỏi tone: dips then rises.
̃|tone-tilde|d||˧ˀ˥|mã|ma˧ˀ˥|cheval (mot savant)|horse (literary)|حصان|Ton ngã : montant, brisé par un coup de glotte.|Ngã tone: rising, broken by a glottal catch.
̣|tone-dot|d||˨˩ˀ|mạ|ma˨˩ˀ|jeune plant de riz|rice seedling|شتلة أرز|Ton nặng : bas, court et serré.|Nặng tone: low, short and tight.
`.replace(/\\u([0-9a-f]{4})/g, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))),
});
