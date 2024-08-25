import tseslint from "typescript-eslint";


export default [
  ...tseslint.configs.recommended,
  {
    files: [
      "src/**/*.{js,mjs,cjs,ts}", 
      "test/**/*.{js,mjs,cjs,ts}"
    ],
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    }
  },
];