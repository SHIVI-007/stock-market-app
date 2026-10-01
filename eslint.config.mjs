import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    // The end-to-end suite runs its own dev server with NEXT_DIST_DIR=.next-e2e
    // (see `playwright.config.ts`). Without this, running the suite leaves
    // generated files behind and the next `npm run lint` reports thousands of
    // problems in code nobody wrote.
    ".next-e2e/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
