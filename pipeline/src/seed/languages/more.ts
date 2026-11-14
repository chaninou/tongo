/**
 * Les 14 langues qui complètent le lancement (D09) : brouillons écrits à la main, à confirmer
 * par les sources (TS-005 à TS-009). Chaque fichier décrit sa langue en table compacte (table.ts).
 */
import type { LanguageModule } from "../build.ts";
import bn from "./more/bn.ts";
import de from "./more/de.ts";
import el from "./more/el.ts";
import fa from "./more/fa.ts";
import he from "./more/he.ts";
import hi from "./more/hi.ts";
import ka from "./more/ka.ts";
import ko from "./more/ko.ts";
import pt from "./more/pt.ts";
import sw from "./more/sw.ts";
import ta from "./more/ta.ts";
import th from "./more/th.ts";
import tr from "./more/tr.ts";
import vi from "./more/vi.ts";


export const MORE: LanguageModule[] = [pt, de, tr, vi, sw, el, ka, fa, he, hi, bn, ta, th, ko];
