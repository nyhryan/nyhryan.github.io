import { slug } from "github-slugger";
import type { Root } from "mdast";
import path from "path";
import { visit } from "unist-util-visit";
import { VFile } from "vfile";

const CONTENT_DIR = `src${path.sep}content` as const;

export function isExternalLink(inputUrl: string): boolean {
  try {
    new URL(inputUrl);
    return true;
  } catch (err) {
    if (err instanceof TypeError) {
      return false;
    } else {
      throw err;
    }
  }
}

export function remarkObsidianLink() {
  return function (tree: Root, file: VFile) {
    visit(tree, "link", (node) => {
      if (isExternalLink(node.url)) return;
      if (!file.dirname) return;

      // resolve the path to the link
      // file.dirname: path of the file being processed currently
      // node.url: relative link to the file, relative to the file.dirname (**forced in Obsidian app**)
      const { dir, name, ext } = path.parse(path.resolve(file.dirname, node.url));

      // D:\\Dev\\Personal\\nyhryan.github.io\\main\\src\\content\\blog\\data-structure
      // split into -> "D:\\Dev\\... ", "\\blog\\data-structure"
      // then split+join them with normal `/`
      const i = dir.indexOf(CONTENT_DIR);

      // prefix is now "/blog/data-structure"
      const prefix = dir.slice(i + CONTENT_DIR.length)
        .split(path.sep)
        .join("/");

      const hashIndex = ext.indexOf("#");
      if (hashIndex === -1) {
        node.url = `${prefix}/${name}`;
      } else {
        // if linked to heading, preserve heading
        const headingName = ext.slice(hashIndex + 1);
        node.url = `${prefix}/${name}#${slug(decodeURIComponent(headingName))}`;
      }
    });
  };
}
