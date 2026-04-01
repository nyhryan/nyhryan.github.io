import type { Configuration } from "@utils/types";

export const SITE_CONFIG: Configuration = {
  site: {
    url: "https://blog.ataidev.cc",
    title: "ATAI Devlog",
    description:
      "A blog about my journey as a developer and the projects I work on.",
  },
  social: {
    name: "YunHyeok Nam",
    github: "https://github.com/nyhryan",
    twitter: "@Rhy_Chang_Life",
  },
} as const;

export const SITE_TITLE = SITE_CONFIG.site.title;
export const SITE_DESCRIPTION = SITE_CONFIG.site.description;
