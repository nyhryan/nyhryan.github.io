import { slug } from "github-slugger";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import path from "path";

export function isExternalLink(inputUrl: string): boolean {
  try {
    new URL(inputUrl);
    return true;
  }
  catch (err) {
    if (err instanceof TypeError) {
      return false;
    }
    else {
      throw err;
    }
  }
}

export const remarkObsidianLink: Plugin<[], Root> = () => (tree, file) => {
  visit(tree, "link", (node) => {
    if (isExternalLink(node.url)) return;

    const { dir } = path.parse(file.history[0]);
    const link = path.resolve(dir, node.url).split(path.sep);
    const l = link.slice(link.indexOf("content") + 1);
    const postPath = l.slice(0, l.length - 1).join("/");
    const { name, ext } = path.parse(l[l.length - 1]);

    const hashIndex = ext.indexOf("#");
    if (hashIndex === -1) {
      node.url = `/${postPath}/${name}`;
    }
    else {
      const headingName = ext.slice(hashIndex + 1);
      node.url = `/${postPath}/${name}#${slug(decodeURIComponent(headingName))}`;
    }
  });
};
