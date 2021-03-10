import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'test/bundling/index.js',
    output: [
      { file: 'test/bundling/bundled.js', format: 'es' }
    ],
    plugins: [
      resolve()
    ]
  }
];