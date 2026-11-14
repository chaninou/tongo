import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "th", iso639_3: "tha", scriptId: "thai",
  name: { fr: "Thaï", en: "Thai", ar: "التايلاندية" }, endonym: "ภาษาไทย", speakersM: 60,
  variants: one("th-TH", "TH", "Thaïlande", "Thailand", "تايلاند"),
  intro: {
    fr: "Le thaï est une langue à cinq tons, écrite sans espace entre les mots. Les 44 consonnes se répartissent en trois classes (haute, moyenne, basse) qui, avec les marques de ton, déterminent la mélodie de la syllabe. Plusieurs consonnes notent le même son.",
    en: "Thai has five tones and is written without spaces between words. Its 44 consonants fall into three classes (high, mid, low) which, with the tone marks, set the melody of each syllable. Several consonants share the same sound.",
    ar: "التايلاندية لغة بخمس نغمات، تُكتب دون فراغات بين الكلمات. تنقسم صوامتها الأربعة والأربعون إلى ثلاث فئات تحدد مع علامات النغمة لحن المقطع.",
  },
  phonemes: [
    ["t͡ɕʰ", "tc-aspirated", "consonant", "tch aspiré (palatal)", "aspirated alveolo-palatal affricate"],
    ["tʰ", "t-aspirated", "consonant", "t aspiré", "aspirated t"],
    ["pʰ", "p-aspirated", "consonant", "p aspiré", "aspirated p"],
    ["kʰ", "k-aspirated", "consonant", "k aspiré", "aspirated k"],
    ["ɯː", "u-unrounded-long", "vowel", "voyelle fermée postérieure non arrondie longue", "long close back unrounded vowel"],
    ["ɛː", "epsilon-long", "vowel", "è long", "long open-mid front vowel"],
    ["eː", "e-long", "vowel", "é long", "long e"],
    ["oː", "o-long", "vowel", "o long", "long o"],
  ],
  script: {
    name: { fr: "Thaï", en: "Thai", ar: "التايلاندية" }, endonym: "อักษรไทย", type: "abugida", direction: "ltr",
    intro: {
      fr: "Un abugida d'origine indienne. Les voyelles se placent avant, après, au-dessus ou au-dessous de la consonne, et des petits signes au-dessus notent le ton.",
      en: "An abugida of Indian origin. Vowels go before, after, above or below the consonant, and small marks above show the tone.",
      ar: "أبوغيدا ذات أصل هندي. توضع الصوائت قبل الصامت أو بعده أو فوقه أو تحته، وتدل علامات صغيرة فوقه على النغمة.",
    },
    sample: "ก ข ค ง", font: "Noto Sans Thai",
    groups: [
      { id: "consonants", name: { fr: "Consonnes", en: "Consonants", ar: "الصوامت" } },
      { id: "vowels", name: { fr: "Signes vocaliques", en: "Vowel signs", ar: "العلامات الصوتية" } },
      { id: "tones", name: { fr: "Marques de ton", en: "Tone marks", ar: "علامات النغمة" } },
      { id: "marks", name: { fr: "Autres signes", en: "Other marks", ar: "علامات أخرى" } },
    ],
  },
  rows: table(`
# consonants
ก|ko-kai|c|k|k|ไก่|kàj|poulet|chicken|دجاجة
ข|kho-khai|c|kh|kʰ|ไข่|kʰàj|œuf|egg|بيضة
ฃ|kho-khuat|c|kh|kʰ|||||Lettre obsolète.|Obsolete letter.
ค|kho-khwai|c|kh|kʰ|ควาย|kʰwaːj|buffle|buffalo|جاموس
ฅ|kho-khon|c|kh|kʰ|||||Lettre obsolète.|Obsolete letter.
ฆ|kho-rakhang|c|kh|kʰ|ระฆัง|ráʔkʰaŋ|cloche|bell|جرس
ง|ngo-ngu|c|ng|ŋ|งู|ŋuː|serpent|snake|ثعبان
จ|cho-chan|c|ch|t͡ɕ|จาน|t͡ɕaːn|assiette|plate|صحن
ฉ|cho-ching|c|ch|t͡ɕʰ|ฉิ่ง|t͡ɕʰìŋ|cymbales|cymbals|صنج
ช|cho-chang|c|ch|t͡ɕʰ|ช้าง|t͡ɕʰáːŋ|éléphant|elephant|فيل
ซ|so-so|c|s|s|โซ่|sôː|chaîne|chain|سلسلة
ฌ|cho-choe|c|ch|t͡ɕʰ
ญ|yo-ying|c|y|j|ผู้หญิง|pʰûːjǐŋ|femme|woman|امرأة|Se prononce n en fin de syllabe.|Pronounced n at the end of a syllable.
ฎ|do-chada|c|d|d
ฏ|to-patak|c|t|t
ฐ|tho-than|c|th|tʰ
ฑ|tho-montho|c|th|tʰ|||||Parfois prononcé d.|Sometimes pronounced d.
ฒ|tho-phuthao|c|th|tʰ
ณ|no-nen|c|n|n
ด|do-dek|c|d|d|เด็ก|dèk|enfant|child|طفل|Se prononce t en fin de syllabe.|Pronounced t at the end of a syllable.
ต|to-tao|c|t|t|เต่า|tàw|tortue|turtle|سلحفاة
ถ|tho-thung|c|th|tʰ|ถุง|tʰǔŋ|sac|bag|كيس
ท|tho-thahan|c|th|tʰ|ทหาร|tʰáʔhǎːn|soldat|soldier|جندي
ธ|tho-thong|c|th|tʰ|ธง|tʰoŋ|drapeau|flag|علم
น|no-nu|c|n|n|หนู|nǔː|souris|mouse|فأر
บ|bo-baimai|c|b|b|ใบไม้|bajmáːj|feuille|leaf|ورقة|Se prononce p en fin de syllabe.|Pronounced p at the end of a syllable.
ป|po-pla|c|p|p|ปลา|plaː|poisson|fish|سمكة
ผ|pho-phueng|c|ph|pʰ|ผึ้ง|pʰɯ̂ŋ|abeille|bee|نحلة
ฝ|fo-fa|c|f|f|ฝา|fǎː|couvercle|lid|غطاء
พ|pho-phan|c|ph|pʰ|พาน|pʰaːn|plateau à offrandes|offering tray|صينية القرابين
ฟ|fo-fan|c|f|f|ฟัน|fan|dent|tooth|سن
ภ|pho-samphao|c|ph|pʰ|สำเภา|sǎmpʰaw|jonque|junk (ship)|سفينة شراعية
ม|mo-ma|c|m|m|ม้า|máː|cheval|horse|حصان
ย|yo-yak|c|y|j|ยักษ์|ják|géant|giant|عملاق
ร|ro-ruea|c|r|r|เรือ|rɯa|bateau|boat|قارب|Souvent prononcé l à l'oral.|Often pronounced l in casual speech.
ฤ|rue|v|rue|r ɯ|||||Voyelle syllabique, surtout dans des mots d'origine sanskrite.|Syllabic vowel, mostly in Sanskrit loanwords.
ล|lo-ling|c|l|l|ลิง|liŋ|singe|monkey|قرد
ฦ|lue|v|lue|l ɯ|||||Très rare.|Very rare.
ว|wo-waen|c|w|w|แหวน|wɛ̌ːn|bague|ring|خاتم
ศ|so-sala|c|s|s|ศาลา|sǎːlaː|pavillon|pavilion|جناح
ษ|so-ruesi|c|s|s|ฤๅษี|rɯːsǐː|ermite|hermit|ناسك
ส|so-suea|c|s|s|เสือ|sɯ̌a|tigre|tiger|نمر
ห|ho-hip|c|h|h|หีบ|hìːp|coffre|chest|صندوق
ฬ|lo-chula|c|l|l|จุฬา|t͡ɕùlaː|cerf-volant|kite|طائرة ورقية
อ|o-ang|c|ʔ|ʔ|อ่าง|ʔàːŋ|bassine|basin|حوض|Coup de glotte ; sert aussi de support aux voyelles.|Glottal stop; also a seat for vowels.
ฮ|ho-nokhuk|c|h|h|นกฮูก|nókhûːk|hibou|owl|بومة
# vowels
ะ|sara-a|vs|a|a
ั|mai-han-akat|vs|a|a
า|sara-aa|vs|ā|aː
ๅ|lakkhangyao|vs|ā|aː|||||Allonge ฤ et ฦ. Très rare.|Lengthens ฤ and ฦ. Very rare.
ำ|sara-am|vs|am|a m
ิ|sara-i|vs|i|i
ี|sara-ii|vs|ī|iː
ึ|sara-ue|vs|ue|ɯ
ื|sara-uee|vs|ūe|ɯː
ุ|sara-u|vs|u|u
ู|sara-uu|vs|ū|uː
เ|sara-e|vs|e|eː|||||S'écrit avant la consonne.|Written before the consonant.
แ|sara-ae|vs|ae|ɛː|||||S'écrit avant la consonne.|Written before the consonant.
โ|sara-o|vs|o|oː|||||S'écrit avant la consonne.|Written before the consonant.
ใ|sara-ai-maimuan|vs|ai|a j
ไ|sara-ai-maimalai|vs|ai|a j
# tones
่|mai-ek|d||-|||||Mai ek : premier marqueur de ton.|Mai ek: first tone mark.
้|mai-tho|d||-|||||Mai tho : deuxième marqueur de ton.|Mai tho: second tone mark.
๊|mai-tri|d||-|||||Mai tri : ton haut, avec les consonnes moyennes.|Mai tri: high tone, with mid-class consonants.
๋|mai-chattawa|d||-|||||Mai chattawa : ton montant, avec les consonnes moyennes.|Mai chattawa: rising tone, with mid-class consonants.
# marks
็|maitaikhu|d||-|||||Raccourcit la voyelle.|Shortens the vowel.
์|thanthakhat|d||-|||||Rend muette la consonne qu'il surmonte.|Silences the consonant it sits on.
ํ|nikhahit|d||-|||||Nasalisation, surtout en pali et sanskrit.|Nasalisation, mostly in Pali and Sanskrit.
ฺ|phinthu|d||-|||||Retire la voyelle (pali, sanskrit).|Removes the vowel (Pali, Sanskrit).
๎|yamakkan|d||-|||||Signe ancien, très rare.|Archaic sign, very rare.
ฯ|paiyannoi|x||-|||||Marque une abréviation.|Marks an abbreviation.
ๆ|maiyamok|x||-|||||Répète le mot précédent.|Repeats the previous word.
`),
});
