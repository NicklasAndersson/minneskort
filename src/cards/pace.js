export default {
  id: "pace",
  category: "Samband",
  layout: "foldable",
  title: "PACE",
  subtitle: "Planering av samband",
  content: {
    type: "mnemonic",
    items: [
      { letter: "P", title: "Primary", description: "Huvudsakligt sambandsmedel." },
      { letter: "A", title: "Alternate", description: "Reservmedel om huvudmedlet fallerar." },
      { letter: "C", title: "Contingency", description: "Tredje alternativ om även reservmedlet slås ut." },
      { letter: "E", title: "Emergency", description: "Sista utväg, t.ex. ordonnans eller pyroteknik." },
    ],
    notes: "Planera och repetera alla fyra nivåer före uppdraget.",
  },
};
