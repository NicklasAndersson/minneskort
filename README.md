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

