import { table } from "../../table.ts";
import { define, one } from "./define.ts";

export default define({
  id: "el", iso639_3: "ell", scriptId: "grek",
  name: { fr: "Grec", en: "Greek", ar: "اليونانية" }, endonym: "Ελληνικά", speakersM: 13,
  variants: one("el-GR", "GR", "Grèce", "Greece", "اليونان"),
  intro: {
    fr: "Le grec moderne utilise l'alphabet grec, ancêtre du latin et du cyrillique. L'accent aigu (΄) marque la syllabe accentuée, et plusieurs lettres ou paires de lettres se prononcent i.",
    en: "Modern Greek uses the Greek alphabet, ancestor of Latin and Cyrillic. The acute accent (΄) marks the stressed syllable, and several letters or letter pairs are pronounced i.",
    ar: "تستعمل اليونانية الحديثة الأبجدية اليونانية، أصل اللاتينية والسيريلية. تدل العلامة الحادة على المقطع المنبور، وتُنطق عدة حروف i.",
  },
  script: {
    name: { fr: "Grec", en: "Greek", ar: "اليونانية" }, endonym: "Ελληνικό αλφάβητο", type: "alphabet", direction: "ltr", cased: true,
    intro: {
      fr: "Né vers le VIIIᵉ siècle av. J.-C., c'est le premier alphabet à noter aussi les voyelles. Ses lettres servent encore en mathématiques et en sciences (π, Δ, Ω).",
      en: "Born around the 8th century BC, it was the first alphabet to write vowels too. Its letters are still used in maths and science (π, Δ, Ω).",
      ar: "نشأت نحو القرن الثامن قبل الميلاد، وهي أول أبجدية تكتب الصوائت أيضًا. ما زالت حروفها تُستعمل في الرياضيات والعلوم.",
    },
    sample: "α β γ ω", font: "Noto Sans",
    groups: [
      { id: "letters", name: { fr: "Lettres", en: "Letters", ar: "الحروف" } },
      { id: "accented", name: { fr: "Voyelles accentuées", en: "Accented vowels", ar: "صوائت منبورة" } },
    ],
  },
  rows: table(`
# letters
α|alpha|v|a|a|αέρας|aeɾas|air|air|هواء
β|beta|c|v|v|βιβλίο|vivlio|livre|book|كتاب
γ|gamma|c|g|ɣ|γάλα|ɣala|lait|milk|حليب|Devant e et i, se prononce comme le y de yaourt.|Before e and i it sounds like y in yes.
δ|delta|c|d|ð|δέντρο|ðendɾo|arbre|tree|شجرة
ε|epsilon|v|e|e|ελιά|elja|olive|olive|زيتونة
ζ|zeta|c|z|z|ζάχαρη|zaxaɾi|sucre|sugar|سكر
η|eta|v|i|i|ήλιος|iʎos|soleil|sun|شمس
θ|theta|c|th|θ|θάλασσα|θalasa|mer|sea|بحر
ι|iota|v|i|i|ιστός|istos|toile|web|نسيج
κ|kappa|c|k|k|καφές|kafes|café|coffee|قهوة
λ|lambda|c|l|l|λεμόνι|lemoni|citron|lemon|ليمون
μ|mu|c|m|m|μήλο|milo|pomme|apple|تفاحة
ν|nu|c|n|n|νερό|neɾo|eau|water|ماء
ξ|xi|c|x|k s|ξύλο|ksilo|bois|wood|خشب
ο|omicron|v|o|o|όνομα|onoma|nom|name|اسم
π|pi|c|p|p|πόρτα|poɾta|porte|door|باب
ρ|rho|c|r|ɾ|ρύζι|ɾizi|riz|rice|أرز
σ|sigma|c|s|s|σπίτι|spiti|maison|house|بيت
ς|final-sigma|c|s|s|||||Forme du sigma en fin de mot.|The form of sigma at the end of a word.
τ|tau|c|t|t|τσάι|t͡sai|thé|tea|شاي
υ|upsilon|v|y|i|ύπνος|ipnos|sommeil|sleep|نوم
φ|phi|c|f|f|φως|fos|lumière|light|ضوء
χ|chi|c|ch|x|χέρι|çeɾi|main|hand|يد|Devant e et i, plus en avant (comme ich en allemand).|Before e and i it moves forward (like German ich).
ψ|psi|c|ps|p s|ψωμί|psomi|pain|bread|خبز
ω|omega|v|o|o|ώρα|oɾa|heure|hour|ساعة
# accented
ά|alpha-tonos|v|á|a|||||L'accent marque la syllabe accentuée.|The accent marks the stressed syllable.
έ|epsilon-tonos|v|é|e
ή|eta-tonos|v|í|i
ί|iota-tonos|v|í|i
ό|omicron-tonos|v|ó|o
ύ|upsilon-tonos|v|ý|i
ώ|omega-tonos|v|ó|o
ϊ|iota-dialytika|v|ï|i|||||Le tréma indique que la voyelle se prononce séparément.|The diaeresis shows the vowel is pronounced separately.
ϋ|upsilon-dialytika|v|ÿ|i
ΐ|iota-dialytika-tonos|v|ḯ|i
ΰ|upsilon-dialytika-tonos|v|ÿ́|i
`),
});
