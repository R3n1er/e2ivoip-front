module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        // MacBook Pro breakpoints
        "macbook13": "1280px",
        "macbook14": "1440px", 
        "macbook15": "1680px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          primary: "hsl(var(--red-primary))",
        },
        blue: {
          marine: "hsl(var(--blue-marine))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: [
      {
        e2ivoip: {
          // Thème personnalisé E2I VoIP basé sur le PRD actualisé
          "primary": "#E53E3E", // Rouge primaire PRD ##E53E3E
          "secondary": "#2D3848", // Bleu marine PRD #2D3848
          "accent": "#818096", // Gris secondaire PRD #818096
          "neutral": "#1F2937", // Gris foncé PRD #1F2937
          "base-100": "#FFFFFF", // Blanc PRD #FFFFFF
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "info": "#2D3848",
          "success": "#E53E3E",
          "warning": "#f97316",
          "error": "#E53E3E",
        },
      },
      "light", // Fallback theme
    ],
    darkTheme: false, // Désactiver le thème sombre
    base: true,
    styled: true,
    utils: true,
    prefix: "", 
    logs: false, // Réduire les logs en console
    themeRoot: ":root",
  },
}
