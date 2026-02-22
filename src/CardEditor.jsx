import React, { useState } from 'react';

const STORAGE_KEY = 'minneskort-custom-cards';

export function loadCustomCards() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export function saveCustomCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function exportCardsToFile(cards) {
  const json = JSON.stringify(cards, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'minneskort.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importCardsFromFile() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return reject(new Error('Ingen fil vald'));
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          resolve(Array.isArray(data) ? data : [data]);
        } catch {
          reject(new Error('Ogiltig JSON-fil'));
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });
}

const emptyMnemonicItem = () => ({ letter: '', title: '', description: '' });

const emptySource = () => ({ title: '', url: '' });

const emptyCard = () => ({
  id: '',
  category: '',
  layout: 'foldable',
  title: '',
  subtitle: '',
  content: {
    type: 'mnemonic',
    items: [emptyMnemonicItem()],
    notes: '',
    sources: [],
  },
});

const inputClass = 'w-full border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';
const labelClass = 'block text-xs font-bold text-slate-600 mb-1';

export default function CardEditor({ card, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (card) return JSON.parse(JSON.stringify(card));
    return emptyCard();
  });

  const set = (path, value) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const setContentType = (type) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const sources = next.content.sources || [];
      if (type === 'mnemonic') {
        next.content = { type, items: [emptyMnemonicItem()], notes: '', sources };
      } else if (type === 'freetext') {
        next.content = { type, text: '', notes: '', sources };
      } else if (type === 'image') {
        next.content = { type, imageUrl: '', text: '', notes: '', sources };
      }
      return next;
    });
  };

  const addSource = () => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.content.sources) next.content.sources = [];
      next.content.sources.push(emptySource());
      return next;
    });
  };

  const removeSource = (idx) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.content.sources.splice(idx, 1);
      return next;
    });
  };

  const setSource = (idx, field, value) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.content.sources[idx][field] = value;
      return next;
    });
  };

  const addItem = () => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.content.items.push(emptyMnemonicItem());
      return next;
    });
  };

  const removeItem = (idx) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.content.items.splice(idx, 1);
      return next;
    });
  };

  const setItem = (idx, field, value) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.content.items[idx][field] = value;
      return next;
    });
  };

  const handleSave = () => {
    if (!form.title.trim()) return alert('Titel krävs');
    if (!form.id.trim()) {
      form.id = form.title.toLowerCase().replace(/[^a-zåäö0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center overflow-y-auto p-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-lg font-black text-slate-800">
            {card ? 'Redigera kort' : 'Skapa nytt kort'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Titel *</label>
              <input className={inputClass} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="T.ex. RASSOIKA" />
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <input className={inputClass} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="T.ex. Ledning" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Undertext</label>
              <input className={inputClass} value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} placeholder="Kort beskrivning" />
            </div>
            <div>
              <label className={labelClass}>ID (auto om tomt)</label>
              <input className={inputClass} value={form.id} onChange={(e) => set('id', e.target.value)} placeholder="unikt-id" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Innehållstyp</label>
            <div className="flex gap-2">
              {['mnemonic', 'freetext', 'image'].map((t) => (
                <button
                  key={t}
                  onClick={() => setContentType(t)}
                  className={`px-3 py-1 text-sm rounded font-semibold transition-colors ${
                    form.content.type === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t === 'mnemonic' ? 'Ramsa' : t === 'freetext' ? 'Fritext' : 'Bild'}
                </button>
              ))}
            </div>
          </div>

          {form.content.type === 'mnemonic' && (
            <div>
              <label className={labelClass}>Ramsans bokstäver</label>
              <div className="flex flex-col gap-2">
                {form.content.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <input
                      className="w-10 border border-slate-300 rounded px-2 py-1.5 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={item.letter}
                      onChange={(e) => setItem(idx, 'letter', e.target.value)}
                      placeholder="X"
                      maxLength={2}
                    />
                    <input
                      className="w-36 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={item.title}
                      onChange={(e) => setItem(idx, 'title', e.target.value)}
                      placeholder="Titel"
                    />
                    <input
                      className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={item.description}
                      onChange={(e) => setItem(idx, 'description', e.target.value)}
                      placeholder="Beskrivning"
                    />
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-red-400 hover:text-red-600 text-sm font-bold px-1"
                      title="Ta bort rad"
                    >✕</button>
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold">
                + Lägg till bokstav
              </button>
            </div>
          )}

          {form.content.type === 'freetext' && (
            <div>
              <label className={labelClass}>Text (markdown: **fet**, *kursiv*)</label>
              <textarea
                className={`${inputClass} h-32 resize-y`}
                value={form.content.text}
                onChange={(e) => set('content.text', e.target.value)}
                placeholder="Skriv din text här..."
              />
            </div>
          )}

          {form.content.type === 'image' && (
            <>
              <div>
                <label className={labelClass}>Bild-URL</label>
                <input className={inputClass} value={form.content.imageUrl} onChange={(e) => set('content.imageUrl', e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label className={labelClass}>Text (markdown)</label>
                <textarea
                  className={`${inputClass} h-24 resize-y`}
                  value={form.content.text}
                  onChange={(e) => set('content.text', e.target.value)}
                  placeholder="Beskrivande text under bilden..."
                />
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Anteckningar på baksidan (valfritt, markdown)</label>
            <textarea
              className={`${inputClass} h-20 resize-y`}
              value={form.content.notes || ''}
              onChange={(e) => set('content.notes', e.target.value)}
              placeholder="Extra text under huvudinnehållet på baksidan..."
            />
          </div>

          <div>
            <label className={labelClass}>Källor (valfritt)</label>
            <div className="flex flex-col gap-2">
              {(form.content.sources || []).map((src, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <input
                    className="w-40 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={src.title}
                    onChange={(e) => setSource(idx, 'title', e.target.value)}
                    placeholder="Titel"
                  />
                  <input
                    className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={src.url}
                    onChange={(e) => setSource(idx, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                  <button
                    onClick={() => removeSource(idx)}
                    className="text-red-400 hover:text-red-600 text-sm font-bold px-1"
                    title="Ta bort källa"
                  >✕</button>
                </div>
              ))}
            </div>
            <button onClick={addSource} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold">
              + Lägg till källa
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-slate-200">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800">
            Avbryt
          </button>
          <button onClick={handleSave} className="px-5 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors">
            {card ? 'Spara ändringar' : 'Skapa kort'}
          </button>
        </div>
      </div>
    </div>
  );
}
