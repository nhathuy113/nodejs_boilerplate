/** @type {import('jest').Config} */
module.exports = {
  ...require("../../jest.base.config.js"),
  rootDir: "../..",
  displayName: "@app/worker",
  testMatch: ["<rootDir>/apps/worker/src/**/*.spec.ts"]
};


