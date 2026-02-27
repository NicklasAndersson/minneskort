# Hur man skapar ett nytt kort

Här är en kort instruktion för hur du skapar och lägger till ett nytt kort i appen.

### 1. Skapa en ny fil för kortet

Skapa en ny JavaScript-fil i mappen `src/cards/`, till exempel `mitt-nya-kort.js`.

### 2. Definiera kortets innehåll

Klistra in och anpassa följande struktur i din nya fil. Det finns olika typer av innehåll (`freetext`, `mnemonic` eller `image`).

**Exempel för ett textkort (`freetext`):**
```javascript
export default {
  id: "mitt-nya-kort",
  category: "Min Kategori",
  layout: "foldable",
  title: "Kortets Titel",
  subtitle: "En kort undertext",
  content: {
    type: "freetext",
    text: "Här skriver du din text. Du kan använda **fetstil** och *kursivt*.",
  },
};
```

**Exempel för en minnesramsa (`mnemonic`):**
```javascript
export default {
  id: "min-ramsa",
  category: "Min Kategori",
  layout: "foldable",
  title: "RAMSA",
  subtitle: "Kom ihåg detta",
  content: {
    type: "mnemonic",
    items: [
      { letter: "R", title: "Roligt", description: "Beskrivning av R" },
      { letter: "A", title: "Alltid", description: "Beskrivning av A" },
    ],
    notes: "Valfri fritext som visas under listan på baksidan.",
  },
};
```

### 3. Registrera kortet i appen

> **⚠️ VIKTIGT – detta steg missas ofta!**
> Kortet syns INTE i appen förrän det är importerat och tillagt i `src/cards/index.js`.
> Utan detta steg finns kortfilen men den laddas aldrig.

Öppna filen `src/cards/index.js` och gör **båda** dessa ändringar:

1. **Importera** filen – lägg till en import-rad högst upp bland de andra importerna:
   ```javascript
   import mittNyaKort from "./mitt-nya-kort.js";
   ```
2. **Lägg till variabeln i arrayen `initialCards`** – lägg till den sist i listan:
   ```javascript
   const initialCards = [
     // ...befintliga kort
     mittNyaKort,   // <-- lägg till här
   ];
   ```

**Checklista innan du är klar:**
- [ ] Ny fil skapad i `src/cards/`
- [ ] Import-rad tillagd i `src/cards/index.js`
- [ ] Variabeln tillagd i `initialCards`-arrayen i `src/cards/index.js`

När du sparar filerna kommer ditt nya kort automatiskt att dyka upp i appen!

### Fält-referens

| Fält | Krävs | Beskrivning |
|------|-------|-------------|
| `id` | Ja | Unikt ID (används som nyckel) |
| `category` | Ja | Kategori som visas i biblioteket |
| `layout` | Ja | Alltid `"foldable"` |
| `title` | Ja | Titel på framsidan |
| `subtitle` | Nej | Undertext på framsidan |
| `content.type` | Ja | `"mnemonic"`, `"freetext"` eller `"image"` |
| `content.items` | Mnemonic | Array med `{ letter, title, description }` |
| `content.text` | Freetext/Image | Markdown-text (visas på baksidan) |
| `content.imageUrl` | Image | URL till bild på baksidan |
| `content.imageRotation` | Nej | Rotation på baksidebild: `0`, `90`, `180` eller `270` (default `0`) |
| `content.imageSize` | Nej | Storlek på baksidebild: `"small"`, `"medium"`, `"large"` eller `"fill"` (default `"medium"`) |
| `content.frontImageUrl` | Nej | URL till bild på framsidan |
| `content.frontImageRotation` | Nej | Rotation på framsidebild: `0`, `90`, `180` eller `270` (default `0`) |
| `content.frontImageSize` | Nej | Storlek på framsidebild: `"small"`, `"medium"`, `"large"` eller `"fill"` (default `"medium"`) |
| `content.notes` | Nej | Fritext under items-listan på baksidan |
| `content.frontNotes` | Nej | Fritext längst ned på framsidan |
| `content.sources` | Nej | Array med `{ title, url? }` — källor |

### Bildstorlekar

| Värde | Beskrivning |
|-------|-------------|
| `"small"` | Max 64px hög |
| `"medium"` | Max 112px hög (standard) |
| `"large"` | Max 176px hög |
| `"fill"` | Fyller hela kortytan |

### Exempel för ett bildkort (`image`):
```javascript
export default {
  id: "mitt-bildkort",
  category: "Min Kategori",
  layout: "foldable",
  title: "Kortets Titel",
  subtitle: "En kort undertext",
  content: {
    type: "image",
    imageUrl: "https://example.com/bild.png",
    imageRotation: 0,
    imageSize: "large",
    frontImageUrl: "https://example.com/framsida.png",
    frontImageRotation: 90,
    frontImageSize: "medium",
    text: "Beskrivande text under bilden på baksidan.",
  },
};
```
