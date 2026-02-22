/**
 * Test: Kontrollerar att inget kort har innehåll som går utanför sin yta.
 *
 * Startar vite dev-server, öppnar appen i Puppeteer, lägger till alla kort
 * i utskriftskön och kontrollerar att scrollHeight <= clientHeight för varje
 * front/back-panel.
 *
 * Kör: npm test
 */

import { launch } from "puppeteer";
import { createServer } from "vite";

const CARD_HEIGHT_MM = 130;

async function runTest() {
  let server;
  let browser;
  let failed = false;

  try {
    // 1. Starta vite dev-server
    server = await createServer({
      configFile: "./vite.config.js",
      server: { port: 5199, strictPort: false },
    });
    await server.listen();
    const address = server.httpServer.address();
    const baseUrl = `http://localhost:${address.port}`;
    console.log(`Dev server running at ${baseUrl}`);

    // 2. Starta Puppeteer
    browser = await launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(baseUrl, { waitUntil: "networkidle0" });

    // 3. Klicka "Lägg till" på alla kort i biblioteket
    const addButtons = await page.$$('button');
    const addBtnHandles = [];
    for (const btn of addButtons) {
      const text = await btn.evaluate((el) => el.textContent.trim());
      if (text === "+ Lägg till") {
        addBtnHandles.push(btn);
      }
    }

    console.log(`Lägger till ${addBtnHandles.length} kort...`);
    for (const btn of addBtnHandles) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 100));
    }

    // Vänta på rendering
    await new Promise((r) => setTimeout(r, 500));

    // 4. Kontrollera overflow på varje kort-panel
    const results = await page.evaluate(() => {
      const issues = [];

      // Varje PrintRow har en wrapper med h-[130mm] och två barn: front + back
      const rows = document.querySelectorAll(".print-page .flex.w-full");
      rows.forEach((row, rowIdx) => {
        const panels = row.children;
        for (let i = 0; i < panels.length; i++) {
          const panel = panels[i];
          const isOverflowing = panel.scrollHeight > panel.clientHeight + 1; // 1px tolerans
          const side = i === 0 ? "front" : "back";

          // Hämta korttitel från panelen
          const titleEl = panel.querySelector("h1") || row.querySelector("h1");
          const title = titleEl ? titleEl.textContent : `Rad ${rowIdx + 1}`;

          if (isOverflowing) {
            issues.push({
              title,
              side,
              scrollHeight: panel.scrollHeight,
              clientHeight: panel.clientHeight,
              overflow: panel.scrollHeight - panel.clientHeight,
            });
          }
        }
      });

      return issues;
    });

    // 5. Rapportera resultat
    if (results.length === 0) {
      console.log("\n✅ Alla kort passar inom sin yta!\n");
    } else {
      failed = true;
      console.error(`\n❌ ${results.length} kort-paneler har overflow:\n`);
      for (const r of results) {
        console.error(
          `  • ${r.title} (${r.side}): ${r.overflow}px overflow (scrollHeight=${r.scrollHeight}, clientHeight=${r.clientHeight})`
        );
      }
      console.error("");
    }
  } catch (err) {
    console.error("Test-fel:", err);
    failed = true;
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
  }

  process.exit(failed ? 1 : 0);
}

runTest();
