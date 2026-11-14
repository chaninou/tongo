import { describe, expect, it } from "vitest";
import { loadContent } from "../src/content.ts";

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
});
