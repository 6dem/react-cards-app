import js from "@eslint/js"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

export default [
    { ignores: ["dist"] },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            "react/jsx-no-target-blank": "error",
            "react/prop-types": "warn",
            "react/display-name": "off",
            "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false,
                    printWidth: 120,
                    tabWidth: 4,
                    semi: false,
                },
            ],
        },
    },
]
