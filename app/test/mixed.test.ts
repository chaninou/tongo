import { describe, expect, it } from "vitest";
import { runs } from "../src/lib/mixed";

describe("texte mixte (TS-018)", () => {
  it("balise les caractères d'une autre écriture", () => {
    expect(runs("Forme de כ en fin de mot.", "fr")).toEqual([
      { text: "Forme de " }, { text: "כ", lang: "he" }, { text: " en fin de mot." },
    ]);
  });

  it("garde un mot étranger d'un seul tenant, espaces internes compris", () => {
    expect(runs("Particule は wa et ありがとう.", "en")).toEqual([
      { text: "Particule " }, { text: "は", lang: "ja" }, { text: " wa et " }, { text: "ありがとう", lang: "ja" }, { text: "." },
    ]);
  });

  it("balise l'IPA entre barres obliques", () => {
    expect(runs("comme /θ/ en anglais", "fr")).toEqual([{ text: "comme " }, { text: "/θ/", lang: "und-fonipa" }, { text: " en anglais" }]);
  });

  it("ne balise pas l'écriture de la langue d'interface", () => {
    expect(runs("يُنطق مثل ず (zu).", "ar")).toEqual([{ text: "يُنطق مثل " }, { text: "ず", lang: "ja" }, { text: " (zu)." }]);
  });
});
