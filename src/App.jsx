import React, { useState } from 'react';

// 1. DATA: JSON-biblioteket med ny enhetlig struktur och layout-stöd
const initialCards = [
  {
    id: "l-cabcde",
    category: "Sjukvård",
    layout: "foldable",
    title: "L-CABCDE",
    subtitle: "Systematisk undersökning och behandling",
    content: {
      type: "mnemonic",
      items: [
        { letter: "L", title: "Livsfarligt läge", description: "Bedöm säkerheten. Behöver den skadade flyttas? Finns beskjutning eller brandrisk?" },
        { letter: "C", title: "Catastrophic hemorrhage", description: "Stoppa stora, sprutande blödningar omedelbart med tourniquet." },
        { letter: "A", title: "Airways", description: "Säkra fria luftvägar. Rensa munnen, använd stabilt sidoläge." },
        { letter: "B", title: "Breathing", description: "Kontrollera andningen. Täck eventuella öppna sår i bröstkorgen." },
        { letter: "C", title: "Circulation", description: "Kontrollera puls och chocktecken. Stoppa mindre blödningar. Förebygg hypotermi." },
        { letter: "D", title: "Disability", description: "Kontrollera medvetande (vaken, svarar på tilltal/smärta)." },
        { letter: "E", title: "Exposure/Environment", description: "Helkroppsundersökning. Skydda mot markkyla och väder." }
      ]
    }
  },
  {
    id: "4x4-andning",
    category: "Stresshantering",
    layout: "foldable",
    title: "4x4-Andning",
    subtitle: "För att sänka pulsen under extrem stress.",
    content: {
      type: "freetext",
      text: "1. **Andas in** genom näsan i 4 sekunder.\n2. **Håll andan** i 4 sekunder.\n3. **Andas ut** genom munnen i 4 sekunder.\n4. **Vänta** i 4 sekunder innan nästa inandning.\n\n*Upprepa tills du känner att pulsen gått ner och du återfått tunnelseendet.*"
    }
  },
  {
    id: "hgr-verkan",
    category: "Vapenverkan",
    layout: "foldable",
    title: "Spränghandgranat m/56",
    subtitle: "Verkan och skyddsavstånd",
    content: {
      type: "image",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Explosion_icon.svg/200px-Explosion_icon.svg.png",
      text: "**Splitterverkan** är god upp till ca 5 meter, men enstaka splitter kan slungas iväg upp emot 50 meter.\n\nTa alltid fullt skydd vid kast."
    }
  },
  {
    id: "repetera",
    category: "Samband",
    layout: "light",
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
        { letter: "A", title: "Avsluta", description: "\"Kom\" eller \"Slut\"." }
      ]
    }
  },
  {
    id: "sar",
    category: "Skjutteknik",
    layout: "light",
    title: "SAR",
    subtitle: "Skjutteknikens grunder",
    content: {
      type: "mnemonic",
      items: [
        { letter: "S", title: "Siktbild", description: "Centrera siktet rätt i målet." },
        { letter: "A", title: "Avfyrning", description: "Krama avtryckaren jämnt utan att rycka." },
        { letter: "R", title: "Rekylkontroll", description: "Håll vapnet stadigt för snabba uppföljande skott." }
      ]
    }
  }
];

// Enkel markdown-parser
const parseMarkdown = (text) => {
  if (!text) return "";
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\n/g, '<br/>');
  return html;
};

// 2. DELKOMPONENTER FÖR INNEHÅLL

const FreeText = ({ text }) => (
  <div
    className="mt-2 text-[13px] text-slate-700 leading-relaxed"
    dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
  />
);

const ImageContent = ({ data }) => (
  <div className="flex flex-col items-center mt-2 gap-3 text-[13px] text-slate-700">
    {data.imageUrl && (
      <img src={data.imageUrl} alt="Illustration" className="max-h-20 object-contain opacity-80" />
    )}
    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(data.text) }} />
  </div>
);

// Ramsa på Framsidan (endast Bokstav + Kort titel)
const MnemonicFront = ({ items }) => (
  <div className="flex flex-col gap-1 mt-6 text-left w-full px-6">
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-3 text-sm">
        <span className="font-black text-slate-800 w-4">{item.letter}</span>
        <span className="text-slate-700 font-semibold">{item.title}</span>
      </div>
    ))}
  </div>
);

// Ramsa på Baksidan (endast Bokstav + Beskrivning)
const MnemonicBack = ({ items }) => (
  <div className="flex flex-col gap-2 mt-2">
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2 text-[12px] leading-tight">
        <div className="font-bold text-base text-slate-800 w-4 flex-shrink-0">{item.letter}</div>
        <div className="text-slate-600 mt-[2px]">{item.description}</div>
      </div>
    ))}
  </div>
);

