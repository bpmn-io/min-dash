import uglify from 'rollup-plugin-uglify';

import babel from 'rollup-plugin-babel';

function bbl() {
  return babel({
    exclude: 'node_modules/**',
    babelrc: false,
    plugins: [
      'transform-object-assign'
    ],
    presets: [
      [ 'env', { modules: false } ]
    ]
  });
}

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.mjs',
      format: 'es'
    },
    plugins: [
      bbl()
    ]
  },
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      bbl()
    ]
  },
  {
    input: 'lib/index.js',
    output: {
      name: 'MinDash',
      file: 'dist/min-dash.js',
      format: 'umd'
    },
    plugins: [
      bbl()
    ]
  },
  {
    input: 'lib/index.js',
    output: {
      name: 'MinDash',
      file: 'dist/min-dash.min.js',
      format: 'umd'
    },
    plugins: [
      bbl(),
      uglify()
    ]
  }
];