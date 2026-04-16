import rehypeImageWrapper from "@libs/rehype-image-figure-wrapper";
import { expect, test } from "bun:test";
import rehypeStringify from "rehype-stringify";
import remarkAttributes from "remark-attributes";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Case = {
  inputMarkdown: string;
  expectedHtml: string;
};

const cases: Array<Case> = [
  { 
    inputMarkdown: `![alt text](https://example.com/image.jpg)`, 
    expectedHtml: `<figure><img src="https://example.com/image.jpg" alt="alt text"><figcaption>alt text</figcaption></figure>`
  },
  { 
    inputMarkdown: `![alt text](https://example.com/image.jpg){caption='this is caption'}`, 
    expectedHtml: `<figure><img src="https://example.com/image.jpg" alt="alt text"><figcaption>this is caption</figcaption></figure>`
  },
  { 
    inputMarkdown: `![alt text](https://example.com/image.jpg){wrong='this is wrong'}`, 
    expectedHtml: `<figure><img src="https://example.com/image.jpg" alt="alt text"><figcaption>alt text</figcaption></figure>`
  },
  { 
    inputMarkdown: `![alt text](https://example.com/image.jpg) I am ignored`, 
    expectedHtml: `<figure><img src="https://example.com/image.jpg" alt="alt text"><figcaption>alt text</figcaption></figure>`
  },
];

const u = unified()
  .use(remarkParse)
  .use(remarkAttributes)
  .use(remarkRehype)
  .use(rehypeImageWrapper)
  .use(rehypeStringify);

test.each(cases)("$inputMarkdown =>\n\t$expectedHtml", async (data) => {
  expect(String(await u.process(data.inputMarkdown))).toBe(data.expectedHtml);
});
