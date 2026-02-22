export default {
  id: "primary-survey-fomedc",
  category: "Sjukvård",
  layout: "foldable",
  title: "Taktiskt omhändertagande",
  content: {
    type: "mnemonic",
    items: [
      { 
        letter: "C", 
        title: "Livshotande blödning", 
        description: "Identifiera yttre livshotande blödning. Åtgärd: Tourniquet (TQ) eller Tamponering." 
      },
      { 
        letter: "A", 
        title: "Luftväg", 
        description: "Fri/hotad luftväg? Se, lyssna, känn. Åtgärd: Optimera läge, rensug, haklyft, nästub eller svalgtub." 
      },
      { 
        letter: "B", 
        title: "Andning", 
        description: "Öppna thoraxskador? Symmetri? Saturation. Åtgärd: Lufttätt förband, nåldekompression, stötta ventilation." 
      },
      { 
        letter: "C", 
        title: "Cirkulation", 
        description: "Kontrollera 4 B (Bröst, Buk, Bäcken, Ben). Åtgärd: Blödningskontroll, vätska, Tranexamsyra, hypotermiprevention." 
      },
      { 
        letter: "D", 
        title: "Medvetandegrad", 
        description: "GCS/AVPU. Pupiller (storlek/ljusreaktion). V: Vaken, P: Smärtstimuli, U: Reagerar ej." 
      },
      { 
        letter: "E", 
        title: "Exponering", 
        description: "Exponering mot yttre faktorer. Helkroppsundersökning. Förhindra avkylning." 
      }
    ],
    frontNotes: "**Sållningstriage:**\n1. Överblicka platsen. 2. Få undan gående.\n**Första varvet:** Åtgärda **C** och A på samtliga skadade.\n**Andra varvet:** Prioritera samtliga, märk med triagekort, rapportera antal/kategori.",
    notes: "**Åtgärder: Klar för avtransport:**\n- Dokumentera tid på TQ\n- Patron ur\n- Avlägsna ammunition & sprängeffekter\n- Skriv AT-MIST"
  },
};