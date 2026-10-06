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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    // ponytail: tyst fallback (blockerad/full localStorage); egna kort sparas då bara i sessionen
  }
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
