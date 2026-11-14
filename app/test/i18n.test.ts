import { describe, expect, it } from "vitest";
import { negotiate, t } from "../src/i18n/ui.ts";

describe("langue d'interface (US-001, D18)", () => {
  it("suit le navigateur", () => {
    expect(negotiate(["ar-MA", "fr"])).toBe("ar");
    expect(negotiate(["de-DE", "fr-CA"])).toBe("fr");
  });
  it("se replie sur l'anglais", () => {
    expect(negotiate(["de", "ja"])).toBe("en");
    expect(negotiate([])).toBe("en");
  });
  it("remplace les variables", () => {
    expect(t("fr", "languages.speakers", { n: 310 })).toBe("310 millions de locuteurs environ");
  });
});
