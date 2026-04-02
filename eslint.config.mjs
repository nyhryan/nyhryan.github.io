import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";

export default defineConfig([
  globalIgnores([".astro", ".idea", "dist", "node_modules", "public", "src/content/.obsidian"]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  // stylistic.configs.customize({
  //   indent: 2,
  //   quotes:"double",
  //   semi: true,
  //   jsx: true,
  // }),
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs["jsx-a11y-recommended"],
]);
