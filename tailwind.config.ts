import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",        // near black
        surface: "#121218",   // dark surface
        ink: "#e5e7eb",       // light text
        muted: "#9ca3af",
        primary: "#6366f1",   // indigo
        safe: "#10b981",      // emerald
        caution: "#f59e0b",   // amber
        danger: "#f43f5e"     // rose
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: [],
};
export default config;
