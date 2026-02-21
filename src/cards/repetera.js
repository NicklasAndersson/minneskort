export default {
  id: "repetera",
  category: "Samband",
  layout: "foldable",
  title: "REPETERA",
  subtitle: "Sambandsrutin vid anrop",
  content: {
    type: "mnemonic",
    items: [
      { letter: "R", title: "Riktning", description: "Vem anropar du?" },
      { letter: "E", title: "Enhet", description: "Vem är du?" },
      { letter: "P", title: "Plats", description: "Var är du?" },
      { letter: "E", title: "Eget läge", description: "Vad gör du just nu?" },
      { letter: "T", title: "Tid", description: "När skedde händelsen?" },
      { letter: "E", title: "Eventuellt", description: "Övrig viktig info." },
      { letter: "R", title: "Repetera", description: "Repetera viktiga siffror/koordinater." },
      { letter: "A", title: "Avsluta", description: '"Kom" eller "Slut".' },
    ],
    notes: "Vid sambandsproblem, övergå till bokstavering.",
  },
};
