module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "react-refresh",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: [
      "${workspaceFolder}/frontend/tsconfig.app.json",
      "${workspaceFolder}/frontend/tsconfig.node.json",
    ],
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "no-var": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["src/**/*.js", "src/**/*.jsx"],
      extends: ["eslint-config-react-app"],
    },
  ],
};
