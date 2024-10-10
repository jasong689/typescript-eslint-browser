# typescript-eslint-browser
Use `@typescript-eslint/parser` in the browser

```js
import * as eslint from "eslint-linter-browserify";
import parser from "typescript-eslint-browser";

// or const eslint = require("eslint-linter-browserify");
// or <script src="https://cdn.jsdelivr.net/npm/eslint-linter-browserify/linter.js"></script>
// or <script src="https://cdn.jsdelivr.net/npm/eslint-linter-browserify/linter.min.js"></script>

const linter = new eslint.Linter();

const messages = linter.verify("var foo; const bar: number;", {
  rules: {
    semi: ["error", "never"]
  },
  languageOptions: { parser }
}, { filename: "foo.js" });

console.log(messages);
```

https://eslint.org/docs/developer-guide/nodejs-api#linter
