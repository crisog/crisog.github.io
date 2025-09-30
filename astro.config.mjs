// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://crisog.github.io",
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark",
        wrap: true,
      },
    }),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});