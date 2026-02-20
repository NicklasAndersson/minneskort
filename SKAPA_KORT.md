# Hur man skapar ett nytt kort

Här är en kort instruktion för hur du skapar och lägger till ett nytt kort i appen:

### 1. Skapa en ny fil för kortet
Skapa en ny JavaScript-fil i mappen `src/cards/`, till exempel `mitt-nya-kort.js`.

### 2. Definiera kortets innehåll
Klistra in och anpassa följande struktur i din nya fil. Det finns olika typer av innehåll (`freetext`, `mnemonic` eller `image`).

**Exempel för ett textkort (`freetext`):**
```javascript
export default {
  id: "mitt-nya-kort",
  category: "Min Kategori",
  layout: "foldable", // eller "light"
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
  },
};
```

### 3. Registrera kortet i appen
Öppna filen `src/cards/index.js` för att importera och lägga till ditt nya kort i listan.

1. **Importera** filen högst upp:
   ```javascript
   import mittNyaKort from "./mitt-nya-kort.js";
   ```
2. **Lägg till** variabeln i arrayen `initialCards`:
   ```javascript
   const initialCards = [lCabcde, andning, hgrVerkan, repetera, sar, mittNyaKort];
   ```

När du sparar filerna kommer ditt nya kort automatiskt att dyka upp i appen!
