/**
 * TS-018 : contrastes WCAG 2.2 AA des couleurs du thème, en clair et en sombre.
 * Texte courant : 4,5:1. Grand texte et contour de focus : 3:1.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");

function tokens(block: string): Record<string, string> {
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
}
const light = tokens(css.slice(0, css.indexOf("@media (prefers-color-scheme: dark)")));
const darkBlock = css.slice(css.indexOf("@media (prefers-color-scheme: dark)"));
const dark = { ...light, ...tokens(darkBlock.slice(0, darkBlock.indexOf("\n}\n"))) };

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

const TEXT = ["ink", "ink-2", "accent-ink", "ok", "sea", "bad", "warn"];
const BACKGROUNDS = ["paper", "paper-2", "card"];

describe.each([["clair", light], ["sombre", dark]] as const)("thème %s", (_, c) => {
  it("donne au texte un contraste d'au moins 4,5:1 sur chaque fond", () => {
    for (const fg of TEXT) for (const bg of BACKGROUNDS)
      expect(contrast(c[fg], c[bg]), `${fg} sur ${bg}`).toBeGreaterThanOrEqual(4.5);
  });

  it("garde lisibles les états inversés (bouton en lecture, langue active)", () => {
    expect(contrast(c.card, c.accent), "card sur accent").toBeGreaterThanOrEqual(3);
    expect(contrast(c.paper, c.ink), "paper sur ink").toBeGreaterThanOrEqual(4.5);
  });

  it("rend le contour de focus visible (3:1)", () => {
    for (const bg of BACKGROUNDS) expect(contrast(c.sea, c[bg]), `focus sur ${bg}`).toBeGreaterThanOrEqual(3);
  });
});
