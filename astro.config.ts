import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import pluginCollapsible from "expressive-code-collapsible";
import remarkMath from "remark-math";
import { remarkCallout } from "@r4ai/remark-callout";
import remarkCjkFriendly from "remark-cjk-friendly";
import remarkGfmStrikethroughCjkFriendly from "remark-cjk-friendly-gfm-strikethrough";
import rehypeMathJaxChtml from "rehype-mathjax/chtml";
import rehypeExternalLinks from "rehype-external-links";
import { remarkObsidianLink } from "./src/libs/remarkObsidianLink";

export default defineConfig({
  site: "https://example.com",
  // trailingSlash: "always",
  integrations: [
    astroExpressiveCode({
      themes: ["catppuccin-mocha"],
      styleOverrides: { codeFontFamily: "'Cascadia Code', monospace" },
      plugins: [
        pluginCollapsible({ previewLines: 16 }),
      ],
    }),
    sitemap()
  ],

  markdown: {
    remarkPlugins: [
      remarkObsidianLink,
      remarkMath,
      remarkCallout,
      remarkCjkFriendly,
      remarkGfmStrikethroughCjkFriendly,
    ],
    rehypePlugins: [
      [
        rehypeMathJaxChtml,
        {
          chtml: { fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2" }
        }
      ],
      [
        rehypeExternalLinks,
        {
          content: {
            type: "text",
            value: " 🔗",
          },
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        }
      ]
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
