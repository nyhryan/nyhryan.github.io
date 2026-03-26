import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().default(new Date()).optional(),
      locale: z.enum(["en", "ko"]).default("en").optional(),
      bannerImage: image().optional(),
      tags: z.array(z.string()),
    }),
});

export const collections = { blog };
