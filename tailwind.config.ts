import type { Config } from "tailwindcss";

export default {
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
        nav: '#adbbda',
        box: '#8697c4',
        circle: '#7091e6',
        circle1: '#84a2f1',
        circle2: '#3d52a0',
      },
    },
  },
  plugins: [],
} satisfies Config;
