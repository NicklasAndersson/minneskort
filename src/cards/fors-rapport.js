export default {
  id: "fors-rapport",
  category: "Rapportering",
  layout: "foldable",
  title: "FORS",
  subtitle: "Rapport för uppdateringar om verksamhet",
  content: {
    type: "mnemonic",
    items: [
      { letter: "F", title: "Förbandets position", description: "Ange förbands position med koordinater/ort eller UPK." },
      { letter: "O", title: "Ori om motståndaren", description: "Orientering om motståndare, hur är situationen efter genomförd verksamhet." },
      { letter: "R", title: "Redogörelse", description: "Redogörelse för genomförd, pågående och planerad verksamhet. Vad har ni gjort, vad gör ni just nu och vad planerar ni?" },
      { letter: "S", title: "Slutsatser", description: "Vad har ni gjort för slutsatser baserat på er verksamhet?" },
    ],
  },
};
