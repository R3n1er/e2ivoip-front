const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Charte : Inter (police officielle, cohérence logo E2I) / IBM Plex Mono (données chiffrées)
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // ── Couleurs officielles E2I VoIP (charte — intouchables) ──
        "red-primary": "#E53E3E", // Rouge principal - Chiffre "2", lettres "IP" dans VOIP
        "blue-marine": "#2D3848", // Bleu marine - Lettres E et I dans E2I
        "gray-secondary": "#818096", // Gris secondaire - Lettres "VO" dans VOIP, baseline
        "gray-dark": "#1F2937", // Gris foncé - Texte, header non scrolled
        white: "#FFFFFF", // Blanc - Fond clair, inversions

        // ── Gris d'interface (fonctionnels, PAS des couleurs de marque) ──
        // Même rampe bleutée que `gray-dark`, qui est déjà le `gray-800` de
        // Tailwind : la charte a donc déjà adopté ce procédé. Ces deux tokens
        // nomment des valeurs en usage dans le layout depuis l'origine, ils
        // n'introduisent aucune teinte nouvelle. Décision du 2026-09-20.
        //
        // Ne pas les employer pour un accent ou une couleur de marque : la
        // règle « 1 seule couleur d'accent par écran, le rouge » reste entière.
        "ui-muted": "#4B5563", // 7,56:1 sur blanc — AA texte. Navigation niv. 2-3, chevrons
        "ui-border": "#E5E7EB", // 1,24:1 — séparateurs et bordures, jamais du texte
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        e2ivoip: {
          primary: "#E53E3E", // Rouge principal
          secondary: "#818096", // Gris secondaire
          accent: "#2D3848", // Bleu marine
          neutral: "#1F2937", // Gris foncé
          "base-100": "#FFFFFF", // Blanc
          info: "#2D3848", // Bleu marine
          success: "#16A34A", // Vert (pour les succès)
          warning: "#F59E0B", // Orange (pour les avertissements)
          error: "#E53E3E", // Rouge principal (pour les erreurs)
        },
      },
    ],
  },
};
