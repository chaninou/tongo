import { table } from "../../table.ts";
import { INDIC_PHONEMES } from "./brahmic.ts";
import { define, one } from "./define.ts";

export default define({
  id: "bn", iso639_3: "ben", scriptId: "beng",
  name: { fr: "Bengali", en: "Bengali", ar: "البنغالية" }, endonym: "বাংলা", speakersM: 270,
  variants: one("bn-BD", "BD", "Bangladesh", "Bangladesh", "بنغلاديش"),
  intro: {
    fr: "Le bengali s'écrit avec l'alphasyllabaire bengali, cousin du devanagari. La voyelle portée par chaque consonne y est un o ouvert (ɔ), et plusieurs lettres se prononcent de la même façon.",
    en: "Bengali is written in the Bengali abugida, a cousin of Devanagari. The vowel carried by each consonant is an open o (ɔ), and several letters sound the same.",
    ar: "تُكتب البنغالية بالأبوغيدا البنغالية، القريبة من الديفاناغاري. الصائت الملازم لكل صامت هو o مفتوحة.",
  },
  phonemes: INDIC_PHONEMES,
  script: {
    name: { fr: "Bengali", en: "Bengali", ar: "البنغالية" }, endonym: "বাংলা লিপি", type: "abugida", direction: "ltr",
    intro: {
      fr: "Comme le devanagari, les lettres pendent sous une barre horizontale. Il sert au bengali et à l'assamais.",
      en: "Like Devanagari, letters hang from a horizontal bar. It is used for Bengali and Assamese.",
      ar: "كالديفاناغاري، تتدلى الحروف من خط أفقي. تُكتب بها البنغالية والآسامية.",
    },
    sample: "ক খ গ অ", font: "Noto Sans Bengali",
    groups: [
      { id: "vowels", name: { fr: "Voyelles", en: "Vowels", ar: "الصوائت" } },
      { id: "consonants", name: { fr: "Consonnes", en: "Consonants", ar: "الصوامت" } },
      { id: "signs", name: { fr: "Signes vocaliques", en: "Vowel signs", ar: "العلامات الصوتية" } },
      { id: "marks", name: { fr: "Autres signes", en: "Other marks", ar: "علامات أخرى" } },
    ],
  },
  rows: table(`
# vowels
অ|o|v|ô|ɔ|অজগর|ɔd͡ʒɡɔɾ|python|python|ثعبان
আ|a|v|a|a|আম|am|mangue|mango|مانجو
ই|i|v|i|i|ইঁদুর|ĩd̪uɾ|souris|mouse|فأر
ঈ|ii|v|ī|i|ঈগল|iɡol|aigle|eagle|نسر
উ|u|v|u|u|উট|uʈ|chameau|camel|جمل
ঊ|uu|v|ū|u
ঋ|ri|v|ṛ|ɾ i|ঋষি|ɾiʃi|sage|sage|حكيم
ৠ|rii|v|ṝ|ɾ i|||||Très rare (sanskrit).|Very rare (Sanskrit).
ঌ|li|v|ḷ|l i|||||Très rare (sanskrit).|Very rare (Sanskrit).
ৡ|lii|v|ḹ|l i|||||Très rare (sanskrit).|Very rare (Sanskrit).
এ|e|v|e|e|একতারা|ekt̪aɾa|ektara (instrument)|ektara (instrument)|إكتارا
ঐ|oi|v|oi|oi̯|ঐরাবত|oi̯ɾabɔt̪|éléphant mythique|mythical elephant|فيل أسطوري
ও|o-closed|v|o|o|ওল|ol|igname|yam|يام
ঔ|ou|v|ou|ou̯|ঔষধ|ou̯ʃɔd̪ʱ|médicament|medicine|دواء
# consonants
ক|ka|c|k|k ɔ|কলা|kɔla|banane|banana|موز
খ|kha|c|kh|kʰ ɔ|খরগোশ|kʰɔɾɡoʃ|lapin|rabbit|أرنب
গ|ga|c|g|ɡ ɔ|গরু|ɡoɾu|vache|cow|بقرة
ঘ|gha|c|gh|ɡʱ ɔ|ঘর|ɡʱɔɾ|maison|house|بيت
ঙ|nga|c|ṅ|ŋ ɔ
চ|ca|c|c|t͡ʃ ɔ|চা|t͡ʃa|thé|tea|شاي
ছ|cha|c|ch|t͡ʃʰ ɔ|ছাতা|t͡ʃʰat̪a|parapluie|umbrella|مظلة
জ|ja|c|j|d͡ʒ ɔ|জল|d͡ʒɔl|eau|water|ماء
ঝ|jha|c|jh|d͡ʒʱ ɔ
ঞ|nya|c|ñ|n ɔ
ট|tta|c|ṭ|ʈ ɔ|টিয়া|ʈia|perruche|parakeet|ببغاء
ঠ|ttha|c|ṭh|ʈʰ ɔ
ড|dda|c|ḍ|ɖ ɔ|ডাব|ɖab|noix de coco verte|green coconut|جوز هند أخضر
ঢ|ddha|c|ḍh|ɖʱ ɔ|ঢোল|ɖʱol|tambour|drum|طبل
ণ|nna|c|ṇ|n ɔ|||||Se prononce comme ন.|Pronounced like ন.
ত|ta|c|t|t̪ ɔ|তাল|t̪al|palmier|palm|نخلة
ৎ|khanda-ta|c|t|t̪|||||T final, sans voyelle.|A final t, with no vowel.
থ|tha|c|th|t̪ʰ ɔ
দ|da|c|d|d̪ ɔ|দই|d̪oi̯|yaourt|yogurt|لبن
ধ|dha|c|dh|d̪ʱ ɔ|ধান|d̪ʱan|riz (plante)|paddy|أرز
ন|na|c|n|n ɔ|নদী|nod̪i|rivière|river|نهر
প|pa|c|p|p ɔ|পাখি|pakʰi|oiseau|bird|طائر
ফ|pha|c|ph|pʰ ɔ|ফল|pʰɔl|fruit|fruit|فاكهة
ব|ba|c|b|b ɔ|বই|boi̯|livre|book|كتاب
ভ|bha|c|bh|bʱ ɔ|ভালুক|bʱaluk|ours|bear|دب
ম|ma|c|m|m ɔ|মাছ|mat͡ʃʰ|poisson|fish|سمكة
য|ya|c|y|d͡ʒ ɔ|||||Se prononce dj ; avec un point (য়) il se prononce y.|Pronounced j; with a dot (য়) it is y.
র|ra|c|r|ɾ ɔ|রাত|ɾat̪|nuit|night|ليل
ল|la|c|l|l ɔ|লেবু|lebu|citron|lemon|ليمون
শ|sha|c|ś|ʃ ɔ|শাপলা|ʃapla|nénuphar|water lily|زنبق الماء
ষ|ssa|c|ṣ|ʃ ɔ|||||Se prononce comme শ.|Pronounced like শ.
স|sa|c|s|ʃ ɔ|সাপ|ʃap|serpent|snake|ثعبان|Se prononce ch, et s devant certaines consonnes.|Pronounced sh, and s before some consonants.
হ|ha|c|h|h ɔ|হাঁস|hãʃ|canard|duck|بطة
# signs
া|sign-a|vs|a|a
ি|sign-i|vs|i|i|||||S'écrit avant la consonne mais se prononce après.|Written before the consonant but said after it.
ী|sign-ii|vs|ī|i
ু|sign-u|vs|u|u
ূ|sign-uu|vs|ū|u
ৃ|sign-ri|vs|ṛ|ɾ i
ৄ|sign-rii|vs|ṝ|ɾ i|||||Très rare.|Very rare.
ৢ|sign-li|vs|ḷ|l i|||||Très rare.|Very rare.
ৣ|sign-lii|vs|ḹ|l i|||||Très rare.|Very rare.
ে|sign-e|vs|e|e|||||S'écrit avant la consonne.|Written before the consonant.
ৈ|sign-oi|vs|oi|oi̯
ো|sign-o|vs|o|o
ৌ|sign-ou|vs|ou|ou̯
# marks
্|hasanta|d||-|||||Hasanta : supprime la voyelle de la consonne.|Hasanta: removes the consonant's vowel.
ং|anusvara|d|ṃ|ŋ
ঃ|visarga|d|ḥ|h
ঁ|candrabindu|d|m̐|-|||||Nasalise la voyelle.|Nasalises the vowel.
়|nukta|d||-|||||Point qui modifie la consonne : ড় = ɽ, য় = y.|A dot that changes the consonant: ড় = ɽ, য় = y.
ঽ|avagraha|x||-|||||Très rare (sanskrit).|Very rare (Sanskrit).
ৗ|au-length|d||-|||||Seconde moitié du signe ৌ.|The second half of the ৌ sign.
৺|isshar|x||-|||||Symbole religieux (« Dieu »), devant un nom.|A religious symbol (“God”), before a name.
`),
});
