import type { JestConfigWithTsJest } from "ts-jest";

module.exports = {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  transform: { "^.+\\.tsx?$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.test.json" }] },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: { branches: 100, functions: 100, lines: 100, statements: 100 },
  },
} satisfies JestConfigWithTsJest;
