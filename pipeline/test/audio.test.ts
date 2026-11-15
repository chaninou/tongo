import { describe, expect, it } from "vitest";
import { author } from "../src/import/audio.ts";

describe("auteur d'un enregistrement Commons (TS-013)", () => {
  it("garde un nom simple et retire le HTML", () => {
    expect(author('<a href="//commons.wikimedia.org/wiki/User:Erutuon">Erutuon</a>')).toBe("Erutuon");
  });

  it("extrait le nom des formules automatiques de Commons", () => {
    expect(author("No machine-readable author provided. Denelson83 assumed (based on copyright claims).")).toBe("Denelson83");
    expect(author("Recorded by Peter Isotalo.")).toBe("Peter Isotalo");
  });

  it("se rabat sur la personne qui a versé le fichier", () => {
    expect(author("", "Adamsa123")).toBe("Adamsa123");
    expect(author("", "Karmosin~commonswiki")).toBe("Karmosin");
    expect(author("", "BetacommandBot")).toBe("inconnu");
    expect(author("")).toBe("inconnu");
  });
});
