import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Permettre `any` dans les fichiers de test et de types
      "@typescript-eslint/no-explicit-any": "off",
      // Permettre require() dans les fichiers générés par Next.js
      "@typescript-eslint/no-require-imports": "warn",
      // Permettre les variables non utilisées dans les fichiers générés
      "@typescript-eslint/no-unused-vars": "warn",
      // Autoriser les directives ts-ignore nécessaires sur le legacy
      "@typescript-eslint/ban-ts-comment": "off",
      // Autoriser les apostrophes non échappées dans le contenu marketing
      "react/no-unescaped-entities": "off",
      // Réduire la sévérité des règles Next.js bloquantes
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      // Éviter les faux positifs sur les composants utilitaires
      "react/display-name": "off",
      // Next 16 active de nouveaux diagnostics du compilateur React.
      // Ils restent visibles sans bloquer la migration de sécurité.
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      // Laisser Next gérer le routing généré
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      // Règles plus souples pour les tests
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "coverage/**",
    "scripts/node_modules/**",
    ".vercel/**",
    "playwright-report/**",
    "test-results/**",
    ".claude/**",
    "**/*.backup",
    "**/*.bak",
    "**/*.log",
    "npm-debug.log*",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
