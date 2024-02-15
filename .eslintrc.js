module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    "dist", // Ignore built files.
    "out",
    "build",
    "node_modules",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "import/no-unresolved": 0,
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      },
    ],
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
}
