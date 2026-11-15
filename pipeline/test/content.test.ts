import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTENT_DIR, loadContent } from "../src/content.ts";
import { coveredIn } from "../src/coverage.ts";

describe("contenu publié", () => {
  it("est valide (schéma et références croisées)", async () => {
    const { errors, content } = await loadContent();
    expect(errors).toEqual([]);
    expect(content.languages.length).toBeGreaterThan(0);
  });

  it("donne à chaque langue au moins un mot d'exemple par écriture", async () => {
    const { content } = await loadContent();
    for (const l of content.languages)
      for (const s of l.scripts)
        expect(l.letters.some((e) => e.grapheme.startsWith(`${s}:`) && e.examples.length > 0), `${l.id}/${s}`).toBe(true);
  });

  it("garde le garde-fou : rien n'est « vérifié » sans source", async () => {
    const { content } = await loadContent();
    for (const l of content.languages)
      for (const e of l.letters)
        if (e.pronunciation.confidence !== "draft") expect(e.pronunciation.sources.length, `${l.id} ${e.grapheme}`).toBeGreaterThan(0);
  });

  it("fournit le fichier de chaque audio référencé, avec son attribution", async () => {
    const { content } = await loadContent();
    const audios = content.phonemes.flatMap((p) => (p.audio ? [p.audio] : []));
    expect(audios.length).toBeGreaterThan(0);
    for (const a of audios) {
      expect(existsSync(join(CONTENT_DIR, a.src)), a.src).toBe(true);
      expect(a.author && a.license && a.url, a.src).toBeTruthy();
    }
  });
});

describe("couverture CLDR (TS-004)", () => {
  it("chaque caractère principal selon CLDR est décrit par la langue", async () => {
    const { content } = await loadContent();
    const chars = new Map(content.scripts.flatMap((s) => s.graphemes.map((g) => [`${s.id}:${g.id}`, g.char] as const)));
    for (const l of content.languages) {
      if (!l.characters) continue;
      const described = new Set(l.letters.map((e) => chars.get(e.grapheme)!));
      expect(l.characters.main.filter((c) => !coveredIn(c, described, l.id)), l.id).toEqual([]);
    }
  });
});
