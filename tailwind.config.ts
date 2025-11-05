import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(200, 100%, 47.6%)',
          light: 'hsl(200, 100%, 57.6%)',
          dark: 'hsl(200, 100%, 37.6%)',
        },
        secondary: {
          DEFAULT: 'hsl(0, 0%, 11%)',
          light: 'hsl(0, 0%, 51%)',
          lighter: 'hsl(0, 0%, 91%)',
        },
        stage: {
          background: 'rgb(0, 255, 0)',
        },
      },
      fontFamily: {
        'source-han-sans': ['var(--font-source-han-sans)'],
        'mi-sans': ['var(--font-mi-sans)'],
        'abuget': ['var(--font-abuget)'],
        'outfit': ['var(--font-outfit)'],
        'source-han-serif': ['var(--font-source-han-serif)'],
      },
      aspectRatio: {
        'stage': '16 / 10',
      },
    },
  },
  plugins: [],
};
export default config;
