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
  },
  webServer: {
    // PORT=3000 : le .env peut définir un autre port (ex. 1337) ; Playwright et baseURL restent sur 3000.
    command: "npm run build && PORT=3000 npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
});
