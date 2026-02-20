import React, { useState, useEffect } from 'react';
import initialCards from './cards';
import CardEditor, { loadCustomCards, saveCustomCards, exportCardsToFile, importCardsFromFile } from './CardEditor';

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
      <div key={idx} className="flex gap-3 text-base">
        <span className="font-black text-slate-800 w-5">{item.letter}</span>
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

// 3. LAYOUT-KOMPONENTER (RADER & PANELER)

// Streckad triangel i övre vänstra hörnet
const CornerLine = () => (
  <svg className="absolute top-0 left-0 z-10" width="15mm" height="15mm" viewBox="0 0 40 40">
    <polyline points="0,40 0,0 40,0" fill="none" stroke="rgb(148 163 184)" strokeWidth="1" strokeDasharray="3,3" />
  </svg>
);

// Framsidan av ett vikbart kort
const FoldableFront = ({ card }) => (
  <div className="w-[105mm] h-full border-r border-dashed border-gray-400 p-6 flex flex-col items-center text-center relative overflow-hidden">
    <CornerLine />
    <div className="mt-8">
      <h1 className="text-3xl font-black text-slate-900 mb-1">{card.title}</h1>
      {card.subtitle && <p className="text-sm text-slate-600 italic px-2">{card.subtitle}</p>}
    </div>
    {card.content.type === 'mnemonic' && <MnemonicFront items={card.content.items} />}
    <div className="absolute bottom-4 text-[10px] text-slate-400">Vik på mitten →</div>
  </div>
);

// Baksidan av ett vikbart kort
const FoldableBack = ({ card }) => (
  <div className="w-[105mm] h-full p-6 flex flex-col relative overflow-hidden">
    {card.content.type === 'mnemonic' && <MnemonicBack items={card.content.items} />}
    {card.content.type === 'freetext' && <FreeText text={card.content.text} />}
    {card.content.type === 'image' && <ImageContent data={card.content} />}
    {card.content.notes && (
      <div className="mt-auto pt-3 border-t border-slate-200">
        <FreeText text={card.content.notes} />
      </div>
    )}
  </div>
);

// En rad på A4:an (1 vikbart kort)
const PrintRow = ({ card }) => {
  if (!card) return <div className="flex w-full h-[130mm]" />;
  return (
    <div className="flex w-full h-[130mm] border border-gray-400">
      <FoldableFront card={card} />
      <FoldableBack card={card} />
    </div>
  );
};

// En komplett A4-sida
const PrintPage = ({ rows }) => {
  return (
    <div className="print-page w-[210mm] h-[297mm] bg-white mx-auto mb-8 shadow-lg print:shadow-none print:mb-0 flex flex-col justify-center gap-4 box-border border border-gray-200 print:border-none p-[10mm] print:p-[10mm]">
      <PrintRow card={rows[0]} />
      <PrintRow card={rows[1]} />
    </div>
  );
};

// 4. PACKNINGS-ALGORITM (2 kort per A4-sida)
const packDeckIntoPages = (deck) => {
  const pages = [];
  for (let i = 0; i < deck.length; i += 2) {
    pages.push([deck[i], deck[i + 1] || null]);
  }
  return pages;
};


// 5. HUVUDAPPLIKATION
export default function App() {
  const [customCards, setCustomCards] = useState(() => loadCustomCards());
  const [deck, setDeck] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const library = [...initialCards, ...customCards];

  useEffect(() => {
    saveCustomCards(customCards);
  }, [customCards]);

  const addToDeck = (card) => {
    setDeck([...deck, card]);
  };

  const removeFromDeck = (indexToRemove) => {
    setDeck(deck.filter((_, idx) => idx !== indexToRemove));
  };

  const isCustom = (card) => customCards.some((c) => c.id === card.id);

  const handleSaveCard = (cardData) => {
    if (editingCard) {
      setCustomCards((prev) => prev.map((c) => (c.id === editingCard.id ? cardData : c)));
      setDeck((prev) => prev.map((c) => (c.id === editingCard.id ? cardData : c)));
    } else {
      if (library.some((c) => c.id === cardData.id)) {
        cardData.id = cardData.id + '-' + Date.now();
      }
      setCustomCards((prev) => [...prev, cardData]);
    }
    setEditorOpen(false);
    setEditingCard(null);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setEditorOpen(true);
  };

  const handleDeleteCard = (card) => {
    if (!confirm(`Ta bort "${card.title}"?`)) return;
    setCustomCards((prev) => prev.filter((c) => c.id !== card.id));
    setDeck((prev) => prev.filter((c) => c.id !== card.id));
  };

  const handleImport = async () => {
    try {
      const cards = await importCardsFromFile();
      const newCards = cards.map((c) => ({
        ...c,
        layout: 'foldable',
        id: c.id || c.title.toLowerCase().replace(/[^a-zåäö0-9]+/g, '-'),
      }));
      setCustomCards((prev) => [...prev, ...newCards]);
    } catch (err) {
      if (err.message) alert(err.message);
    }
  };

  const handleExport = () => {
    if (customCards.length === 0) return alert('Inga egna kort att exportera.');
    exportCardsToFile(customCards);
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

      {/* Editor-modal */}
      {editorOpen && (
        <CardEditor
          card={editingCard}
          onSave={handleSaveCard}
          onCancel={() => { setEditorOpen(false); setEditingCard(null); }}
        />
      )}

      {/* Användargränssnitt (Döljs vid utskrift) */}
      <div className="no-print max-w-6xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8 border-b border-slate-300 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Minneskort Hemvärnet</h1>
            <p className="text-slate-500 text-sm">Bygg och skriv ut dina minneskort.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleImport}
              className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Ladda upp
            </button>
            <button
              onClick={handleExport}
              className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Ladda ner
            </button>
            <button
              onClick={() => window.print()}
              disabled={deck.length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
            >
              Skriv ut ({pages.length} sidor)
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Vänster: Bibliotek */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-700">1. Bibliotek</h2>
              <button
                onClick={() => { setEditingCard(null); setEditorOpen(true); }}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg transition-colors"
              >
                + Nytt kort
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {library.map((card) => (
                <div key={card.id} className="flex justify-between items-center p-3 hover:bg-slate-50 border border-slate-100 rounded-lg transition-colors">
                  <div>
                    <div className="font-bold text-slate-800">
                      {card.title}
                      {isCustom(card) && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">Eget</span>}
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                      <span className="text-blue-600">{card.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {isCustom(card) && (
                      <>
                        <button
                          onClick={() => handleEditCard(card)}
                          className="text-xs text-slate-400 hover:text-blue-600 font-semibold py-1 px-2"
                        >
                          Redigera
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card)}
                          className="text-xs text-slate-400 hover:text-red-600 font-semibold py-1 px-2"
                        >
                          Ta bort
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => addToDeck(card)}
                      className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded"
                    >
                      + Lägg till
                    </button>
                  </div>
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
          <PrintPage key={idx} rows={page} />
        ))}
      </div>

    </div>
  );
}

