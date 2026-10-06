export default {
  id: "salute",
  category: "Rapportering",
  layout: "foldable",
  title: "SALUTE",
  subtitle: "Spaningsrapport (NATO)",
  content: {
    type: "mnemonic",
    items: [
      { letter: "S", title: "Size", description: "Antal personer eller fordon." },
      { letter: "A", title: "Activity", description: "Vad de gör, och i vilken riktning." },
      { letter: "L", title: "Location", description: "Var de är (koordinat)." },
      { letter: "U", title: "Unit", description: "Förbandstillhörighet och kännetecken." },
      { letter: "T", title: "Time", description: "När observationen gjordes." },
      { letter: "E", title: "Equipment", description: "Observerad utrustning och beväpning." },
    ],
    notes: "NATO-motsvarigheten till 7S.",
    sources: [
      { title: "Petri-bloggen – Spaningsrapport 7S", url: "https://hemvarn.wordpress.com/2020/03/13/15-spaningsrapport-7s-och-dess-8-punkter/" },
    ],
  },
};
