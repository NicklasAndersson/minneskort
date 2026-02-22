export default {
  id: "osk",
  category: "Ledning",
  layout: "foldable",
  title: "OSK",
  subtitle: "Orientering – Skjutgränser – Kommando",
  content: {
    type: "mnemonic",
    items: [
      {
        letter: "O",
        title: "Orientering",
        description:
          "Orientering om läget\nVilken grupp som ska understödjas",
      },
      {
        letter: "S",
        title: "Skjutgränser",
        description:
          "Var eldunderstödet ska verka\nVaraktighet\nSäkerhetsgränser",
      },
      {
        letter: "K",
        title: "Kommando",
        description:
          "Verkställighetskommando\nNär elden ska öppnas/upphöra",
      },
    ],
    notes:
      "Används när en grupp ska ge eldunderstöd åt en annan grupp (t.ex. sidogrupp).",
  },
};
