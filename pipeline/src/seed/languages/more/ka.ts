import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "ka", iso639_3: "kat", scriptId: "geor",
  name: { fr: "Géorgien", en: "Georgian", ar: "الجورجية" }, endonym: "ქართული", speakersM: 4,
  variants: one("ka-GE", "GE", "Géorgie", "Georgia", "جورجيا"),
  intro: {
    fr: "Le géorgien a son propre alphabet, aux lettres arrondies, sans majuscules. Il distingue trois séries de consonnes : sonores, aspirées et éjectives (prononcées avec un petit claquement).",
    en: "Georgian has its own alphabet of rounded letters, with no capitals. It has three series of consonants: voiced, aspirated and ejective (said with a little pop).",
    ar: "للجورجية أبجديتها الخاصة بحروف مستديرة ودون حروف كبيرة. وفيها ثلاث سلاسل من الصوامت: مجهورة ومهموسة نفسية وانفجارية قذفية.",
  },
  phonemes: [
    ["tʰ", "t-aspirated", "consonant", "t aspiré", "aspirated t"],
    ["pʰ", "p-aspirated", "consonant", "p aspiré", "aspirated p"],
    ["kʰ", "k-aspirated", "consonant", "k aspiré", "aspirated k"],
    ["pʼ", "p-ejective", "consonant", "p éjectif", "ejective p"],
    ["tʼ", "t-ejective", "consonant", "t éjectif", "ejective t"],
    ["kʼ", "k-ejective", "consonant", "k éjectif", "ejective k"],
    ["qʼ", "q-ejective", "consonant", "q éjectif (au fond de la gorge)", "ejective q"],
    ["t͡sʰ", "ts-aspirated", "consonant", "ts aspiré", "aspirated ts"],
    ["t͡ʃʰ", "tsh-aspirated", "consonant", "tch aspiré", "aspirated ch"],
    ["t͡sʼ", "ts-ejective", "consonant", "ts éjectif", "ejective ts"],
    ["t͡ʃʼ", "tsh-ejective", "consonant", "tch éjectif", "ejective ch"],
  ],
  script: {
    name: { fr: "Géorgien", en: "Georgian", ar: "الجورجية" }, endonym: "მხედრული", type: "alphabet", direction: "ltr",
    intro: {
      fr: "L'alphabet géorgien moderne (mkhedruli) compte 33 lettres. Il ne ressemble à aucun autre et n'est utilisé que pour les langues de Géorgie.",
      en: "The modern Georgian alphabet (mkhedruli) has 33 letters. It looks like no other script and is only used for the languages of Georgia.",
      ar: "تضم الأبجدية الجورجية الحديثة (مخيدرولي) 33 حرفًا، ولا تشبه أي كتابة أخرى.",
    },
    sample: "ა ბ გ ქ", font: "Noto Sans Georgian",
  },
  rows: table(`
ა|an|v|a|a|ასი|asi|cent|hundred|مئة
ბ|ban|c|b|b|ბავშვი|bavʃvi|enfant|child|طفل
გ|gan|c|g|ɡ|გული|ɡuli|cœur|heart|قلب
დ|don|c|d|d|დედა|dɛda|mère|mother|أم
ე|en|v|e|ɛ|ეზო|ɛzɔ|cour|yard|فناء
ვ|vin|c|v|v|ვაშლი|vaʃli|pomme|apple|تفاحة
ზ|zen|c|z|z|ზღვა|zɣva|mer|sea|بحر
თ|tan|c|t|tʰ|თვალი|tʰvali|œil|eye|عين
ი|in|v|i|i
კ|kan|c|k'|kʼ|კატა|kʼatʼa|chat|cat|قطة
ლ|las|c|l|l|ლომი|lɔmi|lion|lion|أسد
მ|man|c|m|m|მზე|mzɛ|soleil|sun|شمس
ნ|nar|c|n|n
ო|on|v|o|ɔ
პ|par|c|p'|pʼ|პური|pʼuri|pain|bread|خبز
ჟ|zhan|c|zh|ʒ
რ|rae|c|r|r
ს|san|c|s|s|სახლი|saxli|maison|house|بيت
ტ|tar|c|t'|tʼ
უ|un|v|u|u
ფ|par-aspirated|c|p|pʰ|ფული|pʰuli|argent|money|نقود
ქ|kan-aspirated|c|k|kʰ|ქალაქი|kʰalakʰi|ville|city|مدينة
ღ|ghan|c|gh|ɣ|ღამე|ɣamɛ|nuit|night|ليل
ყ|qar|c|q'|qʼ|ყვავილი|qʼvavili|fleur|flower|زهرة
შ|shin|c|sh|ʃ|შაქარი|ʃakʰari|sucre|sugar|سكر
ჩ|chin|c|ch|t͡ʃʰ|ჩაი|t͡ʃʰai|thé|tea|شاي
ც|tsan|c|ts|t͡sʰ|ცა|t͡sʰa|ciel|sky|سماء
ძ|dzil|c|dz|d͡z|ძაღლი|d͡zaɣli|chien|dog|كلب
წ|tsil|c|ts'|t͡sʼ|წყალი|t͡sʼqʼali|eau|water|ماء
ჭ|char|c|ch'|t͡ʃʼ
ხ|khan|c|kh|χ|ხე|χɛ|arbre|tree|شجرة
ჯ|jan|c|j|d͡ʒ
ჰ|hae|c|h|h
`),
});
