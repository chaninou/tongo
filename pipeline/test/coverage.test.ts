import { describe, expect, it } from "vitest";
import { covered, hangulJamo } from "../src/coverage.ts";

describe("couverture par décomposition", () => {
  const vi = new Set(["a", "ă", "̀", "̃"]);
  it("lettre vietnamienne à ton = lettre + marque de ton", () => {
    expect(covered("ằ", vi)).toBe(true);
    expect(covered("ẵ", vi)).toBe(true);
    expect(covered("ắ", vi)).toBe(false);
    expect(covered("ặ", new Set(["a", "ă", "\u0323"]))).toBe(true);
  });
  it("conjointe indienne", () => {
    expect(covered("ক্ষ", new Set(["ক", "্", "ষ"]))).toBe(true);
  });
  it("syllabe hangeul", () => {
    expect(hangulJamo("값")).toEqual(["ㄱ", "ㅏ", "ㅂ", "ㅅ"]);
    expect(covered("한", new Set(["ㅎ", "ㅏ", "ㄴ"]))).toBe(true);
    expect(covered("한", new Set(["ㅎ", "ㅏ"]))).toBe(false);
  });
});
