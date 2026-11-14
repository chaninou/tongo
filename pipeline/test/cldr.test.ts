import { describe, expect, it } from "vitest";
import { parseExemplars } from "../src/import/cldr.ts";

describe("parseExemplars", () => {
  it("sépare les caractères collés et ignore les espaces", () => {
    expect(parseExemplars("[aàâ æ b]")).toEqual(["a", "à", "â", "æ", "b"]);
  });
  it("garde les séquences entre accolades et les caractères combinés", () => {
    expect(parseExemplars("[{а́} {ch} e]")).toEqual(["а́", "ch", "e"]);
  });
  it("développe les plages et décode les échappements", () => {
    expect(parseExemplars("[a-c \\u200D]")).toEqual(["a", "b", "c", "‍"]);
  });
});
