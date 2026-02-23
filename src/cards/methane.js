export default {
  id: "methane",
  category: "Sjukvård",
  layout: "foldable",
  title: "METHANE",
  subtitle: "Incidentrapport",
  content: {
    type: "mnemonic",
    items: [
      { letter: "M", title: "Military details", description: "Anropssignal, enhet, andra sambandsmedel." },
      { letter: "E", title: "Exact location", description: "Exakt position för händelsen och nuvarande position." },
      { letter: "T", title: "Time and type", description: "Tid och typ av incident." },
      { letter: "H", title: "Hazards in the area", description: "Hot/hinder i området." },
      { letter: "A", title: "Approach routes", description: "Framryckningsväg för undsättning. (Brytpunkt, Landningsplats)" },
      { letter: "N", title: "Number of casualties", description: "Antal nödställda, typ av skador." },
      { letter: "E", title: "Expected response", description: "Vilken hjälp behövs." },
    ],
  },
  sources: [
    { title: "Försvarsmaktens prehospitala behandlingsriktlinjer (2023), s. 11", url: "https://bibliotek.hv-sog.se/Sjukv%C3%A5rd/Fo%CC%88rsvarsmaktens%20prehospitala%20behandlingsriktlinjer%202023.pdf" },
  ],
};
