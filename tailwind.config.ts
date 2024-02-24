import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const isBrowser = typeof window !== "undefined";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            content1: "#edefff",
          },
        },
        slate: {
          extend: "dark",
          colors: {
            background: "#1e293b",
            default: {
              "100": "#475569",
              "200": "#64748b",
              "500": "#d4d4d8",
            },
            foreground: {
              DEFAULT: "#d4d4d8",
              "500": "#d4d4d8",
            },
            danger: {
              DEFAULT: "#ef4444",
              "50": "#610726",
              "100": "#920B3A",
            },
            content1: "#334155",
          },
        },
      },
    }),
  ],
};
export default config;
