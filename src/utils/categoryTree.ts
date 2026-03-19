import type { CollectionEntry } from "astro:content";

export interface CategoryNode {
  name: string;
  fullPath: string;
  children: Record<string, CategoryNode>;
  postCount: number;
}

export const buildCategoryTree = async (
  posts: Array<CollectionEntry<"blog">>,
) => {
  const root: Record<string, CategoryNode> = {};

  posts.forEach((post) => {
    const segments = post.id.split("/").slice(0, -1);
    let curr = root;
    let pathAcc = "";

    segments.forEach((segment) => {
      pathAcc = pathAcc ? `${pathAcc}/${segment}` : segment;

      if (!curr[segment]) {
        curr[segment] = {
          name: segment,
          fullPath: pathAcc,
          children: {},
          postCount: 0,
        };
      }
      curr[segment].postCount++;
      curr = curr[segment].children;
    });
  });
  return root;
};
