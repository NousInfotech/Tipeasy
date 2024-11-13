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
        lightText: "var(--lightText)",
        primary: "var(--primary)",
        accent1: "var(--accent1)",
        accent2: "var(--accent2)",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontStyle: {
        italic: 'italic',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite', // Customize the duration to 5 seconds
      },
    },
  },
  plugins: [],
} satisfies Config;
