/**
 * Balise de langue à poser sur un texte dans une écriture donnée : elle guide le choix de police
 * et la mise en forme (TS-015), et isole le sens d'écriture dans une page d'une autre direction.
 */
const TAGS: Record<string, string> = {
  arab: "ar", hebr: "he", hira: "ja", kana: "ja", hang: "ko", cyrl: "ru", grek: "el",
  deva: "hi", beng: "bn", taml: "ta", thai: "th", geor: "ka", latn: "und-Latn",
};
export const scriptLang = (scriptId: string) => TAGS[scriptId] ?? `und-${scriptId[0]!.toUpperCase()}${scriptId.slice(1)}`;
export const scriptDir = (scriptId: string) => (scriptId === "arab" || scriptId === "hebr" ? "rtl" : "ltr");
