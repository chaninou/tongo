# Tongo

L'atlas des écritures du monde : reconnaître une écriture et prononcer ses lettres.
Le besoin, les décisions et le suivi sont dans [`specs/`](specs/index.html).

## Organisation

```
model/      schéma Zod partagé : types, validation, contrôles croisés (TS-001, TS-003)
pipeline/   chaîne de production du contenu, en TypeScript (D24)
content/    contenu publié : JSON versionnés, validés à chaque build
app/        site statique Astro, en français, anglais et arabe
specs/      besoin, personas, stories, décisions, suivi
```

## Commandes

Node 24 LTS est requis.

```sh
npm install
npm run seed       # régénère content/ depuis le contenu de départ (pipeline/src/seed)
npm run validate   # valide content/ (schéma + références croisées)
npm run import:cldr -w pipeline   # caractères de référence (Unicode CLDR)
npm run report -w pipeline        # écarts entre les lettres décrites et CLDR
npm test           # tests unitaires (Vitest)
npm run dev        # site en développement
npm run build      # validation puis génération du site dans app/dist
npm run check      # vérification des types des pages Astro
```

## Contenu

Le contenu actuel (20 langues, 13 écritures) est un brouillon écrit à la main, marqué `"confidence": "draft"`
et affiché comme tel. Il sera remplacé entrée par entrée par les données importées des sources
ouvertes et croisées automatiquement (TS-004 à TS-009). Une donnée n'est jamais marquée
vérifiée sans source.

Le contenu est publié sous licence CC BY-SA 4.0.
