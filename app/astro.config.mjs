// @ts-check
import { defineConfig } from "astro/config";

// Site statique (D15) : chaque page est générée au build, aucune exécution côté serveur.
export default defineConfig({
  site: "https://tongo.example",
  trailingSlash: "always",
  build: { format: "directory" },
});
