// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { remarkCleanupImage, remarkCleanupLink } from './src/lib/remark-cleanup-link';
import remarkCallout from '@r4ai/remark-callout';
import rehypeExternalLinks from 'rehype-external-links';
import a11yEmoji from '@fec/remark-a11y-emoji';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax/chtml';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      remarkCleanupImage,
      remarkCleanupLink,
      a11yEmoji,
      remarkMath,
      // remarkCallout, 
    ],
    rehypePlugins: [
      [rehypeMathJax, {
        chtml: { fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2' }
      }],
      // add _blank to external anchor tags and append emoji
      [rehypeExternalLinks, {
        content: {
          type: "text",
          value: " 🔗",
        },
        target: "_blank",
        rel: ["noopener", "noreferrer"],
      }],
    ],
  },
});
