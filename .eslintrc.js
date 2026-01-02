module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  ignorePatterns: ["dist", "node_modules"],
  env: {
    node: true,
    jest: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off"
  }
};

