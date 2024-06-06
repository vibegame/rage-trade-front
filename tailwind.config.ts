import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        1: "#EDEEF4",
        3: "#b7bad3",
        4: "#A5A9C8",
        5: "#9195BB",
        8: "#3F4368",
        9: "#333653",
        10: "#26293F",
        11: "#1F2133",
        12: "#191B2A"
      },
      purple: "#8F7DF8"
    },
    borderRadius: {
      4: "4px",
      8: "8px",
      12: "12px",
      full: "9999px"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
};
export default config;
