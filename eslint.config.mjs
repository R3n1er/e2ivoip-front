import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/build/**",
      "**/dist/**",
      "**/coverage/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/scripts/node_modules/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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
];

export default eslintConfig;
