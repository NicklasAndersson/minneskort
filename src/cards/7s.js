export default {
  id: "7s",
  category: "Spaning",
  layout: "foldable",
  title: "Spaningsrapport (7S)",
  subtitle: "Minnesregel för spaningsrapport",
  content: {
    type: "mnemonic",
    items: [
      { letter: "S", title: "Stund", description: "Tidpunkt för observationen (DDTTMM)." },
      { letter: "S", title: "Ställe", description: "Plats för observationen (koordinat)." },
      { letter: "S", title: "Styrka", description: "Antal fiender, fordon, etc." },
      { letter: "S", title: "Slag", description: "Typ av fiende, fordonstyp, etc." },
      { letter: "S", title: "Sysselsättning", description: "Vad fienden gör (marsch, spaning, försvar)." },
      { letter: "S", title: "Symbol", description: "Märkning, nationalitetsbeteckning, nummer." },
      { letter: "S", title: "Sagesman", description: "Vem som gjort observationen." },
    ],
    notes:
      "Enligt SoldF 2001. Ett åttonde S, 'Sedan' (vad egen enhet gör härnäst), kan läggas till vid behov.",
  },
};
