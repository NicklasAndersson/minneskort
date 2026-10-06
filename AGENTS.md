## Git & deploy workflow
- Integration: pusha direkt till `main` (ingen PR, `main` är inte skyddad).
- Commits: svenska, en kort mening (t.ex. "Lägg till kort för ...").
- Före commit: kör `npm test` (schema- och överflödestest).
- PDF: CI ("Test & PDF") skapar release `build-<n>` med `minneskort.pdf` vid push till `main`; inget manuellt steg (se README).
- Webbdeploy (manuell): efter push, kör `npm run deploy` (Cloudflare Workers, kräver `npx wrangler login`) som eget steg efter att pushen verifierats. Kolla med `npx wrangler deployments list --name minneskort`.
- Miljö: `https://minneskort.wwn.workers.dev` är produktion – det finns ingen separat testmiljö, så behandla varje `npm run deploy` som ett skarpt släpp. Appen har inget serverstate (allt ligger i användarens webbläsare), så det är OK att verifiera mot produktion, t.ex. med Playwright. Testa annars lokalt med `npm run dev`.
