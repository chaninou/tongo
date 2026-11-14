// Service worker minimal (TS-021). Pas de mode hors ligne en V1 (D16) : il ne met rien en cache
// et laisse passer toutes les requêtes. Il rend l'appli installable et prépare le hors-ligne.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
