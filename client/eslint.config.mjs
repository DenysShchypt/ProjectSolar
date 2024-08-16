import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(...tseslint.configs.recommendedTypeCheckedOnly, {
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
