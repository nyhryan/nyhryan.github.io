import { visit } from "unist-util-visit";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Root } from "mdast";
import { slug } from 'github-slugger';

const isExternal = (url: string): boolean => {
    // Any scheme (http:, mailto:, obsidian:, data:, etc.) or protocol-relative URL
    return /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(url) || url.startsWith("//");
};

const normalizeSlashes = (url: string): string => url.replace(/\\/g, "/");

const cleanupImage: RemarkPlugin<any[]> = () => (root: Root) => {
    visit(root, "image", (node) => {
        const url = normalizeSlashes(node.url);

        if (isExternal(url)) return;
        if (url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) return;
        if (url.startsWith("@")) return; // keep aliases like @attachments untouched

        node.url = `./${url}`;
    });
};


const cleanupLink: RemarkPlugin<any[]> = () => (root: Root) => {
    // Link to other content collection's Markdown
    // need to be in absolute format with starting at the content collection's directory 
    visit(root, "link", (node) => {
        const original = normalizeSlashes(node.url);

        if (isExternal(original)) return;
        if (original.startsWith("#")) return;
        if (original.startsWith("/")) return; // already site-absolute route

        // Split once into path + optional heading
        const hashIndex = original.indexOf("#");
        const pathPart = hashIndex >= 0 ? original.slice(0, hashIndex) : original;
        const rawHeading = hashIndex >= 0 ? original.slice(hashIndex + 1) : "";

        // Only rewrite markdown links
        if (!/\.mdx?$/i.test(pathPart)) return;

        // Remove extension + leading ./ or /
        const postPath = pathPart
            .replace(/\.mdx?$/i, "")    // remove .md or .mdx extension
            .replace(/^\.?\//, "")      // remove leading ./ or / if present
            .replace(/\/+$/, "");       // remove trailing slashes

        if (!postPath) return;

        // If link includes a heading, convert it to a slug and append as hash
        if (rawHeading) {
            // Keep anchor behavior consistent with heading slug IDs
            const normalizedHash = slug(decodeURIComponent(rawHeading), false);
            node.url = `/blog/${postPath}/#${normalizedHash}`;
            return;
        }

        node.url = `/blog/${postPath}/`;
    });
};

export { cleanupImage, cleanupLink };