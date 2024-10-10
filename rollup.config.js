const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const json = require("@rollup/plugin-json");
const nodePolyfills = require("rollup-plugin-polyfill-node");
const terser = require("@rollup/plugin-terser");
const replace = require("@rollup/plugin-replace");

function generateRollup(output) {
  const plugins = [
    replace({
      preventAssignment: true,
      values: {
        'require("node:': 'require("',
        "require('node:": "require('",
        'from "node:': 'from "',
        "from 'node:": "from '",
        ".versions.node.split('.')": "",
        "const NODE_PROCESS_VERSION_PARTS = ": `const NODE_PROCESS_VERSION_PARTS = ["20", "17", "0"];//`,
      },
    }),
    commonjs({
      ignoreGlobal: true,
      requireReturnsDefault: "preferred",
      strictRequires: "auto",
    }),
    json(),
    nodePolyfills(["util", "path", "stream", "inspector"]),
    nodeResolve({
      preferBuiltins: false,
    }),
  ];

  if (output.file.match(/\.min\./)) {
    plugins.push(terser());
  }

  return {
    context: "window",
    input: "index.js",
    output: {
      intro: "if (!global) { var global = globalThis || window; }",
      ...output,
    },
    plugins,
  };
}

module.exports = [
  generateRollup({
    file: "parser.js",
    format: "umd",
    exports: "named",
    name: "eslint",
  }),
  generateRollup({
    file: "parser.min.js",
    format: "umd",
    exports: "named",
    name: "eslint",
  }),
  generateRollup({
    file: "parser.mjs",
    format: "esm",
  }),
  generateRollup({
    file: "parser.cjs",
    format: "cjs",
    exports: "named",
  }),
];
