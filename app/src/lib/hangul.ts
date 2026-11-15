/** Assemblage des syllabes hangeul (US-012) : bloc = consonne initiale + voyelle (+ finale). */
export const INITIALS = [..."ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"];
export const VOWELS = [..."ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"];
/** Consonnes finales simples ou doubles (les groupes de deux consonnes sont omis). */
export const FINALS = ["", "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const T_INDEX: Record<string, number> = { "": 0, ㄱ: 1, ㄲ: 2, ㄴ: 4, ㄷ: 7, ㄹ: 8, ㅁ: 16, ㅂ: 17, ㅅ: 19, ㅆ: 20, ㅇ: 21, ㅈ: 22, ㅊ: 23, ㅋ: 24, ㅌ: 25, ㅍ: 26, ㅎ: 27 };

export function compose(l: string, v: string, t = ""): string {
  const li = INITIALS.indexOf(l), vi = VOWELS.indexOf(v), ti = T_INDEX[t];
  if (li < 0 || vi < 0 || ti === undefined) return "";
  return String.fromCodePoint(0xac00 + (li * 21 + vi) * 28 + ti);
}

/** En fin de syllabe, les consonnes se ramènent à sept sons. */
export const FINAL_SOUND: Record<string, string> = {
  ㄱ: "k", ㄲ: "k", ㅋ: "k", ㄴ: "n", ㄷ: "t", ㅅ: "t", ㅆ: "t", ㅈ: "t", ㅊ: "t", ㅌ: "t", ㅎ: "t", ㄹ: "l", ㅁ: "m", ㅂ: "p", ㅍ: "p", ㅇ: "ŋ",
};
