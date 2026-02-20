# minneskort

Webbapplikation för att skapa och skriva ut minneskort/fusklappar anpassade för Hemvärnet.

## Funktioner

- **Bibliotek**: Bläddra bland tillgängliga minneskort (ramsor, fritext, bilder).
- **Kortlek-byggare**: Välj och köa kort inför utskrift.
- **Utskriftsvy**: A4-layout med 2 kort per sida (4 paneler). Stödjer vikbara kort (framsida/baksida) och enkelsidiga "light"-kort.
- **Korttyper**: `mnemonic` (ramsa), `freetext` (fritext med markdown), `image` (bild med text).

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

Kortdata definieras i `public/cards.json` enligt följande schema:

```json
[
  {
    "id": "unikt-id",
    "category": "Kategori",
    "front": {
      "title": "Kortets titel",
      "subtitle": "Kort beskrivning"
    },
    "back": {
      "type": "mnemonic | freetext | image",
      "items": [],
      "text": "",
      "imageUrl": ""
    }
  }
]
```

## Tekniker

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

