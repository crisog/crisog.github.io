/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ['"JetBrains Mono"', "monospace"],
      mono: ['"JetBrains Mono"', "monospace"],
    },
    extend: {
      colors: {
        background: "#faf0e6",
        primary: "#007acc",
        secondary: "#333",
        muted: "#666",
      },
      fontWeight: {
        light: 300,
        normal: 300,
        bold: 700,
      },
    },
  },
  plugins: [],
};
