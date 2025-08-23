/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs officielles E2I VoIP
        "red-primary": "#E53E3E", // Rouge principal - Chiffre "2", lettres "IP" dans VOIP
        "blue-marine": "#2D3848", // Bleu marine - Lettres E et I dans E2I
        "gray-secondary": "#818096", // Gris secondaire - Lettres "VO" dans VOIP, baseline
        "gray-dark": "#1F2937", // Gris foncé - Texte, header non scrolled
        white: "#FFFFFF", // Blanc - Fond clair, inversions
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
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