// Ramsa för Light-kortet (Bokstav + Titel + Beskrivning i ett svep)
const MnemonicFull = ({ items }) => (
  <div className="flex flex-col gap-2 mt-3">
    {items.map((item, idx) => (
      <div key={idx} className="flex gap-2 text-[12px] leading-tight">
        <div className="font-bold text-base text-slate-800 w-4 flex-shrink-0">{item.letter}</div>
        <div className="mt-[2px]">
          <span className="font-bold text-slate-800">{item.title}: </span>
          <span className="text-slate-600">{item.description}</span>
        </div>
      </div>
    ))}
  </div>
);

// 3. LAYOUT-KOMPONENTER (RADER & PANELER)

// Diagonal linje i övre vänstra hörnet (~1cm)
const CornerLine = () => (
  <div className="absolute top-0 left-0 w-[15mm] border-t border-slate-400 origin-top-left rotate-45 z-10"></div>
);

// En tom panel (om light-kort saknar parter)
const EmptyPanel = ({ isRight }) => (
  <div className={`w-[105mm] h-full p-6 flex flex-col bg-slate-50 opacity-20 ${!isRight ? 'border-r border-dashed border-gray-400' : ''}`}></div>
);

// Framsidan av ett vikbart kort
const FoldableFront = ({ card }) => (
  <div className="w-[105mm] h-full border-r border-dashed border-gray-400 p-6 flex flex-col items-center text-center relative overflow-hidden">
    <CornerLine />
    <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-300 px-2 py-1 rounded">
      {card.category}
    </div>
    <div className="mt-8">
      <h1 className="text-2xl font-black text-slate-900 mb-1">{card.title}</h1>
      {card.subtitle && <p className="text-xs text-slate-600 italic px-2">{card.subtitle}</p>}
    </div>
    {card.content.type === 'mnemonic' && <MnemonicFront items={card.content.items} />}
    <div className="absolute bottom-4 text-[10px] text-slate-400">Vik på mitten →</div>
  </div>
);

// Baksidan av ett vikbart kort
const FoldableBack = ({ card }) => (
  <div className="w-[105mm] h-full p-6 flex flex-col relative overflow-hidden">
    <CornerLine />
    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1 mb-2">
      {card.title} - Detaljer
    </div>
    {card.content.type === 'mnemonic' && <MnemonicBack items={card.content.items} />}
    {card.content.type === 'freetext' && <FreeText text={card.content.text} />}
    {card.content.type === 'image' && <ImageContent data={card.content} />}
  </div>
);

// Ett enkelsidigt "Light"-kort
const LightPanel = ({ card, isRight }) => {
  if (!card) return <EmptyPanel isRight={isRight} />;
  return (
    <div className={`w-[105mm] h-full p-6 flex flex-col relative overflow-hidden ${!isRight ? 'border-r border-dashed border-gray-400' : ''}`}>
      <CornerLine />
      <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-300 px-2 py-1 rounded">
        {card.category}
      </div>
      <h1 className="text-xl font-black text-slate-900 mb-1 mt-6">{card.title}</h1>
      {card.subtitle && <p className="text-xs text-slate-600 italic mb-2">{card.subtitle}</p>}

      <div className="mt-1">
        {card.content.type === 'mnemonic' && <MnemonicFull items={card.content.items} />}
        {card.content.type === 'freetext' && <FreeText text={card.content.text} />}
        {card.content.type === 'image' && <ImageContent data={card.content} />}
      </div>
    </div>
  );
};

// En rad på A4:an (1 Foldable ELLER 2 Light-kort)
const PrintRow = ({ row, isLastRow }) => {
  const rowClasses = `flex w-full h-[148.5mm] ${!isLastRow ? 'border-b border-dashed border-gray-400' : ''}`;

  if (row.isFoldable) {
    return (
      <div className={rowClasses}>
        <FoldableFront card={row.slots[0]} />
        <FoldableBack card={row.slots[0]} />
      </div>
    );
  }

  // Om det är light-kort
  return (
    <div className={rowClasses}>
      <LightPanel card={row.slots[0]} isRight={false} />
      <LightPanel card={row.slots[1]} isRight={true} />
    </div>
  );
};

// En komplett A4-sida
const PrintPage = ({ rows }) => {
  return (
    <div className="print-page w-[210mm] h-[297mm] bg-white mx-auto mb-8 shadow-lg print:shadow-none print:mb-0 flex flex-col box-border border border-gray-200 print:border-none">
      <PrintRow row={rows[0]} isLastRow={false} />
      <PrintRow row={rows[1]} isLastRow={true} />
    </div>
  );
};

