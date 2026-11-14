import { describe, expect, it } from "vitest";
import { Language, crossCheck, pickVariant, soundFor, weakest, type Content } from "../src/index.ts";

const draft = { confidence: "draft" as const, sources: [] };

function sample(): Content {
  return {
    sources: [{ id: "cldr", name: "CLDR", url: "https://cldr.unicode.org/", license: "Unicode", provides: { fr: "x", en: "x" } }],
    phonemes: [
      { ipa: "ʒ", id: "ezh", kind: "consonant", name: { fr: "ʒ", en: "ʒ" }, ...draft },
      { ipa: "x", id: "x", kind: "consonant", name: { fr: "x", en: "x" }, ...draft },
    ],
    scripts: [{
      id: "latn", name: { fr: "Latin", en: "Latin" }, type: "alphabet", direction: "ltr", cased: true,
      intro: { fr: "i", en: "i" }, sample: "a", font: "Noto Sans", groups: [],
      graphemes: [{ id: "j", char: "j", kind: "consonant" }], ...draft,
    }],
    languages: [Language.parse({
      id: "fr", iso639_3: "fra", name: { fr: "Français", en: "French" }, endonym: "français", scripts: ["latn"],
      variants: [
        { id: "fr-FR", region: "FR", name: { fr: "France", en: "France" }, default: true },
        { id: "fr-CA", region: "CA", name: { fr: "Canada", en: "Canada" } },
      ],
      letters: [{ grapheme: "latn:j", pronunciation: { sound: ["ʒ"], ...draft } }],
      ...draft,
    })],
  };
}

describe("crossCheck", () => {
  it("accepte un contenu cohérent", () => {
    expect(crossCheck(sample())).toEqual([]);
  });

  it("signale un phonème, un graphème et une source inconnus", () => {
    const c = sample();
    const entry = c.languages[0]!.letters[0]!;
    entry.pronunciation.sound = ["ʃ"];
    entry.pronunciation.sources = [{ source: "inconnue" }];
    c.languages[0]!.letters.push({ grapheme: "latn:zz", pronunciation: { sound: ["x"], ...draft }, examples: [] });
    const errors = crossCheck(c).join("\n");
    expect(errors).toContain("/ʃ/ absent");
    expect(errors).toContain("source inconnue");
    expect(errors).toContain("latn:zz : graphème introuvable");
  });

  it("refuse une variante non déclarée ou la variante par défaut dans « variants »", () => {
    const c = sample();
    c.languages[0]!.letters[0]!.pronunciation.variants = { "fr-BE": ["x"], "fr-FR": ["x"] };
    const errors = crossCheck(c).join("\n");
    expect(errors).toContain("variante fr-BE non déclarée");
    expect(errors).toContain("fr-FR est la variante par défaut");
  });

  it("exige exactement une variante par défaut", () => {
    const c = sample();
    c.languages[0]!.variants[1]!.default = true;
    expect(crossCheck(c).join()).toContain("2 variantes par défaut");
  });
});

describe("variantes (D22)", () => {
  const lang = sample().languages[0]!;
  it("prend la région du navigateur si la langue y a une variante", () => {
    expect(pickVariant(lang, ["en-US", "fr-CA"]).id).toBe("fr-CA");
  });
  it("sinon la variante par défaut", () => {
    expect(pickVariant(lang, ["fr-BE", "en"]).id).toBe("fr-FR");
    expect(pickVariant(lang).id).toBe("fr-FR");
  });
  it("soundFor se replie sur la prononciation principale", () => {
    const p = { sound: ["a"], variants: { "fr-CA": ["ɑ"] }, ...draft };
    expect(soundFor(p, "fr-CA")).toEqual(["ɑ"]);
    expect(soundFor(p, "fr-FR")).toEqual(["a"]);
  });
});

describe("weakest", () => {
  it("renvoie le niveau le plus faible", () => {
    expect(weakest(["high", "medium"])).toBe("medium");
    expect(weakest(["high", "draft", "low"])).toBe("draft");
    expect(weakest([])).toBe("high");
  });
});
