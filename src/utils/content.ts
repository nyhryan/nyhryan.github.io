import { type CollectionEntry } from "astro:content";

export type BlogPost2 = CollectionEntry<"blog">;

export function sortPost(posts: BlogPost2[], sort: "asc" | "desc" = "desc") {
  return posts.sort(({ data: a }, { data: b }) =>
    sort === "desc"
      ? b.pubDate.valueOf() - a.pubDate.valueOf()
      : a.pubDate.valueOf() - b.pubDate.valueOf(),
  );
}
