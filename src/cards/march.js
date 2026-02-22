export default {
  id: "march",
  category: "Sjukvård",
  layout: "foldable",
  title: "MARCH",
  subtitle: "TCCC - Prioritering vid traumavård",
  content: {
    type: "mnemonic",
    items: [
      { letter: "M", title: "Massive Hemorrhage", description: "Stoppa livshotande blödning (Tourniquet, tryckförband)." },
      { letter: "A", title: "Airway", description: "Skapa och säkra öppen luftväg (haklyft, svalgtub, framstupa sidoläge)." },
      { letter: "R", title: "Respiration", description: "Kontrollera andning. Behandla bröstkorgsskador (t.ex. ocklusivt förband)." },
      { letter: "C", title: "Circulation", description: "Förebygg chock. Stoppa övriga blödningar, överväg bäckenbälte." },
      { letter: "H", title: "Head/Hypothermia", description: "Förebygg nedkylning (filt, värmetäcke). Bedöm skallskada." },
    ],
    notes: "MARCH är den internationella standarden enligt TCCC (Tactical Combat Casualty Care) för att prioritera åtgärder vid trauma.",
  },
};
