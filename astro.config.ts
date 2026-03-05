// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { cleanupImage, cleanupLink } from './src/lib/remark-cleanup-link';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	markdown: {
		remarkPlugins: [
			cleanupImage, cleanupLink
		],
		rehypePlugins: [
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
	integrations: [mdx(), sitemap()],
});
