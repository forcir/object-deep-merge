/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest/presets/default-esm",
    moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
    transform: { "^.+\\.tsx?$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.test.json" }] },
    collectCoverage: false,
    collectCoverageFrom: ["./src/**"],
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: { branches: 100, functions: 100, lines: 100, statements: 100 },
    },
};
