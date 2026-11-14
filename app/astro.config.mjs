// @ts-check
import { defineConfig } from "astro/config";

// Site statique (D15) : chaque page est générée au build, aucune exécution côté serveur.
// SITE_URL et BASE_PATH permettent de publier sous un sous-chemin (GitHub Pages : /tongo/).
export default defineConfig({
  site: process.env.SITE_URL ?? "https://tongo.example",
  base: process.env.BASE_PATH ?? "/",
  trailingSlash: "always",
  build: { format: "directory" },
});
