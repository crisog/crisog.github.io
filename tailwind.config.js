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
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-disabled": "var(--text-disabled)",
        "border-primary": "var(--border-primary)",
        "border-hover": "var(--border-hover)",
        "accent": "var(--accent-primary)",
      },
    },
  },
  plugins: [],
};
