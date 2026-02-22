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
      { letter: "M", title: "Mechanism", description: "Skademekanism (trubbigt/stickande våld, fallhöjd, fart, skottskada, explosion)." },
      { letter: "I", title: "Injuries", description: "Skador (funna och misstänkta)." },
      { letter: "S", title: "Signs", description: "Vitalparametrar (Puls, Blodtryck, Andningsfrekvens, Medvetandegrad)." },
      { letter: "T", title: "Treatment", description: "Given behandling (Tourniquet, läkemedel, förband)." },
    ],
    notes: "**9-Line CASEVAC Rad 5 (Antal patienter per typ):**\nAnges vid begäran om evakuering.\n• **L + [Antal]** (Litter): Bårburna patienter som inte kan gå själva.\n• **A + [Antal]** (Ambulatory): Gående patienter.\n*Exempel:* 'L1, A2' betyder 1 bårburen och 2 gående patienter.",
  },
};
