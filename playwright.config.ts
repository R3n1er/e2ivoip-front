import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.ts", "**/*.spec.tsx"],
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
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
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
