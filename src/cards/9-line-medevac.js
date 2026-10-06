export default {
  id: "9-line-medevac",
  category: "Sjukvård",
  layout: "foldable",
  title: "9-LINE MEDEVAC",
  subtitle: "Begäran om medicinsk evakuering (krig)",
  content: {
    type: "mnemonic",
    items: [
      { letter: "1", title: "Plats", description: "Koordinat (MGRS) för upphämtningsplatsen." },
      { letter: "2", title: "Radiofrekvens och anropssignal", description: "Frekvens och anropssignal hos begärande enhet." },
      { letter: "3", title: "Patienter per prioritet", description: "Antal per grupp: A Urgent, B Urgent Surgical, C Priority, D Routine, E Convenience." },
      { letter: "4", title: "Särskild utrustning", description: "A Ingen, B Vinsch, C Räddningsutrustning, D Ventilator." },
      { letter: "5", title: "Patienter per typ", description: "Antal L (bår) och A (gående)." },
      { letter: "6", title: "Säkerhet på platsen", description: "N Ingen fiende, P Möjlig fiende, E Fiende finns, X Beväpnad eskort krävs." },
      { letter: "7", title: "Markering", description: "A Paneler, B Pyroteknik, C Rök, D Ingen." },
      { letter: "8", title: "Patienternas status", description: "A Egen/NATO militär, B Egen/NATO civil, C Icke-NATO militär, D Icke-NATO civil, E Krigsfånge." },
      { letter: "9", title: "CBRN", description: "Kontaminering på platsen: N Nukleär, B Biologisk, C Kemisk." },
    ],
    notes:
      "Krigsformat. I fredstid avser rad 6 antal och typ av skador, och rad 9 beskriver terräng och hinder vid landningsplatsen. Kompletteras med AT-MIST.",
    sources: [
      { title: "NATO AMedP-7.1 / 9-Line MEDEVAC Request" },
    ],
  },
};
