export default {
  id: "pedars",
  category: "Logistik",
  layout: "foldable",
  title: "PEDARS",
  subtitle: "Sammanställning av logistikbehov",
  content: {
    type: "mnemonic",
    items: [
      { letter: "P", title: "Personal", description: "Antal skadade / Döda." },
      { letter: "E", title: "Ersättning", description: "Typ av behov gällande t.ex materiel, mat motsv." },
      { letter: "D", title: "Drivmedel", description: "Tillgång i %." },
      { letter: "A", title: "Ammunition", description: "Behov av antal och typ." },
      { letter: "R", title: "Reparation", description: "Vad finns det för reparationsbehov?" },
      { letter: "S", title: "Stridsvärde", description: "Grön (utan begränsningar), Gul (med begränsningar) eller Röd (uppgiften kan inte lösas)." },
    ],
  },
};
