import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.tests(),
  js.languageOptions(),
  ...js.rules(),
  ...reactHooks.configs.recommended.rules,
  ...reactRefresh.configs.recommended.rules,
];