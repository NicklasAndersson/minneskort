# minneskort

Webbapplikation för att skapa och skriva ut minneskort/fusklappar anpassade för Hemvärnet.

## Funktioner

- **Bibliotek**: Bläddra bland tillgängliga minneskort (ramsor, fritext, bilder).
- **Kortlek-byggare**: Välj och köa kort inför utskrift.
- **Utskriftsvy**: A4-layout med 2 vikbara kort per sida (framsida + baksida). Marginaler anpassade för utskrift.
- **Korttyper**: `mnemonic` (ramsa), `freetext` (fritext med markdown), `image` (bild med text).
- **Notes-fält**: Valfri fritext under items-listan på baksidan via `content.notes`.

## Starta projektet

```bash
npm install
npm run dev
```

## Bygga för produktion

```bash
npm run build
```

## Kortformat

Varje kort definieras som en egen JS-fil i `src/cards/`. Se [SKAPA_KORT.md](SKAPA_KORT.md) för steg-för-steg-instruktioner.

```js
export default {
  id: "unikt-id",
  category: "Kategori",
  layout: "foldable",
  title: "TITEL",
  subtitle: "Kort beskrivning",
  content: {
    type: "mnemonic",       // mnemonic | freetext | image
    items: [
      { letter: "A", title: "Alfa", description: "Beskrivning" },
    ],
    notes: "Valfri fritext under listan på baksidan.",
  },
};
```

## Tekniker

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)


## Release och pipelines

Två separata flöden – PDF:en släpps automatiskt, webbsidan manuellt.

### PDF (automatiskt, GitHub Actions)

Workflow: [.github/workflows/test.yml](.github/workflows/test.yml) ("Test & PDF").

| Trigger | Jobb | Resultat |
| --- | --- | --- |
| Pull request mot `main` | `test` | Validerar kortschemat (`npm run test:schema`) |
| Push till `main` | `test` → `pdf` | Genererar `minneskort.pdf` (`npm run generate-pdf`) och skapar en GitHub-release |

- Releasen får taggen `build-<körningsnummer>` (t.ex. `build-15`) med PDF:en bifogad och autogenererade release notes.
- Körningsnumret räknas per workflow, så nummer kan hoppa över (build-9, 13, 15).
- CI kör bara schematestet. `card-overflow`-testet körs bara lokalt via `npm test` / `npm run deploy`.

### Webbsidan (manuellt, Cloudflare Workers)

```bash
npm run deploy   # npm test && npm run build && wrangler deploy
```

- Publicerar `dist/` som statiska assets till Cloudflare-workern `minneskort` (se [wrangler.jsonc](wrangler.jsonc)).
- Kräver att du är inloggad i wrangler (`npx wrangler login`).
- Deployen körs **inte** av CI – kom ihåg att köra den efter merge till `main`.
- Kolla senaste deploy: `npx wrangler deployments list --name minneskort`.

### Typiskt släpp

1. Merga till `main` → CI skapar PDF-release automatiskt.
2. `git pull && npm run deploy` → uppdaterar webbsidan.

### Övrigt

- **CodeQL**: schemalagd säkerhetsskanning varje vecka (GitHub default setup).
- **Dependabot**: skapar PR:er för beroenden. De kan samlas i en gemensam PR.
