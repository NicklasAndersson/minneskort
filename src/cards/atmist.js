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
      { letter: "M", title: "Mechanism", description: "Skademekanism (trubbigt/stickande våld, fallhöjd, fart)." },
      { letter: "I", title: "Injuries", description: "Skador (funna och misstänkta)." },
      { letter: "S", title: "Signs", description: "Vitalparametrar (Puls, Blodtryck, Andningsfrekvens, Medvetandegrad)." },
      { letter: "T", title: "Treatment", description: "Given behandling (Tourniquet, läkemedel, förband)." },
    ],
    notes: "Används vid överlämning till nästa vårdnivå (t.ex. ambulans eller helikopter).",
  },
};
