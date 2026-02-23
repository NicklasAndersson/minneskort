/**
 * Test: Validerar att alla kort har korrekt format.
 *
 * Kontrollerar:
 * - Obligatoriska toppnivåfält (id, category, layout, title, content)
 * - Inga okända toppnivåfält (t.ex. sources utanför content)
 * - content.type är "mnemonic" eller "freetext"
 * - mnemonic-kort har items med letter, title, description
 * - freetext-kort har text
 * - sources (om de finns) ligger i content, inte på toppnivå
 * - sources har korrekt format (title krävs)
 * - Inga dubbletter av id
 *
 * Kör: node test/card-schema.test.mjs
 */

import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cardsDir = join(__dirname, "..", "src", "cards");

const ALLOWED_TOP_KEYS = new Set(["id", "category", "layout", "title", "subtitle", "content"]);
const ALLOWED_CONTENT_KEYS = new Set(["type", "items", "text", "notes", "frontNotes", "sources"]);
const ALLOWED_ITEM_KEYS = new Set(["letter", "title", "description"]);
const ALLOWED_SOURCE_KEYS = new Set(["title", "url"]);
const ALLOWED_TYPES = new Set(["mnemonic", "freetext"]);

let errors = 0;

function fail(file, msg) {
  console.error(`  ✗ ${file}: ${msg}`);
  errors++;
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

async function main() {
  const files = readdirSync(cardsDir).filter(
    (f) => f.endsWith(".js") && f !== "index.js"
  );

  console.log(`Validerar ${files.length} kortfiler...\n`);

  const cards = [];

  for (const file of files) {
    const mod = await import(join(cardsDir, file));
    const card = mod.default;

    if (!card || typeof card !== "object") {
      fail(file, "Exporterar inte ett objekt");
      continue;
    }

    cards.push({ file, card });

    // Obligatoriska toppnivåfält
    for (const key of ["id", "category", "layout", "title", "content"]) {
      if (!(key in card)) {
        fail(file, `Saknar obligatoriskt fält: ${key}`);
      }
    }

    // Inga okända toppnivåfält
    for (const key of Object.keys(card)) {
      if (!ALLOWED_TOP_KEYS.has(key)) {
        fail(file, `Okänt toppnivåfält: "${key}" (tillåtna: ${[...ALLOWED_TOP_KEYS].join(", ")})`);
      }
    }

    // Typer
    if (typeof card.id !== "string" || card.id.length === 0) {
      fail(file, "id måste vara en icke-tom sträng");
    }
    if (typeof card.title !== "string" || card.title.length === 0) {
      fail(file, "title måste vara en icke-tom sträng");
    }
    if (typeof card.category !== "string" || card.category.length === 0) {
      fail(file, "category måste vara en icke-tom sträng");
    }
    if (card.layout !== "foldable") {
      fail(file, `layout måste vara "foldable", fick: "${card.layout}"`);
    }
    if (card.subtitle !== undefined && typeof card.subtitle !== "string") {
      fail(file, "subtitle måste vara en sträng om det finns");
    }

    // Content
    const content = card.content;
    if (!content || typeof content !== "object") {
      fail(file, "content måste vara ett objekt");
      continue;
    }

    // Inga okända content-fält
    for (const key of Object.keys(content)) {
      if (!ALLOWED_CONTENT_KEYS.has(key)) {
        fail(file, `Okänt content-fält: "${key}" (tillåtna: ${[...ALLOWED_CONTENT_KEYS].join(", ")})`);
      }
    }

    if (!ALLOWED_TYPES.has(content.type)) {
      fail(file, `content.type måste vara "mnemonic" eller "freetext", fick: "${content.type}"`);
    }

    // Mnemonic-specifik validering
    if (content.type === "mnemonic") {
      if (!Array.isArray(content.items) || content.items.length === 0) {
        fail(file, "mnemonic-kort måste ha en icke-tom items-array");
      } else {
        content.items.forEach((item, idx) => {
          for (const key of Object.keys(item)) {
            if (!ALLOWED_ITEM_KEYS.has(key)) {
              fail(file, `Okänt fält i items[${idx}]: "${key}"`);
            }
          }
          if (!item.letter || !item.title || !item.description) {
            fail(file, `items[${idx}] saknar letter, title eller description`);
          }
        });
      }
    }

    // Freetext-specifik validering
    if (content.type === "freetext") {
      if (typeof content.text !== "string" || content.text.length === 0) {
        fail(file, "freetext-kort måste ha en icke-tom text-sträng");
      }
    }

    // Notes
    if (content.notes !== undefined && typeof content.notes !== "string") {
      fail(file, "content.notes måste vara en sträng");
    }
    if (content.frontNotes !== undefined && typeof content.frontNotes !== "string") {
      fail(file, "content.frontNotes måste vara en sträng");
    }

    // Sources validering
    if (content.sources !== undefined) {
      if (!Array.isArray(content.sources)) {
        fail(file, "content.sources måste vara en array");
      } else {
        content.sources.forEach((src, idx) => {
          for (const key of Object.keys(src)) {
            if (!ALLOWED_SOURCE_KEYS.has(key)) {
              fail(file, `Okänt fält i sources[${idx}]: "${key}"`);
            }
          }
          if (!src.title || typeof src.title !== "string") {
            fail(file, `sources[${idx}] saknar title`);
          }
          if (src.url !== undefined && typeof src.url !== "string") {
            fail(file, `sources[${idx}].url måste vara en sträng`);
          }
        });
      }
    }
  }

  // Dubbletter av id
  const ids = cards.map((c) => ({ id: c.card.id, file: c.file }));
  const seen = new Map();
  for (const { id, file } of ids) {
    if (seen.has(id)) {
      fail(file, `Dubblerat id "${id}" (finns även i ${seen.get(id)})`);
    } else {
      seen.set(id, file);
    }
  }

  console.log("");
  if (errors > 0) {
    console.error(`${errors} fel hittade.`);
    process.exit(1);
  } else {
    pass(`Alla ${files.length} kort har korrekt format.`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Oväntat fel:", err);
  process.exit(1);
});
