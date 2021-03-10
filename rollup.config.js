import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

function pgl(plugins=[]) {
  return [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      plugins: [
        '@babel/plugin-transform-object-assign'
      ],
      presets: [
        [ '@babel/env', { modules: false } ]
      ]
    }),
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
      uglify()
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