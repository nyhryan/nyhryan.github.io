import { isExternalLink } from "./remarkObsidianLink";
import { expect, test } from "bun:test";

interface Case {
  url: string;
  expected: boolean;
}
const inputUrls: Array<Case> = [
  { url: "../../relative-article.md", expected: false },
  { url: "./inner/some-article.md#heading-three", expected: false },
  { url: "current/folder/some-article.mdx", expected: false },
  { url: "mailto:someone@example.com", expected: true },
  { url: "https://google.com", expected: true },
];

test.each(inputUrls)(
  'isExternalLink("$url") === $expected',
  ({ url, expected }) => {
    expect(isExternalLink(url)).toBe(expected);
  },
);
