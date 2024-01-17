import terser from '@rollup/plugin-terser';

import pkg from './package.json';

function pgl(plugins = []) {
  return [
    ...plugins
  ];
}

const umdDist = 'dist/min-dash.js';

export default [

  // browser-friendly UMD build
  {
    input: 'lib/index.js',
    output: {
      name: 'MinDash',
      file: umdDist,
      format: 'umd'
    },
    plugins: pgl()
  },
  {
    input: 'lib/index.js',
    output: {
      name: 'MinDash',
      file: umdDist.replace(/\.js$/, '.min.js'),
      format: 'umd'
    },
    plugins: pgl([
      terser()
    ])
  },
  {
    input: 'lib/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: pgl()
  }
];