// 4. PACKNINGS-ALGORITM (Hanterar Light vs Foldable)
const packDeckIntoPages = (deck) => {
  const pages = [];
  let currentPage = { rows: [] };
  let currentRow = { isFoldable: false, slots: [] };

  const pushRowToPage = () => {
    // Om rowen bara har 1 kort (och det är ett light-kort), fyll på med null
    if (!currentRow.isFoldable && currentRow.slots.length === 1) {
      currentRow.slots.push(null);
    }

    if (currentRow.slots.length > 0) {
      currentPage.rows.push(currentRow);
    }

    // Nollställ raden
    currentRow = { isFoldable: false, slots: [] };

    // Om sidan har 2 rader, skjut in den i pages
    if (currentPage.rows.length === 2) {
      pages.push(currentPage);
      currentPage = { rows: [] };
    }
  };

  deck.forEach(card => {
    if (card.layout === 'light') {
      currentRow.slots.push(card);
      // Om vi har 2 light-kort på raden är den full
      if (currentRow.slots.length === 2) {
        pushRowToPage();
      }
    } else {
      // Foldable kort. Om vi redan har ett ensamt light-kort på raden måste vi spola den raden först.
      if (currentRow.slots.length > 0) {
        pushRowToPage();
      }
      currentRow.isFoldable = true;
      currentRow.slots.push(card);
      pushRowToPage();
    }
  });

  // Skjut in sista raden om den har kvarvarande kort
  if (currentRow.slots.length > 0) {
    pushRowToPage();
  }

  // Om sista sidan bara har 1 rad, fyll på med en tom rad
  if (currentPage.rows.length === 1) {
    currentPage.rows.push({ isFoldable: false, slots: [null, null] });
    pages.push(currentPage);
  }

  return pages;
};


// 5. HUVUDAPPLIKATION
export default function App() {
  const [library] = useState(initialCards);
  const [deck, setDeck] = useState([]);

  const addToDeck = (card) => {
    setDeck([...deck, card]);
  };

  const removeFromDeck = (indexToRemove) => {
    setDeck(deck.filter((_, idx) => idx !== indexToRemove));
  };

  const pages = packDeckIntoPages(deck);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* CSS för Utskrift */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-page { page-break-after: always; }
        }
      `}</style>

      {/* Användargränssnitt (Döljs vid utskrift) */}
      <div className="no-print max-w-6xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8 border-b border-slate-300 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Minneskort Hemvärnet</h1>
            <p className="text-slate-500 text-sm">Bygg och skriv ut dina minneskort. Stödjer vikbara och enkelsidiga format.</p>
          </div>
          <button
            onClick={() => window.print()}
            disabled={deck.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
          >
            Skriv ut A4-ark ({pages.length} sidor)
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Vänster: Bibliotek */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-700">1. Bibliotek</h2>
            <div className="flex flex-col gap-3">
              {library.map((card) => (
                <div key={card.id} className="flex justify-between items-center p-3 hover:bg-slate-50 border border-slate-100 rounded-lg transition-colors">
                  <div>
                    <div className="font-bold text-slate-800">{card.title}</div>
                    <div className="text-xs font-semibold text-slate-500">
                      <span className="text-blue-600">{card.category}</span> • {card.layout === 'foldable' ? 'Vikbart (2 paneler)' : 'Light (1 panel)'}
                    </div>
                  </div>
                  <button
                    onClick={() => addToDeck(card)}
                    className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded"
                  >
                    + Lägg till
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Höger: Valda kort (Kortlek) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 text-slate-700">2. Din utskriftskö</h2>
            {deck.length === 0 ? (
              <div className="text-center p-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                Utskriftskön är tom. Lägg till kort från biblioteket.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {deck.map((card, idx) => (
                  <div key={`${card.id}-${idx}`} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-400 font-mono text-xs">{idx + 1}.</div>
                      <div className="font-bold text-slate-800">{card.title}</div>
                      <div className="text-[10px] bg-slate-200 px-1 rounded text-slate-600 uppercase tracking-wider">{card.layout}</div>
                    </div>
                    <button
                      onClick={() => removeFromDeck(idx)}
                      className="text-sm text-red-500 hover:text-red-700 font-semibold py-1 px-2"
                    >
                      Ta bort
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-center text-slate-400 font-bold uppercase tracking-widest mb-6">Förhandsgranskning Utskrift (A4)</h2>
      </div>

      {/* 4. UTSKRIFTSVY */}
      <div className="w-full overflow-x-auto pb-12 flex flex-col items-center">
        {pages.length === 0 && (
          <div className="no-print w-[210mm] h-[297mm] bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-300">
            Dina A4-ark visas här när du lagt till kort.
          </div>
        )}
        {pages.map((page, idx) => (
          <PrintPage key={idx} rows={page.rows} />
        ))}
      </div>

    </div>
  );
}

