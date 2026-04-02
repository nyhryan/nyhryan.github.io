import { type CollectionEntry } from "astro:content";

export function sortPost(posts: CollectionEntry<"blog">[], sort: "asc" | "desc" = "desc") {
  return posts.sort(({ data: a }, { data: b }) =>
    sort === "desc"
      ? b.pubDate.valueOf() - a.pubDate.valueOf()
      : a.pubDate.valueOf() - b.pubDate.valueOf(),
  );
}
