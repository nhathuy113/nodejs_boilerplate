/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/packages/domain/src/$1",
    "^@infra/(.*)$": "<rootDir>/packages/infra/src/$1",
    "^@shared/(.*)$": "<rootDir>/packages/shared/src/$1"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.base.json"
      }
    ]
  }
};

