export default {
  id: "7s",
  category: "Spaning",
  layout: "foldable",
  title: "Spaningsrapport (7S)",
  subtitle: "Minnesregel för spaningsrapport",
  content: {
    type: "mnemonic",
    items: [
      { letter: "S", title: "Stund", description: "Stund: Tidpunkt för observationen (DDTTMM)." },
      { letter: "S", title: "Ställe", description: "Ställe: Plats för observationen (koordinat)." },
      { letter: "S", title: "Styrka", description: "Styrka: Antal fiender, fordon, etc." },
      { letter: "S", title: "Slag", description: "Slag: Typ av fiende, fordonstyp, etc." },
      { letter: "S", title: "Sysselsättning", description: "Sysselsättning: Vad fienden gör (marsch, spaning, försvar)." },
      { letter: "S", title: "Symbol", description: "Symbol: Märkning, nationalitetsbeteckning, nummer." },
      { letter: "S", title: "Sagesman", description: "Sagesman:Vem som gjort observationen." },
    ],
    notes:
      "Ett åttonde S, 'Sedan' (vad egen enhet gör härnäst), kan läggas till vid behov.",
    sources: [
      { title: "SoldF 2001" },
      { title: "Hemvärnet – Spaningsrapport 7S", url: "https://hemvarn.wordpress.com/2020/03/13/15-spaningsrapport-7s-och-dess-8-punkter/" },
    ],
  },
};
