import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkCallout } from "@r4ai/remark-callout";
import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";
import pluginCollapsible from "expressive-code-collapsible";
import rehypeExternalLinks from "rehype-external-links";
import rehypeMathJaxChtml from "rehype-mathjax/chtml";
import remarkAttributes from "remark-attributes";
import remarkCjkFriendly from "remark-cjk-friendly";
import remarkGfmStrikethroughCjkFriendly from "remark-cjk-friendly-gfm-strikethrough";
import remarkMath from "remark-math";
import rehypeImageFigureWrapper from "./src/libs/rehype-image-figure-wrapper";
import { remarkObsidianLink } from "./src/libs/remark-obsidian-link";

export default defineConfig({
  site: "https://blog.ataidev.cc",

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Cascadia Code",
      cssVariable: "--font-cascadia-code",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/cascadia-code-v5-latin_symbols2-regular.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/cascadia-code-v5-latin_symbols2-italic.woff2"],
            weight: 400,
            style: "italic",
          },
          {
            src: ["./src/assets/fonts/cascadia-code-v5-latin_symbols2-700.woff2"],
            weight: 700,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/cascadia-code-v5-latin_symbols2-700italic.woff2"],
            weight: 700,
            style: "italic",
          },
          
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Chiron GoRound TC",
      cssVariable: "--font-chiron-go-round-tc",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/ChironGoRoundTC-Regular.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/ChironGoRoundTC-Bold.woff2"],
            weight: 700,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/ChironGoRoundTC-Black.woff2"],
            weight: 900,
            style: "normal",
          },
        ],
      }
    },
    {
      provider: fontProviders.local(),
      name: "IBM Plex Sans KR",
      cssVariable: "--font-ibm-plex-sans-kr",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/ibm-plex-sans-kr-v11-korean_latin-regular.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/ibm-plex-sans-kr-v11-korean_latin-700.woff2"],
            weight: 700,
            style: "normal",
          }
        ],
      },
    }
  ],

  // trailingSlash: "always",
  integrations: [
    alpinejs({ entrypoint: "./src/alpine.entrypoint.ts" }),
    astroExpressiveCode({
      themes: ["catppuccin-mocha"],
      styleOverrides: {
        uiFontFamily: "'Chiron GoRound TC', sans-serif",
        codeFontFamily: "'Cascadia Code', 'GulimChe', monospace" 
      },
      plugins: [
        pluginCollapsible({ 
          lineThreshold: 16,
          previewLines: 8,
        }),
      ],
    }),
    swup({
      containers: ["#main-swup-container", "#sidebar-swup-container", "#primary-nav"],
      globalInstance: true,
      // debug: true
    }),
    sitemap({
      filter: (page) => (
        (page === "https://blog.ataidev.cc/") ||
        (page === "https://blog.ataidev.cc/about") ||
        /https:\/\/blog\.ataidev\.cc\/blog\/.+/.test(page)
      ),
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [
      remarkObsidianLink,
      remarkMath,
      remarkCallout,
      remarkCjkFriendly,
      remarkGfmStrikethroughCjkFriendly,
      remarkAttributes,
    ],
    rehypePlugins: [
      [
        rehypeMathJaxChtml,
        {
          chtml: { 
            fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
            scale: 1.1,
          },
        }
      ],
      [
        rehypeExternalLinks,
        {
          content: {
            type: "text",
            value: " 🔗",
          },
          properties: {
            "data-external-link": "true",
          },
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        }
      ],
      rehypeImageFigureWrapper,
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
