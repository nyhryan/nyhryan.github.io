import type { Root } from "hast";
import { h } from 'hastscript';
import { is } from "unist-util-is";
import { SKIP, visit } from "unist-util-visit";

export default function rehypeImageFigureWrapper() {
  return async function (tree: Root) {
    // Find all <p> elements that contain <img> children and transform them
    visit(tree, "element", function (pElement, index, parent) {
      if (!is(pElement, { tagName: "p" }, index, parent)) return;
      if (typeof index !== "number" || !parent) return;

      // Find all <img> children of the <p> element
      pElement.children
        .filter((child) => is(child, { tagName: "img" }))
        .forEach(async (child) => {
          const { src, alt } = child.properties;
          const caption = child.properties["data-caption"];
          const isEmptyCaption = caption === "" || caption === undefined;

          const figureContent = [
            h("a", { href: "#", "data-photo-swipe": "", "data-no-swup": "" }, [
                h("img", { src, alt }),
              ]),
          ];
          // Add <figcaption> if caption is not empty
          if (!isEmptyCaption) {
            figureContent.push(h("figcaption", [String(caption)]));
          }
          const figureWrapper = h("figure", figureContent);
          // replace <p> element with <figure> element directly because <figure> cannot be
          // contained by <p> element
          parent.children.splice(index, 1, structuredClone(figureWrapper));
        });

      return [SKIP, index + 1];
    });
  }
}
