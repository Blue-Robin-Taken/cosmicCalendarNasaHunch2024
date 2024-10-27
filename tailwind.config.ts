import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          'Lucida Sans',
          'Lucida Sans Regular',
          'Lucida Grande',
          'Lucida Sans Unicode',
          'Geneva',
          'Verdana',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
