import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export type Configuration = {
  site: {
    url: URL | string;
    title: string;
    description: string;
  },
  social: {
    name: string;
    github: URL | string;
    twitter: `@${string}`;
  }
};
