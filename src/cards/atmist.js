export default {
  id: "at-mist",
  category: "Sjukvård",
  layout: "foldable",
  title: "AT-MIST",
  subtitle: "Rapport för överlämning av patient",
  content: {
    type: "mnemonic",
    items: [
      { letter: "A", title: "Age", description: "Ålder och kön på den skadade." },
      { letter: "T", title: "Time", description: "Tidpunkt för skadan/händelsen." },
      { letter: "M", title: "Mechanism", description: "Skademekanism (trubbigt/stickande våld, fall, IED)." },
      { letter: "I", title: "Injuries", description: "Skador (funna och misstänkta)." },
      { letter: "S", title: "Signs", description: "Vitalparametrar (Puls, Blodtryck, Andningsfrekvens, Medvetandegrad). Även förändringar över tid kan noteras (notera TNR)." },
      { letter: "T", title: "Treatment", description: "Given behandling (Tourniquet, läkemedel, förband)." },
    ],
    notes: "Namn på omhändertagaren kan också inkluderas i rapporten",
    sources: [
      { title: "Försvarsmaktens prehospitala behandlingsriktlinjer (2023), s. 9", url: "https://bibliotek.hv-sog.se/Sjukv%C3%A5rd/Fo%CC%88rsvarsmaktens%20prehospitala%20behandlingsriktlinjer%202023.pdf" },
    ],
  },
};
