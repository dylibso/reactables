const esbuild = require('esbuild');
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')

esbuild
  .build({
    entryPoints: ['src/index.jsx'],
    outdir: 'dist',
    bundle: true,
    sourcemap: true,
    minify: false, // might want to use true for production build
    format: 'cjs', // needs to be CJS for now
    target: ['es2020'], // don't go over es2020 because quickjs doesn't support it
    plugins: [NodeModulesPolyfillPlugin()]
  })

