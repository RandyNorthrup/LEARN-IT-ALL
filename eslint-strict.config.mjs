// eslint-strict.config.mjs
// STRICT LINTING CONFIGURATION FOR LEARN-IT-ALL
// Enforces production-ready code quality standards

import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      ".vercel/**",
      "dist/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // TypeScript - STRICT
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-ignore": "allow-with-description" },
      ],

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",

      // Error Handling
      "no-catch-shadow": "error",
      "no-throw-literal": "error",

      // Code Quality
      "no-console": ["error", { allow: ["error", "warn"] }],
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "no-nested-ternary": "error",

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "warn",
      "react/no-array-index-key": "error",
      "react/no-danger": "error",
      "react/no-unescaped-entities": "error",
      "react/jsx-key": "error",
      "react/self-closing-comp": "error",

      // React Hooks - STRICT
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // API Routes - Enhanced Security
  {
    files: ["src/app/api/**/*.{ts,tsx}"],
    rules: {
      "no-console": ["error", { allow: ["error"] }],
    },
  },

  // Code Execution Route - Allow console manipulation and Function constructor
  {
    files: ["src/app/api/execute/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off", // Must manipulate console for code execution
      "no-new-func": "off", // Function constructor required for sandboxed code execution
    },
  },
];

export default eslintConfig;
