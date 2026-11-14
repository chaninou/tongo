import { table } from "../../table.ts";
import { INDIC_PHONEMES } from "./brahmic.ts";
import { define, one } from "./define.ts";

export default define({
  id: "hi", iso639_3: "hin", scriptId: "deva",
  name: { fr: "Hindi", en: "Hindi", ar: "الهندية" }, endonym: "हिन्दी", speakersM: 600,
  variants: one("hi-IN", "IN", "Inde", "India", "الهند"),
  intro: {
    fr: "Le hindi s'écrit en devanagari, un abugida : chaque consonne porte un a bref, qu'on change avec des signes vocaliques. Il distingue les consonnes aspirées (avec un souffle) et rétroflexes (langue recourbée).",
    en: "Hindi is written in Devanagari, an abugida: each consonant carries a short a, changed with vowel signs. It distinguishes aspirated consonants (with a puff of air) and retroflex ones (tongue curled back).",
    ar: "تُكتب الهندية بالديفاناغاري، وهي أبوغيدا: يحمل كل صامت صائتًا قصيرًا تغيره علامات صوتية. وتميز بين الصوامت النفسية والارتدادية.",
  },
  phonemes: INDIC_PHONEMES,
  script: {
    name: { fr: "Devanagari", en: "Devanagari", ar: "الديفاناغارية" }, endonym: "देवनागरी", type: "abugida", direction: "ltr",
    intro: {
      fr: "On reconnaît le devanagari à la barre horizontale qui relie le haut des lettres. Il sert au hindi, au marathi, au népalais et au sanskrit.",
      en: "Devanagari is recognisable by the horizontal bar joining the tops of the letters. It is used for Hindi, Marathi, Nepali and Sanskrit.",
      ar: "تُعرف الديفاناغاري بالخط الأفقي الذي يربط أعلى الحروف. تُكتب بها الهندية والمراثية والنيبالية والسنسكريتية.",
    },
    sample: "क कि की ॐ", font: "Noto Sans Devanagari",
    groups: [
      { id: "vowels", name: { fr: "Voyelles", en: "Vowels", ar: "الصوائت" } },
      { id: "consonants", name: { fr: "Consonnes", en: "Consonants", ar: "الصوامت" } },
      { id: "signs", name: { fr: "Signes vocaliques", en: "Vowel signs", ar: "العلامات الصوتية" } },
      { id: "marks", name: { fr: "Autres signes", en: "Other marks", ar: "علامات أخرى" } },
    ],
  },
  rows: table(`
# vowels
अ|a|v|a|ə|अनार|ənaːɾ|grenade|pomegranate|رمان
आ|aa|v|ā|aː|आम|aːm|mangue|mango|مانجو
इ|i|v|i|ɪ|इमली|ɪmliː|tamarin|tamarind|تمر هندي
ई|ii|v|ī|iː|ईख|iːkʰ|canne à sucre|sugarcane|قصب السكر
उ|u|v|u|ʊ|उल्लू|ʊlluː|hibou|owl|بومة
ऊ|uu|v|ū|uː|ऊन|uːn|laine|wool|صوف
ऋ|ri|v|ṛ|ɾ ɪ|ऋषि|ɾɪʃiː|sage|sage|حكيم
ऌ|li|v|ḷ|l ɪ|||||Très rare, surtout en sanskrit.|Very rare, mostly in Sanskrit.
ऍ|e-candra|v|ê|æ|||||Pour des mots anglais.|For English words.
ए|e|v|e|e|एक|eːk|un|one|واحد
ऐ|ai|v|ai|ɛ|ऐनक|ɛnək|lunettes|glasses|نظارة
ऑ|o-candra|v|ô|ɔ|ऑफ़िस|ɔfɪs|bureau|office|مكتب|Pour des mots anglais.|For English words.
ओ|o|v|o|o|ओस|oːs|rosée|dew|ندى
औ|au|v|au|ɔ|औरत|ɔɾət|femme|woman|امرأة
# consonants
क|ka|c|k|k ə|कमल|kəməl|lotus|lotus|لوتس
ख|kha|c|kh|kʰ ə|खरगोश|kʰəɾɡoːʃ|lapin|rabbit|أرنب
ग|ga|c|g|ɡ ə|गाय|ɡaːj|vache|cow|بقرة
घ|gha|c|gh|ɡʱ ə|घर|ɡʱəɾ|maison|house|بيت
ङ|nga|c|ṅ|ŋ ə
च|ca|c|c|t͡ʃ ə|चाय|t͡ʃaːj|thé|tea|شاي
छ|cha|c|ch|t͡ʃʰ ə|छाता|t͡ʃʰaːt̪aː|parapluie|umbrella|مظلة
ज|ja|c|j|d͡ʒ ə|जहाज़|d͡ʒəɦaːz|navire|ship|سفينة
झ|jha|c|jh|d͡ʒʱ ə|झंडा|d͡ʒʱəɳɖaː|drapeau|flag|علم
ञ|nya|c|ñ|ɲ ə
ट|tta|c|ṭ|ʈ ə|टमाटर|ʈəmaːʈəɾ|tomate|tomato|طماطم
ठ|ttha|c|ṭh|ʈʰ ə|ठंड|ʈʰəɳɖ|froid|cold|برد
ड|dda|c|ḍ|ɖ ə|डमरू|ɖəmruː|tambourin|small drum|طبلة
ढ|ddha|c|ḍh|ɖʱ ə|ढोल|ɖʱoːl|tambour|drum|طبل
ण|nna|c|ṇ|ɳ ə
त|ta|c|t|t̪ ə|तारा|t̪aːɾaː|étoile|star|نجمة
थ|tha|c|th|t̪ʰ ə|थाली|t̪ʰaːliː|plateau|plate|صينية
द|da|c|d|d̪ ə|दवा|d̪əʋaː|médicament|medicine|دواء
ध|dha|c|dh|d̪ʱ ə|धनुष|d̪ʱənʊʃ|arc|bow|قوس
न|na|c|n|n ə|नल|nəl|robinet|tap|صنبور
प|pa|c|p|p ə|पतंग|pət̪əŋɡ|cerf-volant|kite|طائرة ورقية
फ|pha|c|ph|pʰ ə|फल|pʰəl|fruit|fruit|فاكهة
ब|ba|c|b|b ə|बतख|bət̪əkʰ|canard|duck|بطة
भ|bha|c|bh|bʱ ə|भालू|bʱaːluː|ours|bear|دب
म|ma|c|m|m ə|मछली|mət͡ʃʰliː|poisson|fish|سمكة
य|ya|c|y|j ə|यात्रा|jaːt̪ɾaː|voyage|journey|رحلة
र|ra|c|r|ɾ ə|रथ|ɾət̪ʰ|char|chariot|عربة
ल|la|c|l|l ə|लड़का|ləɽkaː|garçon|boy|ولد
ळ|lla|c|ḷ|ɭ ə|||||Surtout en marathi.|Mostly in Marathi.
व|va|c|v|ʋ ə|वन|ʋən|forêt|forest|غابة
श|sha|c|ś|ʃ ə|शेर|ʃeːɾ|tigre, lion|tiger, lion|نمر
ष|ssa|c|ṣ|ʃ ə|षट्कोण|ʃəʈkoːɳ|hexagone|hexagon|سداسي|Se prononce comme श en hindi.|Pronounced like श in Hindi.
स|sa|c|s|s ə|सेब|seːb|pomme|apple|تفاحة
ह|ha|c|h|ɦ ə|हाथी|ɦaːt̪ʰiː|éléphant|elephant|فيل
# signs
ा|sign-aa|vs|ā|aː
ि|sign-i|vs|i|ɪ|||||S'écrit avant la consonne mais se prononce après.|Written before the consonant but said after it.
ी|sign-ii|vs|ī|iː
ु|sign-u|vs|u|ʊ
ू|sign-uu|vs|ū|uː
ृ|sign-ri|vs|ṛ|ɾ ɪ
ॅ|sign-e-candra|vs|ê|æ
े|sign-e|vs|e|e
ै|sign-ai|vs|ai|ɛ
ॉ|sign-o-candra|vs|ô|ɔ
ो|sign-o|vs|o|o
ौ|sign-au|vs|au|ɔ
# marks
्|virama|d||-|||||Virama : supprime le a de la consonne.|Virama: removes the consonant's a.
ं|anusvara|d|ṃ|n|||||Anusvara : nasalise ou ajoute un n.|Anusvara: adds a nasal sound.
ँ|candrabindu|d|m̐|-|||||Chandrabindu : nasalise la voyelle.|Chandrabindu: nasalises the vowel.
ः|visarga|d|ḥ|h|||||Visarga : un léger souffle, surtout en sanskrit.|Visarga: a light breath, mostly in Sanskrit.
़|nukta|d||-|||||Nukta : point qui crée de nouveaux sons (ज़ = z, फ़ = f).|Nukta: a dot that creates new sounds (ज़ = z, फ़ = f).
ऽ|avagraha|x||-|||||Avagraha : marque une voyelle élidée (sanskrit).|Avagraha: marks an elided vowel (Sanskrit).
ॐ|om|x|oṃ|o m|ॐ|oːm|om (syllabe sacrée)|om (sacred syllable)|أوم
`),
});
