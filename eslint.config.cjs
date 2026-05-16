const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    {
        ignores: ["coverage/**", "dist/**", "scripts/**"],
    },
    {
        files: ["**/*.cjs"],
        languageOptions: {
            globals: {
                __dirname: "readonly",
                module: "readonly",
                require: "readonly",
            },
        },
    },
    ...compat.extends("@forcir/eslint-config"),
];
