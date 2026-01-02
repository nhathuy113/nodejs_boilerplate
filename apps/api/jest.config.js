/** @type {import('jest').Config} */
module.exports = {
  ...require("../../jest.base.config.js"),
  rootDir: "../..",
  displayName: "@app/api",
  testMatch: ["<rootDir>/apps/api/src/**/*.spec.ts"]
};


