#!/usr/bin/env node
/**
 * generate-pdf.js
 *
 * Startar Vite dev-server, lägger till alla kort via Puppeteer,
 * och genererar en PDF med alla kort i utskriftsformat.
 *
 * Användning: node generate-pdf.js [output.pdf]
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { launch } from "puppeteer";
import { createServer } from "vite";

const outputPdf = resolve(process.argv[2] || "minneskort.pdf");

async function main() {
  let server;
  let browser;

  try {
    // 1. Starta Vite dev-server
    server = await createServer({
      configFile: "./vite.config.js",
      server: { port: 5198, strictPort: false },
    });
    await server.listen();
    const address = server.httpServer.address();
    const baseUrl = `http://localhost:${address.port}`;
    console.log(`Dev server running at ${baseUrl}`);

    // 2. Starta Puppeteer
    browser = await launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(baseUrl, { waitUntil: "networkidle0" });

    // 3. Klicka "Lägg till" på alla kort i biblioteket
    const addButtons = await page.$$("button");
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
    await new Promise((r) => setTimeout(r, 1000));

    // 4. Generera PDF
    const buffer = await page.pdf({
      format: "A4",
      landscape: false,
      printBackground: true,
    });

    writeFileSync(outputPdf, buffer);
    console.log(
      `PDF written to ${outputPdf} (${(buffer.length / 1024).toFixed(0)} KB)`
    );
  } finally {
    if (browser) await browser.close();
    if (server) await server.close();
  }
}

main().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
