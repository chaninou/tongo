import { table } from "../../table.ts";
import { INDIC_PHONEMES } from "./brahmic.ts";
import { define, one } from "./define.ts";

export default define({
  id: "ta", iso639_3: "tam", scriptId: "taml",
  name: { fr: "Tamoul", en: "Tamil", ar: "التاميلية" }, endonym: "தமிழ்", speakersM: 85,
  variants: one("ta-IN", "IN", "Inde (Tamil Nadu)", "India (Tamil Nadu)", "الهند (تاميل نادو)"),
  intro: {
    fr: "Le tamoul, langue dravidienne, a un alphabet plus compact que le hindi : pas de lettres aspirées, une seule lettre pour k et g. Le son dépend de la position : க se prononce k en début de mot et g entre deux voyelles.",
    en: "Tamil, a Dravidian language, has a more compact script than Hindi: no aspirated letters, one letter for k and g. The sound depends on position: க is k at the start of a word and g between vowels.",
    ar: "التاميلية لغة درافيدية أبجديتها أكثر اختصارًا من الهندية: لا حروف نفسية، وحرف واحد لـ k وg يتغير نطقه حسب موضعه.",
  },
  phonemes: INDIC_PHONEMES,
  script: {
    name: { fr: "Tamoul", en: "Tamil", ar: "التاميلية" }, endonym: "தமிழ் எழுத்து", type: "abugida", direction: "ltr",
    intro: {
      fr: "Une écriture arrondie, sans barre horizontale. Un point (pulli) posé sur une consonne lui retire sa voyelle.",
      en: "A rounded script with no horizontal bar. A dot (pulli) on a consonant removes its vowel.",
      ar: "كتابة مستديرة دون خط أفقي. نقطة (بولي) فوق الصامت تحذف صائته.",
    },
    sample: "க ங ச அ", font: "Noto Sans Tamil",
    groups: [
      { id: "vowels", name: { fr: "Voyelles", en: "Vowels", ar: "الصوائت" } },
      { id: "consonants", name: { fr: "Consonnes", en: "Consonants", ar: "الصوامت" } },
      { id: "grantha", name: { fr: "Consonnes d'emprunt (grantha)", en: "Borrowed consonants (Grantha)", ar: "صوامت دخيلة" } },
      { id: "signs", name: { fr: "Signes vocaliques", en: "Vowel signs", ar: "العلامات الصوتية" } },
    ],
  },
  rows: table(`
# vowels
அ|a|v|a|a|அம்மா|amma|maman|mother|أم
ஆ|aa|v|ā|aː|ஆடு|aːɖu|chèvre|goat|ماعز
இ|i|v|i|i|இலை|ilai̯|feuille|leaf|ورقة
ஈ|ii|v|ī|iː|ஈ|iː|mouche|fly|ذبابة
உ|u|v|u|u|உப்பு|uppu|sel|salt|ملح
ஊ|uu|v|ū|uː|ஊசி|uːsi|aiguille|needle|إبرة
எ|e|v|e|e|எலி|eli|rat|rat|جرذ
ஏ|ee|v|ē|eː|ஏணி|eːɳi|échelle|ladder|سلم
ஐ|ai|v|ai|aɪ|ஐந்து|aɪnd̪u|cinq|five|خمسة
ஒ|o|v|o|o|ஒன்று|onrɯ|un|one|واحد
ஓ|oo|v|ō|oː|ஓடம்|oːɖam|barque|boat|قارب
ஔ|au|v|au|au̯|ஔவை|au̯ʋai̯|Avvaiyar (poétesse)|Avvaiyar (poet)|أفّيار
ஃ|aytham|x|ḵ|x|||||Aytham : rare, sert surtout à noter le f des mots étrangers (ஃப).|Aytham: rare, mostly used to write a foreign f (ஃப).
# consonants
க|ka|c|k|k a|கல்|kal|pierre|stone|حجر|Se prononce g entre deux voyelles.|Pronounced g between vowels.
ங|nga|c|ṅ|ŋ a
ச|ca|c|c|t͡ɕ a|சக்கரம்|t͡ɕakkaɾam|roue|wheel|عجلة|Se prononce souvent s en début de mot.|Often pronounced s at the start of a word.
ஞ|nya|c|ñ|ɲ a
ட|tta|c|ṭ|ʈ a|||||Se prononce ɖ entre deux voyelles.|Pronounced ɖ between vowels.
ண|nna|c|ṇ|ɳ a|கண்|kaɳ|œil|eye|عين
த|ta|c|t|t̪ a|தண்ணீர்|t̪aɳɳiːr|eau|water|ماء
ந|na|c|n|n a|நாய்|naːj|chien|dog|كلب
ப|pa|c|p|p a|பல்|pal|dent|tooth|سن
ம|ma|c|m|m a|மரம்|maɾam|arbre|tree|شجرة
ய|ya|c|y|j a|யானை|jaːnai̯|éléphant|elephant|فيل
ர|ra|c|r|ɾ a
ல|la|c|l|l a
வ|va|c|v|ʋ a|வீடு|ʋiːɖu|maison|house|بيت
ழ|zha|c|ḻ|ɻ a|தமிழ்|t̪amiɻ|tamoul|Tamil|التاميلية|Son typique du tamoul, entre r et l, langue très recourbée.|A sound typical of Tamil, between r and l, tongue curled far back.
ள|lla|c|ḷ|ɭ a
ற|rra|c|ṟ|r a|||||Un r roulé ; doublé (ற்ற), se prononce tr.|A trilled r; doubled (ற்ற) it sounds tr.
ன|nna-alveolar|c|ṉ|n a
# grantha
ஜ|ja|c|j|d͡ʒ a
ஷ|ssa|c|ṣ|ʂ a
ஸ|sa|c|s|s a
ஹ|ha|c|h|h a
# signs
ா|sign-aa|vs|ā|aː
ி|sign-i|vs|i|i
ீ|sign-ii|vs|ī|iː
ு|sign-u|vs|u|u
ூ|sign-uu|vs|ū|uː
ெ|sign-e|vs|e|e|||||S'écrit avant la consonne.|Written before the consonant.
ே|sign-ee|vs|ē|eː
ை|sign-ai|vs|ai|aɪ
ொ|sign-o|vs|o|o
ோ|sign-oo|vs|ō|oː
ௌ|sign-au|vs|au|au̯
்|pulli|d||-|||||Pulli : retire la voyelle de la consonne.|Pulli: removes the consonant's vowel.
`),
});
