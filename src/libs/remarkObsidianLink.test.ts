import { isExternalLink } from "./remarkObsidianLink";
import { expect, test } from "bun:test";

interface Case {
  url: string;
  expected: boolean;

}
const inputUrls: Array<Case> = [
  { url: "https://google.com", expected: true },
  { url: "../../relative-article.md", expected: false },
  { url: "./inner/some-article.md#heading-three", expected: false },
];

test.each(inputUrls)("isExternalLink(\"$url\") === $expected", ({ url, expected }) => {
  expect(isExternalLink(url)).toBe(expected);
});
