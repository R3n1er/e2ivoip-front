import { defineConfig } from "@playwright/test";

// Le port 3000 est occupé en permanence par la WebUI du gateway Hermes sur le
// poste d'Alban : sans override, `reuseExistingServer` réutilisait ce serveur
// (page de login) au lieu de démarrer Next.js et tous les tests échouaient.
const PORT = Number(process.env.PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.ts", "**/*.spec.tsx"],
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    headless: true,
    // Les animations décoratives (ex. le rebond du bouton de chat pendant
    // 20 s) empêchent Playwright de considérer un élément comme stable, ce qui
    // fait expirer les clics. Le site honorant `prefers-reduced-motion`, on
    // teste ici la configuration d'un utilisateur qui a réduit les animations —
    // fidèle au produit, et déterministe.
    contextOptions: { reducedMotion: "reduce" },
  },
  webServer: {
    command: `npx next dev --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
