import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import next from "eslint-config-next";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	next(),
	{
		ignores: [".next/**", "dist/**"],
	},
];
