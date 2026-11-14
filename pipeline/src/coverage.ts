/**
 * Un caractère de référence (CLDR) est-il couvert par les lettres décrites ?
 * - directement ;
 * - par décomposition : ằ = ă + accent grave, ড় = ড + nukta, ক্ষ = ক + ্ + ষ ;
 * - syllabe hangeul : décomposée en jamo (consonne initiale, voyelle, consonne(s) finale(s)).
 */
const L = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const V = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const T = ["", "ㄱ", "ㄲ", "ㄱㅅ", "ㄴ", "ㄴㅈ", "ㄴㅎ", "ㄷ", "ㄹ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅁ", "ㅂ", "ㅂㅅ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

/** Jamo de compatibilité qui composent une syllabe hangeul, ou undefined. */
export function hangulJamo(c: string): string[] | undefined {
  const cp = c.codePointAt(0)!;
  if (c.length !== 1 || cp < 0xac00 || cp > 0xd7a3) return undefined;
  const i = cp - 0xac00;
  return [L[Math.floor(i / 588)]!, V[Math.floor((i % 588) / 28)]!, ...[...T[i % 28]!]];
}

export function covered(c: string, described: Set<string>): boolean {
  if (described.has(c)) return true;
  const jamo = hangulJamo(c);
  if (jamo) return jamo.every((j) => described.has(j));
  const cps = [...c.normalize("NFD")];
  if (cps.length < 2) return false;
  // Retirer un composant décrit (n'importe lequel après le premier) et vérifier le reste :
  // ặ = a + point souscrit + brève → ă + point souscrit.
  for (let k = cps.length - 1; k >= 1; k--) {
    if (!described.has(cps[k]!)) continue;
    const rest = [...cps.slice(0, k), ...cps.slice(k + 1)].join("").normalize("NFC");
    if (covered(rest, described)) return true;
  }
  return false;
}

/** Couverture en tenant compte de la casse propre à la langue (İ turc → i). */
export function coveredIn(c: string, described: Set<string>, lang: string): boolean {
  return covered(c, described) || covered(c.toLocaleLowerCase(lang), described);
}
