export default {
  id: "obo",
  category: "Ledning",
  layout: "foldable",
  title: "OBO",
  subtitle: "Förenklad ordergivning",
  content: {
    type: "mnemonic",
    items: [
      {
        letter: "O",
        title: "Orientering",
        description:
          "**Fienden:** Styrka, art, plats och verksamhet.\n**Egna förband:** Högre chefs uppgift och sidoförband (grannar).\n**Miljö:** Terräng, mörker/väder och civila aktörer.",
      },
      {
        letter: "B",
        title: "Beslut",
        description:
          "**Uppgift & Syfte:** Vad ska enheten göra och varför?\n**Genomförande (IDS):**\n- *Inledningsvis* (Förflyttning, utgångslägen)\n- *Därefter* (Själva lösandet av uppgiften/striden)\n- *Slutligen* (Återsamling, omorganisation, beredd på ny uppgift)",
      },
      {
        letter: "O",
        title: "Order",
        description:
          "**Uppgifter:** Vem gör vad? (Omgång/enskild/stridspar).\n**Samordning:** Skjutgränser, eldöppnande och insatsregler (ROE).\n**Ledning & Underhåll:** Samband/koder, ammunition, sjukvård (plats/PEDARS) och var chefen befinner sig.",
      },
    ],
    notes: "*OBO är en komprimerad variant av den fullständiga 5-punktsordern (Orientering, Uppgift, Genomförande, Underhåll, Ledning). Den används ofta på plutons- och gruppnivå när tiden är knapp, för att snabbt och strukturerat få ut en uppgift till förbandet.*"
  },
};